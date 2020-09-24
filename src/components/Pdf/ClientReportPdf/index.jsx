import React from 'react';
import './style.less';
import { Button } from 'antd';

const ClientReportPdf = props => {
  console.log(' InspectPlanForm ： ', props); //

  return (
    <div className={'clientReportPdf dfc '}>
      <div className="pdfWrapper dfc ">PDF客户月度报告</div>
    </div>
  );
};

ClientReportPdf.defaultProps = {};

export default ClientReportPdf;
