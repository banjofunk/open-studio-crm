import React from 'react';
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { getClassEvents } from 'actions/calendar';
import { Card, Dialog, Elevation } from '@blueprintjs/core'
import BigCalendar from 'react-big-calendar'
import moment from 'moment-timezone'
import ClassListItem from './classListItem'
import ScheduleContentHeader from './scheduleContentHeader'
import ScheduleClassEvent from './scheduleClassEvent'
import { dig } from 'utils'
import { classTypePath, staffPath } from 'utils/apiPaths'

import { EditorState, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

moment.tz.setDefault("America/New_York")
const localizer = BigCalendar.momentLocalizer(moment)


const mapDispatchToProps = dispatch => ({
 getClassEvents: bindActionCreators(getClassEvents, dispatch)
})

const mapStateToProps = (state, ownProps) => ({
  events: state.classEvents.events,
  eventsFetched: state.classEvents.fetched,
})

class ScheduleContent extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      teacherView: false,
      teacher: null,
      classView: false,
      classType: null
    }
  }
  componentDidMount(){
    const { getClassEvents, eventsFetched } = this.props
    if(!eventsFetched) { getClassEvents() }
  }

  showTeacherDialog = async (e, classEvent) => {
    e.stopPropagation()
    const mindbodyId = dig(classEvent, 'teacher', 'mindbodyId')
    const url = staffPath(mindbodyId)
    const teacher = await fetch(url)
      .then(resp => resp.json())
      .then(cls => {
        console.log(classEvent)
        console.log(cls)
        return cls.description
      })
    this.setState({
      teacherView: true,
      teacher
    })
  }
  hideTeacherDialog = () => {
    this.setState({
      teacherView: false
    })
  }
  showClassDialog = async (e, classEvent) => {
    e.stopPropagation()
    const description = await fetch(classTypePath(1, classEvent.ClassTypeId))
      .then(resp => resp.json())
      .then(cls => cls.description)
    console.log(description)
    this.setState({
      classView: true,
      classType: description
    })
  }
  hideClassDialog = () => {
    this.setState({
      classView: false
    })
  }

  render() {
    const events = this.props.events.map(event => {
      const endTime = moment(event.endTime, "h:mm:ss A")
      event.start = moment(event.ClassDate)
      event.end = event.start.clone().set({
        hour: endTime.hour(),
        minute: endTime.minute(),
        second: endTime.second()
      })
      return event
    })
    const listEvents = []
    let dayLabel = ''
    let thisDayLabel;
    events.forEach((classEvent, i) => {
      thisDayLabel = moment(classEvent.start).format("dddd, MMMM Do YYYY")
      if(thisDayLabel !== dayLabel){
        listEvents.push(
          <h2
            key={`label-${i}`}
            className={'day-label'}>
            {moment(classEvent.start).format("dddd, MMMM Do YYYY")}
          </h2>
        )
        dayLabel = thisDayLabel
      }
      listEvents.push(
        <ClassListItem
          key={i}
          classEvent={classEvent}
          showClassDialog={this.showClassDialog}
          showTeacherDialog={this.showTeacherDialog} />
      )
    })
    return(
      <div className={'content'}>
        <Switch>
          <Route exact path={'/schedule'} render={() =>
            <div>
              <ScheduleContentHeader activeView={'list'} />
              {listEvents}
            </div>
          } />
          <Route exact path={'/schedule/calendar'} render={() =>
            <div>
              <ScheduleContentHeader activeView={'calendar'} />
              <Card elevation={Elevation.ONE}>
                <BigCalendar
                  localizer={localizer}
                  events={events}
                  views={['month', 'day']}
                  defaultDate={new Date()}
                  defaultView="month"
                  style={{ height: "78vh" }}
                />
              </Card>
            </div>
          } />
          <Route path={'/schedule/:classTypeId/:classDate'} component={ScheduleClassEvent} />
        </Switch>
        <Dialog
          onClose={this.hideTeacherDialog}
          isOpen={this.state.teacherView}>
          <Card className={'user-description'}>
            <div dangerouslySetInnerHTML={{__html:this.state.teacher}}></div>
            {/* <Editor
              editorState={this.state.teacher}
              readOnly={true}
              toolbarHidden={true}
            /> */}
          </Card>
        </Dialog>
        <Dialog
          onClose={this.hideClassDialog}
          isOpen={this.state.classView}>
          <Card className={'user-description'}>
            <div dangerouslySetInnerHTML={{__html:this.state.classType}}></div>
            {/* <Editor
              editorState={this.state.classType}
              readOnly={true}
              toolbarHidden={true}
            /> */}
          </Card>
        </Dialog>

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleContent)
