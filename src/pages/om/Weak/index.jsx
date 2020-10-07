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

import SmartModal from '@/common/SmartModal'; //
import SearchForm from '@/common/SearchForm'; //
import SmartFormModal from '@/common/SmartFormModal'; //
import WeakForm from '@/components/Form/WeakForm'; //
import WeakSearchForm from '@/components/Form/WeakSearchForm'; //
import WeakDetailForm from '@/components/Form/WeakDetailForm'; //
import WeakTable from '@/components/Table/WeakTable'; //
import ResultModal, { ErrorInfo } from '@/components/Modal/ResultModal'; //
import WeakDetail from '@/components/Detail/WeakDetail'; //

import { actions, mapStateToProps } from '@/models/weak'; //
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';

const TITLE = '缺陷';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}单`,
  upload: `文件上传`,
  down: `文件下载`,
};

// const mapStateToProps = ({ weak, }) => weak;

@connect(mapStateToProps)
@SmartHOC({
  actions,
  titleMap,
  modalForm: WeakForm,
})
class Weak extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      action: '',
      title: '',
      titleMap,
      newTbData: [],
    };
  }

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

  showModal = e => {
    console.log('    showModal ： ', e);
    this.setState({
      show: true,
    });
  };
  onOk = async props => {
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
        <Button
          type="primary"
          onClick={() => this.props.showFormModal({ action: 'add' })}
        >
          新增{TITLE}
        </Button>
        {/* <Button type="primary" onClick={() => this.props.onBatchRemove()}>
        删除
      </Button> */}
      </div>
    );
  };
  renderSearchForm = params => {
    // console.log(' renderSearchForm ： ', params,  )
    return (
      <WeakSearchForm
      // formBtn={this.renderFormBtn}
      // onSubmit={this.onSubmit}
      // onFail={this.onFail}
      ></WeakSearchForm>
    );
  }
  // renderSearchForm = params => {
  //   // console.log(' renderSearchForm ： ', params,  )
  //   return (
  //     <div className={'fje '}>
  //       <div className={'btnWrapper'}>
  //         <SearchForm></SearchForm>
  //         <Button
  //           type="primary"
  //           onClick={() => this.props.showFormModal({ action: 'add' })}
  //         >
  //           新增{TITLE}
  //         </Button>
  //       </div>
  //     </div>
  //   );
  // }

  showDetail = params => {
    console.log(' showDetail,  , ： ', params);
    this.setState({
      show: true,
      ...params,
      modalContent: <WeakDetailForm></WeakDetailForm>,
    });
  };
  renderTable = params => {
    console.log(' renderTable ： ', params, this.state, this.props);

    const tableProps = {
      newTbData: this.state.newTbData,

      onSelectChange: this.props.onSelectChange,
      tdClick: this.props.showFormModal,
      showDetail: this.showDetail,
      // showDetail: this.props.showFormModal,
      dataSource: this.props.dataList,
      edit: this.props.showFormModal,
      remove: this.props.onRemove,
    };

    return <WeakTable {...tableProps}></WeakTable>;
  }

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
      >
        {this.renderModalContent()}
      </SmartModal>
    );
  }

  render() {
    console.log(
      ' %c Weak 组件 this.state, this.props ： ',
      `color: #333; font-weight: bold`,
      this.state,
      this.props,
    ); //

    return (
      <div className="Weak">
        {this.renderSearchForm()}

        {this.renderTable()}

        {this.renderSmartModal()}
      </div>
    );
  }
}

export default Weak;
