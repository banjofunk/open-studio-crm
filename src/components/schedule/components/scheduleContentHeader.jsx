import React from 'react'
import { withRouter } from 'react-router-dom'
import { Button, ButtonGroup, Divider } from '@blueprintjs/core'
import classnames from 'classnames'

const ScheduleContentHeader = ({ activeView, history }) =>
  <div className={'content-header'}>
    <h2>Class Schedule</h2>
    <ButtonGroup>
      <Button
        className={classnames(
          {active: activeView === 'list'}
        )}
        icon="list"
        onClick={() => history.push('/schedule')}>
        List
      </Button>
      <Button
        className={classnames(
          {active: activeView === 'calendar'}
        )}
        icon="calendar"
        onClick={() => history.push('/schedule/calendar')}>
        Calendar
      </Button>
    </ButtonGroup>

    <Divider />
  </div>

export default withRouter(ScheduleContentHeader)
