import React from 'react'
import { Link } from 'react-router-dom'
import { classTypesPath } from 'utils/appPaths'
import { Classes } from '@blueprintjs/core'
import classnames from 'classnames'

const ClassTypesHeader = () => {
  return (
    <Link to={classTypesPath()}>
      <h2 className={classnames(Classes.TEXT_MUTED, 'sidebar-header')}>Classes</h2>
    </Link>
  )
}

export default ClassTypesHeader
