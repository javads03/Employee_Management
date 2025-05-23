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
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const create_departement_dto_1 = require("../dto/create-departement.dto");
const authorization_middleware_1 = require("../middlewares/authorization.middleware");
const employee_entity_1 = require("../entities/employee.entity");
class DepartmentController {
    constructor(departmentService, router) {
        this.departmentService = departmentService;
        router.post("/", (0, authorization_middleware_1.authorizationMiddleware)([employee_entity_1.EmployeeRole.DEVELOPER, employee_entity_1.EmployeeRole.HR]), this.createDepartment.bind(this));
        router.get("/", this.getAllDepartments.bind(this));
        router.get("/:id", this.getDepartmentById.bind(this));
        router.put("/:id", (0, authorization_middleware_1.authorizationMiddleware)([employee_entity_1.EmployeeRole.DEVELOPER, employee_entity_1.EmployeeRole.HR]), this.updateDepartment.bind(this));
        router.delete("/:id", (0, authorization_middleware_1.authorizationMiddleware)([employee_entity_1.EmployeeRole.DEVELOPER, employee_entity_1.EmployeeRole.HR]), this.deleteDepartment.bind(this));
    }
    createDepartment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createDepartmentDto = (0, class_transformer_1.plainToInstance)(create_departement_dto_1.CreateDepartmentDto, req.body);
                const errors = yield (0, class_validator_1.validate)(createDepartmentDto);
                if (errors.length > 0) {
                    console.log(JSON.stringify(errors));
                    throw new httpException_1.default(400, JSON.stringify(errors));
                }
                const savedDepartment = yield this.departmentService.createDepartment(createDepartmentDto.name);
                res.status(201).send(savedDepartment);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getAllDepartments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const Departments = yield this.departmentService.getAllDepartments();
            res.status(200).send(Departments);
        });
    }
    getDepartmentById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const Department = yield this.departmentService.getDepartmentById(id);
                if (!Department) {
                    throw new httpException_1.default(404, 'Department not found :)');
                }
                res.status(200).send(Department);
            }
            catch (err) {
                console.log(err);
                next(err);
            }
        });
    }
    updateDepartment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updateDepartmentDto = (0, class_transformer_1.plainToInstance)(create_departement_dto_1.CreateDepartmentDto, req.body);
                const errors = yield (0, class_validator_1.validate)(updateDepartmentDto);
                if (errors.length > 0) {
                    console.log(JSON.stringify(errors));
                    throw new httpException_1.default(400, JSON.stringify(errors));
                }
                const updatedDepartment = yield this.departmentService.updateDepartment(Number(req.params.id), updateDepartmentDto.name);
                res.status(200).send(updatedDepartment);
            }
            catch (err) {
                next(err);
            }
        });
    }
    deleteDepartment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            yield this.departmentService.deleteDepartment(id);
            res.status(200).send();
        });
    }
}
exports.default = DepartmentController;
//# sourceMappingURL=department.controller.js.map