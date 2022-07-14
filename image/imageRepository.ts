import { Singleton } from "https://deno.land/x/deninject/mod.ts";
import {Image,orm} from "./db.ts"

@Singleton()
export class ImageRepository {
    findByUserIDs(userIDs :number[],sortBy?:string) {
        // Update only 2 logs with status 2 in the db
        return orm.findMany(Image,   {
            where: { clause: `user_id in (${"?,".repeat(userIDs.length).slice(0, -1)})`, values: userIDs },
            order: { by: sortBy ? sortBy : "id", desc: true }
        });
    }

    createNewMany(images:Image[]) {
        for (let i = 0; i < images.length; i++) {
            orm.save(images[i]);
        }
    }
}

