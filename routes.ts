import {_Context, Router, _send} from './deps.ts'
import type {RouterContext, Application} from './deps.ts'
import {log} from './middleware.ts'
// import { } from "https://deno.land/x/validasaur/mod.ts";
import AttributeRoutes from "./attributeRoutes.ts"
import UserRoutes from "./userRoutes.ts"
// deno-lint-ignore no-explicit-any
const router: any = new Router()

  /**
   * @swagger
   * /:
   *   get:
   *     description: Returns the homepage
   *     responses:
   *       200:
   *         description: hello world
   */
router.get('/', ({_params, response}: RouterContext<string>) => {
    log.debug('Serving hello world')
    response.body = 'Hello world!'
})
router.get('/ping', ({_params, response}: RouterContext<string>) => {
    log.debug('Serving hello world')
    response.body = 'pong'
})

router
    .get('/api/v0/attribute',AttributeRoutes.getAll)
    .post('/api/v0/attribute',AttributeRoutes.createAttribute);

    router
    .get('/api/v0/user',UserRoutes.getQuery)
    .post('/api/v0/user',UserRoutes.create);


const init = (app: Application) => {
    app.use(router.routes())

    app.use(router.allowedMethods())
}

export default {
    init,
}
