import React, { useEffect } from 'react';
import './style.less';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Topology } from '@topology/core';
import * as screenServices from '@/services/screen';
import CreatePortal from '@/components/Portal/CreatePortal';
import { powerPointItemMap } from '@/configs';

let canvas;
let x, y;

const getPowerPoint = data => {
  const res = data.map(v => [v.id, v.data.powerPoint]).filter(v => v[1]);
  return res;
};

const showPowerPointData = (data, powerPoints) => {
  const powerPointsRes = powerPoints.map(v => v.value);
  const penIdList = powerPointsRes.map(v => v[0]);
  const powerPointsData = powerPointsRes.map(v => v[1]);
  data.forEach(v => {
    penIdList.forEach((penId, index) => {
      if (v.id == penId) {
        const { powerPointKey = [] } = v.data;
        const dataKey = powerPointKey;
        if (powerPointKey.length > 0) {
          const powerPointsStr = dataKey
            .map(
              key =>
                `${powerPointItemMap[key]}`.padEnd(10, ' ') +
                `${powerPointsData[index][key] ?? '无'}`,
            )
            .join(`\n`);
          v.text = powerPointsStr;
        }
      }
    });
  });
};

const Preview = props => {
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

  useEffect(() => {
    const canvasOptions = {
      rotateCursor: '/rotate.cur',
      locked: 1,
    };
    canvas = new Topology('topology-canvas-preview', canvasOptions);
    props.data.locked = 1;
    canvas.open(props.data);

    onHandleFit();
  }, []);

  useEffect(() => {
    const powerPoint = getPowerPoint(props.data.pens);
    const getPowerPointRealList = async params => {
      const [penId, point_id] = params;
      const res = await screenServices.getPowerPointRealList({
        power_station_id: props.realParams.powerstation_id,
        number: props.realParams.number,
        point_id,
      });
      return [penId, res.bean];
    };

    let timer = null;

    const handleRequest = async () => {
      if (powerPoint.length) {
        const res = await Promise.allSettled(
          powerPoint.map(v => getPowerPointRealList(v)),
        );
        showPowerPointData(props.data.pens, res);
        canvas.open(props.data);
      } else {
        clearInterval(timer);
      }
    };
    timer = setInterval(handleRequest, 10000);
    return () => {
      clearInterval(timer);
    };
  }, [props.data, props.show]);

  return (
    <CreatePortal show={props.show}>
      <div className="btnBlock">
        <CloseCircleOutlined onClick={props.togglePreview} />
      </div>
      <div id="topology-canvas-preview" className={'previewContainer'}></div>
    </CreatePortal>
  );
};

export default Preview;
