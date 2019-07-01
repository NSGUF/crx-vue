import axios from 'axios';
import { AxiosRequestConfig, Method, AxiosResponse } from 'axios'
// import {HashHistory} from "react-router-dom";
import {optionUrl} from "@/utils/config"


const tips: any = {
  1: '抱歉，出现了一个错误',
};

export default class Httpjs {
  options: AxiosRequestConfig | undefined;

  request(options: AxiosRequestConfig) {
    return new Promise((resolve, reject) => {
      this.requestExe(options.url || '', resolve, reject, options.data, options.method);
    });
  }

  requestExe(url: string, resolve: Function, reject: Function, data = {}, method: Method = 'GET') {
    const config: AxiosRequestConfig = {
      method: method,
      url: optionUrl + url,
    };

    if (method.toLocaleLowerCase() === 'get') config.params = data;
    else config.data = data;

    axios(config).then((response: AxiosResponse) => {
      const {data} = response;
      if (data.error === 0) {
        resolve(data);
      } else {
        reject(data);
        this.showError(data.error);
      }
    })
      .catch((response: AxiosResponse) => {
        const {data} = response;
        console.log(response);
        reject(data);
        this.showError(1);
      });
  }

  showError(errorCode: number) {
    console.log(tips[errorCode]);
  }

  uploadFile(options: AxiosRequestConfig) {
    this.options = options;
    return new Promise((resolve, reject) => {
      const config = {headers: {'Content-Type': 'multipart/form-data'}};
      // console.log(options.data)
      axios.post(options.url||'', options.data, config).then((response: AxiosResponse) => {
        const {data} = response;
        resolve(data);
      }).catch((response) => {
        // console.log(response)
      });
    });
  }
}
