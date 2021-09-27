import React from 'react';
import './style.less';
import { Row, Col } from 'antd';

const ClientRemark = props => {
  console.log('    ClientRemark ： ', props);
  return (
    <Row gutter={[20, 20]} className={`clientRemark`}>
      <Col span={2}>
        <div className={``}>备注：</div>
      </Col>

      <Col span={22}>
        {props.clientRemarkList.map((v, i) => (
          <div className={``} key={i}>
            {v.createdTime} {v.username} 备注： {v.content}
          </div>
        ))}
      </Col>
    </Row>
  );
};

export default ClientRemark;
