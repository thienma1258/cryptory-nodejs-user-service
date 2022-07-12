
import { UserAttributeRepository, UserRepository } from './userRepository.ts';
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

Deno.test('UserAttributeRepository', () => {
    // const sut = new UserRepository();
    const userAttri = new UserAttributeRepository();
    const data = userAttri.findByUserIDs([1, 2]);
    assertEquals(data[1].length > 0, true)
})

Deno.test('UserRepository', () => {
    // const sut = new UserRepository();
    const userAttri = new UserRepository();
    const data = userAttri.findMany(1, 2);
    assertEquals(data.length > 0, true)
    console.log(data);
})