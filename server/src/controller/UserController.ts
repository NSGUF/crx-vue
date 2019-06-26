import {getManager, Repository, Not, Equal} from 'typeorm'
import {BaseContext} from 'koa'
import {validate, ValidationError} from 'class-validator'
import User from '../entity/user'
import {password, getAjaxResponse, crypt} from "../utils/tools"
import {ErrorType} from "../utils/enums"

export default class UserController {

  public static async getUsers(ctx: BaseContext) {
    const userRepository: Repository<User> = getManager().getRepository(User);
    const users: User[] = await userRepository.find();
    ctx.body = getAjaxResponse({data: users});
  }

  public static async getUser(ctx: BaseContext) {
    const user: User = ctx.session.user
    if(user) {
      ctx.body = getAjaxResponse({
        data: user
      })
    }else {
      ctx.body = getAjaxResponse({
        error: 1,
        msg: '请登陆',
      })
    }
  }

  public static async register(ctx: BaseContext) {
    if (ctx.session.code.toLowerCase() === ctx.request.body.code) {
      const userRepository: Repository<User> = getManager().getRepository(User);
      const userToBeSaved: User = new User();
      userToBeSaved.username = ctx.request.body.username;
      userToBeSaved.password = ctx.request.body.password;
      userToBeSaved.bookmarks = []
      userToBeSaved.salt = password.getSalt()
      const newPassword = password.getPasswordFromText(userToBeSaved.username, userToBeSaved.password)
      userToBeSaved.password = password.encryptPassword(userToBeSaved.salt, newPassword);


      // const errors: ValidationError[] = await validate(userToBeSaved); // errors is an array of validation errors

      /*if (errors.length > 0) {
        // return BAD REQUEST status code and errors array
        ctx.status = 400;
        ctx.body = errors;
      } else */
      if (await userRepository.findOne({username: userToBeSaved.username})) {
        // return BAD REQUEST status code and email already exists error
        ctx.status = 200;
        ctx.body = getAjaxResponse({
          error: ErrorType.ERROR,
          msg: '用户名已经被占用'
        });
      } else {
        const user = await userRepository.save(userToBeSaved);
        // return CREATED status code and updated user
        ctx.status = 200;
        ctx.body = getAjaxResponse({msg: '添加成功'});
      }
    } else {
      ctx.body = getAjaxResponse({error: 1, msg: '验证码输入错误'});
    }
  }

  public static async deleteUser(ctx: BaseContext) {

    // get a user repository to perform operations with user
    const userRepository = getManager().getRepository(User);

    // find the user by specified id
    const userToRemove: User = await userRepository.findOne(+ctx.params.id || 0);
    if (!userToRemove) {
      // return a BAD REQUEST status code and error message
      ctx.status = 400;
      ctx.body = 'The user you are trying to delete doesn\'t exist in the db';
    } else if (ctx.state.user.id !== userToRemove.id) {
      // check user's token id and user id are the same
      // if not, return a FORBIDDEN status code and error message
      ctx.status = 403;
      ctx.body = 'A user can only be deleted by himself';
    } else {
      // the user is there so can be removed
      await userRepository.remove(userToRemove);
      // return a NO CONTENT status code
      ctx.status = 204;
    }

  }

  public static async doLogin(ctx: BaseContext) {
    const data = ctx.request.body;
    const userRepository: Repository<User> = getManager().getRepository(User);
    const user: User = await userRepository.findOne({username: data.username})

    if (ctx.session.code.toLowerCase() !== data.code.toLowerCase()) {
      if (user) {
        let salt = user.salt
        if (!salt) {
          salt = password.getSalt()
          const newPassword = password.getPasswordFromText(user.username, user.password)
          let encryptedPassword = password.encryptPassword(salt, newPassword)
          user.salt = salt
          user.password = encryptedPassword
          await userRepository.save(user)
          console.log('没有salt，更新密码成功');
        }

        const newPassword = password.getPasswordFromText(data.username, data.password)
        let encryptedPassword = password.encryptPassword(salt, newPassword)

        if (user.password !== encryptedPassword) {
          ctx.status = 200
          ctx.body = getAjaxResponse({
            error: ErrorType.ERROR,
            msg: '密码输入错误'
          })
        } else {
          ctx.session.user = user
          ctx.cookies.set('sign', crypt.cryptUserId(user.id), {
            httpOnly:false
          });
          ctx.status = 200;
          ctx.body = getAjaxResponse({
            data: user,
            msg: '登录成功'
          });
        }
      } else {
        ctx.body = getAjaxResponse({
          error: 1,
          msg: '该用户名还没有注册，请先注册'
        });
      }
    } else {
      ctx.body = getAjaxResponse({
        error: 1,
        msg: '验证码输入错误'
      });
    }
  }
}
