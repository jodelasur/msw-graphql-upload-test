import { setupWorker } from 'msw';
import { handlers } from './serverHandlers';

// Configure mocking routes
const worker = setupWorker(...handlers);

worker.start();
