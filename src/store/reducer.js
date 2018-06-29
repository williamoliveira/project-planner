import { combineReducers } from 'redux'
import * as entitiesDuck from './ducks/entities'
import * as activitiesDuck from './ducks/activities'
import * as peopleDuck from './ducks/people'

export default (reducers) => combineReducers({
  [entitiesDuck.key]: entitiesDuck.reducer,
  [activitiesDuck.key]: activitiesDuck.reducer,
  [peopleDuck.key]: peopleDuck.reducer,
  ...reducers,
})
