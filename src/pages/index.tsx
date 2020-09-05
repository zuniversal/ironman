import React from 'react';
import { connect } from 'umi';
import { Button } from 'antd';
import styles from './index.less';

// example
const Home = ({ homeExample }) => {
  return (
    <div>
      <Button type="primary">{homeExample.text}</Button>
    </div>
  );
};

export default connect(({ homeExample }) => ({ homeExample }))(Home);
