import React from 'react'
import { Classes } from '@blueprintjs/core'
import classnames from 'classnames'

const RoomHeader = () => {
  return (
    <h2 className={classnames(Classes.TEXT_MUTED, 'sidebar-header')}>Rooms</h2>
  )
}

export default RoomHeader
