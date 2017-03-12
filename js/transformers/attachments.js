import { schema, normalize } from 'normalizr'
import { genKey } from '../utils'
// import { ATTACHMENT } from '../../../constant'

// const {
//   SORT_OLDEST_FIRST,
//   SORT_NEWEST_FIRST,
//   SORT_ATTACHMENT_AZ,
//   SORT_ATTACHMENT_ZA,
//   SORT_SMALLER_FIRST,
//   SORT_BIGGER_FIRST,
//   FILTER_ALL,
//   FILTER_IMAGES,
//   FILTER_DOCUMENTS,
//   FILTER_AUDIOS,
//   FILTER_VIDEOS,
//   FILTER_ARCHIVES,
// } = ATTACHMENT

// export const parseParams = (v) => {
//   switch (v) {
//     case SORT_OLDEST_FIRST: {
//       return {
//         field: 'date',
//         direction: 'ascending',
//       }
//     }
//     case SORT_NEWEST_FIRST: {
//       return {
//         field: 'date',
//         direction: 'descending',
//       }
//     }
//     case SORT_ATTACHMENT_AZ: {
//       return {
//         field: 'name',
//         direction: 'ascending',
//       }
//     }
//     case SORT_ATTACHMENT_ZA: {
//       return {
//         field: 'name',
//         direction: 'descending',
//       }
//     }
//     case SORT_SMALLER_FIRST: {
//       return {
//         field: 'size',
//         direction: 'ascending',
//       }
//     }
//     case SORT_BIGGER_FIRST: {
//       return {
//         field: 'size',
//         direction: 'descending',
//       }
//     }
//     case FILTER_ALL: {
//       return ''
//     }
//     case FILTER_IMAGES: {
//       return 'images'
//     }
//     case FILTER_DOCUMENTS: {
//       return 'documents'
//     }
//     case FILTER_AUDIOS: {
//       return 'audios'
//     }
//     case FILTER_VIDEOS: {
//       return 'videos'
//     }
//     case FILTER_ARCHIVES: {
//       return 'archives'
//     }
//     default: {
//       return v
//     }
//   }
// }

/**
 * Attachment View
 */
// const attachmentSchema = new Schema('attachments', {
//   // idAttribute: ({ part, messageInfo: {uid} }) => genKey(uid, part),
//   idAttribute: ({ part, messageInfo: { uid } }) => genKey(uid, part),
//   assignEntity: (output, k, value, input) => {
//     switch (k) {
//       case 'part': {
//         output.id = genKey(input.messageInfo.uid, value)
//         break
//       }
//       case 'size': {
//         output.size = input.binarySize
//         break
//       }
//       case 'fileName': {
//         output.filename = value
//         if ('fileName' in output) {
//           delete output.fileName
//         }
//         break
//       }
//       case 'contentType': {
//         for (let i in value) {
//           value[i] && (value[i] = value[i].toLowerCase())
//         }
//         output.contentType = value
//         break
//       }
//       case 'messageInfo': {
//         const { uid, folderPath } = input.messageInfo
//         output.uid = uid
//         output.folderPath = folderPath
//         break
//       }
//       default: {
//         output[k] = value
//         break
//       }
//     }
//   },
// })

// const attachmentMessageSummary = new Schema('messageSummaries', {
//   idAttribute: 'uid',
// })

// attachmentSchema.define({
//   messageInfo: attachmentMessageSummary,
// })

// export const transformAttachments = (input) => {
//   const {
//     entities: { attachments: items, messageSummaries },
//     result: { attachments: list, totalCount },
//   } = normalize(input, {
//     attachments: arrayOf(attachmentSchema),
//   })

//   return {
//     items,
//     messageSummaries,
//     list,
//     totalCount,
//   }
// }

const messageSummarySchema = new schema.Entity('messageSummary', {}, {
  idAttribute: 'uid',
})

const attachmentSchema = new schema.Entity('attachment', {
  messageInfo: messageSummarySchema,
}, {
  idAttribute: (
    {
      messageInfo: {
        uid,
      },
      part,
    },
  ) => genKey(uid, part),
  // processStrategy: (value, parent, key) => {
  //   console.log(value, parent, key)
  // },
})

const attachmentListSchema = [attachmentSchema]

const transformAttachments = (originalData) => {
  const {
    entities: {
      attachment: items,
      messageSummary: messageSummaries, 
    },
    result: {
      attachments: list,
      totalCount,
    },
  } = normalize(originalData, {
    attachments: attachmentListSchema,
  })
  return {
    items,
    messageSummaries,
    list,
    totalCount,
  }
}

export {
  transformAttachments,
}
