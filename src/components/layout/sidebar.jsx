import React from 'react'
import './layout.scss'

class Sidebar extends React.Component {
  render(){
    return(
      <div className={'sidebar-wrapper'}>
        <div className={'sidebar'}>
          {this.props.children}
        </div>
      </div>
    )
  }
}
 export default Sidebar
