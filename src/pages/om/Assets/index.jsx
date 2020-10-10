import React, {
  Component,
  PureComponent,
  lazy,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import './style.less';

import {
  Form,
  Input,
  Button,
  Checkbox,
  Menu,
  Upload,
  Result,
  Typography,
  Divider,
} from 'antd';
import {
  UploadOutlined,
  PlusOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import SearchForm from '@/common/SearchForm'; //
import AssetsTable from '@/components/Table/AssetsTable'; //
import AssetsDetailTable from '@/components/Table/AssetsDetailTable'; //
import AssetsForm from '@/components/Form/AssetsForm'; //
import AssetsSearchForm from '@/components/Form/AssetsSearchForm'; //
import ResultModal from '@/components/Modal/ResultModal'; //
import SmartModal from '@/common/SmartModal'; //
import SmartFormModal from '@/common/SmartFormModal'; //
import DropDownBtn from '@/common/DropDownBtn'; //
import ErrorInfo from '@/components/Widgets/ErrorInfo';
import UploadFileCom from '@/components/Widgets/UploadFileCom'; //
import SuccResult from '@/components/Widgets/SuccResult'; //

import { actions, mapStateToProps } from '@/models/assets'; //
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';

const menuConfig = [
  {
    key: 'upload',
    clickFn: 'showUploadModal',
    action: 'upload',
    text: '上传文件',
  },
  {
    key: 'down',
    // clickFn: 'showResultModal',
    clickFn: 'downloadFile',
    action: 'down',
    text: '下载数据模板',
    downFile: 'OMS/equipment/getTemplate',
  },
];

export const TITLE = '资产';
export const DEVICE = '设备';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
  newRelated: `关联新增`,
  upload: `文件上传`,
  down: `文件下载`,
};

// const mapStateToProps = ({ assets, }) => assets;

@connect(mapStateToProps)
@SmartHOC({
  actions,
  titleMap,
  modalForm: AssetsForm,
})
class Assets extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      showResultModal: false,

      showModalCom: null,
      modalContent: null,

      action: '',
      title: '',
      assetsTitle: '',

      titleMap,

      newTbData: [],
    };
  }

  showResultModal = e => {
    console.log('    showResultModal ： ', e);
    this.setState({
      showResultModal: true,
    });
  };
  onResultModalCancel = e => {
    console.log('    onResultModalCancel ： ', e);
    this.setState({
      showResultModal: false,
    });
  };

  onUploadChange = params => {
    console.log(' onUploadChange,  , ： ', params);
    if (params.file.status === 'done') {
      setTimeout(() => {
        console.log('  延时器 ： ');
        this.setState({
          modalContent: <SuccResult></SuccResult>,
        });
      }, 2000);
    }
  };
  showUploadModal = params => {
    console.log('    showUploadModal ： ', params);
    //   const {item,  } = this.props//
    const { action } = params;

    this.setState({
      show: true,
      action,
      modalContent: (
        <UploadFileCom
          onChange={this.onUploadChange}
          label={titleMap[action]}
        ></UploadFileCom>
      ),
    });
  };
  downloadFile = params => {
    console.log('    downloadFile ： ', params);
    this.props.downloadFile();
  };

  menuClick = params => {
    const { key, clickFn } = params;
    console.log(' menuClick,  , ： ', params, this.state.titleMap, params.key);
    if (clickFn) {
      this[clickFn](params);
      return;
    }
  };

  onSubmit = (e, rest) => {
    console.log('    onSubmit ： ', e, rest);
  };
  onFail = (e, rest) => {
    console.log('    onFail ： ', e, rest);
  };

  showModal = (params = {}) => {
    console.log('    showModal ： ', params);
    this.setState({
      show: true,
      ...params,
    });
  };
  onOk = async (props = {}, ) => {
    console.log(' onOkonOk ： ', props, this.state, this.props); //
    const { form } = props; //

    try {
      const res = await form.validateFields();
      console.log('  res await 结果  ：', res); //
      const { newTbData } = this.state; //
      this.setState({
        show: false,
        newTbData: [res, ...newTbData],
      });
    } catch (error) {
      console.log(' error ： ', error); //
    }

    // form
    // .validateFields()
    // .then(values => {
    //   console.log('  values await 结果  ：', values,  )//
    //   form.resetFields();
    //   // onCreate(values);
    // })
    // .catch(info => {
    //   console.log('Validate Failed:', info);
    // });
  };
  onCancel = e => {
    console.log(' onCancel ： ', e, this.state, this.props); //
    this.setState({
      show: false,
    });
  };

  renderModalContent = e => {
    console.log('    renderModalContent ： ', e, this.state, this.props);
    const { modalContent } = this.state; //
    if (modalContent) {
      return modalContent;
    }

    // return null
  };

  renderFormBtn = params => {
    console.log(' renderFormBtn ： ', params); //
    return (
      <div className={'btnWrapper'}>
        <Button type="primary" onClick={() => this.props.search(params)}>
          搜索
        </Button>
        <DropDownBtn menuConfig={menuConfig} menuClick={this.menuClick}>
          Excel导入
        </DropDownBtn>
        <Button
          type="primary"
          htmlType="submit"
          onClick={this.props.syncOAAsync}
        >
          同步OA
        </Button>
        <Button
          type="primary"
          onClick={() => this.props.showFormModal({ action: 'add' })}
        >
          新增{TITLE}
        </Button>
        <Button type="primary" onClick={() => this.props.exportData()}>
          导出{TITLE}数据
        </Button>
        <Button type="primary" onClick={() => this.props.onBatchRemove()}>
          删除
        </Button>
      </div>
    );
  };
  renderSearchForm = params => {
    // console.log(' renderSearchForm ： ', params,  )
    return (
      <AssetsSearchForm
        formBtn={this.renderFormBtn}
        // onSubmit={this.onSubmit}
        // onFail={this.onFail}
      ></AssetsSearchForm>
    );
  }
  // renderSearchForm = params => {
  //   // console.log(' renderSearchForm ： ', params,  )
  //   return (
  //     <div className={' '}>
  //       <AssetsSearchForm></AssetsSearchForm>
  //       <Divider />
  //       <div className={'fsb '}>
  //         <SearchForm></SearchForm>
  //         <div className={'btnWrapper'}>
  //           <DropDownBtn menuConfig={menuConfig} menuClick={this.menuClick}>
  //             Excel导入
  //           </DropDownBtn>
  //           <Button
  //             type="primary"
  //             htmlType="submit"
  //             onClick={this.props.syncOAAsync}
  //           >
  //             同步OA
  //           </Button>
  //           <Button
  //             type="primary"
  //             onClick={() => this.props.showFormModal({ action: 'add' })}
  //           >
  //             新增{TITLE}
  //           </Button>
  //           <Button type="primary" onClick={() => this.props.exportData()}>
  //             导出{TITLE}数据
  //           </Button>
  //           <Button type="primary" onClick={() => this.props.onBatchRemove()}>
  //             删除
  //           </Button>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  showDetail = params => {
    console.log(' showDetail,  , ： ', params);
    this.setState({
      show: true,
      ...params,
      modalContent: <AssetsDetailTable></AssetsDetailTable>,
    });
  };
  renderTable = params => {
    console.log(' renderTable ： ', params, this.state, this.props);

    const tableProps = {
      newTbData: this.state.newTbData,

      onSelectChange: this.props.onSelectChange,
      tdClick: this.props.showFormModal,
      showDetail: this.showDetail,
      // showDetail: (...rest) => this.showModal({...rest, modalContent: <AssetsDetailTable></AssetsDetailTable>,  }),
      dataSource: this.props.dataList,
      edit: this.props.showFormModal,
      remove: this.props.onRemove,
    };

    return <AssetsTable {...tableProps}></AssetsTable>;
  }
  getSize = e => {
    console.log('    getSize ： ', e, this.state, this.props);
    const { action } = this.state; //
    if (action === 'upload') {
      return 'small';
    }
  };
  renderSmartModal = params => {
    console.log(' renderSmartModal ： ', params, this.state, this.props);
    const { show, title, action, titleMap } = this.state; //

    return (
      <SmartModal
        show={show}
        onOk={this.onOk}
        onCancel={this.onCancel}
        action={action}
        titleMap={titleMap}
        size={this.getSize()}
      >
        {this.renderModalContent()}
      </SmartModal>
    );
  }

  renderResultModal = params => {
    console.log(' renderResultModal ： ', params, this.state, this.props);
    const { show, title, action, titleMap, showResultModal } = this.state; //

    const modalProps = {
      title: title,
      show: showResultModal,
      onOk: this.onResultModalOk,
      onCancel: this.onResultModalCancel,
    };
    const resProps = {
      status: 'error',
      title: '导入失败',
      subTitle: '请核对并修改以下信息后，再重新提交。',
      // extra: [
      //   <Button  key="console" >返回列表</Button>,
      // ],
      // children: <ErrorInfo></ErrorInfo>,
    };

    return (
      <ResultModal modalProps={modalProps} resProps={resProps}>
        <ErrorInfo></ErrorInfo>
      </ResultModal>
    );
  }

  render() {
    console.log(
      ' %c Assets 组件 this.state, this.props ： ',
      `color: #333; font-weight: bold`,
      this.state,
      this.props,
    );

    return (
      <div className="Assets">
        {this.renderSearchForm()}

        {this.renderTable()}

        {this.renderSmartModal()}

        {this.renderResultModal()}
      </div>
    );
  }
}

export default Assets;
