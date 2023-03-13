import  e, { NextFunction, Request, Response } from "express";
import responseJson from "../middleware/resopnseJson";
import prisma from '../utils/prisma'

exports.getFeedBacks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await prisma.feedback.findMany({
      skip: (Number(req.body.currentPage) - 1) * Number(req.body.pageSize),
      where: {
        type:req.body.type
      }
    })
    if (result) {
      res.status(200).json(responseJson(true,"获取反馈列表成功！",result))
    } else[
      res.status(404).json(responseJson(false,"获取反馈列表失败！"))
    ]
  } catch (error) {
    next(error)
  }
}

exports.createFeedBack = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await prisma.feedback.create({
      data:req.body
    })

    if (result) {
      res.status(201).json(responseJson(true,"反馈成功!",result))
    } else {
      res.status(500).json(responseJson(false,"反馈失败!"))
    }
  } catch (error) {
    next(error)
  }
}

exports.deleteFeedBackById = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await prisma.feedback.delete({
      where: {
        id:req.params.id
      }
    })
    if (result) {
      res.status(201).json(responseJson(true,"删除成功！"))
    } else {
      res.status(404).json(responseJson(false,"删除失败！"))
    }

  } catch (error) {
    next(error)
  }
}


exports.deleteFeedBackByIds = async (req: Request, res: Response, next: NextFunction) => {
  try {
   
  } catch (error) {
    next(error)
  }
}

exports.getFeedBackByUserId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await prisma.feedback.findMany({
      where: {
        userId:req.params.userId
      }
    })
    if (result) {
      res.status(201).json(responseJson(true,"获取列表成功!",result))
    } else {
      res.status(500).json(responseJson(false,"获取列表失败!"))
    }
  } catch (error) {
    next(error)
  }
}
