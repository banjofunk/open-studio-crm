import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom'
import { createUser } from 'actions/users';
import { userPath } from 'utils/appPaths'
import { Button, Intent } from '@blueprintjs/core'
import '../users.scss'

const mapDispatchToProps = dispatch => ({
 createUser: bindActionCreators(createUser, dispatch)
})

const mapStateToProps = (state, ownProps) => ({
  userCreatedId: state.user.createdId,
  userFetched: state.user.fetched,
})

const initialState = {
  user: {
    organizationId: 1,
    firstName: '',
    lastName: '',
    email: ''
  }
}

class NewUserContent extends React.Component {
  constructor(props){
    super(props)
    this.state = initialState
  }

  updateFirstName = (e) => {
    const user = {...this.state.user}
    user.firstName = e.target.value
    this.setState({user})
  }

  updateLastName = (e) => {
    const user = {...this.state.user}
    user.lastName = e.target.value
    this.setState({user})
  }

  updateEmail = (e) => {
    const user = {...this.state.user}
    user.email = e.target.value
    this.setState({user})
  }

  createUser = () => {
    const { user } = this.state
    this.props.createUser(user)
    this.setState(initialState)
  }

  render() {
    const { userCreatedId } = this.props
    const { user } = this.state
    if(userCreatedId){return( <Redirect to={userPath(userCreatedId)} /> )}
    return(
      <div>
        <h1>New User</h1>
        <label className={'bp3-label'}>
          First Name
        <input
          className={"bp3-input"}
          type="text"
          value={user.firstName}
          onChange={this.updateFirstName}
          placeholder="First Name"
          dir="auto" />
        </label>
        <label className={'bp3-label'}>
          Last Name
        <input
          className={"bp3-input"}
          type="text"
          value={user.lastName}
          onChange={this.updateLastName}
          placeholder="Last Name"
          dir="auto" />
        </label>
        <label className={'bp3-label'}>
          Email
        <input
          className={"bp3-input"}
          type="text"
          value={user.email}
          onChange={this.updateEmail}
          placeholder="Email"
          dir="auto" />
        </label>
        <Button
          onClick={this.createUser}
          intent={Intent.PRIMARY}
          text={'Submit'} />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewUserContent)
