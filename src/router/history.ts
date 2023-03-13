import express from "express";
const router = express.Router();
const historyController = require('../controller/history')

router.get('/:userId/:currentPage/:pageSize', historyController.getHistorys)

router.post('/new', historyController.createHistory)

router.delete('/:id', historyController.deleteHistoryById)

router.get("/deleteAll/:userId",historyController.deleteAllHistory)

module.exports = router
