import { Response, Request, NextFunction } from "express";

export default class ExampleController {
    static async getExample(req: Request, res: Response, next: NextFunction) {
        try {
            res.sendSuccess({
                status: 200,
                message: 'Welcome to example API',
                data: {
                    version: 'v1'
                }
            });
        } catch (error) {
            next(error);
        }
    }
};