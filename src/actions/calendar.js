import { fetchJSON } from 'utils'
import { classEventsPath } from 'utils/apiPaths'
import * as t from 'actionTypes'

export const getClassEvents = (date = false) => dispatch => {
  const url = date ? `${classEventsPath(1)}?date=${date}` : classEventsPath(1)
  dispatch({ type: t.FETCHING_CLASS_EVENTS })
  fetchJSON(url)
  .then( payload =>
    dispatch({ type: t.GET_CLASS_EVENTS, payload })
  )
}