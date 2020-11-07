import React from 'react';
import './style.less';
// import { Button } from 'antd';

const ExportPdf = props => {
  console.log(' ExportPdf ： ', props); //

  return (
    <div className={'exportPdfWrapper  '}>
      <div className="exportPdf dfc ">PDF客户月度告</div>
      <div className="pdfContent">{props.children}</div>
    </div>
  );
};

ExportPdf.defaultProps = {};

export default ExportPdf;
