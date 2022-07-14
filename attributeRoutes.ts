import AttributeService from "./attribute/attributeService.ts"
import { Attribute } from "./attribute/index.ts"
import { ValidationError } from "./errors.ts"

export default {
    /**
     * @description Get all todos
     * @route GET /todos
     */
    getAll: ({ response }: { response: any }) => {
        response.status = 200;
        response.body = {
            success: true,
            data: AttributeService.findAll(),
        };
    },
    createAttribute: async (
        { request, response }: { request: any; response: any },
    ) => {
        const body = await request.body();
        if (!request.hasBody) {
            response.status = 400;
            response.body = {
                success: false,
                message: "No data provided",
            };
            return;
        }
        try {
            const value = await body.value;
            const newAttribute = new Attribute();
            newAttribute.name=value.name;
            await AttributeService.createNew(newAttribute);
            response.body = {
                success: true,
                data: newAttribute,
            };
        } catch (e) {
            console.log(e);
            if (e instanceof  ValidationError )
            response.body = {
                success: false,
                errors: e.getErrorMessages(),
            };
            return
        }

    },
}