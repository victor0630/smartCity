/**
 * axios请求拦截器
 * 
 */

import axios from 'axios';
import qs from 'qs';
import { Toast } from 'vant';
let defaultConfig = {
  headers: {
    "Content-Type": "application/json"
  },
  timeout : 50000,
  withCredentials : true
};
let HTTP = axios.create(defaultConfig);
//拦截器
HTTP.interceptors.request.use((config) => {
  //config.data = qs.stringify(config.data);
  let token = sessionStorage.getItem("token");
  if (token) {
    config.headers.token = token;
  }
  return config;
}, (error) => { //404等问题可以在这里处理
  return Promise.reject(error);
});
HTTP.interceptors.response.use((response) => { //返回状态判断
  if (judgeRquest(response)) {
    let error = {
      code: 601,
      message: response.data.msg
    }
    return Promise.reject(error)
  }
  return response;
}, (error) => { //404等问题可以在这里处理
  if (error && error.response) {
    switch (error.response.status) {
      case 400:
      //case 401:
      case 403:
      case 404:
      case 408:
        
        break;
      case 500:
        
        break;
      case 501:
       
        break
      case 502:
       
        break
      case 503:
      
        break
      case 504:
        
        break
      case 505:
       
        break
      case 401:
        
        
        break;
      default:
        
        break;
    }
  }
  //Toast(error.response.data.msg);
  return Promise.reject(error);
})


function judgeRquest (response) {

  if (response.data.code && response.data.code != "0") {
    Toast(response.data.msg);
    return true;
  }

  if (response.data.returnCode == 0) {
    Toast(response.data.msg);
    return true;
  }

  return false;

}

export default {
  post(url , param  , config ){
    return new Promise((resolve, reject) => {
      HTTP.post(url,param,config)
        .then(response => {
          resolve(response);
        }, err => {
          reject(err);
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  get(url , param , config ){
    url =  url + "?" + qs.stringify(param);
    return new Promise((resolve, reject) => {
      HTTP.get(url,config)
        .then(response => {
          resolve(response);
        }, err => {
          reject(err);
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  put(url , param , config ){
    return new Promise((resolve, reject) => {
      HTTP.put(url,param,config)
        .then(response => {
          resolve(response);
        }, err => {
          reject(err);
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  delete(url , param , config ){
    return new Promise((resolve, reject) => {
      HTTP.delete(url,config)
        .then(response => {
          resolve(response);
        }, err => {
          reject(err);
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  patch(url , param , config ){
    return new Promise((resolve, reject) => {
      HTTP.patch(url, param, config)
        .then(response => {
          resolve(response);
        }, err => {
          reject(err);
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  postForm(url, params = {},config={}){
    let urlParams =  qs.stringify(params,{indices: false});
    return new Promise((resolve, reject) => {
      HTTP.post(url+"?"+urlParams, null, config)
        .then(response => {
          resolve(response);
        }, err => {
          reject(err);
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  all(requests,callback){
    return new Promise((resolve, reject) => {
      axios.all(requests)
        .then(axios.spread(callback))
        .catch((error) => {
          reject(error)
        })
    })
  },

  
};


