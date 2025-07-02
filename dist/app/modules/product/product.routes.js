"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reqValidate_1 = __importDefault(require("../../../middleware/reqValidate"));
const auth_1 = require("../../../middleware/auth");
const user_1 = require("../../../enums/user");
const product_validations_1 = require("./product.validations");
const product_controllers_1 = require("./product.controllers");
const router = express_1.default.Router();
// create & get product
router
    .route('/')
    .post((0, auth_1.auth)(user_1.ENUM_USER_ROLE.OWNER, user_1.ENUM_USER_ROLE.MANAGER), (0, reqValidate_1.default)(product_validations_1.createProductZod), product_controllers_1.createProduct)
    .get((0, auth_1.auth)(user_1.ENUM_USER_ROLE.OWNER, user_1.ENUM_USER_ROLE.MANAGER), product_controllers_1.getProducts)
    .delete((0, auth_1.auth)(user_1.ENUM_USER_ROLE.OWNER), product_controllers_1.deleteProducts);
// get, update & delete product
router
    .route('/:id')
    .get((0, auth_1.auth)(user_1.ENUM_USER_ROLE.OWNER, user_1.ENUM_USER_ROLE.MANAGER), product_controllers_1.getProduct)
    .patch((0, auth_1.auth)(user_1.ENUM_USER_ROLE.OWNER, user_1.ENUM_USER_ROLE.MANAGER), product_controllers_1.updateProduct)
    .delete((0, auth_1.auth)(user_1.ENUM_USER_ROLE.OWNER), product_controllers_1.deleteProduct);
exports.default = router;
