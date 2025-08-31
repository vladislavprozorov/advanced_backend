import dotenv from 'dotenv';
dotenv.config();

const config = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  WHITELIST_ORIGINS: ['0.0.0.0/0', '66.23.207.66'],
  MONGO_URI: process.env.MONGO_URI,
};
export default config;
