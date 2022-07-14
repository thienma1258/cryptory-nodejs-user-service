
import { assertEquals } from "https://deno.land/std/testing/asserts.ts"
import UserService from './userService.ts'

import { CreateNewUser } from "./index.ts"

Deno.test('UserService', () => {
    // when
    const result = UserService.query(5, 5);
    // then
    assertEquals(result.length > 0, true)
})

Deno.test("UserService can create new user", () => {
    let createModel: CreateNewUser = {
        first_name: "ngocdong",
        last_name: "pham",
        birthday: 232736400,
        email: "cpud1258@gmail.com",
        attributes: [{
            attribute_id: 1
        }],
        media: [{
            name: "new media",
            created: 232736400,
            height: 12,
            width: 52
        }]

    }
    var result = UserService.createNew(createModel);
    console.log(result);
});