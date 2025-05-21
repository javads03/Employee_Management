import { Repository } from "typeorm";
import Employee from "../entities/employee.entity";


class EmployeeRepository{
    constructor(private repository: Repository<Employee>) {}

    async create(employee: Employee): Promise<Employee> {
        return this.repository.save(employee);
    }

    async findMany():Promise<Employee[]> {
        return this.repository.find({
            relations: {
                address: true
            }
        });
    }

    async findOneById(id: number): Promise<Employee | null> {
        return this.repository.findOne({
            where: { id },
            relations: {
                address: true
            }
        });
    }

    async update(id: number, employee: Employee): Promise<void> {
        await this.repository.save({ id, ...employee });

        //equivalent
        // await this.repository.save({ 
        //     id,
        //     name: employee.name,
        //     email: employee.email
        // });
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete({ id });
        
    }

    async remove(employee: Employee): Promise<void> {
        
        await this.repository.remove(employee); //for cascade
    }
    
}

export default EmployeeRepository;