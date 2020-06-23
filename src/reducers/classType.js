/* eslint-disable no-unreachable */
import * as t from 'actionTypes'
import { classTypePath, classTypesPath } from 'utils/appPaths'

const initialState = {
  classType: {
    name: '',
    duration: '',
    description: ''
  },
  fetching: false,
  fetched: false,
  redirect: null
}

export default (state = initialState, action) => {
    switch (action.type) {
      case t.FETCHING_CLASS_TYPE:
        return { ...initialState, fetching: true }
        break
      case t.GET_CLASS_TYPE:
        return { ...initialState,
          classType: action.payload,
          fetched: true
        }
        break
      case t.CLEAR_CLASS_TYPE:
        return initialState
        break
      case t.RESET_REDIRECT:
        return {...state, redirect: null}
        break
      case t.CREATE_CLASS_TYPE:
        const createRedirect = classTypePath(action.payload.id)
        return { ...initialState,
          classType: action.payload,
          redirect: createRedirect,
          fetched: true
        }
        break
      case t.DELETE_CLASS_TYPE:
        return { ...initialState, redirect: classTypesPath() }
        break
      case t.UPDATE_CLASS_TYPE:
        const updatedClassType = action.payload
        const updateRedirect = classTypePath(updatedClassType.id)
        return { ...initialState,
          classType:updatedClassType,
          redirect: updateRedirect,
          fetched: true
        }
        break
      case t.EDIT_CLASS_TYPE:
        const { value, name } = action.payload
        const classType = { ...state.classType }
        classType[name] = value
        return { ...state, classType }
        break
      case t.EDIT_CLASS_TYPE_DESCRIPTION:
        const { description } = action.payload
        const classTypeDescription = { ...state.classType, description }
        return { ...state, classType: classTypeDescription }
        break
      default:
        return state
    }
    return state
}
