import React from 'react'
import { Provider } from 'react-redux'
import createStore from './store'
import AttachmentView from './components/AttachmentView'
import { service } from './middlewares/webtop'
import { host } from './config'

service.URL = host

const initialState = {
  // attachments: {},
}
const store = createStore(initialState)
global.store = store

const App = () => (
  <Provider store={store}>
    <AttachmentView />
  </Provider>
)

export default App
