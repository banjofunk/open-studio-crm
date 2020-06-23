/* eslint-disable no-unreachable */
import * as t from 'actionTypes'
import { locationPath, locationsPath } from 'utils/appPaths'

const initialState = {
  location: {
    organizationId: 1,
    name: '',
    address: {}
  },
  fetching: false,
  fetched: false,
  createdId: null,
  redirect: null
}

export default (state = initialState, action) => {
    switch (action.type) {
      case t.CLEAR_LOCATION:
        return initialState
        break
      case t.RESET_REDIRECT:
        return {...state, redirect: null}
        break
      case t.FETCHING_LOCATION:
        return { ...initialState, fetching: true }
        break
      case t.GET_LOCATION:
        return { ...initialState,
          location: action.payload,
          fetched: true
        }
        break
      case t.CREATE_LOCATION:
        return { ...state,
          location: action.payload,
          createdId: action.payload.id
        }
        break
      case t.DELETE_LOCATION:
        return { ...initialState, redirect: locationsPath() }
        break
      case t.EDIT_LOCATION:
        const { value, name } = action.payload
        const location = { ...state.location }
        location[name] = value
        return { ...state, location }
        break
      case t.UPDATE_LOCATION:
        const updatedLocation = action.payload
        const updateRedirect = locationPath(updatedLocation.id)
        return { ...initialState,
          location:updatedLocation,
          redirect: updateRedirect,
          fetched: true
        }
        break
      default:
        return state
    }
    return state
}
