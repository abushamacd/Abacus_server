"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reqValidate_1 = __importDefault(require("../../../middleware/reqValidate"));
const auth_1 = require("../../../middleware/auth");
const user_1 = require("../../../enums/user");
const invoice_validations_1 = require("./invoice.validations");
const invoice_controllers_1 = require("./invoice.controllers");
const router = express_1.default.Router();
// example invoice route
router
    .route('/')
    .post((0, auth_1.auth)(user_1.ENUM_USER_ROLE.OWNER, user_1.ENUM_USER_ROLE.MANAGER), (0, reqValidate_1.default)(invoice_validations_1.createInvoiceZod), invoice_controllers_1.createInvoice)
    .get((0, auth_1.auth)(user_1.ENUM_USER_ROLE.OWNER, user_1.ENUM_USER_ROLE.MANAGER), invoice_controllers_1.getInvoices)
    .delete((0, auth_1.auth)(user_1.ENUM_USER_ROLE.OWNER), invoice_controllers_1.deleteInvoices);
router
    .route('/:id')
    .get((0, auth_1.auth)(user_1.ENUM_USER_ROLE.OWNER, user_1.ENUM_USER_ROLE.MANAGER), invoice_controllers_1.getInvoice)
    .patch((0, auth_1.auth)(user_1.ENUM_USER_ROLE.OWNER, user_1.ENUM_USER_ROLE.MANAGER), invoice_controllers_1.updateInvoice)
    .delete((0, auth_1.auth)(user_1.ENUM_USER_ROLE.OWNER), invoice_controllers_1.deleteInvoice);
exports.default = router;
