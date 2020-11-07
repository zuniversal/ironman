import React from 'react';
import './style.less';
import { Button } from 'antd';

const InspectRecordPdf = props => {
  console.log(' InspectPlanForm ： ', props); //

  return (
    <div className={'inspectRecordPdf dfc '}>
      <div className="pdfWrapper dfc ">PDF客户月度报告</div>
    </div>
  );
};

InspectRecordPdf.defaultProps = {};

export default InspectRecordPdf;
