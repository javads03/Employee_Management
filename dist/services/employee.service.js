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
const address_entity_1 = __importDefault(require("../entities/address.entity"));
const employee_entity_1 = __importDefault(require("../entities/employee.entity"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class EmployeeService {
    constructor(employeeRepository) {
        this.employeeRepository = employeeRepository;
    }
    createEmployee(email, name, age, role, address, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const newEmployee = new employee_entity_1.default();
            newEmployee.name = name;
            newEmployee.email = email;
            newEmployee.age = age;
            newEmployee.role = role;
            newEmployee.password = yield bcrypt_1.default.hash(password, 10);
            const newAddress = new address_entity_1.default();
            newAddress.line1 = address.line1;
            newAddress.pincode = address.pincode;
            newEmployee.address = newAddress;
            return this.employeeRepository.create(newEmployee);
        });
    }
    getAllEmployees() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.employeeRepository.findMany();
        });
    }
    getEmployeeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let employee = yield this.employeeRepository.findOneById(id);
            if (!employee) {
                throw new Error("Employee not found"); // for testing purpose
            }
            else
                return employee;
        });
    }
    getEmployeeByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.employeeRepository.findByEmail(email);
        });
    }
    updateEmployee(id, email, name, age, address) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingEmployee = this.employeeRepository.findOneById(id);
            if (existingEmployee) {
                const employee = new employee_entity_1.default();
                employee.name = name;
                employee.email = email;
                employee.age = age;
                const newAddress = new address_entity_1.default();
                newAddress.line1 = address.line1;
                newAddress.pincode = address.pincode;
                employee.address = newAddress;
                yield this.employeeRepository.update(id, employee);
            }
        });
    }
    deleteEmployee(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingEmployee = this.employeeRepository.findOneById(id);
            if (existingEmployee) {
                yield this.employeeRepository.delete(id);
            }
            // const existingEmployee = await this.employeeRepository.findOneById(id);
            // if (existingEmployee) {
            //     await this.employeeRepository.remove(existingEmployee);
            // }
        });
    }
}
exports.default = EmployeeService;
//# sourceMappingURL=employee.service.js.map