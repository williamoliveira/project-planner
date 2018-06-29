import { createAction, createReducer } from 'redux-act-light'
import { createSelector } from 'reselect'
import uuid from 'uuid/v4'
import { denormalize, normalize, schema } from 'normalizr'
import * as entitiesDuck from './entities'

export const key = 'people'

// ------------------------------------
// Actions
// ------------------------------------
export const setCurrent = createAction(`${key}/SET_CURRENT`)

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  currentId: null,
}

export const reducer = createReducer(
  {
    [setCurrent]: (state, { payload }) => ({
      ...state,
      currentId: payload && payload.id,
    }),
  },
  initialState,
)

// ------------------------------------
// Schema
// ------------------------------------
export const personSchema = new schema.Entity(key)
export const personListSchema = new schema.Array(personSchema)

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
  (peopleIds, entities) => denormalize(
    peopleIds,
    personListSchema,
    entities,
  ),
)
export const getCurrent = createSelector(
  [getStateSlice, entitiesDuck.getEntities],
  (state, entities) => state.currentId && denormalize(
    state.currentId,
    personSchema,
    entities,
  ),
)

// ------------------------------------
// Thunks
// ------------------------------------
export const create = (person) => (dispatch) => {
  const personWithId = { id: uuid(), ...person }
  const normalized = normalize(personWithId, personSchema)

  dispatch(entitiesDuck.set(normalized.entities))
}

export const removeById = (id) => (dispatch) => {
  dispatch(entitiesDuck.unset(`${key}.${id}`))
}

export const updateById = (id, person) => (dispatch) => {
  const normalized = normalize(person, personSchema)

  dispatch(entitiesDuck.set(normalized.entities))
}

