"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDbsyncZod = void 0;
const zod_1 = require("zod");
// Create dbsync zod validation schema
exports.createDbsyncZod = zod_1.z.object({
    body: zod_1.z.object({
        key: zod_1.z.string({
            required_error: 'Key name is required',
        }),
    }),
});
