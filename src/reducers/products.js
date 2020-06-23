/* eslint-disable no-unreachable */
import * as t from 'actionTypes'

const initialState = {
  products: [],
  fetching: false,
  fetched: false,
  allFetched: false
}

export default (state = initialState, action) => {
    switch (action.type) {
      case t.FETCHING_PRODUCTS:
        return { ...state, 
          fetching: !state.allFetched
        }
        break
      case t.GET_PRODUCTS:
        return { ...initialState,
          products: action.payload,
          allFetched: action.payload.length < 40,
          fetched: true }
        break
      case t.GET_MORE_PRODUCTS:
        return { ...initialState,
          products: [...state.products, ...action.payload],
          allFetched: action.payload.length < 40,
          fetched: true }
        break
      case t.CREATE_PRODUCT:
        const products = [...state.products]
        products.push(action.payload)
        return { ...state,
          products,
          fetching: false,
          fetched: true
        }
        break
      case t.DELETE_PRODUCT:
        const deleteProducts = [ ...state.products ]
        const deletedIdx = deleteProducts.findIndex(product => product.id === parseInt(action.payload))
        deleteProducts.splice(deletedIdx, 1)
        return { ...state, products: deleteProducts }
        break
      case t.UPDATE_PRODUCT:
        const newProducts = [ ...state.products ]
        const idx = newProducts.findIndex(product => product.id === action.payload.id)
        newProducts[idx] = action.payload
        return { ...state, products: newProducts }
        break
      default:
        return state

    }
    return state
}
