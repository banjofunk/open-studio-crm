import React from 'react'
import './layout.scss'

class PageContent extends React.Component {
  render(){
    return(

      <div className={'content-wrapper bp3-fill'}>
        <div className={'content-page'}>
          {this.props.children}
        </div>
      </div>
    )
  }
}
 export default PageContent
