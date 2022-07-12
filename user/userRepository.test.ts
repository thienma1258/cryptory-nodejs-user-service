
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { UserRepository } from './userRepository.ts';

Deno.test('userRepository', () => {
    const sut = new UserRepository();

    sut.findMany(5,2);

})