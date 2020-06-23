import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { getUsers } from 'actions/users';
import { Divider } from '@blueprintjs/core'
import '../users.scss'

const mapDispatchToProps = dispatch => ({
 getUsers: bindActionCreators(getUsers, dispatch)
})

const mapStateToProps = (state, ownProps) => ({
  users: state.users.users,
  usersFetched: state.users.fetched
})

class UsersContent extends React.Component {
  componentDidMount(){
    const { getUsers, usersFetched } = this.props
    if(!usersFetched){ getUsers() }
  }

  render() {
    const userRows = this.props.users.map((user,i) =>
      <tr key={i}>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.email}</td>
        <td>{user.phone}</td>
        <td></td>
      </tr>
    )
    return(
      <div className={'content'}>
        <div className={'content-header'}>
          <h2>All Users</h2>
          <Divider />
        </div>
        <table className="bp3-html-table">
          <thead>
            <tr>
              <td>First Name</td>
              <td>Last Name</td>
              <td>Email</td>
              <td>Phone Number</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>{userRows}</tbody>
        </table>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContent)
