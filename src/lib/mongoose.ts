/**
 * Node modules
 */
import mongoose from 'mongoose';
/**
 * Custom modules
 */
import config from '@/config';
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
