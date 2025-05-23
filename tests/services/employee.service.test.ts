import EmployeeRepository from "../../repository/employee.repository";
import EmployeeService from "../../services/employee.service";
import { when } from 'jest-when';
import { mock, MockProxy } from 'jest-mock-extended';
import Employee from "../../entities/employee.entity";




describe('EmployeeService', () => {

    let employeeRepository: MockProxy<EmployeeRepository>;
    let employeeService: EmployeeService;

    beforeEach(() => {

        employeeRepository = mock<EmployeeRepository>();
        employeeService = new EmployeeService(employeeRepository);
    })

    describe('getEmployeeById', () => {

        it("should return value when user with proper id exists", async () => {
            const mockEmployee = { id: 123, name: "employee name"} as Employee;

            when(employeeRepository.findOneById).calledWith(1).mockReturnValue(mockEmployee);

            const result = await employeeService.getEmployeeById(1);

            expect(employeeRepository.findOneById).toHaveBeenCalledWith(1);

            expect(result).toStrictEqual(mockEmployee);

        });

        it("should throw error when user id does not exists", async () => {
            

            when(employeeRepository.findOneById).calledWith(1).mockReturnValue(null);

            expect(employeeService.getEmployeeById(1)).rejects.toThrow("Employee not found");

            expect(employeeRepository.findOneById).toHaveBeenCalledWith(1);

        })

        


    });
})