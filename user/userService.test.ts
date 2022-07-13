
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import  UserService  from './userService.ts';

Deno.test('UserService', () => {
    console.log(UserService);
    // when
    const result = UserService.query(5,5);

    // then
})