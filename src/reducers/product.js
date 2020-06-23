/* eslint-disable no-unreachable */
import * as t from 'actionTypes'
import { productPath, productsPath } from 'utils/appPaths'

const initialState = {
  product: {
    id: null,
    organizationId: 1,
    active: false,
    soldOnline: null,
    quickCash: false,
    mindbodyId: null,
    reorderLevel: null,
    categoryName: null,
    subcategoryName: null,
    posFavorite: null,
    name: null,
    sizeName: null,
    weight: null,
    sizeId: null,
    supplierId: null,
    supplierName: null,
    lotSize: null,
    colorName: null,
    barcode: null,
    locations: null,
    description: null,
    notes: null,
    price: null,
    inventory: [],
    onlinePrice: null,
  },
  fetching: false,
  fetched: false,
  createdId: null,
  redirect: null
}

export default (state = initialState, action) => {
    switch (action.type) {
      case t.FETCHING_PRODUCT:
        return { ...initialState, fetching: true }
        break
      case t.GET_PRODUCT:
        return { ...initialState,
          product: action.payload,
          fetched: true
        }
        break
      case t.CREATE_PRODUCT:
        return { ...state,
          product: action.payload,
          createdId: action.payload.id
        }
        break
      case t.DELETE_PRODUCT:
        return { ...initialState, redirect: productsPath() }
        break
      case t.EDIT_PRODUCT:
        const { value, name } = action.payload
        const product = { ...state.product }
        product[name] = value
        return { ...state, product }
        break
      case t.EDIT_PRODUCT_DESCRIPTION:
        const { description } = action.payload
        const productDescription = { ...state.product, description }
        return { ...state, product: productDescription }
        break
      case t.RESET_REDIRECT:
        return {...state, redirect: null}
        break
      case t.UPDATE_PRODUCT:
        const updatedProduct = action.payload
        const updateRedirect = productPath(updatedProduct.id)
        return { ...initialState,
          product: updatedProduct,
          redirect: updateRedirect,
          fetched: true
        }
        break
      default:
        return state
    }
    return state
}
