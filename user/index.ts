export interface User {
    id:number;
    first_name: string;
    last_name: string;
    media?:UserMedia[] ,
    attributes?:UserAttribute[] ,
}

export interface CreateNewUser {
    id:number;
    first_name: string;
    last_name: string;
    media?:UserMedia[] ,
    attributes?:UserAttribute[] ,
}

export interface UserMedia {
    name:string;
    created:string;
    height:string;
    width:string;
}

export interface CreateUserMedia  extends UserMedia{
}
export interface CreateUserAttribute {
    attribute_id:number;
}

export interface CreateNewUser{
    first_name: string;
    last_name: string;
    media?:CreateUserMedia[] ,
    attributes?:CreateUserAttribute[] ,
}

export * from "./userRepository.ts";
export * from "./userService.ts";

export class UserValidationError extends Error {
    constructor(messages?: string []) {
        // 'Error' breaks prototype chain here
        super(message); 
      }

}