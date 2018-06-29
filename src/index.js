import React from 'react'
import ReactDOM from 'react-dom'
import { Provider as ReduxProvider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { PersistGate } from 'redux-persist/integration/react'
import App from './components/App'
import configureStore from './store/configureStore'

window.log = (val) => {
  console.log(val)
  return val
}

const { store, persistor } = configureStore()

const AppContainer = () => (
  <ReduxProvider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </ReduxProvider>
)

ReactDOM.render(<AppContainer />, document.getElementById('root'))
