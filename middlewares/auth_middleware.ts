import {Request, Response, NextFunction} from "express";
import HttpException from "../exception/httpException";
import { JWT_SECRET } from "../utils/constraints";
import jwt from "jsonwebtoken";
import { JwtPayload } from "../dto/jwt-payload";


const getToken = (req: Request) : string => {
    const token:string = req.headers.authorization;
    if (!token) {
        throw new HttpException(401,"Not authorized");
    }
    const tokenSplits = token.split(' ')
    if (tokenSplits.length != 2)
        throw new HttpException(401,"Invalid token")
    return tokenSplits[1];
}
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = getToken(req);
    if (!token)
        throw new HttpException(401,"Not authorized")
    try {
        const payload = jwt.verify(token, JWT_SECRET)
        req.user = payload as JwtPayload
    }
    catch {
        throw new HttpException(401, "Invalid or Expired token")
    }
    //console.log(token);
    next();
    
}