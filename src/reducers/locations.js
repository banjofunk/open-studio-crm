/* eslint-disable no-unreachable */
import * as t from 'actionTypes'

const initialState = {
  locations: [],
  fetching: false,
  fetched: false
}

export default (state = initialState, action) => {
    switch (action.type) {
      case t.FETCHING_LOCATIONS:
        return { ...initialState, fetching: true }
        break
      case t.GET_LOCATIONS:
        return { ...initialState,
          locations: action.payload.rows,
          fetched: true
        }
        break
      case t.CREATE_LOCATION:
        const locations = [...state.locations]
        locations.push(action.payload)
        return { ...state,
          locations,
          fetching: false,
          fetched: true
        }
        break
      case t.DELETE_LOCATION:
        const deleteLocations = [ ...state.locations ]
        const deletedIdx = deleteLocations.findIndex(location => location.id === parseInt(action.payload))
        deleteLocations.splice(deletedIdx, 1)
        return { ...state, locations: deleteLocations }
        break
      case t.UPDATE_LOCATION:
        const updatedLocations = [ ...state.locations ]
        const idx = updatedLocations.findIndex(location => location.id === action.payload.id)
        updatedLocations[idx] = action.payload
        return { ...state, locations: updatedLocations }
        break
      default:
        return state
    }
    return state
}
