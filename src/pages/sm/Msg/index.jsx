import React, { PureComponent } from 'react';
import './style.less';
import { Button } from 'antd';
import SearchKwForm from '@/components/Form/SearchKwForm'; //
import SmartFormModal from '@/common/SmartFormModal'; //
import MsgForm from '@/components/Form/MsgForm'; //
import MsgTable from '@/components/Table/MsgTable'; //

import { actions, mapStateToProps } from '@/models/msg'; //
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';

const TITLE = '消息';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
  upload: `文件上传`,
  down: `文件下载`,
};

// const mapStateToProps = ({ houseNo, }) => houseNo;

@connect(mapStateToProps)
@SmartHOC({
  actions,
  titleMap,
  modalForm: MsgForm,
})
class Msg extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      titleMap,
    };
  }
  renderFormBtn = params => {
    return (
      <div className={'btnWrapper'}>
        <Button
          type="primary"
          onClick={() => this.props.showFormModal({ action: 'add' })}
          disabled={this.props.authInfo.create !== true}
        >
          新增{TITLE}
        </Button>
      </div>
    );
  };
  renderSearchForm = params => {
    return (
      <SearchKwForm
        formBtn={this.renderFormBtn}
        className={'fje'}
        init={this.props.searchInfo}
        onFieldChange={this.onFieldChange}
        keyword={'keyword'}
        label={'消息关键字'}
        noLabel
      ></SearchKwForm>
    );
  };
  onFieldChange = params => {
    console.log(' onFieldChange,  , ： ', params);
    this.props.getListAsync(params.formData);
  };

  renderTable = params => {
    const tableProps = {
      onSelectChange: this.props.onSelectChange,
      dataSource: this.props.dataList,

      count: this.props.count,
      authInfo: this.props.authInfo,
      searchInfo: this.props.searchInfo,
      getListAsync: this.props.getListAsync,
      showDetail: this.props.getItemAsync,
      edit: this.props.getItemAsync,
      remove: this.onRemove,
      showFormModal: this.props.showFormModal,
    };

    return <MsgTable {...tableProps}></MsgTable>;
  };

  onOk = async props => {
    console.log(' onOkonOk ： ', props, this.state, this.props); //
    const { action, itemDetail } = this.props; //
    const { form, init } = props; //
    try {
      const res = await form.validateFields();
      const send_type = res.send_type.join(',');
      const reciever = res.reciever.filter(v => typeof v !== 'string');
      console.log('  res await 结果  ：', res, send_type, reciever, action); //
      if (action === 'add') {
        this.props.addItemAsync({
          ...res,
          send_type,
          reciever,
        });
      }
      if (action === 'edit') {
        this.props.editItemAsync({
          // ...itemDetail,
          ...res,
          send_type,
          reciever,
          d_id: itemDetail.id,
        });
      }
    } catch (error) {
      console.log(' error ： ', error); //
    }
  };

  renderModalContent = e => {
    const { action } = this.props; //
    const formComProps = {
      action,
      getClientAsync: params => this.props.getClientAsync({ keyword: params }),
      clientList: this.props.clientList,
      getOrganizeAsync: params =>
        this.props.getOrganizeAsync({ keyword: params }),
      organizeList: this.props.organizeList,
      getUserManageAsync: params =>
        this.props.getUserManageAsync({ page_size: 10000, ...params }),
      // getUserManageAsync: this.props.getUserManageAsync,
      userList: this.props.userList,
      flatOrganizeList: this.props.flatOrganizeList,
    };
    if (action !== 'add') {
      formComProps.init = this.props.itemDetail;
    }
    console.log(' formComProps ： ', formComProps); //
    return <MsgForm {...formComProps}></MsgForm>;
  };
  renderSmartFormModal = params => {
    return (
      <SmartFormModal
        show={this.props.isShowModal}
        action={this.props.action}
        titleMap={this.state.titleMap}
        onOk={this.onOk}
        onCancel={this.props.onCancel}
      >
        {this.renderModalContent()}
      </SmartFormModal>
    );
  };
  async componentDidMount() {
    console.log('  组件componentDidMount挂载 ： ', this.state, this.props); //
    this.props.getOrganizeAsync();
    // const  = () => new Promise((resolve, reject) => {
    //   console.log('  Promise ： ',  )
    //   resolve(this.props.getUserManageAsync())//
    // })
    const res = await this.props.getUserManageAsync({
      organization_id: 1,
    });
    console.log('  msgmsg res ：', res); //
    // this.props.addItemAsync({
    //   content: 'content',
    //   // send_type: [1, 2],
    //   send_type: '0,1',
    //   reciever: [1, 2, 79558],
    // });
  }

  render() {
    return (
      <div className="AlarmRecord">
        <embed
          src="http://oss-cm-tc.epkeeper.com/2020/12/GC-TC-2020-0149FB.pdf"
          type=""
        />
        {this.renderSearchForm()}

        {this.renderTable()}

        {this.renderSmartFormModal()}
      </div>
    );
  }
}

export default Msg;
