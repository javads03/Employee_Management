import express from "express";
//import employeeRouter from "./employee_router";
import loggerMiddleware from "./middlewares/loggerMiddleware";
import { authMiddleware } from "./middlewares/auth_middleware";
import datasource from "./db/data-source";
import employeeRouter from "./routes/employee.route";
import authRouter from "./routes/auth.route"
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { LoggerService } from "./services/logger.service";
import departmentRouter from "./routes/department.route";



const { Client } = require('pg');

const server = express();
const logger = LoggerService.getInstance('app()');

server.use(express.json());
server.use(loggerMiddleware);


server.use("/employee", authMiddleware, employeeRouter);
server.use("/department", authMiddleware, departmentRouter);
server.use("/auth", authRouter);

server.use(errorMiddleware);

server.get("/", (req, res) => {
  console.log(req.url);
  res.status(200).send("Hello world typescript");
});

//server.use(errorMiddleware);

(async () => {
  try{
    await datasource.initialize();
    logger.info('connected');
    server.listen(3000, () => {
    logger.info("server listening to 3000");
  });
  }catch{
    logger.error('Failed to connect to DB');
    process.exit(1);
  }
  
})();


