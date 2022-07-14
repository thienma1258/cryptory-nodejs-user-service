
export * from "./userRepository.ts"
export * from "./userService.ts"
export {User,Attribute_User} from "./db.ts"
import {  required, isNumber,isString } from "https://deno.land/x/validasaur/mod.ts";

export interface UserModel {
    id:number;
    first_name: string;
    last_name: string;
    birthday:number;
    email:string;
    media?:UserMedia[] ;
    attributes?:UserAttribute[] ;
}

export interface UserAttribute {
    name:string;
    attribute_id:number;
}

export interface UserMedia {
    name:string;
    created:number;
    height:number;
    width:number;
}

export type CreateUserMedia  = UserMedia;

export interface CreateUserAttribute {
    attribute_id:number;
}

export interface CreateNewUser{
    first_name: string;
    last_name: string;
    birthday:number,
    email:string,
    media?:CreateUserMedia[],
    attributes?:CreateUserAttribute[],
}

export const validateCreateUser = {
    first_name: [required,isString]
    last_name: [required,isString],
    birthday: [required, isNumber]
}



export class UserValidationError extends Error {
    errorMessages:string[];
    constructor(messages: string []) {
        // 'Error' breaks prototype chain here
        super("validation user error"); 
        this.errorMessages=messages;
      }

      getErrorMessages(){
          return this.errorMessages;
      }

}