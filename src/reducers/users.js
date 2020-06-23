/* eslint-disable no-unreachable */
import * as t from 'actionTypes'

const initialState = {
  users: [],
  fetching: false,
  fetched: false,
  allFetched: false
}

export default (state = initialState, action) => {
    switch (action.type) {
      case t.FETCHING_USERS:
        return { ...state, 
          fetching: !state.allFetched
        }
        break
      case t.GET_USERS:
        return { ...initialState,
          users: action.payload,
          allFetched: action.payload.length < 40,
          fetched: true }
        break
      case t.GET_MORE_USERS:
        return { ...initialState,
          users: [...state.users, ...action.payload],
          allFetched: action.payload.length < 40,
          fetched: true }
        break
      case t.CREATE_USER:
        const users = [...state.users]
        users.push(action.payload)
        return { ...state,
          users,
          fetching: false,
          fetched: true
        }
        break
      case t.DELETE_USER:
        const deleteUsers = [ ...state.users ]
        const deletedIdx = deleteUsers.findIndex(user => user.id === parseInt(action.payload))
        deleteUsers.splice(deletedIdx, 1)
        return { ...state, users: deleteUsers }
        break
      case t.UPDATE_USER:
        const newUsers = [ ...state.users ]
        const idx = newUsers.findIndex(user => user.id === action.payload.id)
        newUsers[idx] = action.payload
        return { ...state, users: newUsers }
        break
      default:
        return state

    }
    return state
}
