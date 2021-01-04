import React, { useState, useEffect } from 'react';
import './style.less';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import html2pdf from 'html2pdf.js';

const useSmartExportPdf = props => {
  const [isExport, setIsExport] = useState(false);

  const exportPdf = props => {
    console.log(' exportPdf ： ', props); //
    // 要导出的dom节点，注意如果使用class控制样式，一定css规则
    // const element = document.getElementsByClassName('ant-modal-body')[0]
    // const element = document.getElementsByClassName('inspectRecordForm')[0]
    // const element = document.getElementsByClassName()[0]
    const { element: ele } = props;
    const element = document.getElementById(ele);
    console.log(' exportPdf element ： ', element); //
    // 导出配置
    const opt = {
      mode: 'avoid-all',
      pagebreak: {
        mode: ['avoid-all', 'css', 'legacy'],
      },
      margin: 1,
      filename: '导出的pdf名称',
      image: { type: 'jpeg', quality: 0.98 }, // 导出的图片质量和格式
      html2canvas: { scale: 1, useCORS: true }, // useCORS很重要，解决文档中图片跨域问题
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };
    if (element) {
      html2pdf()
        .set(opt)
        .from(element)
        .save(); // 导出
      console.log(' finish ： ', props.finish); //
      props.finish && props.finish(); //
      setIsExport(false);
    }
  };

  useEffect(() => {
    if (props.isExportPDF && !isExport) {
      // setTimeout(() => {
      setIsExport(true);
      exportPdf(props);
      // }, 1000);
      // }, 0);
    }
  }, [props.isExportPDF, isExport]);
  return;

  let element = document.body;
  let { height } = getComputedStyle(element, false);
  let { width } = getComputedStyle(element, false);
  let canvas = document.createElement('canvas');

  setTimeout(() => {
    console.log('  props 延时器 ： ', props);
    exportPdf(props);
    return;
    // html2canvas(document.body).then(canvas => {
    html2canvas(document.getElementsByClassName('ant-modal-body')[0]).then(
      canvas => {
        console.log(' canvas ： ', canvas); //
        //通过html2canvas将html渲染成canvas，然后获取图片数据
        let imgData = canvas.toDataURL('image/jpeg', 1.0);
        // console.log(imgData);
        console.log(canvas.width, canvas.height);
        //初始化pdf，设置相应格式
        let doc = new jsPDF('p', 'mm', 'a4');
        // let doc = new jsPDF('', 'pt', 'a4')

        //这里设置的是a4纸张尺寸
        doc.addImage(imgData, 'JPEG', 0, 0, 210, 297);
        // doc.addImage(imgData, 'JPEG', 0, 0,200,200);

        //输出保存命名为content的pdf
        doc.save('report.pdf');
        // document.body.appendChild(canvas);
        // new pdfMake.createPdf(docDefinition).download(fileName + ".pdf");

        // canvas.width = parseInt(width, 10);
        // canvas.height = parseInt(height, 10);
        // let context = canvas.getContext('2d');
        // context.scale(2, 2);
        // let pdf = new jsPDF('', 'pt', 'a4');
        // context.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
        // let pdfWidth = canvas.width;
        // let pdfHeight = canvas.height;
        // let pageHeight = pdfWidth / 592.28 * 841.89;
        // let leftHeight = pdfHeight;
        // let position = 0;
        // let imgWidth = 595.28;
        // let imgHeight = 592.28 / pdfWidth * pdfHeight;
        // let pageData = canvas.toDataURL('image/jpeg', 1.0);
        // if (leftHeight < pageHeight) {
        //   pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
        // } else {
        //   while (leftHeight > 0) {
        //     pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight);
        //     leftHeight -= pageHeight;
        //     position -= 841.89;
        //     if (leftHeight > 0) {
        //       pdf.addPage();
        //     }
        //   }
        // }
        // pdf.save('report.pdf');
      },
    );
  }, 1000);
  // }, 0)

  return <div className={``}>{/* smartPdfWrapper */}</div>;
};

export default useSmartExportPdf;
