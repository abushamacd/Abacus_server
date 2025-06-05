"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePagination = void 0;
const calculatePagination = (options) => {
    const page = Number(options.page || 1);
    // const limit = Number(options.limit || 10)
    // const skip = (page - 1) * limit
    const limit = options.limit !== undefined ? Number(options.limit) : undefined;
    const skip = (page - 1) * (limit || 0);
    const sortBy = options.sortBy || 'createdAt';
    const sortOrder = options.sortOrder || 'desc';
    return {
        page,
        limit,
        skip,
        sortBy,
        sortOrder,
    };
};
exports.calculatePagination = calculatePagination;
