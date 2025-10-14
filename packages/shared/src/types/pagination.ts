import { z } from 'zod'
import { SORT } from '../constant/common';

export const paginationSchema = (maxLimit = 1000) =>
    z.object({
        page: z
            .string()
            .optional()
            .transform((val) => (val ? Math.max(1, parseInt(val)) : 1)),
        limit: z
            .string()
            .optional()
            .transform((val) =>
                val ? Math.min(maxLimit, Math.max(1, parseInt(val))) : maxLimit,
            ),
        search: z
            .string()
            .trim()
            .optional()
            .transform((val) => (val ? val.trim() : '')),
        sort: z
            .enum(SORT)
            .optional()
    });
