import React from 'react'
import { Classes } from '@blueprintjs/core'
import classnames from 'classnames'

const LocationsHeader = () => {
  return (
    <h2 className={classnames(Classes.TEXT_MUTED, 'sidebar-header')}>Locations</h2>
  )
}

export default LocationsHeader
