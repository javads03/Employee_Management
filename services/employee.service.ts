import Employee from "../entities/employee.entity";
import EmployeeRepository from "../repository/employee.repository";

class EmployeeService {
    constructor(private employeeRepository: EmployeeRepository) {}

    async createEmployee(email: string, name: string): Promise<Employee> {

        const newEmployee = new Employee();
        newEmployee.name = name;
        newEmployee.email = email;
        return this.employeeRepository.create(newEmployee);
    }

    async getAllEmployees(): Promise<Employee[]> {
        return this.employeeRepository.findMany();
    }

    async getEmployeeById(id: number): Promise<Employee> {
        return this.employeeRepository.findOneById(id);
    }

    async updateEmployee(id: number, email: string, name: string): Promise<void> {

        const existingEmployee = this.employeeRepository.findOneById(id);
        if (existingEmployee) {
            const employee = new Employee();
            employee.name = name;
            employee.email = email;
            await this.employeeRepository.create(employee);
        }
        
    }

    async deleteEmployee(id: number): Promise<void> {

        const existingEmployee = this.employeeRepository.findOneById(id);
        if (existingEmployee) {
            await this.employeeRepository.delete(id);
        }
        
    }

}

export default EmployeeService;