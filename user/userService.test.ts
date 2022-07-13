
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import  UserService  from './userService.ts';

Deno.test('UserService', () => {
    // when
    const result = UserService.query(5,5);
    console.log(result);
    // then
    assertEquals(result.length > 0, true)})