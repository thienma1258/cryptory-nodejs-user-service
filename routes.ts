import {_Context, Router, _send} from './deps.ts'
import type {RouterContext, Application} from './deps.ts'
import {log} from './middleware.ts'

// deno-lint-ignore no-explicit-any
const router: any = new Router()

router.get('/', ({_params, response}: RouterContext<string>) => {
    log.debug('Serving hello world')
    response.body = 'Hello world!'
})

const init = (app: Application) => {
    app.use(router.routes())

    app.use(router.allowedMethods())
}

export default {
    init,
}
