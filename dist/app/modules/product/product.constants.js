"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productPopulate = exports.productSearchableFields = exports.productFilterableFields = void 0;
exports.productFilterableFields = ['searchTerm'];
exports.productSearchableFields = ['slug', 'name'];
exports.productPopulate = {
    unit: true,
    supplier: true,
};
