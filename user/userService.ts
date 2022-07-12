import { UserRepository } from "./userRepository.ts";
import {  Singleton } from "https://deno.land/x/deninject/mod.ts";

@Singleton()
export class UserService {
    constructor(userRepo: UserRepository){

    }
    sum(numbers: number[]) {
        return numbers.reduce((value, number) => Number.isInteger(number) ? value + number : value, 0)
    }
}