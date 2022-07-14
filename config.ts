import { configSync } from './deps.ts'

configSync({
    path: '.env',
    export: true,
})
export const ENV = Deno.env.get('ENV') || "test"
export const DB = Deno.env.get('DB') || "default.db";
export const PORT = Number(Deno.env.get('PORT') as unknown as number);
export const URL = `${Deno.env.get('PROTOCOL') as unknown as string}://${Deno.env.get('HOST') as unknown as string
}:${Deno.env.get('PORT') as unknown as number}`;
export const CLIENT_URL = `${Deno.env.get('CLIENT_PROTOCOL') as unknown as string}://${Deno.env.get('CLIENT_HOST') as unknown as string
}:${Deno.env.get('CLIENT_PORT') as unknown as number}`