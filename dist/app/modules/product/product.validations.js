"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProductZod = void 0;
const zod_1 = require("zod");
// Create product zod validation schema
exports.createProductZod = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Product name is required',
        }),
        slug: zod_1.z.string({
            required_error: 'Product slug is required',
        }),
        supplierId: zod_1.z.string({
            required_error: 'Supplier is required',
        }),
        unitId: zod_1.z.string({
            required_error: 'Unit is required',
        }),
        quantity: zod_1.z
            .number({
            required_error: 'Quantity is required',
        })
            .min(0, 'Quantity must be at least 0'),
        minQuantity: zod_1.z
            .number({
            required_error: 'Minimum quantity is required',
        })
            .min(0, 'Minimum quantity must be at least 0'),
        purchase: zod_1.z
            .number({
            required_error: 'Purchase price is required',
        })
            .min(0, 'Purchase price must be at least 0'),
        sell: zod_1.z
            .number({
            required_error: 'Sell price is required',
        })
            .min(0, 'Sell price must be at least 0'),
        retail: zod_1.z
            .number({
            required_error: 'Retail price is required',
        })
            .min(0, 'Retail price must be at least 0'),
        comment: zod_1.z
            .string()
            .max(500, 'Comment can be a maximum of 500 characters')
            .optional(),
    }),
});
