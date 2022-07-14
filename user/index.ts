
export * from "./userRepository.ts"
export * from "./userService.ts"
export {User,Attribute_User} from "./db.ts"
import {  required, isNumber,isString,validateArray,invalid,isEmail } from "https://deno.land/x/validasaur/mod.ts";

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

export const validateRuleCreateUser = {
    first_name: [required,isString],
    last_name: [required,isString],
    birthday: [required, isNumber,isAtLeast18YearsOld],
    email: [required,isString,isEmail],
    media: validateArray(false,[]),
    attributes:validateArray(false,[]),
}

export const validateMedia = {
    name:[required, isString],
    created:[required, isNumber],
    height:[required, isNumber],
    width: [required, isNumber]
}

export const validateAttribute = {
    attribute_id: [required, isNumber]
}


function isAtLeast18YearsOld(birthday:any){
    if (typeof birthday !== "number") {
        return invalid("birthday is not a number", { birthday });
      }
      var birthdayDate = new Date(birthday * 1000);
      if (birthdayDate.getTime() ==0){
        return invalid("birthday not a valid timestamp", { birthday });
      }
      var diff = Math.floor(new Date().getTime() - birthdayDate.getTime());
      var day = 1000 * 60 * 60 * 24;
  
      var days = Math.floor(diff/day);
      var months = Math.floor(days/31);
      var years = Math.floor(months/12);
      console.log(years);
      if (years<18){
        return invalid("you must at least 18 to allow this action", { birthday });
      }
}



export class UserValidationError extends Error {
    errorMessages: {
        [ruleName: string]: string |any 
    }={};
    constructor(messages: {
        [ruleName: string]: string | any;
    }={}) {
        // 'Error' breaks prototype chain here
        super("validation user error"); 
        this.errorMessages=messages;
      }

      getErrorMessages(){
          return this.errorMessages;
      }

}