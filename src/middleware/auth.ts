import { NextFunction, Request, Response } from "express";
const jwt = require("./jwt");
const { jwtSecret } = require("../config/config.default");
import prisma from '../utils/prisma'
import responseJson from './resopnseJson'

module.exports = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  // 从请求头获取token
  let token: string = req.header("authorization");
  token = token ? token.split("Bearer")[1].trim() : "";
  if (!token && token === "") {
    // 无效400
    return res
      .status(401)
      .json(responseJson(false,"token过期,请您重新登录"))
      .end();
  }

  // 验证是否有效
  try {
    const decodeToken = await jwt.jwtVerify(token, jwtSecret);
    // 有效将用户信息挂载到req上，继续往后next
    req.user = await prisma.user.findUnique({
      where: {
        id:decodeToken.userId,
      },
      select: {
        password: false,
        id: true,
        avator: true,
        email: true,
        userName: true,
        address: true,
        tips: true,
        createTime: true,
        updateTime:true
      }
    })
    next();
  } catch (error) {
    return res
      .status(401)
      .json(responseJson(false,"用户未登录，请登录后再访问！"))
      .end();
  }
};
