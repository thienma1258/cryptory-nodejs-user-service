import { AttributeRepository,Attribute } from "./attributeRepository.ts";
import {  Singleton } from "https://deno.land/x/deninject/mod.ts";

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
    createNew(attribute:Attribute) {
        return this._repo.createNew(attribute);
    }
}
}

let repo = new AttributeRepository();
export default new AttributeService(repo);