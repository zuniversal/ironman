import React, { Component } from 'react';
import './style.less';
import ReactPDF, {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  StyleSheet,
  Font,
  View,
  PDFViewer,
} from '@react-pdf/renderer';

Font.register({
  family: 'MicrosoftBlack',
  src: '/msyh.ttf',
  // src: './msyh.ttf',
  // src: '/static/assets/msyh.ttf',
});

const SmartPdf = props => {
  return (
    <div className={`smartPdfWrapper`}>
      <PDFViewer className={`smartPdfWrapper`}>
        <Document className={`docs`}>
          <Page>{props.children}</Page>
        </Document>
      </PDFViewer>
      {/* <PDFDownloadLink document={<MyDoc />} fileName="somename.pdf">
      {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
    </PDFDownloadLink> */}
    </div>
  );
};

export default SmartPdf;
