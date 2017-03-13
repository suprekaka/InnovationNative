import merge from 'lodash/merge'
import {
  ATTACHMENT_LIST_REQUEST,
  ATTACHMENT_LIST_SUCCESS,
  ATTACHMENT_LIST_FAILURE,
  // ATTACHMENT_LIST_SORT,
  // ATTACHMENT_LIST_FILTER,
  ATTACHMENT_SELECT,
  ATTACHMENT_EMPTY_CACHE,
  ATTACHMENT_SEARCH,
} from './actionTypes'
import { API } from '../middlewares/webtop'
import { genKey } from '../utils'
import {
  // parseParams,
  normalizeAttachments,
} from '../transformers/attachments'

// const getPaginationParams = (pageNo, paginalCount) => {
//   if (pageNo <= 0) {
//     return {
//       offset: undefined,
//       limit: undefined,
//     }
//   }
//   return {
//     offset: (pageNo - 1) * paginalCount,
//     limit: paginalCount,
//   }
// }

/**
 *
 * @param mail
 * @returns {{folder, sort: *, filter: *}}
 */
// const getFetchDefaultParams = ({ mail }) => {
//   const [folder] = mail.folder.selectedFolders
//   const { sort, filter, currentPage, paginalCount } = mail.attachments

//   return {
//     folder,
//     sort,
//     filter,
//     ...getPaginationParams(currentPage, paginalCount),
//   }
// }

const emptyCache = (folder, sort, filter) => ({
  type: ATTACHMENT_EMPTY_CACHE,
  folder,
  sort,
  filter,
})

const fetchAttachmentList = (
  // { folder, sort, filter, offset, limit },
  { folder } = { folder: 'Inbox' },
  isEmptyCache = false,
) => (dispatch) => {
  // console.info('~~ fetchAttachmentList with args -> ', folder, sort, filter, offset, limit)
  if (isEmptyCache) {
    // dispatch(emptyCache(folder, sort, filter))
  }
  return dispatch({
    [API]: {
      types: [ATTACHMENT_LIST_REQUEST, ATTACHMENT_LIST_SUCCESS, ATTACHMENT_LIST_FAILURE],
      name: 'mail.attachmentView.search',
      params: {
        folderPath: folder,
        // sort: parseParams(sort),
        // sort,
        // fileTypeFilter: parseParams(filter),
        // fileTypeFilter: filter,
        // page: {
          // offset,
          // size: limit,
        // },
      },
      folder,
      // sort,
      // filter,
      // offset,
      // limit,
      isEmptyCache,
      transformer: normalizeAttachments,
    },
  })
}

const shouldFetchAttachmentList = (state, { folder, sort, filter, offset, limit }) => {
  const { list } = state.mail.attachments
  const key = genKey(folder, sort, filter)

  if (!list[key]) {
    return true
  }

  const { indexes, totalCount } = list[key]
  const loopCount = totalCount < offset + limit ? totalCount : offset + limit

  for (let i = offset; i < loopCount; i += 1) {
    if (indexes[i] === undefined) {
      return true
    }
  }
  return false
}

/**
 *
 * @param folder
 * @param sort
 * @param filter
 * @param pageNo
 * @param isEmptyCache
 */
const fetchAttachmentListIfNeeded = (
  { folder, sort, filter, pageNo } = {},
  { isEmptyCache = false } = { isEmptyCache: false },
) => (dispatch, getState) => {
  // console.info('fetchAttachmentListIfNeeded', folder, sort, filter, pageNo)
  const state = getState()
  // const { paginalCount } = state.mail.attachments
  const defaultParams = getFetchDefaultParams(state)
  let params = {
    ...{ folder, sort, filter },
    // ...getPaginationParams(pageNo, paginalCount),
  }
  params = merge(defaultParams, params)

  if (shouldFetchAttachmentList(state, params) || isEmptyCache) {
    return dispatch(fetchAttachmentList(params, isEmptyCache))
  }
  return Promise.resolve()
}

const selectAttachment = selected => ({
  type: ATTACHMENT_SELECT,
  selected,
})

const searchAttachments = keyword => ({
  type: ATTACHMENT_SEARCH,
  keyword,
})


// const sortAttachmentList = sort => dispatch => (
//   dispatch(fetchAttachmentListIfNeeded({
//     sort,
//     pageNo: 1,
//   }))
//     .then(() => dispatch({
//       type: ATTACHMENT_LIST_SORT,
//       sort,
//     }))
//     .then(() => {
//       dispatch(selectAttachment([]))
//       dispatch(switchPage(1))
//     })
// )

// const filterAttachmentList = filter => dispatch => (
//   dispatch(fetchAttachmentListIfNeeded({
//     filter,
//     pageNo: 1,
//   }))
//     .then(() => dispatch({
//       type: ATTACHMENT_LIST_FILTER,
//       filter,
//     }))
//     .then(() => {
//       dispatch(selectAttachment([]))
//       dispatch(switchPage(1))
//     })
// )


export {
  // fetchAttachmentListIfNeeded,
  fetchAttachmentList,
  // sortAttachmentList,
  // filterAttachmentList,
  selectAttachment,
  searchAttachments,
}
