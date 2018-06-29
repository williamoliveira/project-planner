import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import makeRootReducer from './reducer'

export default (state = {}) => {
  const enhancers = [applyMiddleware(thunk)]

  if (process.env.NODE_ENV === 'development') {
    const devToolsEnhancer = require('redux-devtools-extension').devToolsEnhancer
    enhancers.push(devToolsEnhancer())
  }

  const enhancer = compose(...enhancers)
  const rootReducer = persistReducer({
    key: 'root',
    storage,
  }, makeRootReducer({}, state))

  const store = createStore(rootReducer, state, enhancer)
  const persistor = persistStore(store)

  return { store, persistor }
}
