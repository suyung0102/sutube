import express from "express";
// 콘솔용 미들웨어
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
// 본문을 해석하는 미들웨어, 폼orAjax
import bodyParser from "body-parser";
import passport from "passport";
import mongoose from "mongoose";
// 세션 관리용 미들웨어
import session from "express-session";
import MongoStore from "connect-mongo";
import { localsMiddleware } from "./middlewares";
import routes from "./routes";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import apiRouter from "./routers/apiRouter";
import "./passport";

const app = express();
const CokieStore = MongoStore(session);

app.use(helmet());
// view템플릿중 하나, 과거 jade로 사용, 들여쓰기 주의
app.set("view engine", "pug");
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// 요청에 대한 정보를 콘솔에 기록
// 인자에 따라 콘솔에 나오는 정보가 다르다
// dev일 경우 HTTP요청, 주소, 응답속도, 응답바이트가 나온다
app.use(morgan("dev"));
// cookieParser 보다 뒤에두는것이 좋음, 1.5버전이상이면 상관없음
app.use(
  session({
    secret: process.env.COOKIE_SECRET, // 필수항목, cookie-parser의 비밀키와 같은 역할
    resave: true, // 요청이 왔을 때 세션에 수정사항이 생기지 않더라도 세션을 다시 저장할지에 대한 설정
    saveUninitialized: false, // 세션에 저장할 내역이 없더라도 세션을 저장할지에 대한 설정
    store: new CokieStore({
      // 메모리에 셔션을 저장함, 서버재시작시 메모리가 초기화되므로 DB와 연결필요
      mongooseConnection: mongoose.connection,
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(localsMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);
app.use(routes.api, apiRouter);

export default app;
