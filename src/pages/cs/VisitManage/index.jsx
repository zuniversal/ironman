import React, { Component, PureComponent } from 'react';

class VisitManage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(
      ' %c VisitManage 组件 this.state, this.props ： ',
      `color: #333; font-weight: bold`,
      this.state,
      this.props,
    );
    return <div className={`VisitManage`}>VisitManage</div>;
  }
}

export default VisitManage; //
