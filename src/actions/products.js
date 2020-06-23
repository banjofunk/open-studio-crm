import { fetchJSON } from 'utils'
import { productPath, productsPath } from 'utils/apiPaths'
import qs from 'querystring'
import * as t from 'actionTypes'

export const getProducts = (options = {}) => dispatch => {
  const { filter, page } = options
  const url = `${productsPath(1)}?${qs.stringify({ filter, page })}`
  dispatch({ type: t.FETCHING_PRODUCTS })
  fetchJSON(url)
  .then( payload =>
    dispatch({ type: t.GET_PRODUCTS, payload })
  )
}

export const getMoreProducts = (options = {}) => dispatch => {
  const { filter, page } = options
  const url = `${productsPath(1)}?${qs.stringify({ filter, page })}`
  dispatch({ type: t.FETCHING_PRODUCTS })
  fetchJSON(url)
  .then( payload =>
    dispatch({ type: t.GET_MORE_PRODUCTS, payload })
  )
}

export const getProduct = (productId) => dispatch => {
  dispatch({ type: t.FETCHING_PRODUCT })
  fetchJSON(productPath(productId))
  .then( payload =>
    dispatch({ type: t.GET_PRODUCT, payload })
  )
}

export const createProduct = (product) => dispatch => {
  fetchJSON(productsPath(1), {
    method: 'POST',
    body: JSON.stringify({product})
  })
  .then( payload =>
    dispatch({ type: t.CREATE_PRODUCT, payload })
  )
}

export const deleteProduct = (productId) => dispatch => {
  dispatch({ type: t.FETCHING_PRODUCT })
  fetchJSON(productPath(productId), {
    method: 'DELETE'
  })
  .then( payload =>
    dispatch({ type: t.DELETE_PRODUCT, payload })
  )
}

export const editProduct = (value, name) => dispatch => {
  dispatch({ type: t.EDIT_PRODUCT, payload: { value, name } })
}

export const editProductDescription = (description) => dispatch => {
  dispatch({ type: t.EDIT_PRODUCT_DESCRIPTION, payload: {description} })
}

export const resetRedirect = () => dispatch => {
  dispatch({ type: t.RESET_REDIRECT, payload: true })
}

export const updateProduct = (product) => dispatch => {
  dispatch({ type: t.FETCHING_PRODUCT })
  fetchJSON(productPath(product.id), {
    method: 'PUT',
    body: JSON.stringify({product})
  })
  .then( payload =>
    dispatch({ type: t.UPDATE_PRODUCT, payload })
  )
}
