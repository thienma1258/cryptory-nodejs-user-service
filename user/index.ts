
export * from "./userRepository.ts"
export * from "./userService.ts"

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
}

export interface UserMedia {
    name:string;
    created:number;
    height:number;
    width:number;
}

export interface CreateUserMedia  extends UserMedia{
}
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