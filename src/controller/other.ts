import  { NextFunction, Request, Response } from "express";

const qnConfig = require("../middleware/qiniuyun");

exports.qiniuToken = (req:Request,res:Response,next:NextFunction) => {
  try {
    // res.status(200).send(qnConfig.uploadToken)

    return res.status(200).send(qnConfig.uploadToken)
  } catch (error) {
    next(error);
  }
};
