import { Application, oakCors } from './deps.ts'
import { errorHandler, log } from './middleware.ts'
import router from './routes.ts'
import {PORT,URL,CLIENT_URL} from "./config.ts"
// import swaggerSpec from "./swagger.ts"

const config: {
    port: number
    url: string
    clientUrl: string
} = {
    port:PORT ,
    url: URL,
    clientUrl:CLIENT_URL,
}

export class Server {

    private app: Application;
    constructor(
        private readonly classB: ClassB,
    ) { }

    init() {
        this.app = new Application()

        const corsOptions = {
            origin: config.clientUrl,
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            preflightContinue: false,
            optionsSuccessStatus: 200,
            credentials: true,
        }
        this.app.use(oakCors(corsOptions))
        this.app.use(errorHandler)
        router.init(this.app)
    }

    initSwagger() {
        this.app.use(async (context, next) => {
            if (context.request.url.pathname === '/swagger.json') {
                context.response.headers.set('Content-Type', 'application/json');
                context.response.status = 200;
                context.response.body = "swaggerFile"
            } else {
                await next();
            }
        });
    }

    async start() {
        this.app.addEventListener('listen', () => {
            log.info(`!Server listening at ${config.url}`)
        })

        await this.app.listen({ port: config.port })
    }
}


const server = new Server();
server.init();
await server.start();