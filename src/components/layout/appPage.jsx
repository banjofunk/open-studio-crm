import React from 'react';
import { Switch } from 'react-router-dom'
import { Sidebar } from 'components/layout'
import classnames from 'classnames'
import { Classes, Divider } from '@blueprintjs/core'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import './layout.scss'


class AppPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      routeDepth: 0
    }
  }

  componentDidUpdate(prevProps) {
    const routeDepth = this.props.location.pathname.split('/').length
    if(routeDepth !== this.state.routeDepth){
      this.setState({ routeDepth })
    }
  }

  render() {
    const { headerRoutes, sidebarRoutes, contentRoutes, location } = this.props
    const routeDepth = location.pathname.split('/').length
    const newLocation = location.pathname.split('/')[2] === 'new'
    const prevDepth = this.state.routeDepth
    let menuTransition = 'fade'
    if(routeDepth < prevDepth){menuTransition = 'slide-right'}
    if(routeDepth > prevDepth && prevDepth !== 3 && !newLocation){menuTransition = 'slide-left'}
    return(
      <div className="locations">
        <Sidebar>
          <div className={classnames(Classes.NavbarHeading, 'sidebar-header-container')}>
            <TransitionGroup>
              <CSSTransition
                key={menuTransition}
                timeout={700}
                classNames="fade"
                unmountOnExit>
                  {headerRoutes}
              </CSSTransition>
            </TransitionGroup>
          </div>
          <Divider />
          <div className={'sidebar-group-container'}>
            <TransitionGroup>
              <CSSTransition
                key={menuTransition}
                timeout={400}
                classNames={menuTransition}
                unmountOnExit>
                  {sidebarRoutes}
              </CSSTransition>
            </TransitionGroup>
          </div>
        </Sidebar>
        <div className={'content-wrapper'}>
          <div className={'content-page'}>
            <TransitionGroup>
              <CSSTransition
                key={location.key}
                timeout={700}
                classNames="fade"
                unmountOnExit>
                <Switch>
                  {contentRoutes}
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          </div>
        </div>
      </div>
    )
  }
}

export default AppPage
