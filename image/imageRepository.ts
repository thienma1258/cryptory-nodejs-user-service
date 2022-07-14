import { Singleton } from "https://deno.land/x/deninject/mod.ts";
import { SSQL, SSQLTable } from "../lib/SmallSQLLite.ts";

export class Image extends SSQLTable {
    id? = 0;
    name = "";
    created=0;
    height=0;
    width=0;
    user_id=0;
}


const orm= new SSQL("data.db",[Image])

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
        orm.save(images[0]);
        console.log(images);
        // for (let i = 0; i < images.length; i++) {
        //     console.log("save image");
        //     orm.save(images[i]);
        // }
    }
}

