import { ImageRepository } from "./imageRepository.ts";
import { Singleton } from "https://deno.land/x/deninject/mod.ts";
import {Image} from "./db.ts";
@Singleton()
class ImageService {
    constructor(readonly _repo: ImageRepository) {

    }
    findByManyUserIDs(userIDs: number[]) {
        const result: Record<number, Image[]> = {};

        //sort by created
        const images = this._repo.findByUserIDs(userIDs,"created");
        for (const record of images) {
            const userID = record.user_id;
            if (!result[userID]) {
                result[userID] = []
            }
            result[userID].push(record)
        }
        return result;
    }

    createNewMany(images:Image[]){
        return this._repo.createNewMany(images)
    }
}

const repo = new ImageRepository();
export default new ImageService(repo);