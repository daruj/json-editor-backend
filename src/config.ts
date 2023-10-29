import * as dotenv from 'dotenv'

dotenv.config() // Load environment variables from .env

export const config = {
    port: process.env.PORT || 5001,
    wsEvents: {
        JSON_UPDATED: 'JSON_UPDATED',
    },
}
