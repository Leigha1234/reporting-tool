import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
    clientId: process.env.DYNAMICS_CLIENT_ID || '',
    clientSecret: process.env.DYNAMICS_CLIENT_SECRET || '',
    tenantId: process.env.DYNAMICS_TENANT_ID || '',
    instanceUrl: process.env.DYNAMICS_INSTANCE_URL || '',
};

// Simple check to ensure we have the minimum requirements
if (!config.clientId || !config.clientSecret) {
    throw new Error("Missing required environment variables in .env");
}