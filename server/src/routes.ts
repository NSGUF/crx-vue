import * as controller from './controller/index'


/**
 * All application routes.
 */
const bookmarks = [
  {
    path: '/bookmarks',
    method: 'get',
    action: controller.bookmarks.bookmarks
  },
  {
    path: '/update/bookmarks',
    method: 'post',
    action: controller.bookmarks.updateBookmarks
  }
]

export const AppRoutes = [
  {
    path: "/users",
    method: "get",
    action: controller.user.getUsers
  },
  {
    path: "/register",
    method: "post",
    action: controller.user.register
  },
  {
    path: "/user",
    method: "get",
    action: controller.user.getUser
  },
  {
    path: "/delete/:id",
    method: "post",
    action: controller.user.deleteUser
  },
  {
    path: "/login",
    method: 'post',
    action: controller.user.doLogin
  },
  {
    path: "/captcha",
    method: 'get',
    action: controller.tools.captcha
  },
].concat(bookmarks);


