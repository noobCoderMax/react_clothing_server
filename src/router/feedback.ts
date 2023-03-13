import express from "express";
const router = express.Router();
const feedBackController = require('../controller/feedback')

router.post('/get', feedBackController.getFeedBacks)

router.post('/new',feedBackController.createFeedBack)

router.delete('/:id', feedBackController.deleteFeedBackById)

router.post('/ids', feedBackController.deleteFeedBackByIds)

router.get("/:userId",feedBackController.getFeedBackByUserId)

module.exports = router
