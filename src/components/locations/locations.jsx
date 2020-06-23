import React from 'react';
import { Route, Switch } from 'react-router-dom'
import { PageContent, Sidebar } from 'components/layout'
import classnames from 'classnames'
import { Classes, Divider } from '@blueprintjs/core'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import {
  EditLocationContent,
  EditRoomContent,
  LocationContent,
  LocationHeader,
  LocationSidebar,
  LocationsContent,
  LocationsHeader,
  LocationsSidebar,
  NewLocationContent,
  NewRoomContent,
  RoomContent,
  RoomSidebar
} from './components'

import './locations.scss'


class Locations extends React.Component {
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
    const { location } = this.props
    const path = location.pathname.split('/')
    const routeDepth = path.length
    const newLocation = ['new', 'edit'].includes(path[path.length - 1])
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
                <Switch>
                  <Route exact path={'/locations'} component={LocationsHeader} />
                  <Route exact path={'/locations/new'} component={LocationsHeader} />
                  <Route exact path={'/locations/:locationId'} component={LocationHeader} />
                  <Route exact path={'/locations/:locationId/edit'} component={LocationHeader} />
                  <Route path={'/locations/:locationId/rooms/:roomId'} component={LocationHeader} />
                </Switch>
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
                <Switch>
                  <Route exact path={'/locations'} component={LocationsSidebar} />
                  <Route exact path={'/locations/new'} component={LocationsSidebar} />
                  <Route exact path={'/locations/:locationId'} component={LocationSidebar} />
                  <Route exact path={'/locations/:locationId/edit'} component={LocationSidebar} />
                  <Route path={'/locations/:locationId/rooms/:roomId'} component={RoomSidebar} />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          </div>
        </Sidebar>
        <PageContent>
            <TransitionGroup>
              <CSSTransition
                key={location.key}
                timeout={700}
                classNames="fade"
                unmountOnExit>
                <Switch>
                  <Route exact path={'/locations'} component={LocationsContent} />
                  <Route exact path={'/locations/new'} component={NewLocationContent} />
                  <Route exact path={'/locations/:locationId'} component={LocationContent} />
                  <Route exact path={'/locations/:locationId/edit'} component={EditLocationContent} />
                  <Route exact path={'/locations/:locationId/rooms/new'} component={NewRoomContent} />
                  <Route exact path={'/locations/:locationId/rooms/:roomId'} component={RoomContent} />
                  <Route exact path={'/locations/:locationId/rooms/:roomId/edit'} component={EditRoomContent} />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
        </PageContent>
      </div>
    )
  }
}

export default Locations
