import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from './logger';
dotenv.config();

const { DB_CONNECTION } = process.env;

export async function connectToDatabase() {
  try {
    await mongoose.connect(`${DB_CONNECTION}`);
    logger.info('Connect to database');
  } catch (error) {
    logger.error(error, 'Failed to connect to database');
    process.exit(1);
  }
}

export async function disconnectFromDatabase() {
  await mongoose.connection.close();
  logger.info('Disconnect from database');
  return;
}
