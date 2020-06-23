/* eslint-disable no-unreachable */
import * as t from 'actionTypes'
import { classEventsPath } from 'utils/appPaths'

const initialState = {
  classEvent: {
    classType: {},
    teacher: {},
    room: {},
    students: []
  },
  students: [],
  fetching: false,
  fetched: false,
  createdId: null,
  redirect: null
}

export default (state = initialState, action) => {
    switch (action.type) {
      case t.ADDED_STUDENT:
        return { ...initialState,
          classEvent: action.payload,
          fetched: true
        }
        break
      case t.FETCHING_CLASS_EVENT:
        return { ...initialState, fetching: true }
        break
      case t.GET_CLASS_EVENT:
        return { ...initialState,
          classEvent: action.payload.Items[0],
          students: action.payload.Items,
          fetched: true
        }
        break
      case t.CREATE_CLASS_EVENT:
        return { ...state,
          classEvent: action.payload,
          createdId: action.payload.id
        }
        break
      case t.DELETE_CLASS_EVENT:
        return { ...initialState, redirect: classEventsPath() }
        break
      case t.EDIT_CLASS_EVENT:
        const { value, name } = action.payload
        const classEvent = { ...state.classEvent }
        classEvent[name] = value
        return { ...state, classEvent }
        break
      case t.UPDATE_CLASS_EVENT:
        const updatedClassEvent = action.payload
        return { ...initialState,
          classEvent: updatedClassEvent,
          fetched: true
        }
        break
      case t.RESET_REDIRECT:
        return {...state, redirect: null}
        break
      default:
        return state
    }
    return state
}
