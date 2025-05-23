import express from 'express';
import DepartmentRepository from '../repository/department.repository';
import datasource from '../db/data-source';
import Department from '../entities/department.entity';
import DepartmentService from '../services/department.service';
import DepartmentController from '../controller/department.controller';


const departmentRouter = express.Router();

const departmentRepository = new DepartmentRepository(datasource.getRepository(Department));
const departmentService = new DepartmentService(departmentRepository);
const departmentController = new DepartmentController(departmentService, departmentRouter);

export { departmentService };
export default departmentRouter;
