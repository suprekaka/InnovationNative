import {
  ATTACHMENT_LIST_REQUEST,
  ATTACHMENT_LIST_SUCCESS,
  ATTACHMENT_LIST_FAILURE,
  // ATTACHMENT_LIST_SORT,
  // ATTACHMENT_LIST_FILTER,
  ATTACHMENT_SELECT,
  ATTACHMENT_EMPTY_CACHE,
} from '../actions/actionTypes'
import { genKey } from '../utils'
import {
  ATTACHMENT,
  FETCH_STATUS_NEVER,
  FETCH_STATUS_FETCHING,
  FETCH_STATUS_SUCCESS,
  FETCH_STATUS_FAIL,
} from '../constant'

const items = (state = {}, action) => {
  switch (action.type) {
    case ATTACHMENT_LIST_SUCCESS: {
      return {
        ...state,
        ...action.data.items,
      }
    }
    default:
      return state
  }
}

const list = (
  state = { indexes: [] },
  action,
) => {
  switch (action.type) {
    case ATTACHMENT_LIST_SUCCESS: {
      const { offset } = action.api
      const { list } = action.data
      const listFragment = state.indexes.slice()

      list.forEach((v, i) => {
        listFragment[offset + i] = v
      })
      return {
        indexes: listFragment,
        totalCount: action.data.totalCount,
      }
    }
    default: {
      return state
    }
  }
}

const messageSummaries = (state = {}, action) => {
  switch (action.type) {
    case ATTACHMENT_LIST_SUCCESS: {
      return {
        ...state,
        ...action.data.messageSummaries,
      }
    }
    default: {
      return state
    }
  }
}

const { FILTER_ALL } = ATTACHMENT
const { SORT_NEWEST_FIRST } = ATTACHMENT

const attachments = (state = {
  items: {},
  messageSummaries: {},
  list: {},
  selected: [],
  sort: SORT_NEWEST_FIRST,
  filter: FILTER_ALL,
  currentPage: 1,
  paginalCount: 60,
  fetchStatus: FETCH_STATUS_NEVER,
}, action) => {
  switch (action.type) {
    case ATTACHMENT_LIST_REQUEST: {
      return {
        ...state,
        fetchStatus: FETCH_STATUS_FETCHING,
      }
    }
    case ATTACHMENT_LIST_SUCCESS: {
      const { api: { folder, sort, filter } } = action
      const path = genKey(folder, sort, filter)
      return {
        ...state,
        items: {
          ...state.items,
          [folder]: items(state.items[folder], action),
        },
        messageSummaries: {
          ...state.messageSummaries,
          [folder]: messageSummaries(state.messageSummaries[folder], action),
        },
        list: {
          ...state.list,
          [path]: list(state.list[path], action),
        },
        fetchStatus: FETCH_STATUS_SUCCESS,
      }
    }
    case ATTACHMENT_EMPTY_CACHE: {
      return {
        ...state,
        list: {},
      }
    }
    case ATTACHMENT_LIST_FAILURE: {
      return {
        ...state,
        fetchStatus: FETCH_STATUS_FAIL,
      }
    }
    // case ATTACHMENT_LIST_SORT: {
    //   const { sort } = action
    //   return {
    //     ...state,
    //     sort,
    //   }
    // }
    // case ATTACHMENT_LIST_FILTER: {
    //   const { filter } = action
    //   return {
    //     ...state,
    //     filter,
    //   }
    // }
    case ATTACHMENT_SELECT: {
      const { selected } = action
      return {
        ...state,
        selected,
      }
    }
    default: {
      return state
    }
  }
}

export default attachments
