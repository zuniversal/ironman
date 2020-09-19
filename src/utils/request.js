

import {httpTipsMap,    } from '@/configs'
import {URL, LOAD, LOUOUT} from '@/constants'
import {getToken, getItems, wrapParams, tipsConfirm, isUd, tips, getLang, removeItems,  } from '@/utils'
import axios from 'axios'
// axios.defaults.baseURL = URL
// axios.defaults.timeout = 30000
// axios.defaults.headers.common['Authorization'] = getItems('token')


// 封装的项目通用的 请求方法 操作    
// 支持 根据请求方式 自动判别是否显示操作 tips 

const instance = axios.create({
    baseURL: URL,
    // timeout: 5000,
    // timeout: 3000,
})

export class Request {
    http = null

    constructor() {
        this.http = instance// 
        // console.log(' super ： ',  )
        this.http.interceptors.request.use((config) => {
            // console.log('getToken() token ：', config, getToken(), getItems('token'),  )
            // config.headers.Authorization = getToken()
            // console.log('langlanglang LanguageLanguage：', getLang(),  )
            config.headers.Authorization = getItems('token')
            // this.http.store.dispatch({type: LOAD, data: true})
            //console.log(' codeExist 配置发送请求的信息 1s：', config, config.params, config.data, config.method, config.method === 'get' ? isUd(config.params) : isUd(config.data))
            config.data = wrapParams(config.data) 
            config.datas = wrapParams(config.method === 'get' ? config.params : config.data)
            // console.log(' 发送请求   ： ', config,  )// 
            return config
        }, (err) => Promise.reject(err))

        this.http.interceptors.response.use((res) => {
            // this.http.store.dispatch({type: LOAD, data: false})
            console.log(' 返回请求 ： ', res.data,   )// 
            tipsConfirm(res,  )
            // console.log(' 返回请求22s ： ', res.data,   )// 
            // return res.data
            return res.data.data
        }, (err) => {
            console.log(' 请求发生错误了：', err, err.message, err.response, {...err, }, )
            if (err.message.indexOf('timeout') > -1) {
                tips('请求超时！', 0)
            } else {
                console.log(' 错误 ： ', {...err.response},  err.response, err.response,    )// 
                // // tips(err.response != undefined ? err.response.data.message : 'o(╥﹏╥)o ' , 0)
                // if (err.response.status == 406) {
                //     tips(err.response && err.response.data.message ? err.response.data.message : '没有数据', 0)
                // } else if (err.response.status == 401) {
                // // } else if (err.status == 401) {
                //     // window.location.href = '#/login'
                //     tips(err.response.data.message ? err.response.data.message : err.response.data, 0)
                //     // tips(err.response.data, , 0)
                // } else {
                //     tips(err.response && err.response.data.message ? err.response.data.message : '失败 ', 0)
                // } 
            }
            return Promise.reject(err)
        })
        
    }
    
}


export const request = new Request()// 
const {http,  } = request
// console.log(' request ： ', request, URL, {...http},  )// 




export const get = (url, params) => http.get(url, {params: params})
export const post = (url, params, o) => http.post(url, params, o)
export const put = (url, params, o) => http.put(url, params, o)
export const remove = (url, params, o) => http.delete(url, params, o)

// 不显示 tips 的方法 
export const noTipsGet = (url, params) => http.get(url, {params: {...params, noTips: true}})
export const noTipsPost = (url, params) => http.post(url, {...params, noTips: true})
export const noTipsPut = (url, params) => http.put(url, {...params, noTips: true})
export const noTipsRemove = (url, params) => http.delete(url, {...params, noTips: true})



// export const blobPost = (url, params, o) => http.post(url, {...params, noTips: true}, o) 
export const blobPost = (url, params, o) => http({method: 'post', url, data: {...params, noTips: true, }, responseType: 'blob', })
export const blobGet = (url, params, o) => http({method: 'get', url, data: {...params, noTips: true, }, responseType: 'blob', })
















