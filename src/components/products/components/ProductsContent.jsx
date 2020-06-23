import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { getProducts } from 'actions/products';
import { Divider } from '@blueprintjs/core'
import '../products.scss'

const mapDispatchToProps = dispatch => ({
 getProducts: bindActionCreators(getProducts, dispatch)
})

const mapStateToProps = (state, ownProps) => ({
  products: state.products.products,
  productsFetched: state.products.fetched
})

class ProductsContent extends React.Component {
  componentDidMount(){
    const { getProducts, productsFetched } = this.props
    if(!productsFetched){ getProducts() }
  }

  render() {
    const productRows = this.props.products.map((product,i) =>
      <tr key={i}>
        <td>{product.supplierName}</td>
        <td>{product.name}</td>
        <td>{product.barcode}</td>
        <td>{product.price}</td>
      </tr>
    )
    return(
      <div className={'content'}>
        <div className={'content-header'}>
          <h2>All Products</h2>
          <Divider />
        </div>
        <table className="bp3-html-table">
          <thead>
            <tr>
              <td>Supplier</td>
              <td>Name</td>
              <td>Barcode</td>
              <td>Price</td>
            </tr>
          </thead>
          <tbody>{productRows}</tbody>
        </table>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsContent)
