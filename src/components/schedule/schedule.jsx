import React from 'react';
import { Route } from 'react-router-dom'
import { PageContent, Sidebar } from 'components/layout'
import classnames from 'classnames'
import { Classes, Divider } from '@blueprintjs/core'

import {
  ScheduleContent,
  ScheduleHeader,
  ScheduleSidebar,
} from './components'

import './schedule.scss'


class Schedule extends React.Component {
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
    return(
      <div className="schedule">
        <Sidebar>
          <div className={classnames(Classes.NavbarHeading, 'sidebar-header-container')}>
              <Route path={'/schedule'} component={ScheduleHeader} />
          </div>
          <Divider />
          <div className={'sidebar-group-container'}>
            <Route path={'/schedule'} component={ScheduleSidebar} />
          </div>
        </Sidebar>
        <PageContent>
          <Route path={'/schedule'} component={ScheduleContent} />
        </PageContent>
      </div>
    )
  }
}

export default Schedule
