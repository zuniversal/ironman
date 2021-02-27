import React, { useState, useEffect } from 'react';
import './style.less';
import { Topology, Node } from '@topology/core';
import { PageHeader, Button } from 'antd';
// import datas from './data.json'; //
import * as screenServices from '@/services/screen';
import CreatePortal from '@/components/Portal/CreatePortal';
import { powerPointItemMap } from '@/configs';

let canvas;
let x, y;

const getPowerPoint = data => {
  console.log(' getPowerPoint   ,   ： ', data);
  // const res = data.map((v) => ({
  //   [v.id]: v.powerPoint,
  //   // [v.id]: 1,
  // }))
  const res = data
    .map(v => [v.id, v.data.powerPoint])
    // [v.id, 1,]
    // [v.id]: 1,
    .filter(v => {
      console.log(' getPowerPoint res v ： ', v); //
      return v[1];
    });
  console.log(' res  data.map v ： ', res);
  // const res = data.filter((v) => ({
  //   // [v.id]: v.powerPoint,
  //   [v.id]: 1,
  // }))
  console.log(' res  data.filter v ： ', res);
  return res;
};

const showPowerPointData = (data, powerPoints) => {
  console.log(' showPowerPointData   ,   ： ', data, powerPoints);
  const powerPointsRes = powerPoints.map(v => v.value);
  const penIdList = powerPointsRes.map(v => v[0]);
  const powerPointsData = powerPointsRes.map(v => v[1]);
  console.log(
    ' showPowerPointData res  powerPointsData.map v ： ',
    powerPointsRes,
    penIdList,
    powerPointsData,
  );
  data.forEach(v => {
    // v.text = 'zzzzzz\nsssss\n' + `aaa\n`
    penIdList.forEach((penId, index) => {
      if (v.id == penId) {
        const { powerPointKey = [] } = v.data;
        const dataKey = powerPointKey;
        if (powerPointKey.length > 0) {
          // const powerPointsStr = dataKey.map((key) => `${powerPointItemMap[key]}`.padEnd(10, ' ') + `${Math.random()}`).join(`\n`)
          const powerPointsStr = dataKey
            .map(
              key =>
                `${powerPointItemMap[key]}`.padEnd(10, ' ') +
                `${powerPointsData[index][key] ?? '无'}`,
            )
            .join(`\n`);
          v.text = powerPointsStr;
          console.log(
            ' showPowerPointData  ressss , 相等   ： ',
            data,
            powerPoints,
            powerPointsStr,
          );
        }
      }
    });
  });
};

const Preview = props => {
  const { history } = props; //
  console.log(' Preview ： ', props); //
  const [show, setShow] = useState(true);

  useEffect(() => {
    console.log(' Preview  useEffect  ： ', props); //
    const canvasOptions = {
      rotateCursor: '/rotate.cur',
      locked: 1,
    };
    canvas = new Topology('topology-canvas-preview', canvasOptions);
    props.data.locked = 1;
    canvas.open(props.data);
    setTimeout(() => {
      console.log('  animateanimate 延时器 ： ');
      props.data.pens.forEach((v, i) => {
        console.log(' animateanimate v ： ', v, i, v.animateType);
        // if (v.animateType) {
        //   v.animatePlay()
        //   console.log(' animateanimate v22 ： ', v, i, v.animateType, )
        // }
        // v.animatePlay = false
        return;
        v.animateFrames = [];
        v.fillStyle = '';
        v.rotate = '';
        const state = Node.cloneState(v);
        if (v.animateType) {
          state.rect.x -= 5;
          state.rect.ex += 5;
          state.rect.y -= 5;
          state.rect.ey += 5;
          state.rect.width += 5;
          state.rect.height += 10;
          v.animateFrames.push({
            duration: 100,
            linear: true,
            state: Node.cloneState(state),
          });
          v.animateDuration = 0;
          for (const item of v.animateFrames) {
            v.animateDuration += item.duration;
          }
          v.animatePlay = true;
          console.log(' animateanimate v22 ： ', v, i, v.animateType);
          // canvas.animate();
        }
      });
    }, 2000);

    // props.data.locked = 1;
    // canvas.open(props.data);
    // }, [props.data]);
  }, []);

  useEffect(() => {
    console.log(' useEffect 监测点数据 副作用 ： '); //
    // return
    const powerPoint = getPowerPoint(props.data.pens);
    console.log('  powerPoint ：', powerPoint); //
    const getPowerPointRealList = async params => {
      console.log(' getPowerPointRealList ： ', params);
      const [penId, point_id] = params;
      const res = await screenServices.getPowerPointRealList({
        // powerstation_id: '11238',
        // number: '0061859369',
        power_station_id: props.realParams.powerstation_id,
        number: props.realParams.number,
        point_id,
      });
      console.log('  res await 结果  ：', res, params, penId, point_id); //
      return [penId, res.bean];
    };

    let timer = null;

    const handleRequest = async () => {
      if (powerPoint.length) {
        console.log(
          ' getPowerPointRealList handleRequesthandleRequest ： ',
          timer,
          props,
        ); //
        // const res = await Promise.allSettled(powerPoint.map((v) => getPowerPointRealList(Object.entries(v)[0])))
        const res = await Promise.allSettled(
          powerPoint.map(v => getPowerPointRealList(v)),
        );
        console.log(' res  powerPoint.map v ： ', props, res, powerPoint);
        // res.forEach((v) => {
        //   console.log(' res  powerPoint.map v forEach ： ', res, v.value,  )
        //   // console.log(' res  powerPoint.map v forEach ： ', res, v.value, Object.entries(v.value), Object.keys(v.value),  Object.values(v.value), )
        // })
        showPowerPointData(props.data.pens, res);
        // props.data.pens.forEach((v) => canvas.updateProps(v))
        canvas.open(props.data);
        console.log(
          ' showPowerPointData  ressss 222 ,   ： ',
          props.data,
          props,
        );
      } else {
        clearInterval(timer);
      }
    };
    // handleRequest()
    timer = setInterval(handleRequest, 10000);
    return () => {
      console.log(' getPowerPointRealList 清楚副作用 ： ', timer, props); //
      clearInterval(timer);
    };
  }, [props.data, props.show]);

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

  const onBack = () => {
    props.toggleIsPreview();
  };

  return (
    <CreatePortal show={show}>
      {props.children}
      <div id="topology-canvas-preview" className={'previewContainer'}></div>
    </CreatePortal>
  );
  return (
    <div id="topology-canvas-preview" className={'previewContainer'}></div>
  );

  return (
    <div className={'previewPanel'}>
      <PageHeader
        extra={[
          <Button type="primary" key="2" onClick={() => onHandleFit()}>
            自动适应窗口大小
          </Button>,
          // <Button key="1" onClick={() => onHandlePre()}>
          //   实际大小
          // </Button>,
        ]}
        onBack={onBack}
        title="返回画板"
        subTitle="预览"
      />
      <div id="topology-canvas-preview" className={'container'}></div>
    </div>
  );
};

export default Preview;
