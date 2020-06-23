import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Link, Redirect } from 'react-router-dom'
import { getUsers, getMoreUsers } from 'actions/users';
import { userPath } from 'utils/appPaths'
import { Alignment, Button, ButtonGroup, InputGroup, Intent, Spinner, Divider, Classes } from '@blueprintjs/core'
import classnames from 'classnames'

import '../users.scss'
import {
  UsersHeader
} from '../components'

const mapDispatchToProps = dispatch => ({
 getUsers: bindActionCreators(getUsers, dispatch),
 getMoreUsers: bindActionCreators(getMoreUsers, dispatch)
})

const mapStateToProps = (state, ownProps) => ({
  users: state.users.users,
  fetched: state.users.fetched,
  fetching: state.users.fetching,
})

class UsersSidebar extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      filter: '',
      page: 1,
      redirect: null,
      filterTimer: null
    }
  }

  componentDidMount(){
    const { fetched } = this.props
    if(!fetched){ this.fetchUsers() }
  }

  fetchUsers = () => {
    const { getUsers } = this.props
    const { filter, page } = this.state
    getUsers({ filter, page })
  }

  componentWillUpdate(prevProps, prevState){
    if(prevState.redirect){
      this.setState({redirect: null})
    }
  }

  setFilter = (event) => {
    const filter = event.target.value
    clearTimeout(this.state.filterTimer)
    const filterTimer = setTimeout(this.fetchUsers, 500)
    this.setState({ filter, filterTimer, page: 1 })
  }

  onScroll = (event) => {
    const { getMoreUsers, fetching, allFetched } = this.props
    const { filter } = this.state
    const { scrollTop, offsetHeight, scrollHeight } = event.target
    const atBottom = (scrollHeight - offsetHeight) < (scrollTop + 150)
    if(atBottom && !fetching && !allFetched) {
      const page = this.state.page + 1
      getMoreUsers({ filter, page })
      this.setState({ page })
    }
  }

  handleKeyDown = event => {
    if(event.keyCode === 13){
      const { users } = this.props
      if(users.length === 1){
        const { getUsers } = this.props
        const filter = ''
        const page = 1
        const firstUser = users[0]
        const redirect = userPath(firstUser.id)
        this.setState({redirect, filter, page})
        getUsers({ filter, page })
      }
    }
  }

  render() {
    const { fetching, users } = this.props
    const { filter, redirect } = this.state

    const userLinks = users.map((user, i) =>
      <Link key={i} to={userPath(user.id)}>
        <Button
          alignText={Alignment.RIGHT}
          large={true}
          rightIcon={'chevron-right'}
          fill={true}
          text={`${user.firstName} ${user.lastName}`} />
      </Link>
    )
    userLinks.unshift(
      <Link key={'new-user'} to={userPath('new')}>
        <Button
          alignText={Alignment.RIGHT}
          large={true}
          intent={Intent.SUCCESS}
          rightIcon={'plus'}
          fill={true}
          text={'New User'} />
      </Link>
    )
    if(fetching){userLinks.push(<Spinner key={'loading-users'} size={20} intent={Intent.PRIMARY} />)}
    if(redirect && redirect !== window.location.pathname){return(<Redirect to={redirect} />)}
    return(
      <div onScroll={this.onScroll} className={'sidebar-wrapper'}>
        <div className={'sidebar'}>
          <div className={classnames(Classes.NavbarHeading, 'sidebar-header-container')}>
              <UsersHeader />
          </div>
          <Divider />
          <div className={'sidebar-group-container'}>
            <ButtonGroup className={'sidebar-group'} minimal={true} vertical={true}>
              <InputGroup
                autoFocus 
                className={'bp3-round sidebar-filter'}
                leftIcon="search"
                onChange={this.setFilter}
                placeholder="Search or Scan"
                onKeyDown={this.handleKeyDown}
                value={filter}
              />
              {userLinks}
              <Divider />
            </ButtonGroup>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersSidebar)
