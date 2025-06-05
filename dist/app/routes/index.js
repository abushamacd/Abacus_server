"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const auth_routes_1 = __importDefault(require("../modules/auth/auth.routes"));
const user_routes_1 = __importDefault(require("../modules/user/user.routes"));
const supplier_routes_1 = __importDefault(require("../modules/supplier/supplier.routes"));
const unit_routes_1 = __importDefault(require("../modules/unit/unit.routes"));
const product_routes_1 = __importDefault(require("../modules/product/product.routes"));
const invoice_routes_1 = __importDefault(require("../modules/invoice/invoice.routes"));
const dbsync_routes_1 = __importDefault(require("../modules/dbsync/dbsync.routes"));
const appRoutes = [
    {
        path: '/auth',
        route: auth_routes_1.default,
    },
    {
        path: '/user',
        route: user_routes_1.default,
    },
    {
        path: '/supplier',
        route: supplier_routes_1.default,
    },
    {
        path: '/unit',
        route: unit_routes_1.default,
    },
    {
        path: '/product',
        route: product_routes_1.default,
    },
    {
        path: '/invoice',
        route: invoice_routes_1.default,
    },
    {
        path: '/dbsync',
        route: dbsync_routes_1.default,
    },
];
appRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
