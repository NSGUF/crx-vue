import "reflect-metadata";
import {createConnection} from "typeorm";
import * as Koa from "koa";
import * as Router from "koa-router";
import * as bodyParser from "koa-bodyparser";

const session = require("koa-session2");
import {AppRoutes} from "./routes";
import User from './entity/user';
import {tools} from "./controller"
import {getAjaxResponse, crypt} from "./utils/tools"

// create connection with database
// note that its not active database connection
// TypeORM creates you connection pull to uses connections from pull on your requests
createConnection().then(async connection => {

  // create koa app
  const app = new Koa();
  const router: any = new Router();

  router.all('/*', tools.defense);

  // register all application routes
  AppRoutes.forEach(route => router[route.method](route.path, route.action));

  // run app
  app.use(session({
    key: "SESSIONID",   //default "koa:sess"
  }));

  // 未登录拦截
  app.use(async (ctx, next) => {
    const whiteArr = ['/captcha', '/login', '/register', '/users']
    if (ctx.session.user) {// 如果登录了
      var sign = ctx.cookies.get('sign');
      var correctSign = crypt.cryptUserId(ctx.session.user.id);
      if (correctSign !== sign) {// 如果登录的
        ctx.body = getAjaxResponse({
          error: 2,
          msg: '验证有误'
        })
      } else {
        await next()
      }
    } else if (whiteArr.indexOf(ctx.request.path) > -1) {
      await next()
    } else {
      ctx.body = getAjaxResponse({
        error: 2,
        msg: '请先登陆'
      })
    }
  })

  app.use(bodyParser());
  app.use(router.routes());
  app.use(router.allowedMethods());
  app.listen(5010);

  console.log("Koa application is up and running on port 5010");


}).catch(error => console.log("TypeORM connection error: ", error));
