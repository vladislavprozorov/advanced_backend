/**
 * Node modules
 */
import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import helmet from 'helmet';
const morgan = require('morgan');

/**
 * Custom modules
 */
import config from '@/config';
import limiter from '@/lib/express_rate_limit';
const sequelize = require('./config/database');
/**
 * Router
 */
import v1Routes from '@/routes/v1';
/**
 * Types
 */
import type { CorsOptions } from 'cors';

/**
 * Express app initial
 */
dotenv.config();
const app = express();
// Configure cors options
const corsOptions: CorsOptions = {
  origin(origin, callback) {
    if (
      config.NODE_ENV === 'development' ||
      !origin ||
      config.WHITELIST_ORIGINS.includes(origin)
    ) {
      callback(null, true);
    } else {
      callback(new Error(`CORS Error ${origin} is not allowed by CORS`), false);
      console.log(`CORS Error ${origin} is not allowed by CORS`);
    }
  },
};

// Apply cors middleware
app.use(cors(corsOptions));
// Enable JSON request body parsing
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(compression({ threshold: 1024 }));

app.use(helmet());

app.use(limiter);

app.use(morgan('dev'));

const handleServerShutdown = async () => {
  try {
    console.log('Server shutdown');
    process.exit(0);
  } catch (err) {
    console.log('Error during server shutdown', err);
  }
};
process.on('SIGINT', handleServerShutdown);
process.on('SIGTERM', handleServerShutdown);

console.log('ok');

(async () => {
  try {
    app.use('/api/v1', v1Routes);
    await sequelize.authenticate(); // Подключение к БД
    await sequelize.sync();
    app.listen(config.PORT, () =>
      console.log(`Server start at port ${config.PORT}`),
    );
  } catch (error) {
    console.error(`Ошибка при подключении базы данных!`, error);
    if (config.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
})();
