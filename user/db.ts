import { SSQL, SSQLTable } from "../lib/SmallSQLLite.ts";
import {DB} from "../config.ts"
export class User extends SSQLTable {
    id = -1;
    first_name = "";
    last_name = "";
    birthday = 0;
    email = "";
}
export class Attribute_User extends SSQLTable {
    user_id = 0;
    attribute_id = 0;
}
export const orm=  new SSQL(DB,[User,Attribute_User])