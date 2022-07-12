import {Application, oakCors, configSync} from './deps.ts'
import {errorHandler, log} from './middleware.ts'
import router from './routes.ts'

configSync({
    path: '.env',
    export: true,
})

const config: {
    port: number
    url: string
    clientUrl: string
} = {
    port: Number(Deno.env.get('PORT') as unknown as number),
    url: `${Deno.env.get('PROTOCOL') as unknown as string}://${
        Deno.env.get('HOST') as unknown as string
    }:${Deno.env.get('PORT') as unknown as number}`,
    clientUrl: `${Deno.env.get('CLIENT_PROTOCOL') as unknown as string}://${
        Deno.env.get('CLIENT_HOST') as unknown as string
    }:${Deno.env.get('CLIENT_PORT') as unknown as number}`,
}

const app: Application = new Application()

const corsOptions = {
    origin: config.clientUrl,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 200,
    credentials: true,
}

app.use(oakCors(corsOptions))
app.use(errorHandler)

router.init(app)

app.addEventListener('listen', () => {
    log.info(`!Server listening at ${config.url}`)
})

await app.listen({port: config.port})
