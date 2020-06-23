import React from 'react'
import { Classes } from '@blueprintjs/core'
import classnames from 'classnames'

const ProductsHeader = () => {
  return (
    <h2 className={classnames(Classes.TEXT_MUTED, 'sidebar-header')}>Products</h2>
  )
}

export default ProductsHeader
