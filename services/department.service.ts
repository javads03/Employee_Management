//import { CreateAddressDto } from "../dto/create-address.dto";

import datasource from "../db/data-source";
import Department from "../entities/department.entity";
import Employee from "../entities/employee.entity";
import DepartmentRepository from "../repository/department.repository";
import EmployeeRepository from "../repository/employee.repository";

class DepartmentService {
    constructor(private departmentRepository: DepartmentRepository) {}

    async createDepartment(name: string,): Promise<Department> {

        const newDepartment = new Department();
        newDepartment.name = name;
        
        return this.departmentRepository.create(newDepartment);
    }

    async getAllDepartments(): Promise<Department[]> {
        return this.departmentRepository.findMany();
    }

    async getDepartmentById(id: number): Promise<Department> {
        let department = await this.departmentRepository.findOneById(id);
        if (!department) {
            throw new Error("Department not found")// for testing purpose
        }
        else
            return department;
    }


    async updateDepartment(id: number, name: string): Promise<void> {

        const existingDepartment = await this.departmentRepository.findOneById(id);
        if (existingDepartment) {
            console.log(existingDepartment);
            const department = existingDepartment
            department.name = name;
            
            await this.departmentRepository.update(id, department);
        }
        
    }

    async deleteDepartment(id: number): Promise<void> {

        const existingDepartment = await this.departmentRepository.findOneById(id);
        const employeeRepository = new EmployeeRepository(datasource.getRepository(Employee))

        const employees = await employeeRepository.findByDept(existingDepartment.id);

        
        
        if (existingDepartment) {
            console.log(employees);
            if (employees)
            {
                throw new Error("Employees are there in department");
            }
            await this.departmentRepository.delete(id);
        }
        
    }

}

export default DepartmentService;