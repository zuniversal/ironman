import React, { useState, useEffect } from 'react';
import { tips, formatSelectList, filterObjSame } from '@/utils';

const useHttp = (http = () => {}, configs) => {
  const {
    init = [],
    params,
    attr = 'list',
    format = formatSelectList,
    withArr,
    withObj,
    noMountFetch,
    isObj,
  } = configs;

  const [data, setData] = useState(init);
  const [isLoading, setIsLoading] = useState(false);

  const handleRes = res => {
    const attrRes = attr ? res[attr] : res;
    let datas = format ? format(attrRes) : attrRes;
    if (withArr) {
      datas = [...datas, ...withArr];
    } else if (withObj || isObj) {
      datas = {
        ...datas,
        ...withObj,
      };
    }
    console.log(' handleRes   res,   ： ', res, attr, datas, configs);

    // console.log(' request  ： ', res, datas, isLoading    )
    setData(datas);
    setIsLoading(false);
  };

  const req = async request => {
    console.log(' req request ： ', request, http, configs);
    setIsLoading(true);
    const res = await request();
    handleRes(res);
  };

  useEffect(() => {
    console.log(' useHttp useEffect  ： ', params);
    if (!noMountFetch) {
      const asyncFn = async () => {
        const res = await http();
        handleRes(res);
      };
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
