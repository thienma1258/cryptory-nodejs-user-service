
import { assertEquals ,assertExists} from "https://deno.land/std/testing/asserts.ts"
import UserService from './userService.ts'
import {orm} from "./db.ts"
import { CreateNewUser ,User} from "./index.ts"

Deno.test('UserService can query user', () => {
    const user :User =new User();
    user.first_name="test";
    user.last_name="pham";
    user.birthday=232736400;
    orm.save(user);
    // when
    const result = UserService.query(5, 0);
    // then
    assertEquals(result.length > 0, true)
})

Deno.test('UserService can query by id', () => {
    const user :User =new User();
    user.first_name="test";
    user.last_name="pham";
    user.birthday=232736400;
    orm.save(user);
    // when
    const result = UserService.queryByID(user.id);
    // then
    assertEquals(result.first_name, user.first_name);
    assertEquals(result.last_name, user.last_name);

})

Deno.test("UserService can create new user", () => {
    const createModel: CreateNewUser = {
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
    const result = UserService.createNew(createModel);
    assertEquals(result.id > 0, true)
    assertEquals(result.first_name , createModel.first_name)
    assertEquals(result.email , createModel.email)
    assertExists(result.attributes)
    assertEquals(result.attributes[0].attribute_id , createModel.attributes?createModel.attributes[0].attribute_id:0)
    assertExists(result.media)

});

Deno.test("UserService can unexisted attribute id", () => {
    const createModel: CreateNewUser = {
        first_name: "ngocdong",
        last_name: "pham",
        birthday: 232736400,
        email: "cpud1258@gmail.com",
        attributes: [{
            attribute_id: 50
        }],
        media: [{
            name: "new media",
            created: 232736400,
            height: 12,
            width: 52
        }]

    }
    const result = UserService.createNew(createModel);
    assertEquals(result.id > 0, true)
    assertEquals(result.first_name , createModel.first_name)
    assertEquals(result.email , createModel.email)
    assertExists(result.attributes)
    assertEquals(result.attributes[0].attribute_id , createModel.attributes?createModel.attributes[0].attribute_id:0)
    assertExists(result.media);

});