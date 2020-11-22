import React, { useEffect } from 'react';
import './style.less';
// import ExportHeader from './ExportHeader';
import ReactDOM from 'react-dom';
import { Button } from 'antd';

const ExportPdf = props => {
  console.log(' ExportPdfExportPdf ： ', props); //
  const { goBack, onClose } = props; //
  // const print = () => {
  //   console.log(' printprint   ,   ： ',   )
  //   props.print()
  //   window.print();
  // }

  useEffect(() => {
    console.log(' ExportPdf useEffect ： '); //
    window.print();
  }, []);
  // }, [props.children, ]);

  window.onafterprint = e => {
    console.log('    closecloseclose ： ', e);
    onClose();
  };
  return ReactDOM.createPortal(
    <div className={'exportPdfWrapper  '}>
      <div className={'exportPdf  '}>
        <div className="pdfContent">{props.children}</div>
        {/* <div className="pdfContent">{props.children}</div> */}
      </div>
    </div>,
    document.getElementById('root'),
  );
};

ExportPdf.defaultProps = {};

export default ExportPdf;
