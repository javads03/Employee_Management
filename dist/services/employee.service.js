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
const department_repository_1 = __importDefault(require("../repository/department.repository"));
const data_source_1 = __importDefault(require("../db/data-source"));
const department_entity_1 = __importDefault(require("../entities/department.entity"));
class EmployeeService {
    constructor(employeeRepository) {
        this.employeeRepository = employeeRepository;
    }
    createEmployee(email, name, age, role, address, password, departmentId, employeeId, dateOfJoining, experience, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const newEmployee = new employee_entity_1.default();
            newEmployee.name = name;
            newEmployee.email = email;
            newEmployee.age = age;
            newEmployee.role = role;
            newEmployee.password = yield bcrypt_1.default.hash(password, 10);
            newEmployee.employeeId = employeeId;
            newEmployee.dataOfJoining = dateOfJoining;
            newEmployee.experience = experience;
            newEmployee.status = status;
            const newAddress = new address_entity_1.default();
            newAddress.line1 = address.line1;
            newAddress.pincode = address.pincode;
            newEmployee.address = newAddress;
            const departmentRepository = new department_repository_1.default(data_source_1.default.getRepository(department_entity_1.default));
            const department = yield departmentRepository.findOneById(departmentId);
            department.id = departmentId;
            newEmployee.department = department;
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
    updateEmployee(id, email, name, age, address, role, departmentId, employeeId, dateOfJoining, experience, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingEmployee = yield this.employeeRepository.findOneById(id);
            if (existingEmployee) {
                console.log(existingEmployee);
                const employee = existingEmployee;
                employee.name = name;
                employee.email = email;
                employee.age = age;
                employee.role = role;
                //employee.address = address;
                employee.address.line1 = address.line1;
                employee.address.pincode = address.pincode;
                const departmentRepository = new department_repository_1.default(data_source_1.default.getRepository(department_entity_1.default));
                const department = yield departmentRepository.findOneById(departmentId);
                department.id = departmentId;
                employee.department = department;
                employee.employeeId = employeeId;
                employee.dataOfJoining = dateOfJoining;
                employee.experience = experience;
                employee.status = status;
                // const newAddress = new Address();
                // newAddress.line1 = address.line1;
                // newAddress.pincode = address.pincode;
                //employee.address = newAddress;
                yield this.employeeRepository.update(id, employee);
            }
        });
    }
    deleteEmployee(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingEmployee = this.employeeRepository.findOneById(id);
                if (existingEmployee) {
                    yield this.employeeRepository.delete(id);
                }
                else
                    throw Error("No employee found");
            }
            catch (error) {
                console.log(error);
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