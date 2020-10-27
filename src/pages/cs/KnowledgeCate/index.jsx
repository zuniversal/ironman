import React, { Component, PureComponent } from 'react';

class KnowledgeCate extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(
      ' %c KnowledgeCate 组件 this.state, this.props ： ',
      `color: #333; font-weight: bold`,
      this.state,
      this.props,
    );
    return <div className={`KnowledgeCate`}>KnowledgeCate</div>;
  }
}

export default KnowledgeCate; //
