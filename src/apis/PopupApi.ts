import Httpjs from '../utils/httpjs';

export default class PopupApi extends Httpjs {

  getUserInfo() {
    return this.request({url: '/user'})
  }

  doLogin(data: any) {
    return this.request({url: '/login', method: 'post', data: data});
  }

  doRegiest(data: any) {
    return this.request({url: '/register', method: 'post', data: data});
  }

  getBookmarks() {
    return this.request({url: '/bookmarks'})
  }

  updateBookmarks(data: any) {
    return this.request({url: '/update/bookmarks', method: 'post', data})
  }

}
