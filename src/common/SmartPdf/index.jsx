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
  Image,
  PDFViewer,
} from '@react-pdf/renderer';

Font.register({
  family: 'MicrosoftBlack',
  src: '/msyh.ttf',
  // src: './msyh.ttf',
  // src: '/static/assets/msyh.ttf',
});

const df = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
};
const dfc = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  flexWrap: 'wrap',
};
const dfcc = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
};
const contentBg = {
  borderWidth: 1,
  borderColor: '#d9d9d9',
  borderRadius: '2',
  backgroundColor: '#f5f5f5',
  paddingHorizontal: 5,
  paddingVertical: 5,
  width: 280,
};
const contentStyle = {
  width: '100%',
  textAlign: 'left',
  border: '5px solid red',
  display: 'inline-flex',
  // backgroundColor: 'pink',
  flex: 1,
  flex: 5,
  flex: 4,
  // paddingLeft: 0,
  flexWrap: 'wrap',
  // justifyContent: 'center',
  alignItems: 'flexStart',
  alignItems: 'center',
  ...df,
};

const styles = StyleSheet.create({
  // df,
  dfc,
  dfcc,
  page: {
    padding: 10,
  },
  row: {
    width: '100%',
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
    flexWrap: 'wrap',
    marginBottom: 5,
  },
  label: {
    textAlign: 'right',
    // backgroundColor: '#eee',
    flex: 1,
    flex: 2,
    flex: 2,
    padding: 9,
  },
  content: contentStyle,
  contentBg: {
    // ...contentStyle,
    ...contentBg,
    // justifyContent: 'center',
  },
  image: {
    width: 220,
    height: 124,
    marginRight: 5,
    marginBottom: 10,
    display: 'inline-flex',
    backgroundColor: 'grey',
    // padding: 9,
  },
});

const noContentConfig = ['Image'];

const getContent = props => {
  console.log(' getContent   props,   ： ', props);
  const { noContent = noContentConfig, formType = 'Text' } = props;
  const content = {
    // Text: <View style={styles.content}>
    //   <Text style={styles.text}>
    //     {props.label}
    //   </Text>
    // </View>,
    Text: <Text style={styles.text}>{props.label}</Text>,
    Image: (
      <View style={styles.df}>
        <Image style={styles.image} src="/dog.jpg" />
        <Image style={styles.image} src="/dog.jpg" />
      </View>
    ),
  }[formType];

  const matchItem = noContent.includes(formType) ? (
    <View
      style={styles.content}
      wrap
      // debug
    >
      {content}
    </View>
  ) : (
    <View
      style={styles.content}
      wrap
      // debug
    >
      <View
        style={styles.contentBg}
        wrap
        // debug
      >
        {content}
      </View>
    </View>
  );

  return matchItem;
};

const useCreatePdf = config => {
  console.log(' useCreatePdf   config,   ： ', config);
  const com = config.map((v, i) => (
    <View
      style={[
        styles.row,
        // styles.dfc
      ]}
      key={i}
    >
      <Text style={styles.label}>{v.label}</Text>
      {getContent(v)}
    </View>
  ));
  return com;
};

const SmartPdf = props => {
  const { config = [] } = props;
  const com = useCreatePdf(config);
  console.log(' com  config.map v ： ', props, com);
  const viewer = (
    <PDFViewer className={`smartPdfWrapper`}>
      <Document className={`docs`}>
        <Page style={styles.page}>
          {com}
          {/* {props.children} */}
        </Page>
      </Document>
    </PDFViewer>
  );

  return viewer;
  const download = (
    <PDFDownloadLink document={<MyDoc />} fileName="somename.pdf">
      {({ blob, url, loading, error }) =>
        loading ? 'Loading document...' : 'Download now!'
      }
    </PDFDownloadLink>
  );
  return download;
  // return <div className={`smartPdfWrapper`}>
  //   <PDFViewer className={`smartPdfWrapper`} >
  //     <Document className={`docs`}>
  //       <Page>
  //         {props.children}
  //       </Page>
  //     </Document>
  //   </PDFViewer>
  //   {/* <PDFDownloadLink document={<MyDoc />} fileName="somename.pdf">
  //     {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
  //   </PDFDownloadLink> */}
  // </div>;
};

export default SmartPdf;
