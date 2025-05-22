import { AuthController } from "../controller/auth.controller";
import { AuthService } from "../services/auth.service";
import {Router} from "express";
import  { employeeService } from "./employee.route"
import datasource from "../db/data-source";
import Employee from "../entities/employee.entity";
import EmployeeRepository from "../repository/employee.repository";
import EmployeeService from "../services/employee.service";
//import dataSource from "../db/data-source";

const authRouter = Router();

// const repository = dataSource.getRepository(Employee);
// const employeeRepository = new EmployeeRepository(repository);
// const employeeService = new EmployeeService(employeeRepository);



const authService = new AuthService(employeeService);
new AuthController(authService, authRouter);

export default authRouter;