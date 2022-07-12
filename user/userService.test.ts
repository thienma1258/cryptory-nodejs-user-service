
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { MathService } from './mathService.ts';

Deno.test('UserService', () => {
    // given
    const sut = new MathService();

    // when
    const result = sut.sum([1, 3, 5]);

    // then
    assertEquals(result, 9);
})