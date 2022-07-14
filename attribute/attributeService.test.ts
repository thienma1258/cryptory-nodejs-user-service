
import AttributeService from "./attributeService.ts";
import {Attribute,orm} from "./db.ts";
import { assertEquals} from "https://deno.land/std/testing/asserts.ts"

Deno.test('AttributeService can find new attribute', () => {
    const attribute = new Attribute();
    attribute.name="test";
    orm.save(attribute);
    // when
    const result = AttributeService.findAll();
    // then
    assertEquals(result.length > 0, true)
})

Deno.test('AttributeService can create new attribute', () => {
    const attribute = new Attribute();
    attribute.name="test";
    orm.save(attribute);
    // when
    const result = AttributeService.createNew(attribute);
    // then
    assertEquals(result.name, attribute.name)
    assertEquals(result.id >0, true)

})