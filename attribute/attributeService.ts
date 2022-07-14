import { AttributeRepository } from "./attributeRepository.ts"
import {  Singleton } from "https://deno.land/x/deninject/mod.ts"
import {Attribute,validateAttribute} from "./index.ts"
import {  validate} from "https://deno.land/x/validasaur/mod.ts"
import {ValidationError} from "../errors.ts"
@Singleton()
export class AttributeService {
    constructor(readonly _repo: AttributeRepository){

    }
    findByManyIDs(ids: number[]) {
        return this._repo.findByIDs(ids);
    }
    
    findAll() {
        return this._repo.findAll();
    }

    async createNew(attribute:Attribute) {
        const [passes,errors]= await validate(attribute,validateAttribute);
        if (!passes){
            throw new ValidationError(errors);
        }
        this._repo.createNew(attribute);
        return attribute;
    }
}


const repo = new AttributeRepository();
export default new AttributeService(repo);