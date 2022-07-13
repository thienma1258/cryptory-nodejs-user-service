
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import  UserService  from './userService.ts';

import {CreateNewUser} from "./index"

Deno.test('UserService', () => {
    // when
    const result = UserService.query(5,5);
    console.log(result);
    // then
    assertEquals(result.length > 0, true)})

Deno.test("UserService can create new user", () => {
    let createModel:CreateNewUser= {

    }
    var result = UserService.createNew(createModel);

});