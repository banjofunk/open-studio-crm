/* eslint-disable no-unreachable */
import * as t from 'actionTypes'
import { locationPath, roomPath } from 'utils/appPaths'

const initialState = {
  room: {
    name: ''
  },
  fetching: false,
  fetched: false,
  redirect: null
}

export default (state = initialState, action) => {
    switch (action.type) {
      case t.CLEAR_ROOM:
        return initialState
        break
      case t.RESET_REDIRECT:
        return {...state, redirect: null}
        break
      case t.GET_ROOM:
        return { ...initialState,
          room: action.payload,
          fetched: true
        }
        break
      case t.DELETE_ROOM:
        const deletedRoomId = state.room.locationId
        return { ...initialState,
          redirect: locationPath(deletedRoomId)
        }
        break
      case t.EDIT_ROOM:
        const { value, name } = action.payload
        const room = { ...state.room }
        room[name] = value
        return { ...state, room }
        break
      case t.FETCHING_ROOM:
        return { ...state, fetching: true, fetched: false }
        break
      case t.CREATE_ROOM:
        return { ...state,
          room: action.payload,
          redirect: roomPath(action.payload.locationId, action.payload.id)
        }
        break
      case t.UPDATE_ROOM:
        const updatedRoom = action.payload
        const updateRedirect = roomPath(updatedRoom.locationId, updatedRoom.id)
        return { ...initialState,
          room: updatedRoom,
          redirect: updateRedirect,
          fetched: true
        }
        break
      default:
        return state
    }
    return state
}
