import {getManager, Repository} from 'typeorm'
import {BaseContext} from 'koa'
import User from "../entity/user"
import {getAjaxResponse} from "../utils/tools"

export default class ToolsController {
  public static async defense(ctx: BaseContext, next: Function) {
    ctx.set('X-XSS-Protection', '0');
    ctx.set('X-Frame-Options', 'DENY');
    // ctx.set(`Content-Security-Policy`, `script-src 'self' 'sha256-nIk3U+a69DO8a0GCyK2V/qcQHQ1Y/hkEZjg9CpNxEgQ='`)
    await next();
  }

  public static async captcha(ctx: BaseContext) {
    const svgCaptcha = require('svg-captcha');
    var captcha = svgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: 120,
      height: 34,
      background: "#cc9966"
    });
    ctx.session.code = captcha.text;
    ctx.response.type = 'image/svg+xml';
    ctx.body = captcha.data;
  };
}
