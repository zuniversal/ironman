import React, { PureComponent } from 'react';
import './style.less';
import { Button } from 'antd';
import AssetDetailDesc from '@/components/Description/AssetDetailDesc';
import { actions, mapStateToProps } from '@/models/assetsList';
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';

const TITLE = '资产';

const titleMap = {
  detail: `${TITLE}详情`,
};

// @connect(mapStateToProps)
// @SmartHOC({
//   actions,
//   titleMap,
// })
class AssetsList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      titleMap,
    };
  }
  renderAssetDetail = params => {
    return <AssetDetailDesc></AssetDetailDesc>;
  };

  render() {
    return <div className="">{this.renderAssetDetail()}</div>;
  }
}

export default AssetsList;
