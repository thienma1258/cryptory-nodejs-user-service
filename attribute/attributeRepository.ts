import { Singleton } from "https://deno.land/x/deninject/mod.ts";
import { SSQL, SSQLTable } from "../lib/SmallSQLLite.ts";

export class Attribute extends SSQLTable {
    id = 0;
    name = "";
}
const orm= new SSQL("data.db",[Attribute])


@Singleton()
export class AttributeRepository {
    findByIDs(ids: number[], sortBy?: string) {
        // Update only 2 logs with status 2 in the db
        return orm.findMany(Attribute, {
            where: { clause: `id in (${"?,".repeat(ids.length).slice(0, -1)})`, values: ids },
            order: { by: sortBy ? sortBy : "id", desc: true }
        });
    }

    findAll() {
        // Update only 2 logs with status 2 in the db
        return orm.findMany(Attribute, {});
    }
    createNew(attribute:Attribute){
        return orm.save(attribute);
    }
}

