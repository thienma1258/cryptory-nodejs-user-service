export * from "./attributeRepository.ts"
export * from "./attributeService.ts"
export * from "./db.ts"
import {  required,isString} from "https://deno.land/x/validasaur/mod.ts"

export const validateAttribute = {
    name: [required, isString]
}
