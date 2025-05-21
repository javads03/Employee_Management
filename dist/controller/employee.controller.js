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
Object.defineProperty(exports, "__esModule", { value: true });
class EmployeeController {
    constructor(employeeService, router) {
        this.employeeService = employeeService;
        //alternate to bind
        this.updateEmployee = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const email = req.body.email;
            const name = req.body.name;
            yield this.employeeService.updateEmployee(id, email, name);
            res.status(200).send();
        });
        this.deleteEmployee = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            yield this.employeeService.deleteEmployee(id);
            res.status(200).send();
        });
        router.post("/", this.createEmployee.bind(this));
        router.get("/", this.getAllEmployees.bind(this));
        router.get("/:id", this.getEmployeeById.bind(this));
        router.put(":id", this.updateEmployee);
        router.delete("/:id", this.deleteEmployee);
    }
    createEmployee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = req.body.email;
            const name = req.body.name;
            const savedEmployee = yield this.employeeService.createEmployee(email, name);
            res.status(201).send(savedEmployee);
        });
    }
    getAllEmployees(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const employees = yield this.employeeService.getAllEmployees();
            res.status(200).send(employees);
        });
    }
    getEmployeeById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const employee = yield this.employeeService.getEmployeeById(id);
            res.status(200).send(employee);
        });
    }
}
exports.default = EmployeeController;
//# sourceMappingURL=employee.controller.js.map