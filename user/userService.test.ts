
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { UserService } from './userService.ts';
import Injector from "../appModule.ts"

Deno.test('UserService', () => {
    const userService = Injector.get(UserService)

    // when
    const result = userService.sum([1, 3, 5]);

    // then
    assertEquals(result, 9);
})