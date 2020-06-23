import React from 'react';
import { Route, Switch } from 'react-router-dom'
import { PageContent } from 'components/layout'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import {
  EditUserContent,
  UserContent,
  UsersContent,
  UsersSidebar,
  NewUserContent,
} from './components'

import './users.scss'


class Users extends React.Component {

  render() {
    const { location } = this.props
    return(
      <div className="users">
        <UsersSidebar />
        <PageContent>
            <TransitionGroup>
              <CSSTransition
                key={location.key}
                timeout={700}
                classNames="fade"
                unmountOnExit>
                <Switch>
                  <Route exact path={'/users'} component={UsersContent} />
                  <Route exact path={'/users/new'} component={NewUserContent} />
                  <Route exact path={'/users/:userId'} component={UserContent} />
                  <Route exact path={'/users/:userId/edit'} component={EditUserContent} />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
        </PageContent>
      </div>
    )
  }
}

export default Users
