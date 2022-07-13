import { ImageRepository,Image } from "./ImageRepository.ts";
import { Singleton } from "https://deno.land/x/deninject/mod.ts";

@Singleton()
class ImageService {
    constructor(readonly _repo: ImageRepository) {

    }
    findByManyUserIDs(userIDs: number[]) {
        const result: Record<number, Image[]> = {};

        let images = this._repo.findByUserIDs(userIDs);
        for (const record of images) {
            const userID = record.user_id;
            if (!result[userID]) {
                result[userID] = []
            }
            result[userID].push(record)
        }
        return result;
    }
}

let repo = new ImageRepository();
export default new ImageService(repo);