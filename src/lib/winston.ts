/**
 * @copyright 2025 vladislavprozorov
 */

/**
 * Node modules
 */
import winston from 'winston';

/**
 * Custom modules
 */

import config from '@/config';

const { combine, timestamp, json, errors, align, prinf, colorize } =
  winston.format;

const transports: winston.transport[] = [];
