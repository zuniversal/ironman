import React, { useState, useEffect } from 'react';
import { tips, formatSelectList, filterObjSame } from '@/utils';

export const formatSelectList2 = (
  data = [],
  labelKey = 'name',
  idKey = 'id',
) => {
  console.log(' formatSelectList2 res ： ', data, labelKey, idKey);
};
// const callFn = (...args) => {
//   console.log(' formatSelectList2 callFn   ', args);
//   formatSelectList2([111], ...args);
// };
// callFn('aa', 'bb');

const useHttp = (http = () => {}, configs = {}) => {
  const {
    init = [], // 数据的初始值
    params,
    attr = 'list', // 数据的固定格式属性
    format = formatSelectList, // 格式化函数
    formatKey,
    formatVal, // 格式化方法的键和值文本
    withArr,
    withObj,
    noMountFetch, // 挂载是否不默认发出请求
    isObj,
    ifReq = true, // 是否请求
  } = configs;
  // console.log(' useHttp ： ', configs,   )//

  const [data, setData] = useState(init);
  const [isLoading, setIsLoading] = useState(false);

  // 数据结果处理函数
  const handleRes = res => {
    setIsLoading(false);
    const attrRes = attr ? res[attr] : res; // 返回数结果值 是否使用 配置的属性值获取
    let datas = format ? format(attrRes, formatVal, formatKey) : attrRes;

    // 如果配置需要跟数据结果一起的数据 解构合并
    if (withArr) {
      datas = [...datas, ...withArr];
    } else if (withObj || isObj) {
      // 如果是对象
      datas = {
        ...datas,
        ...withObj,
      };
    }
    // console.log(' handleRes   res,   ： ', res, attr, datas, configs);

    // console.log(' request  ： ', res, datas, isLoading    )
    setData(datas);
  };

  // 手动调用 该请求钩子的请求方法使得外部可以继续使用该钩子返回的结果值 接收一个返回 promise 的方法 异步请求方法里可以手动传入请求参数
  // 该方法自动 调用该异步方法 并且调用钩子的系统处理函数自动 保存到钩子的state 数据里
  const req = async request => {
    console.log(' req requestrequest ： ', request, http, configs);
    setIsLoading(true);
    if (request) {
      handleRes(await request());
    }
  };

  // 挂载默认请求钩子
  useEffect(() => {
    if (!noMountFetch && ifReq) {
      setIsLoading(true);
      const asyncFn = async () => handleRes(await http());
      asyncFn();
    }
  }, []);

  return {
    data,
    setData,
    isLoading,
    loading: isLoading,
    req,
    request: req,
  };
};

export default useHttp;
