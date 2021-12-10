import React, { useEffect } from 'react';
import './style.less';
import { assetDetailConfig } from '@/configs';
import useHttp from '@/hooks/useHttp';
import { getAssetDetail } from '@/services/assets';
import { Card, Descriptions, Spin, Divider } from 'antd';
import { history } from 'umi';
import { setItem } from '@/utils';
import { ANIMATE } from '@/constants';

const AssetDetail = props => {
  const { id, token } = history.location.query;
  setItem('token', token, true);
  console.log(' AssetDetail token ： ', token);

  const { data = {}, loading } = useHttp(() => getAssetDetail({ d_id: id }), {
    attr: 'bean',
    format: data => {
      console.log(' AssetDetail format ： ', data);
      return data;
    },
    noMountFetch: !id,
  });
  console.log(' AssetDetail ： ', props, loading, data, history, id);

  const planContractDesc = (
    <Descriptions>
      {assetDetailConfig.map((v, i) => (
        <Descriptions.Item {...v} key={i}>
          {v.dataMap ? v.dataMap[data[v.value]] : data[v.value]} {v.unit}
          {/* {v.value} */}
        </Descriptions.Item>
      ))}
    </Descriptions>
  );

  return (
    <div className={' assetDetailDescWrapper '}>
      <Spin spinning={loading} tip="加载中...">
        <Card title="资产详情" className={ANIMATE.bounceIn}>
          {planContractDesc}
        </Card>
      </Spin>
    </div>
  );
};

export default AssetDetail;
