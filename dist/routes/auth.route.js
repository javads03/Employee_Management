"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = require("../controller/auth.controller");
const auth_service_1 = require("../services/auth.service");
const express_1 = require("express");
const employee_route_1 = require("./employee.route");
//import dataSource from "../db/data-source";
const authRouter = (0, express_1.Router)();
// const repository = dataSource.getRepository(Employee);
// const employeeRepository = new EmployeeRepository(repository);
// const employeeService = new EmployeeService(employeeRepository);
const authService = new auth_service_1.AuthService(employee_route_1.employeeService);
new auth_controller_1.AuthController(authService, authRouter);
exports.default = authRouter;
//# sourceMappingURL=auth.route.js.map