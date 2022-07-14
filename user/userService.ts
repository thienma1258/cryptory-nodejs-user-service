import { UserRepository, UserModel, UserAttribute, UserAttributeRepository, User, Attribute_User, UserValidationError, CreateUserMedia, CreateUserAttribute, CreateNewUser } from "./index.ts"

import AttributeService from "../attribute/attributeService.ts"
import ImageService from "../image/imageService.ts"
import { Image } from "../image/index.ts"

class UserService {
    constructor(
        readonly userRepo: UserRepository,
        readonly userAttrRepo: UserAttributeRepository,
        readonly attributeService: typeof AttributeService,
        readonly imageService: typeof ImageService,

        // readonly imageService: ImageService

    ) {
    }

    validate(_createModel: CreateNewUser) {
        const errors: string[] = [];
        return errors;
    }

    createAttribute(attributes: CreateUserAttribute[], userID: number) {
        const attribueUser: Attribute_User[] = attributes.map((attribute) => {
            const attr:Attribute_User= new Attribute_User()
            attr.user_id=userID;
            attr.attribute_id=attribute.attribute_id;
            return attr;
        });
        return this.userAttrRepo.createNewMany(attribueUser);
    }

    createMedia(media: CreateUserMedia[], userID: number) {
        if (!media || media.length == 0) {
            return
        }
        const images: Image[] = media.map(m => {
            const image= new Image();
            image.user_id=userID;
            image.created=m.created;
            image.height=m.height;
            image.width=m.width;
            image.name=m.name;
            return image;
        });
        return this.imageService.createNewMany(images);
    }

    queryAttribute(users: UserModel[]): UserModel[] {
        const userIDs = users.map(user => user.id);
        const userAttr = this.userAttrRepo.findByUserIDs(userIDs);
        const attrIDsMap: Record<number, string> = {}
        const attrIDs: number[] = [];
        for (const key in userAttr) {
            const values = userAttr[key as unknown as number];
            values.map((attrID: number) => {
                if (!attrIDsMap[attrID]) {
                    attrIDsMap[attrID] = "";
                    attrIDs.push(attrID);
                }
            })
        }
        const result = this.attributeService.findByManyIDs(attrIDs);
        result.map((attribute) => {
            attrIDsMap[attribute.id] = attribute.name;
        });

        users.forEach(user => {
            const attributes: UserAttribute[] = [];
            if (!userAttr[user.id]  || userAttr[user.id].length == 0) {
                return
            }
            userAttr[user.id].forEach(element => {
                attributes.push({
                    name: attrIDsMap[element],
                    attribute_id: element,
                })
            });
            user.attributes = attributes;
        });

        return users;
    }

    queryMedia(users: UserModel[]): UserModel[] {
        const userIDs = users.map(user => user.id);
        const userMedia = this.imageService.findByManyUserIDs(userIDs);
        users.forEach(user => {
            if (!userMedia[user.id] || userMedia[user.id].length == 0) {
                return
            }
            user.media = userMedia[user.id].map(media => {
                return {
                    ...media
                }
            });
        });
        return users;
    }

    query(limit: number, offset: number) {
        const users = this.userRepo.findMany(limit, offset);
        const result: UserModel[] = [];
        result = users.map(user => {
            return {
                ...user,
                id: user.id ? user.id : 0
            }
        })
        this.queryAttribute(result);
        this.queryMedia(result);
        return result;

    }

    queryByID(id: number) {
        const user = this.userRepo.findByID(id);
        if (!user) {
            throw new UserValidationError(["id not existed"])
        }
        const result: UserModel[] = [
            {
                ...user
            }
        ];
        this.queryAttribute(result);
        this.queryMedia(result);
        return result[0];
    }

    createNew(createModel: CreateNewUser) {
        const errors = this.validate(createModel);
        if (errors.length > 0) {
            throw new UserValidationError(errors);
        }
        const insertUser:User =new User();
        insertUser.last_name=createModel.last_name;
        insertUser.first_name=createModel.first_name;
        insertUser.birthday=createModel.birthday;
        insertUser.email=createModel.email;

        const userID = this.userRepo.createNew(insertUser);

        if (createModel.attributes){
            this.createAttribute(createModel.attributes,userID);
        }
        if(createModel.media){
            this.createMedia(createModel.media,userID);
        }
        return this.queryByID(userID);
    }
}

const userRepo = new UserRepository();
const userAttrRepo = new UserAttributeRepository();

export default new UserService(userRepo, userAttrRepo, AttributeService, ImageService);