import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { errorResponse } from '../utils/api';

export const validateBody = (schema: z.ZodType) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { data, success, error } = schema.safeParse(req.body);

        if (!success) {
            errorResponse({
                res,
                message: 'Failed to validate body',
                status: 400,
                error
            })
            return;
        }

        req.parsedBody = data as any;
        next()
    }
}