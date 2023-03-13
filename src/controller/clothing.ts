import  { NextFunction, Request, Response } from "express";
import responseJson from "../middleware/resopnseJson";
import prisma from '../utils/prisma'

exports.getClothingById = async (req:Request,res:Response,next:NextFunction) => {
  try {
    const result = await prisma.clothing.findUnique({
      where: {
        id:req.params.id
      }
    })

    if (result) {
      res.status(200).json(responseJson(true,"查询成功",result))
    } else {
      res.status(404).json(responseJson(false,"查询失败"))
    }
  } catch (error) {
    next(error)
  }
}

exports.searchClothing = async (req:Request,res:Response,next:NextFunction) => {
  try {
    const result = await prisma.clothing.findMany({
      skip: (Number(req.params.currentPage) -1) *Number(req.params.pageSize),
      where: {
        season: req.body.season,
        size: req.body.size,
        style: req.body.style,
        mood: req.body.mood,
        Trendy: req.body.Trendy,
        suitablePeople: req.body.suitablePeople,
        hotPoint: req.body.hotPoint,
        name:req.body.name
      }
    })
  } catch (error) {
    
  }
}

exports.updateClothingById = async (req:Request,res:Response,next:NextFunction) => {
  try {
    const result = await prisma.clothing.update({
      where: {
        id:req.params.id
      },
      data:req.body
    })

    if (result) {
      res.status(200).json(responseJson(true,"修改成功!",result))
    } else {
      res.status(400).json(responseJson(true,"修改失败!"))
    }
  } catch (error) {
    next(error)
  }
}

exports.deleteClothingById = async (req:Request,res:Response,next:NextFunction) => {
  try {
    const result = await prisma.clothing.delete({
      where: {
        id:req.params.id
      }
    })
    if (result) {
      res.status(204).json(responseJson(true,"删除成功!",result))
    } else {
      res.status(405).json(responseJson(false,"删除失败!"))
    }
  } catch (error) {
    next(error)    
  }
}

exports.createClothing = async (req:Request,res:Response,next:NextFunction) => {
  try {
    const result = await prisma.clothing.create({
      data:req.body
    })
    if (result) {
      res.status(201).json(responseJson(true,"新增成功!",result))
    } else {
      res.status(409).json(responseJson(false,"新增失败!"))
    }
  } catch (error) {
    next(error)
  }
}

exports.getClothingByName = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await prisma.clothing.findMany({
      skip: (Number(req.body.currentPage) -1) *Number(req.body.pageSize),
      where: {
        name: {
          equals:req.body.name
        }
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


