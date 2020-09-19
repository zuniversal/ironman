import React, { Component, PureComponent } from 'react'


class Home extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    console.log(' %c Home 组件 this.state, this.props ： ', `color: #333; font-weight: bold`, this.state, this.props,  )
    return <div className='Home'>
      Home
    </div>
  }
}

export default Home// 

