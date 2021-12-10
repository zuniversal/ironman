import React from 'react';
import PropTypes from 'prop-types';
import { Descriptions } from 'antd';

// 通用的描详情内容的 描述性组件 传入配置 自动生成相应内容
const DescriptionsCom = props => {
  console.log(' DescriptionsCom ： ', props);
  const { config, size, column } = props;

  return (
    <Descriptions size={size} column={column}>
      {config.map((v, i) => (
        <Descriptions.Item label={`${v.label}${v.noColon ? ': ' : ''}`} key={i}>
          {v.value}
        </Descriptions.Item>
      ))}
    </Descriptions>
  );
};

DescriptionsCom.defaultProps = {
  config: [], // 描述内容的配置
  size: 'small', //
  column: 3, //
  noColon: false, //   是否禁用默认的 冒号文本
};

DescriptionsCom.propTypes = {
  config: PropTypes.array,
  size: PropTypes.string,
  column: PropTypes.number,
  noColon: PropTypes.bool,
};

export default DescriptionsCom;
