import * as smallsqliteorm from "https://raw.githubusercontent.com/cybertim/SmallSQLiteORM/main/mod.ts";
import {  Singleton } from "https://deno.land/x/deninject/mod.ts"; 

export class User extends smallsqliteorm.SSQLTable {
    id = 0;
    first_name = "";
    last_name = false;
    birthday = 0;
    email = "";
}

const orm = new smallsqliteorm.SSQL("data.db", [User]);

@Singleton()
export class UserRepository {
    findMany(limit: number,offset: number) {
        // Update only 2 logs with status 2 in the db
        for (const user of orm.findMany(User, { limit: limit,offset:offset })) {
            console.log(user);
        }
    }
}


export class UserAttributeRepository {
}


export class UserImageRepository {

}
