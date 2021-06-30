import React from 'react';
import { useRequest } from 'umi';
import get from 'lodash/get';
import Container from '@/components/Container';
import { getShowRealData } from './data';
import * as services from '@/services/smartMonitor';
import { getRealData } from '@/services/monitorManage';
import styles from './index.less';

export default React.memo(function RealData(props) {
  const { number, stationId, point, date, imei } = props;
  console.log(' RealData ： ', props); //
  const { data: list, loading: listLoading } = useRequest(
    // () => services.getRealData(number, stationId, point),
    () => getRealData({ imei }),
    {
      formatResult(res) {
        return get(res, 'bean', null);
      },
      // refreshDeps: [point, date],
      refreshDeps: [imei],
      ready: !!point,
    },
  );
  return (
    <Container>
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
