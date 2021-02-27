import React, { useState, useEffect } from 'react';
import { tips } from '@/utils';

const useHttp = (
  http = () => {},
  { init, params, attr = 'list', format, withArr, withObj, noMountFetch },
) => {
  const [data, setData] = useState(init);
  const [isLoading, setIsLoading] = useState(false);

  const handleRes = res => {
    console.log(' handleRes   res,   ： ', res);
    const attrRes = attr ? res[attr] : res;
    let datas = format ? format(attrRes) : attrRes;
    if (withArr) {
      datas = [...datas, ...withArr];
    } else if (withObj) {
      datas = {
        ...datas,
        ...withObj,
      };
    }

    // console.log(' request  ： ', res, datas, isLoading    )
    setData(datas);
    setIsLoading(false);
  };

  const req = async request => {
    setIsLoading(true);
    const res = await request();
    handleRes(res);
  };

  useEffect(() => {
    console.log(' useHttp useEffect  ： ', params); //
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
