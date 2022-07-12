import {
    getLogger,
    handlers,
    setup,
    Context,
    State,
    Status,
    LogRecord,
} from './deps.ts'

await setup({
    handlers: {
        functionFmt: new handlers.ConsoleHandler('DEBUG', {
            formatter: (logRecord: LogRecord) => {
                const time = new Date().toISOString()
                let msg = `${time} [${logRecord.level}] ${logRecord.msg}`

                logRecord.args.forEach((arg: string, index: number) => {
                    msg += `, arg${index}: ${arg}`
                })
                return msg
            },
        }),
    },

    loggers: {
        default: {
            level: 'DEBUG',
            handlers: ['functionFmt'],
        },
    },
})

export const log = getLogger()

export const errorHandler = async (
    // deno-lint-ignore no-explicit-any
    ctx: Context<State, Record<string, any>>,
    next: () => Promise<unknown>
): Promise<void> => {
    try {
        await next()
    } catch (err) {
        const {message, name, path, type} = err
        const status =
            err.status || err.statusCode || Status.InternalServerError

        ctx.response.status = status
        ctx.response.body = {message, name, path, type, status}
    }
}
