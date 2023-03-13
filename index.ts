import express, { Express, Request, Response,NextFunction } from 'express';
import responseJson from './src/middleware/resopnseJson';
const bodyParser = require('body-parser');
const session = require("express-session");
const cros = require("cors");
const app: Express = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
const Port = process.env.PORT || 5555

const userRouter = require('./src/router/user')
const otherRouter = require('./src/router/other')
const clothingRouter = require('./src/router/clothing')
const traderRouter = require('./src/router/trader')
const feedBackRouter = require('./src/router/feedback')
const historyRouter = require('./src/router/history')

app.use(cros({
  origin: "http://127.0.0.1:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  maxAge: 60 * 60,
}));

app.use(
  session({
    secret: "test", //服务器生成 session 签名，可以随意写
    resave: true, //强制保存 session 即使它没有变化，不配置会有提示
    saveUninitialized: true, //强制将未初始化的 session 存储
    cookie: {
      maxAge: 1000 * 60 * 60,
      // secure: false, //设置为true，表示只有https协议才能访问
    },
    rolling: true, //常用属性，刷新过期时间，或者说重新设置过期时间，
  })
);

app.use("/user",userRouter)
app.use("/other",otherRouter)
app.use("/clothing",clothingRouter)
app.use("/trader", traderRouter)
app.use("/feedback", feedBackRouter)
app.use("/history",historyRouter)

// 在所有路由之后处理404内容
app.use("/*", (req:Request,res: Response) => {
  res.status(404).json(responseJson(false,"404 Not Found"))
});

app.listen(Port, function (){
  console.log(`Server is running on port ${Port} `);
})