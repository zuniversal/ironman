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

import './style.less';
const names = 'zyb';

const config = [
  {
    formType: 'rowText',
    itemProps: {
      label: '基本信息',
    },
    label: '基本信息',
  },
  {
    itemProps: {
      label: '标题',
      name: 'name',
    },
    label: '基本信息',
  },
  {
    itemProps: {
      label: '类型',
      name: 'type',
    },
    label: '基本信息',
  },
  {
    itemProps: {
      label: '状态',
      name: 'status',
    },
    label: '基本信息',
  },
  {
    itemProps: {
      label: '创建时间',
      name: 'created_time',
    },
    label: '基本信息',
  },
  {
    formType: 'rowText',
    itemProps: {
      label: '反馈信息',
    },
    label: '基本信息',
  },
  {
    itemProps: {
      label: '反馈人',
      name: ['task', 'contacts'],
    },
    label: '基本信息',
  },
  {
    itemProps: {
      label: '反馈电话',
      name: ['task', 'contacts_phone'],
    },
    label: '基本信息',
  },
  {
    itemProps: {
      label: '详细内容',
      name: ['task', 'describe'],
    },
    label: '基本信息',
  },
];

const MyDoc = () => (
  <Document className={`docs`}>
    <Page>
      {config.map((v, i) => (
        <Text style={styles.header} key={i}>
          {/* {v.itemProps.label} */}
          {`${v.label}`}我我我我我我我我我我我
        </Text>
      ))}
      <Text style={styles.header}>
        ~ Creat我我ed with react-pdf ~我我
        {/* {names} */}
        {/* <AppraiseForm></AppraiseForm> */}
      </Text>
    </Page>
  </Document>
);

const App = () => (
  <div className={`wrapper`}>
    <PDFViewer>
      <MyDoc />
    </PDFViewer>
    {/* <PDFDownloadLink document={<MyDoc />} fileName="somename.pdf">
      {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
    </PDFDownloadLink> */}
  </div>
);
Font.register({
  family: 'MicrosoftBlack',
  src: '/msyh.ttf',
});

// Font.register({
//   family: 'Oswald',
//   src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
// });

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    // fontFamily: 'Oswald'
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    // fontFamily: 'Oswald'
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
    // fontFamily: 'MicrosoftBlack'
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

export default App; //
