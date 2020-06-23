import React from 'react';
import { Route, Switch } from 'react-router-dom'
import { PageContent, Sidebar } from 'components/layout'
import classnames from 'classnames'
import { Classes, Divider } from '@blueprintjs/core'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import {
  ClassTypeContent,
  ClassTypesContent,
  ClassTypesHeader,
  ClassTypesSidebar,
  NewClassTypeContent,
  EditClassTypeContent
} from './components'

import './classTypes.scss'


class ClassTypes extends React.Component {

  render() {
    const { location } = this.props
    return(
      <div className="class-types">
        <Sidebar>
          <div className={classnames(Classes.NavbarHeading, 'sidebar-header-container')}>
              <Route path={'/classes'} component={ClassTypesHeader} />
          </div>
          <Divider />
          <div className={'sidebar-group-container'}>
            <Route path={'/classes'} component={ClassTypesSidebar} />
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
                  <Route exact path={'/classes'} component={ClassTypesContent} />
                  <Route exact path={'/classes/new'} component={NewClassTypeContent} />
                  <Route exact path={'/classes/:classTypeId'} component={ClassTypeContent} />
                  <Route exact path={'/classes/:classTypeId/edit'} component={EditClassTypeContent} />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
        </PageContent>
      </div>
    )
  }
}

export default ClassTypes
