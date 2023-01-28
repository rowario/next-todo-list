declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DATABASE_URL: string;
            DISCORD_CLIENT_ID: string;
            DISCORD_CLIENT_SECRET: string;
        }
    }
}

export {};
