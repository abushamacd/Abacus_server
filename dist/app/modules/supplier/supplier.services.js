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
exports.deleteSupplierService = exports.updateSupplierService = exports.getSupplierService = exports.getSuppliersService = exports.createSupplierService = void 0;
const prisma_1 = __importDefault(require("../../../utilities/prisma"));
const http_status_1 = __importDefault(require("http-status"));
const apiError_1 = require("./../../../errorFormating/apiError");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const supplier_constants_1 = require("./supplier.constants");
// create supplier service
const createSupplierService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const supplier = yield prisma_1.default.supplier.findFirst({
        where: {
            name: data === null || data === void 0 ? void 0 : data.name,
        },
    });
    if (supplier) {
        throw new apiError_1.ApiError(http_status_1.default.NOT_FOUND, 'Supplier is already exist');
    }
    const result = yield prisma_1.default.supplier.create({
        data,
    });
    if (!result) {
        throw new Error('Supplier create failed');
    }
    return result;
});
exports.createSupplierService = createSupplierService;
// get suppliers service
const getSuppliersService = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = (0, paginationHelper_1.calculatePagination)(options);
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: supplier_constants_1.supplierSearchableFields.map(field => ({
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
    const result = yield prisma_1.default.supplier.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : {
                name: 'asc',
            },
    });
    if (!result) {
        throw new Error('Supplier retrived failed');
    }
    const total = yield prisma_1.default.supplier.count({
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
exports.getSuppliersService = getSuppliersService;
// get supplier service
const getSupplierService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.supplier.findUnique({
        where: {
            id,
        },
        include: {
            products: {
                orderBy: {
                    name: 'asc',
                },
                include: {
                    unit: true,
                },
            },
        },
    });
    if (!result) {
        throw new Error('Supplier retrived failed');
    }
    return result;
});
exports.getSupplierService = getSupplierService;
// update supplier service
const updateSupplierService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.supplier.findUnique({
        where: {
            id,
        },
    });
    payload.isSynced = false;
    if (!isExist) {
        throw new apiError_1.ApiError(http_status_1.default.BAD_REQUEST, 'Supplier not found');
    }
    const result = yield prisma_1.default.supplier.update({
        where: {
            id,
        },
        data: payload,
    });
    if (!result) {
        throw new Error('Supplier update failed');
    }
    return result;
});
exports.updateSupplierService = updateSupplierService;
// delete supplier service
const deleteSupplierService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const isExist = yield prisma_1.default.supplier.findUnique({
        where: {
            id,
        },
        include: {
            products: true,
        },
    });
    if (!isExist) {
        throw new apiError_1.ApiError(http_status_1.default.BAD_REQUEST, 'Supplier not found');
    }
    if (((_a = isExist === null || isExist === void 0 ? void 0 : isExist.products) === null || _a === void 0 ? void 0 : _a.length) > 0) {
        throw new apiError_1.ApiError(http_status_1.default.BAD_REQUEST, 'Supplier has link with products');
    }
    const result = yield prisma_1.default.supplier.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.deleteSupplierService = deleteSupplierService;
