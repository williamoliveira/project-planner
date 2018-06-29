import { omit } from 'lodash-es'
import { createAction, createReducer } from 'redux-act-light'
import { createSelector } from 'reselect'

export const key = 'entities'

// ------------------------------------
// Actions
// ------------------------------------
export const set = createAction(`${key}/SET`)
export const unset = createAction(`${key}/UNSET`)

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}

export const reducer = createReducer(
  {
    [set]: (state, { payload = {} }) => {
      const newState = { ...state }

      Object.entries(payload).forEach(([entityName, entities]) => {
        if (!newState[entityName]) {
          newState[entityName] = {}
        }

        newState[entityName] = { ...newState[entityName], ...entities }
      })

      return newState
    },

    [unset]: (state, { payload }) => omit(state, payload),
  },
  initialState,
)

// ------------------------------------
// Selectors
// ------------------------------------
const getStateSlice = state => state[key]

export const getEntities = createSelector(
  [getStateSlice],
  (state) => new Proxy(state || {}, {
    get: (obj, prop) => prop in obj ? obj[prop] : {}
  }),
)
