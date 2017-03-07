import React from 'react'
import { Provider } from 'react-redux'
import createStore from './store'
import AttachmentView from './components/AttachmentView'

const initialState = {
  attachments: {},
}
const store = createStore(initialState)

const App = () => (
  <Provider store={store}>
    <AttachmentView />
  </Provider>
)

export default App
