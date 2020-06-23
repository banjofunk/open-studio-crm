/* eslint-disable no-unreachable */
import * as t from 'actionTypes'

const initialState = {
  classTypes: [],
  fetching: false,
  fetched: false
}

export default (state = initialState, action) => {
    switch (action.type) {
      case t.FETCHING_CLASS_TYPES:
        return { ...initialState, fetching: true }
        break
      case t.GET_CLASS_TYPES:
        return { ...state,
          classTypes: action.payload.rows,
          fetching: false,
          fetched: true }
        break
      case t.CREATE_CLASS_TYPE:
        const classTypes = [...state.classTypes]
        classTypes.push(action.payload)
        return { ...state,
          classTypes,
          fetching: false,
          fetched: true
        }
        break
      case t.DELETE_CLASS_TYPE:
        const deleteClassTypes = [ ...state.classTypes ]
        const deletedIdx = deleteClassTypes.findIndex(classType => classType.id === parseInt(action.payload))
        deleteClassTypes.splice(deletedIdx, 1)
        return { ...state, classTypes: deleteClassTypes }
        break
      case t.UPDATE_CLASS_TYPE:
        const newClassTypes = [ ...state.classTypes ]
        const idx = newClassTypes.findIndex(classType => classType.id === action.payload.id)
        newClassTypes[idx] = action.payload
        return { ...state, classTypes: newClassTypes }
        break
      default:
        return state

    }
    return state
}
