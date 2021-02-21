import React, { useEffect } from 'react';
import { Topology } from '@topology/core';
import { PageHeader, Button } from 'antd';
import datas from './data.json'; //

let canvas;
let x, y;

const Preview = props => {
  const { history } = props; //

  useEffect(() => {
    const canvasOptions = {
      rotateCursor: '/rotate.cur',
      locked: 1,
    };
    canvas = new Topology('topology-canvas-preview', canvasOptions);
    datas.locked = 1;
    canvas.open(datas);
    // props.data.locked = 1;
    // canvas.open(props.data);
    // }, [props.data]);
  }, []);

  /**
   * 自动适应窗口大小
   */

  const onHandleFit = () => {
    const rect = canvas.getRect();
    rect.calcCenter();
    x = document.body.clientWidth / 2 - rect.center.x;
    y = (document.body.clientHeight - 66) / 2 - rect.center.y;
    canvas.translate(x, y);
  };

  /**
   * 实际大小
   */

  const onHandlePre = () => {
    canvas.translate(-x, -y);
    x = 0;
    y = 0;
  };

  return (
    <>
      <PageHeader
        style={{
          border: '1px solid rgb(235, 237, 240)',
        }}
        extra={[
          <Button type="primary" key="2" onClick={() => onHandleFit()}>
            自动适应窗口大小
          </Button>,
          <Button key="1" onClick={() => onHandlePre()}>
            实际大小
          </Button>,
        ]}
        onBack={() =>
          history.push({
            pathname: '/',
            state: { data: datas, from: '/preview' },
          })
        }
        title="返回画板"
        subTitle="预览"
      />
      <div
        id="topology-canvas-preview"
        style={{ height: 'calc(100vh - 66px)', width: '100vw' }}
      />
    </>
  );
};

export default Preview;
