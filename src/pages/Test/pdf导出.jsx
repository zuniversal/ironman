import React from 'react';
// import InspectRecordForm from '@/components/Form/InspectRecordForm'; //
import AppraiseForm from '@/components/Form/AppraiseForm'; //

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

const names = 'zyb';

// const MyDoc = () => <AppraiseForm></AppraiseForm>

const config = [
  {
    formType: 'rowText',
    itemProps: {
      label: '基本信息',
    },
  },
  {
    itemProps: {
      label: '标题',
      name: 'name',
    },
  },
  {
    itemProps: {
      label: '类型',
      name: 'type',
    },
  },
  {
    itemProps: {
      label: '状态',
      name: 'status',
    },
  },
  {
    itemProps: {
      label: '创建时间',
      name: 'created_time',
    },
  },
  {
    formType: 'rowText',
    itemProps: {
      label: '反馈信息',
    },
  },
  // {
  //   itemProps: {
  //     label: '反馈人',
  //     name: ['task', 'contacts'],
  //   },
  // },
  // {
  //   itemProps: {
  //     label: '反馈电话',
  //     name: ['task', 'contacts_phone'],
  //   },
  // },
  // {
  //   itemProps: {
  //     label: '详细内容',
  //     name: ['task', 'describe'],
  //   },
  // },
];

const MyDoc = () => (
  <Document>
    <Page style={styles.body}>
      {/* <InspectRecordForm init={{}} ></InspectRecordForm>; */}
      {config.map((v, i) => (
        <Text style={styles.header} key={i}>
          pdfpdf
          {/* {names} */}
        </Text>
      ))}
      <Text style={styles.header}>
        ~ Created with react-pdf ~{names}
        {/* <AppraiseForm></AppraiseForm> */}
      </Text>
    </Page>
    <View style={styles.section}>
      {/* <div>ssssssss</div> */}
      {/* <AppraiseForm></AppraiseForm> */}
    </View>
  </Document>
);

const App = () => (
  <div>
    {/* <MyDoc></MyDoc> */}
    <PDFDownloadLink document={<MyDoc />} fileName="somename.pdf">
      {({ blob, url, loading, error }) => {
        console.log(' AppAppApp myExpenseBar ：', blob, url, loading, error);
        return loading ? 'Loading document...' : 'Download now!';
      }}
    </PDFDownloadLink>
  </div>
);

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Oswald',
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: 'Oswald',
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Times-Roman',
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
});

const MyDocs = () => ReactPDF.render(<MyDoc />);

const App2 = () => (
  <PDFViewer>
    <MyDoc />
  </PDFViewer>
);

// export default MyDocs
export default App2;
// export default App
// export default AppraiseForm
