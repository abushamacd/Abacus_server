"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductsService = exports.deleteProductService = exports.updateProductService = exports.getProductService = exports.getProductsService = exports.createProductService = void 0;
const prisma_1 = __importDefault(require("../../../utilities/prisma"));
const http_status_1 = __importDefault(require("http-status"));
const apiError_1 = require("./../../../errorFormating/apiError");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const product_constants_1 = require("./product.constants");
const asyncForEach_1 = require("../../../utilities/asyncForEach");
// import { asyncForEach } from '../../../utilities/asyncForEach'
// create product service
const createProductService = (user, data) => __awaiter(void 0, void 0, void 0, function* () {
    data.updateBy = user === null || user === void 0 ? void 0 : user.name;
    const product = yield prisma_1.default.product.findFirst({
        where: {
            name: data === null || data === void 0 ? void 0 : data.name,
        },
    });
    if (product) {
        throw new apiError_1.ApiError(http_status_1.default.NOT_FOUND, 'Product is already exist');
    }
    const result = yield prisma_1.default.product.create({
        data,
    });
    if (!result) {
        throw new Error('Product create failed');
    }
    return result;
});
exports.createProductService = createProductService;
// get products service
const getProductsService = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = (0, paginationHelper_1.calculatePagination)(options);
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: product_constants_1.productSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                },
            })),
        });
    }
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    equals: filterData[key],
                },
            })),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.product.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : {
                name: 'asc',
            },
        include: product_constants_1.productPopulate,
    });
    if (!result) {
        throw new Error('Product retrived failed');
    }
    const total = yield prisma_1.default.product.count({
        where: whereConditions,
    });
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
});
exports.getProductsService = getProductsService;
// get product service
const getProductService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.product.findUnique({
        where: {
            id,
        },
        include: product_constants_1.productPopulate,
    });
    if (!result) {
        throw new Error('Product retrived failed');
    }
    return result;
});
exports.getProductService = getProductService;
// update product service
const updateProductService = (id, user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    payload.updateBy = user === null || user === void 0 ? void 0 : user.name;
    payload.isSynced = false;
    const isExist = yield prisma_1.default.product.findUnique({
        where: {
            id,
        },
    });
    if (!isExist) {
        throw new apiError_1.ApiError(http_status_1.default.BAD_REQUEST, 'Product not found');
    }
    const result = yield prisma_1.default.product.update({
        where: {
            id,
        },
        data: payload,
    });
    if (!result) {
        throw new Error('Product update failed');
    }
    return result;
});
exports.updateProductService = updateProductService;
// delete product service
const deleteProductService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.product.findUnique({
        where: {
            id,
        },
    });
    if (!isExist) {
        throw new apiError_1.ApiError(http_status_1.default.BAD_REQUEST, 'Product not found');
    }
    const result = yield prisma_1.default.product.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.deleteProductService = deleteProductService;
// delete products service
const deleteProductsService = (ids) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, asyncForEach_1.asyncForEach)(ids, (id) => __awaiter(void 0, void 0, void 0, function* () {
            const isExist = yield transactionClient.product.findUnique({
                where: {
                    id,
                },
            });
            if (!isExist) {
                throw new apiError_1.ApiError(http_status_1.default.BAD_REQUEST, 'Product not found');
            }
            const result = yield transactionClient.product.delete({
                where: {
                    id,
                },
            });
            return result;
        }));
    }));
    return null;
});
exports.deleteProductsService = deleteProductsService;
