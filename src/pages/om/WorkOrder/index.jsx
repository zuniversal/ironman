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
import WorkOrderForm from '@/components/Form/WorkOrderForm'; //
import WorkOrderSearchForm from '@/components/Form/WorkOrderSearchForm'; //
import WorkOrderTable from '@/components/Table/WorkOrderTable'; //
import WorkOrderDetail from '@/components/Detail/WorkOrderDetail'; //
import ResultModal, { ErrorInfo } from '@/components/Modal/ResultModal'; //

import { actions, mapStateToProps } from '@/models/workOrder'; //
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';

const TITLE = '工单';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
  upload: `文件上传`,
  down: `文件下载`,
};

// const mapStateToProps = ({ workOrder, }) => workOrder;

@connect(mapStateToProps)
@SmartHOC({
  actions,
  titleMap,
  modalForm: WorkOrderForm,
})
class WorkOrder extends PureComponent {
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

  renderSearchForm(params) {
    // console.log(' renderSearchForm ： ', params,  )
    return (
      <div className={'fsb '}>
        <WorkOrderSearchForm></WorkOrderSearchForm>
        <div className={'btnWrapper'}>
          <SearchForm></SearchForm>
          <Button type="primary" onClick={() => this.props.exportData()}>
            导出
          </Button>
        </div>
      </div>
    );
  }

  showDetail = params => {
    console.log(' showDetail,  , ： ', params);
    this.setState({
      show: true,
      ...params,
      modalContent: <WorkOrderDetail></WorkOrderDetail>,
    });
  };
  renderTable(params) {
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

    return <WorkOrderTable {...tableProps}></WorkOrderTable>;
  }

  renderSmartModal(params) {
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
      ' %c WorkOrder 组件 this.state, this.props ： ',
      `color: #333; font-weight: bold`,
      this.state,
      this.props,
    ); //

    return (
      <div className="WorkOrder">
        {this.renderSearchForm()}

        {this.renderTable()}

        {this.renderSmartModal()}
      </div>
    );
  }
}

export default WorkOrder;
