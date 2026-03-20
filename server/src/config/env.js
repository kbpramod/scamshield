import dotenv from 'dotenv';
dotenv.config();

function requiredEnv(variable) {
    if (!process.env[variable]) {
        throw new Error(`Environment variable ${variable} is required but not set.`);
    }
    return process.env[variable];
}

function optionalEnv(variable, defaultValue) {
    return process.env[variable] || defaultValue;
}

const ENV = {
    PORT: optionalEnv('PORT', 5000),
    CORS_ORIGIN: optionalEnv('CORS_ORIGIN', '*'),
};

export default ENV;