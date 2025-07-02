"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInvoiceZod = void 0;
const zod_1 = require("zod");
// create invoice zod validation schema
exports.createInvoiceZod = zod_1.z.object({
    body: zod_1.z.object({
        customerName: zod_1.z.string({
            required_error: 'Customer name is required',
        }),
        date: zod_1.z.string({
            required_error: 'Date is required',
        }),
        due: zod_1.z.number().nonnegative({
            message: 'Due is required and should be a non-negative integer',
        }),
        total: zod_1.z.number().nonnegative({
            message: 'Total is required and should be a non-negative integer',
        }),
        profit: zod_1.z.number().nonnegative({
            message: 'Profit is required and should be a non-negative integer',
        }),
        note: zod_1.z.string().max(500).optional(),
        products: zod_1.z.any({
            required_error: 'Products are required',
        }),
        customerId: zod_1.z.string({
            required_error: 'Customer ID is required',
        }),
    }),
});
