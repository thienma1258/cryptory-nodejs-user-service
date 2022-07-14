import { SSQL, SSQLTable } from "../lib/SmallSQLLite.ts";
import {DB} from "../config.ts"

export class Image extends SSQLTable {
    id? = -1;
    name = "";
    created=0;
    height=0;
    width=0;
    user_id=0;
}


export const orm= new SSQL(DB,[Image])