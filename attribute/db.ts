import { SSQL, SSQLTable } from "../lib/SmallSQLLite.ts";
import {DB} from "../config.ts"

export class Attribute extends SSQLTable {
    id = -1;
    name = "";
}

export const orm = new SSQL(DB,[Attribute]);