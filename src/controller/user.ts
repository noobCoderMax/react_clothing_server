import { NextFunction, Request, Response } from "express";
import responseJson from "../middleware/resopnseJson";
import prisma from '../utils/prisma'
const { sendEmail } = require("node-send-email");
const { jwtSecret } = require("../config/config.default");
const jwt = require("../middleware/jwt");


// 新用户注册
exports.register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newUser = await prisma.user.create({
      data: req.body,
      select: {
        id:true,
        userName: true,
        avator: true,
        email: true,
        sign: true,
        birth: true,
        gender: true,
        address: true,
        tips: true,
        createTime:true,
        updateTime:true
      }
    })
    if (newUser) {
      res.status(201).json(responseJson(true,"注册成功！",newUser))
    } else {
      res.status(400).json(responseJson(false,"注册失败！",newUser))
    }
  } catch (error) {
    next(error)
  }
}

// 用户登录 （邮箱+密码）
exports.login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await prisma.user.findFirstOrThrow({
      where: {
        email: req.body.email,
        password:req.body.password
      },
      select: {
        id:true,
        userName: true,
        avator: true,
        email: true,
        sign: true,
        birth: true,
        gender: true,
        address: true,
        tips: true,
        createTime:true,
        updateTime:true
      }
    })

    if (user) {
      const token = await jwt.jwtSighSync(
        {
          userId: user.id,
        },
        jwtSecret,
        { expiresIn: 60 * 60 * 24 }
      );
      const result = {
        user,
        token
      }
      res.status(200).json(responseJson(true,"登录成功！",result))
    } else {
      res.status(404).json(responseJson(false,"登录失败,请检查邮箱或密码是否正确！"))
    }



  } catch (error) {
    next(error)
  }
}

// 根据token获取当前用户
exports.getCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    
  } catch (error) {
    next(error)
  }
}

// 修改用户信息
exports.updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await prisma.user.update({
      where: {
        id:req.body.id
      },
      data: {
        avator: req.body.avator,
        userName: req.body.userName,
        sign: req.body.sign,
        gender: req.body.gender,
        birth:req.body.birth
      }
    })

    if (result) {
      res.status(201).json(responseJson(true,"修改信息成功！",result))
    } else {
      res.status(400).json(responseJson(false,"修改信息失败！"))
    }

  } catch (error) {
    next(error)
  }
}

// 发送邮箱验证码
exports.getEmailCode = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const code = String(Math.floor(Math.random() * 1000000)).padEnd(6, "0"); //生成随机验证码
    const userEmail = req.body.email;
    const params = {
      //邮箱类型，@qq.com就传qq，@163.com就是传163，不传的话默认为qq，
      //其余类型可以在node_modules/node-send-email/lib/service.js中找到。
      type: "qq",
      // 发件人
      name: "荐衣阁",
      // 发件箱，要与收件箱邮箱类型一致
      from: "1914275425@qq.com",
      // 发件箱smtp,需要去邮箱—设置–账户–POP3/SMTP服务—开启—获取stmp授权码
      smtp: "gcmkvsvdvrocfbaf",
      // 发送的邮件标题
      subject: "邮箱验证码",
      // 收件箱，要与发件箱邮箱类型一致
      to: userEmail,
      // 邮件内容，HTML格式
      html: `
          <p>您好！</p>
          <p>您的验证码是：<strong style="color:orangered;">${code}</strong></p>
          <p>如果不是您本人操作，请无视此邮件</p>
      `,
    };

    await sendEmail(params, (result: any) => {
      if (result) {
        res.status(200).send(responseJson(true,"发送验证码成功,请注意查看！"));
      } else {
        res.status(500).send(responseJson(false,"发送验证码失败！"));
      }
    });
  } catch (error) {
    next(error)
  }
}

// 根据Id获取
exports.getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await prisma.user.findUnique({
      where: {
        id:req.params.id
      }
    })
    if (result) {
      res.status(200).json(responseJson(true,"获取用户信息成功!",result))
    } else {
      res.status(404).json(responseJson(false,"获取用户信息失败!"))
    }
  } catch (error) {
    next(error)
  }
}

// 根据Id删除
exports.deleteUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await prisma.user.delete({
      where: {
        id:req.params.id
      }
    })
    if (result) {
      res.status(200).json(responseJson(true,"删除用户信息成功!",result))
    } else {
      res.status(500).json(responseJson(false,"删除用户信息失败!"))
    }

  } catch (error) {
    next(error)
  }
}

// 未完成
exports.getUserByPage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const lists = await prisma.user.findMany({
      skip: (Number(req.body.currentPage) - 1) * Number(req.body.pageSize),
    })

    if (lists) {
      res.status(200).json(responseJson(true,"获取列表成功!",lists))
    } else {
      res.status(404).json(responseJson(false,"获取列表息失败!"))
    }
  } catch (error) {
    next(error)
  }
}