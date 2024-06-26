import { Request, Response, Router } from "express";
const router = Router();

router
    .all('/', (req: Request, res: Response) => {
        res.sendSuccess({
            status: 200,
            message: 'Welcome to the API',
            data: {
                version: 'v1'
            }
        })
    });

// Importing the auth router
import exampleRouter from './example';

router
    .use('/example', exampleRouter);
    
export default router;