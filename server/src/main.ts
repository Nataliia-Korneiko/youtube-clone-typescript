import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import { CORS_ORIGIN } from './constants';
import { connectToDatabase, disconnectFromDatabase } from './utils/database';
import logger from './utils/logger';
import userRoute from './modules/user/user.route';
import authRoute from './modules/auth/auth.route';
import videoRoute from './modules/video/video.route';
import deserializeUser from './middleware/deserializeUser';
dotenv.config();

const PORT = process.env.PORT || 4000;
const signals = ['SIGTERM', 'SIGINT'];
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  })
);
app.use(helmet());
app.use(deserializeUser);

app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/videos', videoRoute);

const server = app.listen(PORT, async () => {
  await connectToDatabase();
  logger.info(`Server listening at http://localhost:${PORT}`);
});

function gracefulShutdown(signal: string) {
  process.on(signal, async () => {
    logger.info('Goodbye, got signal', signal);
    server.close();

    // disconnect from the db
    await disconnectFromDatabase();
    logger.info('Server disconnected');
    process.exit(0);
  });
}

for (let i = 0; i < signals.length; i++) {
  gracefulShutdown(signals[i]);
}
