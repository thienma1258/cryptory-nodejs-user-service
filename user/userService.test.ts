
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { UserService } from './userService.ts';

Deno.test('UserService', () => {
    const sut = new UserService();

    // when
    const result = sut.sum([1, 3, 5]);

    // then
    assertEquals(result, 9);
})