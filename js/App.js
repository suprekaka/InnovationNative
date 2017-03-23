import React from 'react'
import { Provider } from 'react-redux'
import createStore from './store'
import AttachmentView from './components/AttachmentView'
import Attachment from './components/Attachment'
import { service } from './middlewares/webtop'
import { host } from './config'
import {Platform} from 'react-native'

service.URL = host

const initialState = {
  // attachments: {},
}
const store = createStore(initialState)
global.store = store

const App = () => {
  if (Platform.OS === 'web') {
    return <Provider store={store}>
      <Attachment />
    </Provider>
  } else {
    return <Provider store={store}>
      <AttachmentView />
    </Provider>
  }
}
  


export default App
