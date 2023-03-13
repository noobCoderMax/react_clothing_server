import express, { Request, Response } from "express";
const getSvg = require("../middleware/codeSvg");
const router = express.Router();
const otherController = require('../controller/other')

router.get("/codeImg", async (req: Request | any, res: Response) => {
  let svg = getSvg.getSvgCode();
  res.type("image/svg+xml");
  req.session.svgCode = svg.text.toLowerCase();
  res.status(200).send(svg.data);
});

router.get("/qntoken", otherController.qiniuToken);

module.exports = router;
