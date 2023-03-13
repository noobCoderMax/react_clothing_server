import express from "express";
const router = express.Router();
const auth = require("../middleware/auth");
const traderController = require("../controller/trader")

// 根据id查询
router.get("/:id",traderController.getTraderById)

// 根据id删除
router.delete("/:id",traderController.deleteTraderById)

// 根据id修改
router.patch("/:id",traderController.updateTraderById)

// 分页查询用户
router.post("/search",traderController.getTraderByPages)

// 新建用户
router.post("/create",traderController.createTrader)

module.exports = router