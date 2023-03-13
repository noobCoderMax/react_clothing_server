import  { NextFunction, Request, Response } from "express";
import responseJson from "../middleware/resopnseJson";
import prisma from '../utils/prisma'
import dayjs from 'dayjs'

exports.getHistorys = async (req: Request, res: Response, next: NextFunction) => {
  try {

    // const nowTime = dayjs()
    // const today = nowTime.subtract(0,'day').format('YYYY-MM-DD')
    // const sevenDays = nowTime.subtract(7, 'day').format('YYYY-MM-DD')
    // const yesterday = nowTime.subtract(1, 'day').format('YYYY-MM-DD')
    // const earlier = nowTime.subtract(8,'day').format('YYYY-MM-DD')
    
    // let timeRangeJudge = ''
    // switch (req.body.timeRange) {
    //   case 'today':
    //     timeRangeJudge = today;
    //     break;
    //   case 'yesterday':
    //     timeRangeJudge = yesterday;
    //     break;
    //   case 'seven_days_ago':
    //     timeRangeJudge = sevenDays;
    //     break;
    //   case 'earlier':
    //     timeRangeJudge = earlier;
    //     break;
    // }
    const result = await prisma.history.findMany({
      skip: (Number(req.params.currentPage) - 1) * Number(req.params.pageSize),
      where: {
        userId:req.params.userId
      }
    })

    if (result) {
      res.status(200).json(responseJson(true,"获取浏览历史成功!",result))
    } else {
      res.status(400).json(responseJson(false,"获取浏览历史失败!",result))
    }
  } catch (error) {
    next(error)    
  }
}

exports.createHistory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await prisma.history.create({
      data:req.body
    })

    if (result) {
      res.status(201).json(responseJson(true, "添加浏览历史成功！", result))
    } else {
      res.status(400).json(responseJson(false, "添加浏览历史失败！"))
    }

  } catch (error) {
    next(error)
  }
}

exports.deleteHistoryById = async (req: Request, res: Response, next: NextFunction) => { 
  try {
    const result = await prisma.history.delete({
      where: {
        id:req.params.id
      }
    })

    if (result) {
      res.status(201).json(responseJson(true, "删除浏览历史成功！", result))
    } else {
      res.status(400).json(responseJson(false, "删除浏览历史失败！"))
    }
  } catch (error) {
    
  }
}

exports.deleteAllHistory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await prisma.history.deleteMany({
      where: {
        userId:req.params.userId
      }
    })
    if (result) {
      res.status(201).json(responseJson(true,"清空浏览记录成功！"))
    } else {
      res.status(500).json(responseJson(false,"清空浏览记录失败！"))
    }
  } catch (error) {
    next(error)
  }
}