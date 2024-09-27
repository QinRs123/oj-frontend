/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
// Add a request interceptor
import axios from "axios";
import store from "@/store";



axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    const token = store.state.user.loginUser.id as any;
    console.log(token)
        //如果token中有值，在携带
        if(token !== null){
            config.headers.token=token
        }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log("response:",response);
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });