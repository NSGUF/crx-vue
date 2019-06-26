import { ErrorType } from "./enums"

const KEY = '#da9%@!#(lfsa#$%';
export const crypt = {
  cryptUserId: (userId: any) => {
    const crypto = require('crypto');
    const sign = crypto.createHmac('sha256', KEY);
    sign.update(userId + '');
    return sign.digest('hex');
  }
}

export const md5 = (str: string) => {
  const crypto = require('crypto');
  const md5Hash = crypto.createHash('md5');
  md5Hash.update(str);
  return md5Hash.digest('hex');
}

export const password = {
  getPasswordFromText: (username: string, password: string) => {
    var SUGAR = '!@FDSA^U^FSAFDAH^*#@';
    return md5(username + SUGAR + password);
  },
  getSalt: () => {
    return md5(Math.random() * 999999 + '' + new Date().getTime());
  },
  encryptPassword: (salt: string, password: string) => {
    return md5(salt + 'af@!93$20128#@#@' + password);
  }
};

interface AjaxResponse {
  /**
   * 状态码
   * @type { number }
   */
  error?: number;

  /**
   * 数据
   * @type { any }
   */
  data?: any;

  /**
   * 消息
   * @type { string }
   */
  msg?: string
}
const defaultAjaxResponse:AjaxResponse = {
  error: ErrorType.OK,
  data: null,
  msg: '',
}

export const getAjaxResponse = (ajaxResponse:AjaxResponse) => {
  return {...defaultAjaxResponse, ...ajaxResponse}
}
