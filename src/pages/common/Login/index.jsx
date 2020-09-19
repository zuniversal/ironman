import React, { Component, PureComponent } from 'react'


class Login extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    console.log(' %c Login 组件 this.state, this.props ： ', `color: #333; font-weight: bold`, this.state, this.props,  )
    return <div className='Login'>
      Login
    </div>
  }
}

export default Login// 

