declare module "express-serve-static-core" {
    interface Request {
        requestId: string;
        startAt: number;
        token: string;
    }
    interface Response {
        requestId: string;
        startAt: number;
        sendSuccess: (options: {
            message: string,
            data?: any,
            status: number
        }) => void;
        sendError: (options: {
            status: number,
            message: string,
            errorCode?: string,
            details?: any
        }) => void;
    }
};