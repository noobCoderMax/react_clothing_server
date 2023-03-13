import { NextFunction, Request, Response } from "express";
import responseJson from "../middleware/resopnseJson";
import prisma from '../utils/prisma'

exports.getTraderById = async (req:Request,res:Response,next:NextFunction) => {
   try {
     const result = await prisma.trader.findUnique({
       where: {
        id:req.params.id
       },
       include: {
         Clothing:true
       }
     })

     if (result) {
       res.status(200).json(responseJson(true,"查询成功!",result))
     } else {
       res.status(404).json(responseJson(false,"查询失败!"))
     }

   } catch (error) {
    next(error)
   }
}

exports.deleteTraderById = async (req:Request,res:Response,next:NextFunction) => {
  try {
    const result = await prisma.trader.delete({
      where: {
        id:req.params.id
      }
    })

    if (result) {
      res.status(200).json(responseJson(true,"删除成功!"))
    } else {
      res.status(404).json(responseJson(false,"删除失败!"))
    }
  } catch (error) {
   next(error)
  }
}

exports.updateTraderById = async (req:Request,res:Response,next:NextFunction) => {
  try {
    const result = await prisma.trader.update({
      where: {
        id:req.params.id
      },
      data:req.body
    })

    if (result) {
      res.status(201).json(responseJson(true,"修改成功!",result))
    } else {
      res.status(404).json(responseJson(false,"修改失败!"))
    }
  } catch (error) {
   next(error)
  }
}

exports.getTraderByPages = async (req:Request,res:Response,next:NextFunction) => {
  try {
    const result = await prisma.trader.findMany({
      skip: (Number(req.params.currentPage) - 1) * Number(req.params.pageSize),
      where: {
        userName:req.body.userName
      }
    })

    if (result) {
      res.status(200).json(responseJson(true,"查询成功!",result))
    } else {
      res.status(400).json(responseJson(false,"查询失败!"))
    }
  } catch (error) {
   next(error)
  }
}

exports.createTrader = async (req:Request,res:Response,next:NextFunction) => {
  try {
    const result = await prisma.trader.create({
      data:req.body
    })

    if (result) {
      res.status(201).json(responseJson(true,"新建成功!",result))
    } else {
      res.status(400).json(responseJson(false,"新建失败!"))
    }
  } catch (error) {
   next(error)
  }
}