import React, { Component, PureComponent } from 'react';

class DashBoard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(
      ' %c DashBoard 组件 this.state, this.props ： ',
      `color: #333; font-weight: bold`,
      this.state,
      this.props,
    );
    return <div className="DashBoard">DashBoard</div>;
  }
}

export default DashBoard;
