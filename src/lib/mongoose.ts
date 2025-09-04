/**
 * Node modules
 */
import mongoose from 'mongoose';
/**
 * Custom modules
 */
import config from '@/config';
import { logger } from '@/lib/winston';
/**
 * Types
 */
import type { ConnectOptions } from 'mongoose';
/**
 * Client option
 */
const clientOptions: ConnectOptions = {
  dbName: 'blog-db',
  appName: 'Blog Api',
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true,
  },
};
export const connectToDatase = async (): Promise<void> => {
  if (!config.MONGO_URI) {
    throw new Error('MongoDB URI is not defined in the configuration');
  }
  try {
    await mongoose.connect(config.MONGO_URI, clientOptions);
    logger.info('Connect to the database succesfully!', {
      uri: config.MONGO_URI,
      options: clientOptions,
    });
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    }
    logger.error('Error connecting to the database', err);
  }
};
export const disconnectFromDatabase = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    logger.info('Disconnected from database succesfully', {
      uri: config.MONGO_URI,
      options: clientOptions,
    });
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    logger.error('Error disconnecting from database', err);
  }
};
