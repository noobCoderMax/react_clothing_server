import express from "express";
const router = express.Router();
const auth = require("../middleware/auth");
const userController = require("../controller/user");
const userValidator = require("../validator/user")

// 用户注册
router.post("/rigister", userValidator.register, userController.register);

// 用户登录（邮箱+密码）
router.post("/login", userValidator.login, userController.login);

// 用户登录（邮箱+邮箱验证码）
// router.post("/loginEmail", userController.loginCode);

// 获取当前用户信息
router.get("/current", auth, userController.getCurrentUser);

// 用户信息修改
router.put(
  "/updateInfo",
  auth,
  userController.updateUser
);

// 用户密码修改
// router.post(
//   "/updatePsw",
//   auth,
//   userValidator.updatePsw,
//   userController.updatePwd
// );

// 获取邮箱验证码
router.post("/getEmailCode", userController.getEmailCode);

// <--管理端接口-->

// 根据ID获取用户
router.get("/:id", userController.getUserById);

// 根据ID删除用户
router.delete("/:id", userController.deleteUserById);

// 添加用户
// router.post("/new", userController.addUser);

// 分页获取用户
router.get("/:currentPage/:pageSize", userController.getUserByPage);

module.exports = router;
