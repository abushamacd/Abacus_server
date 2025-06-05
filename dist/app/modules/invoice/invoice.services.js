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
exports.deleteInvoicesService = exports.deleteInvoiceService = exports.updateInvoiceService = exports.getInvoiceService = exports.getInvoicesService = exports.createInvoiceService = void 0;
const prisma_1 = __importDefault(require("../../../utilities/prisma"));
const http_status_1 = __importDefault(require("http-status"));
const apiError_1 = require("./../../../errorFormating/apiError");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const invoice_constants_1 = require("./invoice.constants");
const asyncForEach_1 = require("../../../utilities/asyncForEach");
// create invoice service
const createInvoiceService = (user, data) => __awaiter(void 0, void 0, void 0, function* () {
    data.updateBy = user === null || user === void 0 ? void 0 : user.name;
    data.isSynced = false;
    const lastInvoice = yield prisma_1.default.invoice.findFirst({
        orderBy: {
            invoiceNumber: 'desc',
        },
    });
    if (lastInvoice)
        data.invoiceNumber = lastInvoice.invoiceNumber + 1;
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, asyncForEach_1.asyncForEach)(data === null || data === void 0 ? void 0 : data.products, (product) => __awaiter(void 0, void 0, void 0, function* () {
            const findProduct = yield transactionClient.product.findUnique({
                where: {
                    name: product.product,
                },
            });
            if (findProduct)
                yield transactionClient.product.update({
                    where: {
                        name: product.product,
                    },
                    data: {
                        quantity: +findProduct.quantity - product.quantity,
                        isSynced: false,
                    },
                });
        }));
        data.products = JSON.stringify(data.products);
        const result = yield prisma_1.default.invoice.create({
            data,
        });
        if ((data === null || data === void 0 ? void 0 : data.due) > 0) {
            yield transactionClient.user.update({
                where: { id: data.customerId },
                data: { due: { increment: data.due }, isSynced: false },
            });
        }
        return result;
    }));
    if (!result) {
        throw new Error('Invoice create failed');
    }
    return result;
});
exports.createInvoiceService = createInvoiceService;
// get invoices service
const getInvoicesService = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = (0, paginationHelper_1.calculatePagination)(options);
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: invoice_constants_1.invoiceSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    // mode: 'insensitive',
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
    const result = yield prisma_1.default.invoice.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : {
                invoiceNumber: 'desc',
            },
    });
    if (!result) {
        throw new Error('Invoice retrived failed');
    }
    const total = yield prisma_1.default.invoice.count({
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
exports.getInvoicesService = getInvoicesService;
// get invoice service
const getInvoiceService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.invoice.findUnique({
        where: {
            id,
        },
    });
    if (!result) {
        throw new Error('Invoice retrived failed');
    }
    return result;
});
exports.getInvoiceService = getInvoiceService;
// update invoice service
const updateInvoiceService = (id, user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    payload.updateBy = user === null || user === void 0 ? void 0 : user.name;
    payload.isSynced = false;
    const isExist = yield prisma_1.default.invoice.findUnique({
        where: {
            id,
        },
    });
    if (!isExist) {
        throw new apiError_1.ApiError(http_status_1.default.BAD_REQUEST, 'Invoice not found');
    }
    if ((isExist === null || isExist === void 0 ? void 0 : isExist.customerId) === (payload === null || payload === void 0 ? void 0 : payload.customerId)) {
        const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            yield (0, asyncForEach_1.asyncForEach)(payload === null || payload === void 0 ? void 0 : payload.removed, (product) => __awaiter(void 0, void 0, void 0, function* () {
                const findProduct = yield transactionClient.product.findUnique({
                    where: {
                        name: product.product,
                    },
                });
                if (findProduct)
                    yield transactionClient.product.update({
                        where: {
                            name: product.product,
                        },
                        data: {
                            quantity: +(findProduct.quantity + product.quantity),
                            isSynced: false,
                        },
                    });
            }));
            const { removed } = payload, data = __rest(payload, ["removed"]);
            yield transactionClient.user.update({
                where: { id: data.customerId },
                data: {
                    due: { decrement: +(isExist.due - data.due) },
                    isSynced: false,
                },
            });
            if (((_a = data === null || data === void 0 ? void 0 : data.products) === null || _a === void 0 ? void 0 : _a.length) <= 0) {
                const result = yield prisma_1.default.invoice.delete({
                    where: {
                        id,
                    },
                });
                return result;
            }
            else {
                data.products = JSON.stringify(data.products);
                const result = yield transactionClient.invoice.update({
                    where: {
                        id,
                    },
                    data: data,
                });
                return result;
            }
        }));
        if (!result) {
            throw new Error('Invoice update failed');
        }
        return result;
    }
    else {
        const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            yield transactionClient.user.update({
                where: { id: isExist.customerId },
                data: { due: { decrement: isExist.due }, isSynced: false },
            });
            yield transactionClient.user.update({
                where: { id: payload.customerId },
                data: { due: { increment: payload.due }, isSynced: false },
            });
            yield (0, asyncForEach_1.asyncForEach)(payload === null || payload === void 0 ? void 0 : payload.removed, (product) => __awaiter(void 0, void 0, void 0, function* () {
                const findProduct = yield transactionClient.product.findUnique({
                    where: {
                        name: product.product,
                    },
                });
                if (findProduct)
                    yield transactionClient.product.update({
                        where: {
                            name: product.product,
                        },
                        data: {
                            quantity: +(findProduct.quantity + product.quantity),
                            isSynced: false,
                        },
                    });
            }));
            const { removed } = payload, data = __rest(payload
            // await transactionClient.user.update({
            //   where: { id: data.customerId },
            //   data: { due: { decrement: +(isExist.due - data.due) } },
            // })
            , ["removed"]);
            // await transactionClient.user.update({
            //   where: { id: data.customerId },
            //   data: { due: { decrement: +(isExist.due - data.due) } },
            // })
            if (((_a = data === null || data === void 0 ? void 0 : data.products) === null || _a === void 0 ? void 0 : _a.length) <= 0) {
                const result = yield prisma_1.default.invoice.delete({
                    where: {
                        id,
                    },
                });
                return result;
            }
            else {
                data.products = JSON.stringify(data.products);
                const result = yield transactionClient.invoice.update({
                    where: {
                        id,
                    },
                    data: data,
                });
                return result;
            }
        }));
        if (!result) {
            throw new Error('Invoice update failed');
        }
        return result;
    }
    // return null
});
exports.updateInvoiceService = updateInvoiceService;
// delete invoice service
const deleteInvoiceService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.invoice.findUnique({
        where: {
            id,
        },
    });
    if (!isExist) {
        throw new apiError_1.ApiError(http_status_1.default.BAD_REQUEST, 'Invoice not found');
    }
    if ((isExist === null || isExist === void 0 ? void 0 : isExist.due) > 0) {
        throw new Error('First paid the invoice due');
    }
    const result = yield prisma_1.default.invoice.delete({
        where: {
            id,
        },
    });
    if (!result) {
        throw new Error('Invoice delete failed');
    }
    return result;
});
exports.deleteInvoiceService = deleteInvoiceService;
// delete invoices service
const deleteInvoicesService = (ids) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, asyncForEach_1.asyncForEach)(ids, (id) => __awaiter(void 0, void 0, void 0, function* () {
            const isExist = yield transactionClient.invoice.findUnique({
                where: {
                    id,
                },
            });
            if (!isExist) {
                throw new apiError_1.ApiError(http_status_1.default.BAD_REQUEST, 'Invoice not found');
            }
            if ((isExist === null || isExist === void 0 ? void 0 : isExist.due) <= 0) {
                const result = yield transactionClient.invoice.delete({
                    where: {
                        id,
                    },
                });
                return result;
            }
        }));
    }));
    return null;
});
exports.deleteInvoicesService = deleteInvoicesService;
