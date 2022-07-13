import { Singleton } from "https://deno.land/x/deninject/mod.ts";
import { SSQL, SSQLTable } from "../lib/SmallSQLLite.ts";
export class User extends SSQLTable {
    id = 0;
    first_name = "";
    last_name = "";
    birthday = 0;
    email = "";
}
export class Attribute_User extends SSQLTable {
    user_id = 0;
    attribute_id = 0;
}

const orm = new SSQL("data.db", [User, Attribute_User]);
// Open a database

export class UserRepository {
    findMany(limit: number, offset: number) {
        // Update only 2 logs with status 2 in the db
        return orm.findMany(User, { offset: offset, limit: limit });
    }

    findByID(id:number) {
        return orm.findOne(User, id);
    }

    createNew(uesr: User){
        orm.save(user);
    }
}


export class UserAttributeRepository {
    findByUserIDs(userIDs: number[]) {
        const result: Record<number, number[]> = {};
        for (const record of orm.findMany(Attribute_User,
            {
                where: { clause: `user_id in (${"?,".repeat(userIDs.length).slice(0, -1)})`, values: userIDs }
            })) {
            const userID = record.user_id;
            if (!result[userID]) {
                result[userID] = []
            }
            result[userID].push(record.attribute_id as number)
        }
        return result;
    }

    createNewMany(userAttributes: Attribute_User[]) {
        for (let i = 0; i < userAttributes.length; i++) {
            orm.save(userAttributes[i]);
        }

    }
}

