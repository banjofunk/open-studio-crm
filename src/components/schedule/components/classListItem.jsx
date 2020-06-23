import React from 'react'
import { withRouter } from 'react-router-dom'
import moment from 'moment-timezone'
import dig from 'object-dig'
import { Card, Elevation } from '@blueprintjs/core'

const ClassListItem = ({classEvent, showClassDialog, showTeacherDialog, history}) => {
  return (
      <Card
        onClick={() => history.push(`/schedule/${classEvent.ClassTypeId}/${classEvent.ClassDate}`)}
        className={'event-group'}
        elevation={Elevation.ONE}
        interactive={true}>
        <div>
          <span>{`${moment(classEvent.start).format("h:mma")} - ${moment(classEvent.end).format("h:mma")}`}</span>
        </div>
        <div>
          <span onClick={(e) => showClassDialog(e, classEvent)}>{dig(classEvent, 'classType', 'name')}</span>
        </div>
        <div className={'center'}>
          <span>{dig(classEvent, 'room', 'name')}</span>
        </div>
        <div className={'center'}>
          <span onClick={(e) => showTeacherDialog(e, classEvent)}>
            {`${dig(classEvent, 'teacher', 'firstName')} ${dig(classEvent, 'teacher', 'lastName')}`}
          </span>
        </div>
      </Card>
  )
}

export default withRouter(ClassListItem)
