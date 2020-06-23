/* eslint-disable no-unreachable */
import * as t from 'actionTypes'
import { userPath, usersPath } from 'utils/appPaths'

const initialState = {
  user: {
    organizationId: 1,
    firstName: '',
    lastName: '',
    email: '',
    badgeId: '',
    description: '',
    phone: '',
    birthday: '',
    gender: '',
    status: '',
    location: '',
    address: {
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
    },
    roles: []
  },
  fetching: false,
  fetched: false,
  createdId: null,
  redirect: null
}

export default (state = initialState, action) => {
    switch (action.type) {
      case t.FETCHING_USER:
        return { ...initialState, fetching: true }
        break
      case t.GET_USER:
        return { ...initialState,
          user: action.payload,
          fetched: true
        }
        break
      case t.CREATE_USER:
        return { ...state,
          user: action.payload,
          createdId: action.payload.id
        }
        break
      case t.DELETE_USER:
        return { ...initialState, redirect: usersPath() }
        break
      case t.EDIT_USER:
        const { value, name } = action.payload
        const user = { ...state.user }
        user[name] = value
        return { ...state, user }
        break
      case t.EDIT_USER_DESCRIPTION:
        const { description } = action.payload
        const userDescription = { ...state.user, description }
        return { ...state, user: userDescription }
        break
      case t.RESET_REDIRECT:
        return {...state, redirect: null}
        break
      case t.UPDATE_USER:
        const updatedUser = action.payload
        const updateRedirect = userPath(updatedUser.id)
        return { ...initialState,
          user: updatedUser,
          redirect: updateRedirect,
          fetched: true
        }
        break
      default:
        return state
    }
    return state
}
