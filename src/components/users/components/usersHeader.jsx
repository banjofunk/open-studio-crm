import React from 'react'
import { Classes } from '@blueprintjs/core'
import classnames from 'classnames'

const UsersHeader = () => {
  return (
    <h2 className={classnames(Classes.TEXT_MUTED, 'sidebar-header')}>Users</h2>
  )
}

export default UsersHeader
