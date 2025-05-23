import { Request, Response, Router } from "express";
import { NextFunction } from "express";
import departmentService from "../services/department.service";
import HttpException from "../exception/httpException";

import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import {CreateDepartmentDto}  from "../dto/create-departement.dto";

import { authorizationMiddleware } from "../middlewares/authorization.middleware";
import { EmployeeRole } from "../entities/employee.entity";

class DepartmentController {
    constructor (private departmentService: departmentService, router: Router) {
        router.post("/",authorizationMiddleware([EmployeeRole.DEVELOPER, EmployeeRole.HR]), this.createDepartment.bind(this))
        router.get("/", this.getAllDepartments.bind(this));
        router.get("/:id", this.getDepartmentById.bind(this));
        router.put("/:id", authorizationMiddleware([EmployeeRole.DEVELOPER, EmployeeRole.HR]), this.updateDepartment.bind(this));
        router.delete("/:id", authorizationMiddleware([EmployeeRole.DEVELOPER, EmployeeRole.HR]), this.deleteDepartment.bind(this));
    }

    public async createDepartment(req: Request, res: Response, next: NextFunction) {
        try {
            const createDepartmentDto: CreateDepartmentDto = plainToInstance(CreateDepartmentDto, req.body);
            const errors = await validate(createDepartmentDto);
            if (errors.length > 0) {
                console.log(JSON.stringify(errors));
                throw new HttpException(400, JSON.stringify(errors));
            }
            const savedDepartment = await this.departmentService.createDepartment(
                createDepartmentDto.name,
                
            );
            res.status(201).send(savedDepartment);
        } catch (error) {
            next(error);
        }
    }

    async getAllDepartments(req: Request, res: Response) {
        const Departments = await this.departmentService.getAllDepartments();
        res.status(200).send(Departments);
    }

    
    async getDepartmentById(req: Request, res: Response, next: NextFunction) {
        try{
            const id = Number(req.params.id);
            const Department = await this.departmentService.getDepartmentById(id);
            if (!Department) {
                throw new HttpException(404,'Department not found :)'); 
            }
            res.status(200).send(Department);
        }
        catch (err){
            console.log(err);
            next(err);
        }
        
    }

    
    async updateDepartment (req: Request, res: Response, next: NextFunction) {
        try {

            const updateDepartmentDto: CreateDepartmentDto = plainToInstance(CreateDepartmentDto, req.body);
            const errors = await validate(updateDepartmentDto);
            if (errors.length > 0) {
                console.log(JSON.stringify(errors));
                throw new HttpException(400, JSON.stringify(errors));
            }

            const updatedDepartment = await this.departmentService.updateDepartment(
                Number(req.params.id),
                updateDepartmentDto.name,
            );
            res.status(200).send(updatedDepartment);

        }
        catch(err) {
            next(err);
        }
    }

    async deleteDepartment (req: Request, res: Response) {
        const id = Number(req.params.id);
        await this.departmentService.deleteDepartment(id);
        res.status(200).send();
    }
    
    

}


export default DepartmentController;