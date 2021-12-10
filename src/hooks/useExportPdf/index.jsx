import React, { useState, useEffect } from 'react';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
import html2pdf from 'html2pdf.js';
import { tips, dataURLtoFile } from '@/utils';

const useSmartExportPdf = props => {
  const [isExport, setIsExport] = useState(false);

  const exportPdf = props => {
    console.log(' exportPdf ： ', props);
    // 要导出的dom节点，注意如果使用class控制样式，一定css规则
    // const element = document.getElementsByClassName('ant-modal-body')[0]
    // const element = document.getElementsByClassName('inspectRecordForm')[0]
    // const element = document.getElementsByClassName()[0]
    const {
      element: ele,
      exportText = 'PDF导出生成中，请稍等！',
      tipsText = 'PDF导出成功！',
      filename = 'PDF文件',
      option = {},
      isUpload,
    } = props;
    const idEle = document.getElementById(ele);
    const clsEle = document.getElementsByClassName(ele)[0];
    const element = idEle || clsEle;
    console.log(' exportPdf element ： ', element, clsEle);
    // 导出配置
    const opt = {
      mode: 'avoid-all',
      pagebreak: {
        mode: ['avoid-all', 'css', 'legacy'],
      },
      margin: [0.3, 0.2],
      filename,
      image: { type: 'jpeg', quality: 1 }, // 导出的图片质量和格式
      html2canvas: { scale: 2, useCORS: true }, // useCORS很重要，解决文档中图片跨域问题
      // jsPDF: { unit: 'px', format: 'A4', orientation: 'portrait' },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      ...option,
    };
    tips(exportText);
    // return
    if (element) {
      if (props.isUpload) {
        console.log(' finishfinish propsprops 结果 ： ', props);
        html2pdf()
          .set(opt)
          .from(element)
          .outputPdf('datauristring')
          // .save()
          .then(res => {
            console.log(' finishfinish res 结果 ： ', res);
            // let a = document.createElement('embed');
            // a.type="application/pdf"
            // a.src = res; // 设置下载的文件名，默认是'下载'
            // document.body.appendChild(a);

            const file = dataURLtoFile(res, filename + '.pdf'); //调用一下下面的转文件流函数
            console.log(' file ： ', file); //
            props.uploadCb({ file });
          });
      } else {
        html2pdf()
          .set(opt)
          .from(element)
          .save()
          .then(res => {
            console.log(' finish res  ： ', res);
            tips(tipsText);
            return res;
          }) // 导出
          .outputPdf(res => {
            console.log(' outputPdf finish res  ： ', res);
            tips(tipsText);
            return res;
          });
      }

      // const worker = html2pdf()
      //   .set(opt)
      //   .from(element)

      // worker.toPdf().get('pdf').then(function (pdfObj) {
      //   console.log(' finish  finishfinish ： ', props, pdfObj,  );
      //   const perBlob = pdfObj.output('blob');
      //   var formData = new FormData();
      //   // 这里调用后端接口
      // });

      // const worker = html2pdf()
      //   .set(opt)
      //   .from(element)
      //   // .save()
      //   .toPdf()
      //   .get('pdf')
      //   .then(pdfObj => {
      //     console.log(' finish res  ： ', res);
      //     pdfObj.autoPrint();
      //     pdfObj.output('dataurlnewwindow');
      //   });

      // var worker
      //   = html2pdf(element).toPdf()
      //   // .output(function (pdf) {
      //   .output("datauristring")
      //   .then(function (pdf) {
      //     console.log(' finish res222  ： ', res);
      //     pdf.save('filename');
      // });
      // = html2pdf(element).toPdf().get('pdf').then(function(pdf) {
      //     console.log(' finish res222  ： ', res);
      //     pdf.save('filename');
      // });
      // = html2pdf()
      //   .set(opt)
      //   .from(element)
      //   // .toPdf()
      //   // .output("datauristring")

      //   .outputPdf()
      //   .then(pdfObj => {
      //     console.log(' finish res  ： ', res);
      //     pdfObj.autoPrint();
      //     pdfObj.output('dataurlnewwindow');
      //   });

      console.log(' finish ： ', props, props.finish);
      props.finish && props.finish();
      setIsExport(false);
    }
  };

  useEffect(() => {
    if (props.isExportPDF && !isExport) {
      console.log(' finishfinish ： ', props, isExport);
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
    // html2canvas(document.getElementsByClassName('ant-modal-body')[0]).then(
    //   canvas => {
    //     console.log(' canvas ： ', canvas);
    //     //通过html2canvas将html渲染成canvas，然后获取图片数据
    //     let imgData = canvas.toDataURL('image/jpeg', 1.0);
    //     // console.log(imgData);
    //     console.log(canvas.width, canvas.height);
    //     //初始化pdf，设置相应格式
    //     let doc = new jsPDF('p', 'mm', 'a4');
    //     // let doc = new jsPDF('', 'pt', 'a4')

    //     //这里设置的是a4纸张尺寸
    //     doc.addImage(imgData, 'JPEG', 0, 0, 210, 297);
    //     // doc.addImage(imgData, 'JPEG', 0, 0,200,200);

    //     //输出保存命名为content的pdf
    //     doc.save('report.pdf');
    //     // document.body.appendChild(canvas);
    //     // new pdfMake.createPdf(docDefinition).download(fileName + ".pdf");

    //     // canvas.width = parseInt(width, 10);
    //     // canvas.height = parseInt(height, 10);
    //     // let context = canvas.getContext('2d');
    //     // context.scale(2, 2);
    //     // let pdf = new jsPDF('', 'pt', 'a4');
    //     // context.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
    //     // let pdfWidth = canvas.width;
    //     // let pdfHeight = canvas.height;
    //     // let pageHeight = pdfWidth / 592.28 * 841.89;
    //     // let leftHeight = pdfHeight;
    //     // let position = 0;
    //     // let imgWidth = 595.28;
    //     // let imgHeight = 592.28 / pdfWidth * pdfHeight;
    //     // let pageData = canvas.toDataURL('image/jpeg', 1.0);
    //     // if (leftHeight < pageHeight) {
    //     //   pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
    //     // } else {
    //     //   while (leftHeight > 0) {
    //     //     pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight);
    //     //     leftHeight -= pageHeight;
    //     //     position -= 841.89;
    //     //     if (leftHeight > 0) {
    //     //       pdf.addPage();
    //     //     }
    //     //   }
    //     // }
    //     // pdf.save('report.pdf');
    //   },
    // );
  }, 1000);
  // }, 0)

  return <div className={``}>{/* smartPdfWrapper */}</div>;
};

export default useSmartExportPdf;
