/* eslint-disable no-unreachable */
import * as t from 'actionTypes'

const initialState = {
  locationId: null,
  rooms: [],
  fetching: false,
  fetched: false
}

export default (state = initialState, action) => {
    switch (action.type) {
      case t.FETCHING_ROOMS:
        return { ...initialState, fetching: true }
        break
      case t.GET_ROOMS:
        return { ...initialState,
          locationId: action.payload.locationId,
          rooms: action.payload.rooms,
          fetched: true
        }
        break
      case t.CREATE_ROOM:
        const rooms = [...state.rooms]
        rooms.push(action.payload)
        return { ...state,
          rooms,
          fetching: false,
          fetched: true
        }
        break
      case t.DELETE_ROOM:
        const deleteRooms = [ ...state.rooms ]
        const deletedIdx = deleteRooms.findIndex(room => room.id === parseInt(action.payload))
        deleteRooms.splice(deletedIdx, 1)
        return { ...state, rooms: deleteRooms }
        break
      case t.UPDATE_ROOM:
        const updatedRooms = [ ...state.rooms ]
        const idx = updatedRooms.findIndex(room => room.id === action.payload.id)
        updatedRooms[idx] = action.payload
        return { ...state, rooms: updatedRooms }
        break
      default:
        return state
    }
    return state
}
