import React from 'react';
import './style.less';
import { Timeline, Steps } from 'antd';

const { Step } = Steps;

const InspectMissionTimeline = props => {
  console.log(' InspectMissionTimeline   props, ,   ： ', props);
  return (
    <Steps
      size={'small'}
      direction="vertical"
      current={props.datas.length}
      className={'inspectMissionTimeline'}
    >
      {props.datas.map((v, i) => (
        // <Step title={v.title} description={v.description} key={i} />
        <Step
          title={v.created_time.split('T')[0]}
          description={v.content}
          key={i}
        />
      ))}
    </Steps>
  );
};

export default InspectMissionTimeline; //
