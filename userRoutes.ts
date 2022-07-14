import UserService from "./user/userService.ts"
import {ValidationError} from "./errors.ts"
const DEFAULT_QUERY_OFFSET=0;
const DEFAULT_QUERY_LIMIT= 50;

export default {
    /**
     * @description Get all todos
     * @route GET /todos
     */
    getQuery:  (
        { request, response }: { request: any; response: any },
    ) => {
        const offsetRaw=request.url.searchParams.get('offset');
        const limitRaw=request.url.searchParams.get('limit');
        let offset = DEFAULT_QUERY_OFFSET;
        let limit= DEFAULT_QUERY_LIMIT;
        if(!isNaN(offsetRaw)){
            offset=Number(offsetRaw);
        }
        if(!isNaN(limitRaw)){
            limit=Number(limitRaw);
        }
        const count = UserService.count();
        const queryData = UserService.query(limit,offset);
        response.body = {
            success: true,
            data: queryData,
            pagination:{
                total_user:count,
                total_pages:Math.ceil(count/limit),
                offset:offset,
                limit:limit,
            }
        };

    },
    create: async (
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

            const newUserCreated=await UserService.createNew(value);
            response.body = {
                success: true,
                data: newUserCreated,
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