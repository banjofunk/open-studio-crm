import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Link, Redirect } from 'react-router-dom'
import { getProducts, getMoreProducts } from 'actions/products';
import { productPath } from 'utils/appPaths'
import { Alignment, Button, ButtonGroup, InputGroup, Intent, Spinner, Divider, Classes } from '@blueprintjs/core'
import classnames from 'classnames'

import '../products.scss'
import {
  ProductsHeader
} from '.'

const mapDispatchToProps = dispatch => ({
 getProducts: bindActionCreators(getProducts, dispatch),
 getMoreProducts: bindActionCreators(getMoreProducts, dispatch)
})

const mapStateToProps = (state, ownProps) => ({
  products: state.products.products,
  fetched: state.products.fetched,
  fetching: state.products.fetching,
})

class ProductsSidebar extends React.Component {
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
    if(!fetched){ this.fetchProducts() }
  }

  fetchProducts = () => {
    const { getProducts } = this.props
    const { filter, page } = this.state
    getProducts({ filter, page })
  }

  componentWillUpdate(prevProps, prevState){
    if(prevState.redirect){
      this.setState({redirect: null})
    }
  }

  setFilter = (event) => {
    const filter = event.target.value
    clearTimeout(this.state.filterTimer)
    const filterTimer = setTimeout(this.fetchProducts, 500)
    this.setState({ filter, filterTimer, page: 1 })
  }

  onScroll = (event) => {
    const { getMoreProducts, fetching, allFetched } = this.props
    const { filter } = this.state
    const { scrollTop, offsetHeight, scrollHeight } = event.target
    const atBottom = (scrollHeight - offsetHeight) < (scrollTop + 150)
    if(atBottom && !fetching && !allFetched) {
      const page = this.state.page + 1
      getMoreProducts({ filter, page })
      this.setState({ page })
    }
  }

  
  handleKeyDown = event => {
    if(event.keyCode === 13){
      const { products } = this.props
      if(products.length === 1){
        const { getProducts } = this.props
        const filter = ''
        const page = 1
        const firstProduct = products[0]
        const redirect = productPath(firstProduct.id)
        this.setState({redirect, filter, page})
        getProducts({ filter, page })
      }
    }
  }

  render() {
    const { fetching, products } = this.props
    const { filter, redirect } = this.state

    const productLinks = products.map((product, i) =>
      <Link key={i} to={productPath(product.id)}>
        <Button
          alignText={Alignment.LEFT}
          large={true}
          rightIcon={'chevron-right'}
          fill={true}>
          <span>{product.name}</span>
          <span style={{display:'block', fontSize:'10px'}}>{product.supplierName}</span>
        </Button>
      </Link>
    )
    productLinks.unshift(
      <Link key={'new-product'} to={productPath('new')}>
        <Button
          alignText={Alignment.LEFT}
          large={true}
          intent={Intent.SUCCESS}
          rightIcon={'plus'}
          fill={true}
          text={'New Product'} />
      </Link>
    )
    if(fetching){productLinks.push(<Spinner key={'loading-products'} size={20} intent={Intent.PRIMARY} />)}
    if(redirect && redirect !== window.location.pathname){return(<Redirect to={redirect} />)}
    return(
      <div onScroll={this.onScroll} className={'sidebar-wrapper'}>
        <div className={'sidebar'}>
          <div className={classnames(Classes.NavbarHeading, 'sidebar-header-container')}>
              <ProductsHeader />
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
              {productLinks}
              <Divider />
            </ButtonGroup>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsSidebar)
