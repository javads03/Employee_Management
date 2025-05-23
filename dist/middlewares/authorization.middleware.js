"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizationMiddleware = void 0;
const httpException_1 = __importDefault(require("../exception/httpException"));
//export const checkRole = {role: EmployeeRole} =>
const authorizationMiddleware = (role) => {
    return (req, res, next) => {
        const userRole = req.user.role;
        if (!role.includes(userRole)) {
            throw new httpException_1.default(403, "No access");
        }
        next();
    };
};
exports.authorizationMiddleware = authorizationMiddleware;
//# sourceMappingURL=authorization.middleware.js.map