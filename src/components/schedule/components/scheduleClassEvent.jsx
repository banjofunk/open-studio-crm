import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as actions from 'actions/classEvents'
import moment from 'moment'
import { getUsers } from 'actions/users';
import classnames from 'classnames'
import { Card, Classes, Divider, Button, ButtonGroup,
  Intent, InputGroup, Popover, Menu, MenuItem, NonIdealState, Spinner } from '@blueprintjs/core'
import '../schedule.scss'
import { dig } from 'utils'

const mapDispatchToProps = dispatch => ({
 actions: bindActionCreators(actions, dispatch),
 getUsers: bindActionCreators(getUsers, dispatch)
})

const mapStateToProps = (state, ownProps) => ({
  classEvent: state.classEvent.classEvent,
  students: state.classEvent.students,
  fetched: state.classEvent.fetched,
  fetching: state.classEvent.fetching,
  redirect: state.classEvent.redirect,
  users: state.users.users,
  usersFetched: state.users.fetched,
  usersFetching: state.users.fetching,
})

export class ScheduleClassEvent extends React.Component {
  constructor(props){
    super(props)
    this.studentSearch = React.createRef();
    this.state = {
      filter: '',
      page: 1,
      redirect: null,
      filterTimer: null
    }
  }

  componentDidMount(){
    const { actions, match, classEvent, fetched, getUsers, usersFetched } = this.props
    const { classTypeId, classDate } = match.params
    const loaded = classEvent.ClassDate === classDate && classEvent.ClassTypeId === parseInt(classTypeId)
    if(!fetched || !loaded) { actions.getClassEvent(classTypeId, classDate) }
    if(!usersFetched){ this.fetchUsers() }
  }

  componentDidUpdate(prevProps){
    const { actions, redirect } = this.props
    if(redirect) { actions.resetRedirect() }
  }

  formatPhoneNumber(phoneNumberString) {
    const phone = phoneNumberString.replace('+1', '')
    const cleaned = ('' + phone).replace(/\D/g, '')
    const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
    if (match) {
      const intlCode = (match[1] ? '+1 ' : '')
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
    }
    return null
  }

  // searchFilterChange = (event) => {
  //   const filter = event.target.value
  //   this.setState({ filter })
  // }

  searchFilterChange = (event) => {
    const filter = event.target.value
    clearTimeout(this.state.filterTimer)
    const filterTimer = setTimeout(this.fetchUsers, 500)
    this.setState({ filter, filterTimer, page: 1 })
  }

  fetchUsers = () => {
    const { getUsers } = this.props
    const { filter, page } = this.state
    getUsers({ filter, page })
  }

  handleKeyDown = event => {
    if(event.keyCode === 13){
      const { users } = this.props
      const { filter } = this.state
      const filteredUsers = users.filter( user => {
        const { firstName, lastName, email, badgeId } = user
        const searchFields = [firstName, lastName, email, badgeId ].join(' ')
        return searchFields.toLowerCase().includes(filter.toLowerCase())
      })
      if(filteredUsers.length === 1){
        const firstUser = filteredUsers[0]
        this.addStudent(firstUser)
        this.setState({filter: ''})
      }
    }
  }

  addStudent = (user) => {
    const { actions, classEvent } = this.props
    actions.addStudent(classEvent, user)
    this.setState({filter: ''})
  }

  removeStudent = (user) => {
    const { actions, classEvent } = this.props
    actions.removeStudent(classEvent, user)
  }

  render() {
    const { filter } = this.state
    const { classEvent, users, students } = this.props
    const filteredUsers = users.filter( user => {
      const { firstName, lastName, email, badgeId } = user
      const searchFields = [firstName, lastName, email, badgeId ].join(' ')
      return searchFields.toLowerCase().includes(filter.toLowerCase())
    })
    const { room, teacher, startTime, endTime } = classEvent;
    const start = moment(startTime, 'h:mm:ss A')
    const end = moment(endTime, 'h:mm:ss A')
    const studentRows = students.filter(st => st.StudentId !== 0).map((student, i) =>
      <tr key={`student-${i}`}>
        <td>
          <Button
            icon={'cross'}
            intent={Intent.DANGER}
            onClick={() => this.removeStudent(student)}
            minimal={true}
            small={true} />
        </td>
        <td>{`${i + 1}.`}</td>
        <td>{`${student.student.firstName} ${student.student.lastName}`}</td>
        <td>{student.student.email}</td>
        <td>{this.formatPhoneNumber(student.student.phone || '')}</td>
      </tr>
    )
    const menuItems = filteredUsers.slice(0,5).map((user, i) =>
      <MenuItem
        key={`item-${i}`}
        text={`${user.firstName} ${user.lastName}`}
        onClick={() => this.addStudent(user)} />
    )
    const popoverContent = 
      <Menu>
        {this.props.usersFetching && <Spinner size={20} />}
        {!this.props.usersFetching && menuItems}
      </Menu>
    const studentTable = students.length === 0
     ? <div>
        <Divider />
        <NonIdealState
         className={classnames('non-ideal')}
         icon={'user'}
         title="No students signed up" />
       </div>
     : <table className="bp3-html-table bp3-small">
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {studentRows}
        </tbody>
      </table>
    return (
      <div className="content">
        <div className="content-header">
          <h2>{classEvent.classType.name}</h2>
          <Divider />
        </div>
        <label className="bp3-label">
          Room:
          <span>{dig(room, 'name') || 'not listed'}</span>
        </label>
        <label className="bp3-label">
          Time:
          <span>{start.format('h:mm a')}</span>
        </label>
        <label className="bp3-label">
          Duration:
          <span>{`${end.diff(start, 'minutes')} minutes`}</span>
        </label>
        <label className="bp3-label">
          Teacher:
          <span>{`${teacher.firstName} ${teacher.lastName}`}</span>
        </label>
        
        <Card className='students-card'>
          <ButtonGroup className={'sidebar-group'} minimal={true} vertical={true}>
            <Popover
              content={popoverContent}
              isOpen={filter.length > 0 && filteredUsers.length > 0}
              popoverClassName={Classes.MINIMAL}
              inline={true}>
              <InputGroup
                className={'sidebar-filter'}
                leftIcon="search"
                onKeyDown={this.handleKeyDown}
                onChange={this.searchFilterChange}
                placeholder="Search or Scan"
                value={filter}
              />
            </Popover>
          </ButtonGroup>
          {studentTable}
        </Card>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleClassEvent)
