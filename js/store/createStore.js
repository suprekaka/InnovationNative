import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import api from '../middlewares/webtop'
import rootReducer from '../reducers'

const configStore = initialState => createStore(
  rootReducer,
  initialState,
  applyMiddleware(thunk, api),
  // applyMiddleware(thunk),
)

export default configStore
