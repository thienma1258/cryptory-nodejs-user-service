export interface User {
    id:number;
    first_name: string;
    last_name: string;
    media?:UserMedia[] ,
    attributes?:UserAttribute[] ,
}

export interface UserMedia {
    name:string
}

export interface UserAttribute {
    name:string
}

export * from "./userRepository.ts";
export * from "./userService.ts";
