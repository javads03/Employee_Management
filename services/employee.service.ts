import { CreateAddressDto } from "../dto/create-address.dto";
import Address from "../entities/address.entity";
import Employee, { Status } from "../entities/employee.entity";
import EmployeeRepository from "../repository/employee.repository";
import bcrypt from "bcrypt";
import { EmployeeRole } from "../entities/employee.entity";
import DepartmentRepository from "../repository/department.repository";
import datasource from "../db/data-source";
import Department from "../entities/department.entity";

class EmployeeService {
    constructor(private employeeRepository: EmployeeRepository) {}

    async createEmployee(email: string, name: string, age: number, role: EmployeeRole, address: CreateAddressDto, password: string, departmentId: number, employeeId: string, dateOfJoining: Date, experience: number, status: Status): Promise<Employee> {

        const newEmployee = new Employee();
        newEmployee.name = name;
        newEmployee.email = email;
        newEmployee.age = age;
        newEmployee.role = role;
        newEmployee.password = await bcrypt.hash(password,10);
        newEmployee.employeeId = employeeId;
        newEmployee.dataOfJoining = dateOfJoining;
        newEmployee.experience = experience;
        newEmployee.status = status;

        const newAddress = new Address();
        newAddress.line1 = address.line1;
        newAddress.pincode = address.pincode;

        newEmployee.address = newAddress;

        const departmentRepository = new DepartmentRepository(datasource.getRepository(Department));
        const department = await departmentRepository.findOneById(departmentId);
        department.id = departmentId;

        newEmployee.department= department;
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

    async updateEmployee(id: number, email: string, name: string, age: number, address: CreateAddressDto, role: EmployeeRole, departmentId, employeeId: string, dateOfJoining: Date, experience: number, status: Status): Promise<void> {

        const existingEmployee = await this.employeeRepository.findOneById(id);
        if (existingEmployee) {
            console.log(existingEmployee);
            const employee = existingEmployee
            employee.name = name;
            employee.email = email;
            employee.age = age;
            employee.role = role;

            //employee.address = address;
            employee.address.line1 = address.line1;
            employee.address.pincode = address.pincode;

            const departmentRepository = new DepartmentRepository(datasource.getRepository(Department));
            const department = await departmentRepository.findOneById(departmentId);
            department.id = departmentId;

            employee.department= department;

            employee.employeeId = employeeId;
            employee.dataOfJoining = dateOfJoining;
            employee.experience = experience;
            employee.status = status;

            // const newAddress = new Address();
            // newAddress.line1 = address.line1;
            // newAddress.pincode = address.pincode;

            //employee.address = newAddress;
            await this.employeeRepository.update(id,employee);
        }
        
    }

    async deleteEmployee(id: number): Promise<void> {

        try {
            const existingEmployee = this.employeeRepository.findOneById(id);
            if (existingEmployee) {
                await this.employeeRepository.delete(id);
            }
            else
                throw Error("No employee found")
        }
        catch(error)
        {
            console.log(error);
        }

        // const existingEmployee = await this.employeeRepository.findOneById(id);
        // if (existingEmployee) {
        //     await this.employeeRepository.remove(existingEmployee);
        // }
        
        
    }

    



}

export default EmployeeService;