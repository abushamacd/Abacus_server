"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUnitZod = void 0;
const zod_1 = require("zod");
// Create unit zod validation schema
exports.createUnitZod = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Unit name is required',
        }),
    }),
});
