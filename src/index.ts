import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import { ErrorHandling } from './utils/ErrorHandling';
import { logMiddleware } from './utils/Middleware';
import { formatTime } from './utils/time';
import { sendErrorResponse, sendSuccessResponse } from './utils/Responses';

const app = express();

// Setup res.success and res.error
app.use((req: Request, res: Response, next: NextFunction) => {
  res.sendSuccess = (options: any) => sendSuccessResponse(res, options);
  res.sendError = (options: any) =>  sendErrorResponse(options);
  next();
});

// Middleware to assign a unique ID to each request and log it
app.use(logMiddleware);

// Middleware
app.use(logger('dev')); // Logging requests
app.use(bodyParser.json()); // Parsing application/json
app.use(bodyParser.urlencoded({ extended: false })); // Parsing application/x-www-form-urlencoded
app.use(cookieParser()); // Parsing cookies
app.use(helmet()); // Security headers
app.use(compression()); // Compression of responses
app.use(cors()); // Enable Cross-Origin Resource Sharing

// Routes
import apiRoute from './router/v1/index';
app.use('/api/v1', apiRoute);

// Error handling middleware
app.use((err: ErrorHandling, req: Request, res: Response, next: NextFunction) => {
  return res
    .status(err.status || 500)
    .json({
      statusCode: err.status || 500,
      message: err.message || 'Internal Server Error',
      errorCode: err.errorCode || "INTERNAL_SERVER_ERROR",
      details: {
        processingTime: formatTime(Date.now() - req.startAt),
        ...(err.details || {})
      },
      timestamp: new Date().toISOString(),
      requestId: req.requestId
    });

});

// Start the server
const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3333;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on('uncaughtException', () => {
  console.log('Uncaught exception');
});

process.on('unhandledRejection', () => {
  console.log('Unhandled rejection');
});