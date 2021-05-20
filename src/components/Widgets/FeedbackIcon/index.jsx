import React from 'react';
import './style.less';
import { Form, Input } from 'antd';
import Icon from '@/components/Widgets/Icons';

const FeedbackIcon = props => {
  console.log(' FeedbackIcon   props, ,   ： ', props);
  return (
    <div className="feedbackIcon dfc">
      <div className="iconWrapper ">
        <Icon icon={props.icon} />
      </div>
      {props.feedbackContent}
    </div>
  );
};

export default FeedbackIcon;
