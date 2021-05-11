import React, { useEffect } from 'react';
import { useRequest } from 'umi';
import get from 'lodash/get';
import Container from '@/components/Container';
import { getShowRealData } from './data';
import * as services from '@/services/monitorManage';
import useHttp from '@/hooks/useHttp';
import styles from './index.less';

export default React.memo(function RealData(props) {
  const { imei } = props;

  const commonParams = {
    init: {},
    attr: 'bean',
    // noMountFetch: true,
    format: null,
  };

  const { data: list, loading: listLoading, req: getRealDataAsync } = useHttp(
    () => services.getRealData({ imei }),
    commonParams,
  );
  console.log(' list ： ', list);
  useEffect(() => {
    let timer = null;
    timer = setInterval(
      () => getRealDataAsync(() => services.getRealData({ imei })),
      10000,
    );
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Container loading={listLoading}>
      <div className={styles.list}>
        {getShowRealData(list).map((item, index) => {
          return (
            <div className={styles.item} key={index}>
              <div className={styles.itemLabel}>{item.label}</div>
              <div className={styles.itemValue}>{item.value}</div>
            </div>
          );
        })}
      </div>
    </Container>
  );
});
