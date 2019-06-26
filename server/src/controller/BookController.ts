import {BaseContext} from 'koa'
import User from "../entity/user"
import {getAjaxResponse} from "../utils/tools"
import {getManager, Repository} from 'typeorm'


export default class BookController {
  public static async updateBookmarks(ctx: BaseContext) {
    const userRepository: Repository<User> = getManager().getRepository(User);
    const userToBeUpdated: User = {...ctx.session.user};
    userToBeUpdated.bookmarks = ctx.request.body.bookmarks;
    const user = await userRepository.update(userToBeUpdated.id, userToBeUpdated);
    ctx.session.user = userToBeUpdated
    ctx.body = getAjaxResponse({
      error: 0,
      msg: '更新成功',
    });
  }

  public static async isNeedUpdate(ctx: BaseContext) {

  }


  public static async bookmarks(ctx: BaseContext) {
    ctx.body = getAjaxResponse({
      data: ctx.session.user.bookmarks
    })
  }
}
