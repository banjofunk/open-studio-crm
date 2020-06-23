/* eslint-disable no-unreachable */
import * as t from 'actionTypes'

const initialState = {
  events: [],
  fetching: false,
  fetched: false
}

export default (state = initialState, action) => {
    switch (action.type) {
      case t.GET_CLASS_EVENTS:
        return { ...state,
          events: action.payload.Items,
          fetching: false,
          fetched: true }
        break
      default:
        return state

    }
    return state
}
