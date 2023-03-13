const validate = require("../middleware/validate");
import { body} from "express-validator";
const md5 = require("../middleware/md5");
import prisma from '../utils/prisma'

exports.register = validate([
  body("userName")
    .notEmpty()
    .withMessage("用户名不能为空"),
  body("password")
    .notEmpty()
    .withMessage("密码不能为空")
    .isLength({ min: 6, max: 16 })
    .withMessage("密码最小长度为6,最大长度为16"),
  body("email")
    .notEmpty()
    .withMessage("邮箱不能为空")
    .isEmail()
    .withMessage("邮箱格式不正确")
    .bail()
    .custom(async (email) => {
      const user = await prisma.user.findUnique({
        where: {
          email:email
        }
      })
      if (user) {
        return Promise.reject("邮箱已存在！");
      }
    }),
]);

exports.login = [
  validate([
    body("email")
      .notEmpty()
      .withMessage("邮箱不能为空")
      .isEmail()
      .withMessage("邮箱格式不正确"),
    body("password")
      .notEmpty()
      .withMessage("密码不能为空")
      .isLength({ min: 6, max: 16 })
      .withMessage("密码格式不正确！"),
    body("svgCode").notEmpty().withMessage("验证码不能为空"),
  ]),
  validate([
    body("svgCode").custom((svgCode: string, { req }) => {
      // console.log("req.session" + new Date(), req.session);
      // console.log("req.body" + new Date(), req.body);
      // if (svgCode.toLowerCase() !== req.session.svgCode) {
      //   return Promise.reject("验证码错误！");
      // }
      return true;
    }),
  ]),
];

exports.updatePsw = [
  validate([
    body("email")
      .notEmpty()
      .withMessage("邮箱不能为空")
      .isEmail()
      .withMessage("邮箱格式不正确"),
    body("password").notEmpty().withMessage("密码不能为空"),
  ]),
  validate([
    body("email").custom(async (email, { req }) => {
      const user = await prisma.user.findUnique({
        where: {
          email:email
        }
      })
      if (!user) {
        return Promise.reject("用户不存在！");
      }
      return true;
    }),
  ]),
];

exports.updateInfo = [
  validate([
    body("email")
      .notEmpty()
      .withMessage("邮箱不能为空")
      .isEmail()
      .withMessage("邮箱格式不正确"),
  ]),
  validate([
    body("email").custom(async (email, { req }) => {
      const user = await prisma.user.findUnique({
        where: {
          email:email
        }
      })
      if (!user) {
        return Promise.reject("用户不存在！");
      }
      return true;
    }),
  ]),
];
