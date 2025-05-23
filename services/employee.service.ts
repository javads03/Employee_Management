import { CreateAddressDto } from "../dto/create-address.dto";
import Address from "../entities/address.entity";
import Employee from "../entities/employee.entity";
import EmployeeRepository from "../repository/employee.repository";
import bcrypt from "bcrypt";
import { EmployeeRole } from "../entities/employee.entity";

class EmployeeService {
    constructor(private employeeRepository: EmployeeRepository) {}

    async createEmployee(email: string, name: string, age: number, role: EmployeeRole, address: CreateAddressDto, password: string): Promise<Employee> {

        const newEmployee = new Employee();
        newEmployee.name = name;
        newEmployee.email = email;
        newEmployee.age = age;
        newEmployee.role = role;
        newEmployee.password = await bcrypt.hash(password,10);

        const newAddress = new Address();
        newAddress.line1 = address.line1;
        newAddress.pincode = address.pincode;

        newEmployee.address = newAddress;
        return this.employeeRepository.create(newEmployee);
    }

    async getAllEmployees(): Promise<Employee[]> {
        return this.employeeRepository.findMany();
    }

    async getEmployeeById(id: number): Promise<Employee> {
        let employee = await this.employeeRepository.findOneById(id);
        if (!employee) {
            throw new Error("Employee not found")// for testing purpose
        }
        else
            return employee;
    }

    async getEmployeeByEmail(email: string): Promise<Employee> {
        return this.employeeRepository.findByEmail(email);
    }

    async updateEmployee(id: number, email: string, name: string, age: number, address: CreateAddressDto): Promise<void> {

        const existingEmployee = this.employeeRepository.findOneById(id);
        if (existingEmployee) {
            const employee = new Employee();
            employee.name = name;
            employee.email = email;
            employee.age = age;
            const newAddress = new Address();
            newAddress.line1 = address.line1;
            newAddress.pincode = address.pincode;

            employee.address = newAddress;
            await this.employeeRepository.update(id,employee);
        }
        
    }

    async deleteEmployee(id: number): Promise<void> {

        const existingEmployee = this.employeeRepository.findOneById(id);
        if (existingEmployee) {
            await this.employeeRepository.delete(id);
        }

        // const existingEmployee = await this.employeeRepository.findOneById(id);
        // if (existingEmployee) {
        //     await this.employeeRepository.remove(existingEmployee);
        // }
        
        
    }

    



}

export default EmployeeService;