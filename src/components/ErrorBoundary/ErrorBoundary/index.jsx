import React from 'react';
import './style.less';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: false,
    };
  }

  static getDerivedStateFromError(error) {
    console.log('  组件getDerivedStateFromError  发生错误 ： ', error);
    return {
      error,
      flag: true,
    };
  }

  componentDidCatch(error, info) {
    console.log(' componentDidCatch 捕获错误 ： ', error, info);
  }

  render() {
    if (this.state.flag) {
      console.log(
        ' %c ErrorBoundary 组件 this.state, this.props ： ',
        `color: #333; font-weight: bold`,
        this.state,
        this.props,
      );
    }

    return this.state.flag ? (
      <div className={'errorWrapper'}>
        <div className="errorContent">
          <h1 className={`errText`}>发生错误了！</h1>
          <h2 className={`errText`}>
            {this.state.error && this.state.error.toString()}
          </h2>
        </div>
      </div>
    ) : (
      this.props.children
    );
  }
}

export default ErrorBoundary;
