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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//import employeeRouter from "./employee_router";
const loggerMiddleware_1 = __importDefault(require("./middlewares/loggerMiddleware"));
const auth_middleware_1 = require("./middlewares/auth_middleware");
const data_source_1 = __importDefault(require("./db/data-source"));
const employee_route_1 = __importDefault(require("./routes/employee.route"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const errorMiddleware_1 = require("./middlewares/errorMiddleware");
const logger_service_1 = require("./services/logger.service");
const department_route_1 = __importDefault(require("./routes/department.route"));
const { Client } = require('pg');
const server = (0, express_1.default)();
const logger = logger_service_1.LoggerService.getInstance('app()');
server.use(express_1.default.json());
server.use(loggerMiddleware_1.default);
server.use("/employee", auth_middleware_1.authMiddleware, employee_route_1.default);
server.use("/department", auth_middleware_1.authMiddleware, department_route_1.default);
server.use("/auth", auth_route_1.default);
server.use(errorMiddleware_1.errorMiddleware);
server.get("/", (req, res) => {
    console.log(req.url);
    res.status(200).send("Hello world typescript");
});
//server.use(errorMiddleware);
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield data_source_1.default.initialize();
        logger.info('connected');
        server.listen(3000, () => {
            logger.info("server listening to 3000");
        });
    }
    catch (_a) {
        logger.error('Failed to connect to DB');
        process.exit(1);
    }
}))();
//# sourceMappingURL=app.js.map