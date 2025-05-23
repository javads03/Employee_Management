import { IsDate, IsDateString, IsEmail, IsEnum, isNotEmpty, IsNotEmpty, IsNumber, IsString, MinLength, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CreateAddressDto } from "./create-address.dto";
import { EmployeeRole, Status } from "../entities/employee.entity";

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  password: string;

  @IsEnum(EmployeeRole)
  role: EmployeeRole;

  @IsNotEmpty()
  @IsNumber()
  departmentId: number

  @IsNotEmpty()
  @IsString()
  employeeId: string;

  @IsNotEmpty()
  @IsDateString()
  dateOfJoining: Date;

  @IsNotEmpty()
  @IsNumber()
  experience: number;

  @IsEnum(Status)
  status: Status;


}