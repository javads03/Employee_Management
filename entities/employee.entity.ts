import { Column,  Entity, OneToOne, JoinColumn, ManyToOne, Unique } from "typeorm";
import AbstractEntity from "./abstract.entity";
import Address from "./address.entity";
import Department from "./department.entity";

export enum EmployeeRole {
  UI = 'UI',
  UX = 'UX',
  DEVELOPER = 'DEVELOPER',
  HR = 'HR'
}

export enum Status {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PROBATION = 'PROBATION'
}

@Entity()
class Employee extends AbstractEntity{
    
    @Column({unique: true})
    email: string;

    @Column()
    name: string;

    @Column()
    age: number;

    @OneToOne(() => Address, (address) => address.employee, {
    cascade: true
    })
    address: Address

    @Column()
    password: string;

    @Column({
    type: 'enum',
    enum: EmployeeRole,
    default: EmployeeRole.DEVELOPER
    })
    role: EmployeeRole

    @ManyToOne(() => Department, (department) => department.employees)
    @JoinColumn()
    department: Department;

    @Column()
    employeeId: string;

    @Column()
    dataOfJoining: Date;

    @Column()
    experience: number;

    @Column({
    type: 'enum',
    enum: Status,
    default: Status.ACTIVE
    })
    status: Status;


  }
  
  export default Employee;
  