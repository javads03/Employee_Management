import express from "express";
//import employeeRouter from "./employee_router";
import loggerMiddleware from "./middlewares/loggerMiddleware";
import { authMiddleware } from "./middlewares/auth_middleware";
import datasource from "./db/data-source";
import employeeRouter from "./routes/employee.route";
import authRouter from "./routes/auth.route"
import { errorMiddleware } from "./middlewares/errorMiddleware";

const { Client } = require('pg');

const server = express();
server.use(express.json());
server.use(loggerMiddleware);


server.use("/employee", authMiddleware, employeeRouter);
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
    console.log('connected');
  }catch{
    console.error('Failed to connect to DB');
    process.exit(1);
  }
  server.listen(3000, () => {
  console.log("server listening to 3000");
});
})();


