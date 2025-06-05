"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSupplierZod = void 0;
const zod_1 = require("zod");
// Create supplier zod validation schema
exports.createSupplierZod = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Name is required',
        }),
        address: zod_1.z.string({
            required_error: 'Address is required',
        }),
        ownerName: zod_1.z.string({
            required_error: 'Owner name is required',
        }),
        ownerPhone: zod_1.z.string({
            required_error: 'Owner phone is required',
        }),
        srName: zod_1.z.string({
            required_error: 'SR. name is required',
        }),
        srPhone: zod_1.z.string({
            required_error: 'SR. phone is required',
        }),
        comment: zod_1.z.string().optional(),
    }),
});
