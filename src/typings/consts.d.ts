declare  namespace Response{
  // 请求接口数据
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
}
