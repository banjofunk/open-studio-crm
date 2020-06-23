import React from 'react';
import { Route, Switch } from 'react-router-dom'
import { PageContent } from 'components/layout'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import {
  EditProductContent,
  ProductContent,
  ProductsContent,
  ProductsSidebar,
  NewProductContent,
} from './components'

import './products.scss'


class Products extends React.Component {

  render() {
    const { location } = this.props
    return(
      <div className="products">
        <ProductsSidebar />
        <PageContent>
            <TransitionGroup>
              <CSSTransition
                key={location.key}
                timeout={700}
                classNames="fade"
                unmountOnExit>
                <Switch>
                  <Route exact path={'/products'} component={ProductsContent} />
                  <Route exact path={'/products/new'} component={NewProductContent} />
                  <Route exact path={'/products/:productId'} component={ProductContent} />
                  <Route exact path={'/products/:productId/edit'} component={EditProductContent} />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
        </PageContent>
      </div>
    )
  }
}

export default Products
