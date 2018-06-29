import { createAction, createReducer } from 'redux-act-light'
import { createSelector } from 'reselect'
import uuid from 'uuid/v4'
import { denormalize, normalize, schema } from 'normalizr'
import * as entitiesDuck from './entities'
import * as peopleDuck from './people'

export const key = 'activities'

// ------------------------------------
// Actions
// ------------------------------------
export const setCurrent = createAction(`${key}/SET_CURRENT`)
export const setFilter = createAction(`${key}/SET_FILTER`)

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  currentId: null,
  filter: 'all',
}

export const reducer = createReducer(
  {
    [setCurrent]: (state, { payload }) => ({
      ...state,
      currentId: payload && payload.id,
    }),
    [setFilter]: (state, { payload }) => ({
      ...state,
      filter: payload,
    }),
  },
  initialState,
)

// ------------------------------------
// Schema
// ------------------------------------
export const activitySchema = new schema.Entity(key, {
  people: peopleDuck.personListSchema,
})
export const activityListSchema = new schema.Array(activitySchema)

// ------------------------------------
// Selectors
// ------------------------------------
export const getStateSlice = state => state[key]

export const getAllIds = createSelector(
  [entitiesDuck.getEntities],
  entities => Object.keys(entities[key]),
)

export const getAll = createSelector(
  [getAllIds, entitiesDuck.getEntities],
  (activitiesIds, entities) => denormalize(
    activitiesIds,
    activityListSchema,
    entities,
  ),
)

export const getFilter = createSelector(
  [getStateSlice],
  state => state.filter,
)

export const getFiltered = createSelector(
  [getAll, getFilter],
  (activities, filter) => activities.filter((activity) => {
    if (filter.id === 'all') {
      return true
    }

    if (filter.id === 'not-started') {
      return !activity.efforts || activity.efforts.length === 0
    }

    if (filter.id === 'started') {
      return activity.efforts && activity.efforts.length > 0
    }

    if (filter.id === 'concluded') {
      return activity.ended
    }

    if (filter.id === 'past-due') {
      return !activity.ended && new Date().toISOString() > activity.endsAt
    }

    if (filter.id === 'before-due') {
      return activity.ended && activity.endedAt < activity.endsAt
    }

    return true
  }),
)

export const getCurrent = createSelector(
  [getStateSlice, entitiesDuck.getEntities],
  (state, entities) => state.currentId && denormalize(
    state.currentId,
    activitySchema,
    entities,
  ),
)

// ------------------------------------
// Thunks
// ------------------------------------
export const create = (activity) => (dispatch) => {
  const activityWithId = { id: uuid(), ...activity }
  const normalized = normalize(activityWithId, activitySchema)

  dispatch(entitiesDuck.set(normalized.entities))
}

export const removeById = (id) => (dispatch) => {
  dispatch(entitiesDuck.unset(`${key}.${id}`))
}

export const updateById = (id, activity) => (dispatch) => {
  const normalized = normalize(activity, activitySchema)

  dispatch(entitiesDuck.set(normalized.entities))
}

