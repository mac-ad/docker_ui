import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { errorResponse } from '../utils/api';

export const validateQuery = (schema: z.ZodType) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { data, success, error } = schema.safeParse(req.query);

        if (!success) {
            errorResponse({
                res,
                message: 'Failed to validate query',
                status: 400,
                error
            })
            return;
        }

        req.parsedQuery = data as any;
        next()
    }
}
