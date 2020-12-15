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
import SmartPdf from '@/common/SmartPdf';

import './style.less';
const names = 'zyb';

const config = [
  // {
  //   formType: 'Text',
  //   itemProps: {
  //     label: '基本信息',
  //   },
  //   label: '基本信息',
  // },
  // {
  //   formType: 'Text',
  //   itemProps: {
  //     label: '标题',
  //     name: 'name',
  //   },
  //   label: '基本信息',
  // },
  // {
  //   formType: 'Text',
  //   itemProps: {
  //     label: '类型',
  //     name: 'type',
  //   },
  //   label: '基本信息',
  // },
  // {
  //   formType: 'Text',
  //   itemProps: {
  //     label: '状态',
  //     name: 'status',
  //   },
  //   label: '基本信息',
  // },
  // {
  //   formType: 'Text',
  //   itemProps: {
  //     label: '创建时间',
  //     name: 'created_time',
  //   },
  //   label: '基本信息',
  // },
  // {
  //   formType: 'Text',
  //   itemProps: {
  //     label: '反馈信息',
  //   },
  //   label: '基本信息',
  // },
  // {
  //   formType: 'Text',
  //   itemProps: {
  //     label: '反馈人',
  //     name: ['task', 'contacts'],
  //   },
  //   label: '基本信息',
  // },
  {
    formType: 'Text',
    itemProps: {
      label: '反馈电话',
      name: ['task', 'contacts_phone'],
    },
    label: '基本信息',
  },
  {
    formType: 'Image',
    itemProps: {
      label: '详细内容',
      name: ['task', 'describe'],
    },
    label: '图片',
  },
];

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
  padding: 10,
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

const noContentConfig = ['Image'];
const WeakFormPdf = () => {
  const getContent = item => {
    const { noContent = noContentConfig, formType } = item;

    const content = {
      // Text: <View style={styles.content}>
      //   <Text style={styles.text}>
      //     {item.itemProps.label}
      //   </Text>
      // </View>,
      Text: <Text style={styles.text}>{item.itemProps.label}</Text>,
      Image: (
        <View style={styles.df}>
          <Image style={styles.image} src="/dog.jpg" />
          <Image style={styles.image} src="/dog.jpg" />
        </View>
      ),
    }[formType];

    return noContent.includes(formType) ? (
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
  };
  return <SmartPdf config={config}></SmartPdf>;

  return (
    <div className={`wrapper`}>
      <SmartPdf config={config}>
        {/* {config.map((v, i) => ( */}
        {[...config, ...config].map((v, i) => (
          <View
            style={[
              styles.row,
              // styles.dfc
            ]}
            key={i}
          >
            {/* <View style={styles.row} key={i}> */}
            <Text style={styles.label}>{v.itemProps.label}</Text>
            {getContent(v)}
            {/* {getContent(v)} */}
          </View>
        ))}
        <Text style={styles.header}>~ Creat我我ed with react-pdf ~我我</Text>
      </SmartPdf>
    </div>
  );
};
const styles = StyleSheet.create({
  // df,
  dfc,
  dfcc,
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

export default WeakFormPdf; //
