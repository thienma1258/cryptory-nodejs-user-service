import { Transient, Inject } from "https://deno.land/x/deninject/mod.ts";

import { UserRepository, UserAttributeRepository, User, UserAttribute,UserValidationError,CreateUserMedia,CreateUserAttribute } from "./index.ts";

import AttributeService from "../attribute/attributeService.ts";
import ImageService from "../image/imageService.ts";

class UserService {
    constructor(
        readonly userRepo: UserRepository,
        readonly userAttrRepo: UserAttributeRepository,
        readonly attributeService: typeof AttributeService,
        readonly imageService: typeof ImageService,

        // readonly imageService: ImageService

    ) {
    }

    validate(createModel:CreateUserAttribute[]) {
        var errors: string[]=[];
        return  errors;
    }

    createAttribute(attributes:userAttributes[]){
        return  userAttrRepo.createNewMany(attributes);
    }

    createMedia(medias:CreateUserMedia[]){
        return  imageService.creatNewMany(medias);
    }

    queryAttribute(users: User[]): User[] {
        let userIDs = users.map(user => user.id);
        var userAttr = this.userAttrRepo.findByUserIDs(userIDs);
        var attrIDsMap: Record<number, string> = {}
        let attrIDs: number[] = [];
        for (let key in userAttr) {
            let values = userAttr[key as unknown as number];
            values.map((attrID: number) => {
                if (!attrIDsMap[attrID]) {
                    attrIDsMap[attrID] = "";
                    attrIDs.push(attrID);
                }
            })
        }
        var result = this.attributeService.findByManyIDs(attrIDs);
        result.map((attribute) => {
            attrIDsMap[attribute.id] = attribute.name;
        });

        users.forEach(user => {
            let attributes: UserAttribute[] = [];
            if (!userAttr[user.id] && userAttr[user.id].length > 0) {
                return
            }
            userAttr[user.id].forEach(element => {
                attributes.push({
                    name: attrIDsMap[element]
                })
            });
            user.attributes = attributes;
        });

        return users;
    }

    queryMedia(users: User[]): User[] {
        let userIDs = users.map(user => user.id);
        var userMedia = this.imageService.findByManyUserIDs(userIDs);
        users.forEach(user => {
            if (!userMedia[user.id] && userMedia[user.id].length > 0) {
                return
            }
            user.media= userMedia[user.id].map(media=>{
                return {
                    ...media
                }
            });
        });
        return users;
    }

    query(limit: number, offset: number) {
        const users = this.userRepo.findMany(limit, offset);
        var result: User[] = [];
        result = users.map(user => {
            return {
                ...user
            }
        })
        this.queryAttribute(result);
        this.queryMedia(result);
        return result;

    }

    queryByID(id:number) {
        const user = this.userRepo.findOne(id);
        if (!user){
            throw new  UserValidationError(["id not existed"])
        }
        var result: User[] = [
            {
                ...user
            }
        ];

        this.queryAttribute(result);
        this.queryMedia(result);
        return result[0];
    }

    createNew(createModel:CreateNewUserAttribute){
        errors= this.validate(createModel);
        if (errors.length >0) {
            throw new UserValidationError(errors);
        }
        var user= createModel.map(model=>{
            ...model
        })
        var userID= this.userRepo.createNew(user);
        this.createAttribute(user.attributes);
        this.createMedia(user.media);
        return this.queryByID(userID);
    }
}

let userRepo = new UserRepository();
let userAttrRepo = new UserAttributeRepository();

export default new UserService(userRepo, userAttrRepo, AttributeService,ImageService);