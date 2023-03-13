import express from "express";
const router = express.Router();
const clothingController = require('../controller/clothing')

// 根据id获取服装信息
router.get("/:id", clothingController.getClothingById)

// 根据id修改服装信息
router.patch("/:id",clothingController.updateClothingById)

// 根据id删除服装信息
router.delete("/:id",clothingController.deleteClothingById)

// 新增服装信息
router.post("/create",clothingController.createClothing)

// 条件查询服装信息(复杂)
router.post("/search", clothingController.searchClothing)

// 名称查询
router.post("/name",clothingController.getClothingByName)

module.exports = router