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

const dfc = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
};
const dfcc = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
};

const styles = StyleSheet.create({
  // df,
  dfc,
  dfcc,
  row: {
    fontSize: 12,
    // marginBottom: 10,
    textAlign: 'center',
    color: '#333333',
    fontFamily: 'MicrosoftBlack', //
    display: 'flex',
    border: '1px solid black',
    // backgroundColor: 'red',
    // flexWrap: 'noWrap',
    flexDirection: 'row',
  },
  label: {
    width: 210,
    textAlign: 'right',
    // display: 'inline-flex',
    // backgroundColor: 'blue',
    flex: 1,
    flex: 2,
    flex: 2,
    padding: 9,
  },
  content: {
    width: 210,
    textAlign: 'left',
    border: '5px solid red',
    // borderWidth: 1,
    // borderColor: '#ccc',
    // borderColor: 'red',
    display: 'inline-flex',
    // backgroundColor: 'pink',
    flex: 1,
    flex: 5,
    flex: 3,
    padding: 9,
    paddingLeft: 0,
  },
  image: {
    width: 220,
    height: 124,
    marginRight: 10,
    marginBottom: 10,
    display: 'inline-flex',
    backgroundColor: 'grey',
    // padding: 9,
  },
});

const com = (
  <div className={`smartPdfWrapper`}>
    <PDFDownloadLink
      document={
        <Document className={`docs`}>
          <Page>
            {/* {props.children} */}
            <Text style={styles.row}>
              ~ Creat我我ed with react-pdf ~我我我我我我我我
            </Text>
          </Page>
        </Document>
      }
      fileName="somename.pdf"
    >
      {({ blob, url, loading, error }) =>
        loading ? 'Loading document...' : 'Download now!'
      }
    </PDFDownloadLink>
  </div>
);

const SmartPdf = props => {
  // return com
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
