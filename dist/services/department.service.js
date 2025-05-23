"use strict";
//import { CreateAddressDto } from "../dto/create-address.dto";
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
const data_source_1 = __importDefault(require("../db/data-source"));
const department_entity_1 = __importDefault(require("../entities/department.entity"));
const employee_entity_1 = __importDefault(require("../entities/employee.entity"));
const employee_repository_1 = __importDefault(require("../repository/employee.repository"));
class DepartmentService {
    constructor(departmentRepository) {
        this.departmentRepository = departmentRepository;
    }
    createDepartment(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const newDepartment = new department_entity_1.default();
            newDepartment.name = name;
            return this.departmentRepository.create(newDepartment);
        });
    }
    getAllDepartments() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.departmentRepository.findMany();
        });
    }
    getDepartmentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let department = yield this.departmentRepository.findOneById(id);
            if (!department) {
                throw new Error("Department not found"); // for testing purpose
            }
            else
                return department;
        });
    }
    updateDepartment(id, name) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingDepartment = yield this.departmentRepository.findOneById(id);
            if (existingDepartment) {
                console.log(existingDepartment);
                const department = existingDepartment;
                department.name = name;
                yield this.departmentRepository.update(id, department);
            }
        });
    }
    deleteDepartment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingDepartment = yield this.departmentRepository.findOneById(id);
            const employeeRepository = new employee_repository_1.default(data_source_1.default.getRepository(employee_entity_1.default));
            const employees = yield employeeRepository.findByDept(existingDepartment.id);
            if (existingDepartment) {
                console.log(employees);
                if (employees) {
                    throw new Error("Employees are there in department");
                }
                yield this.departmentRepository.delete(id);
            }
        });
    }
}
exports.default = DepartmentService;
//# sourceMappingURL=department.service.js.map