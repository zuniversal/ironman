import React, { useState, useEffect } from 'react';
import { tips } from '@/utils';

const useHttp = (
  // http: () => {},
  http = () => {},
  { init, params, attr = 'list', format, withArr, withObj, noMountFetch },
) => {
  const [data, setData] = useState(init);
  const [isLoading, setIsLoading] = useState(false);

  const request = async data => {
    setIsLoading(true);
    const res = await http(data);
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

  useEffect(() => {
    console.log(' useHttp useEffect  ： ', params); //
    if (!noMountFetch) {
      request(params);
    }
  }, []);

  return {
    data,
    setData,
    isLoading,
    loading: isLoading,
    request,
    req: request,
  };
};

export default useHttp;
