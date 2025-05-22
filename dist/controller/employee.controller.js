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
const httpException_1 = __importDefault(require("../exception/httpException"));
//import { isEmail } from "../validators/emailValidator";
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const create_employee_dto_1 = require("../dto/create-employee.dto");
//import Address from "../entities/address.entity";
const authorization_middleware_1 = require("../middlewares/authorization.middleware");
class EmployeeController {
    constructor(employeeService, router) {
        this.employeeService = employeeService;
        //alternate to bind
        this.updateEmployee = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const createEmployeeDto = (0, class_transformer_1.plainToInstance)(create_employee_dto_1.CreateEmployeeDto, req.body);
                const errors = yield (0, class_validator_1.validate)(createEmployeeDto);
                if (errors.length > 0) {
                    console.log(JSON.stringify(errors));
                    throw new httpException_1.default(400, JSON.stringify(errors));
                }
                const updatedEmployee = yield this.employeeService.updateEmployee(Number(req.params.id), createEmployeeDto.email, createEmployeeDto.name, createEmployeeDto.age, createEmployeeDto.address);
                res.status(200).send(updatedEmployee);
                // const id = Number(req.params.id);
                // const email = req.body.email;
                // const name = req.body.name;
                // await this.employeeService.updateEmployee(id, email,name);
                // res.status(200).send();
            }
            catch (err) {
                next(err);
            }
        });
        this.deleteEmployee = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            yield this.employeeService.deleteEmployee(id);
            res.status(200).send();
        });
        router.post("/", authorization_middleware_1.authorizationMiddleware, this.createEmployee.bind(this));
        router.get("/", this.getAllEmployees.bind(this));
        router.get("/:id", this.getEmployeeById.bind(this));
        router.put(":id", authorization_middleware_1.authorizationMiddleware, this.updateEmployee);
        router.delete("/:id", authorization_middleware_1.authorizationMiddleware, this.deleteEmployee);
    }
    createEmployee(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createEmployeeDto = (0, class_transformer_1.plainToInstance)(create_employee_dto_1.CreateEmployeeDto, req.body);
                const errors = yield (0, class_validator_1.validate)(createEmployeeDto);
                if (errors.length > 0) {
                    console.log(JSON.stringify(errors));
                    throw new httpException_1.default(400, JSON.stringify(errors));
                }
                const savedEmployee = yield this.employeeService.createEmployee(createEmployeeDto.email, createEmployeeDto.name, createEmployeeDto.age, createEmployeeDto.role, createEmployeeDto.address, //as Address
                createEmployeeDto.password);
                res.status(201).send(savedEmployee);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getAllEmployees(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const employees = yield this.employeeService.getAllEmployees();
            res.status(200).send(employees);
        });
    }
    getEmployeeById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const employee = yield this.employeeService.getEmployeeById(id);
                if (!employee) {
                    throw new httpException_1.default(404, 'employee not found :)');
                }
                res.status(200).send(employee);
            }
            catch (err) {
                //res.send(400, "not found")
                console.log(err);
                next(err);
            }
        });
    }
}
exports.default = EmployeeController;
//# sourceMappingURL=employee.controller.js.map