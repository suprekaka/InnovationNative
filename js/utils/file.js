import { getSyncCsrfToken } from '../middlewares/webtop'

/**
 * Format the file byte size to human-readable
 * @param bytes
 * @returns {string}
 */
const formatByteSize = (bytes) => {
  if (!bytes || bytes <= 0) {
    return 'N/A'
  }
  const units = ['B', 'kB', 'MB', 'GB', 'TB']
  const i = parseInt(Math.log(bytes) / Math.log(1024), 10)
  return Math.round(bytes / Math.pow(1024, i), 2) + units[i]
}


const mimeTypeMapping = {
  img_generic: 'image/*',
  img_png: 'image/png',
  img_gif: 'image/gif',
  psd: 'image/vnd.adobe.photoshop',
  doc: 'application/msword',
  txt: 'text/plain',
  ppt: 'application/vnd.ms-powerpoint',
  sheets: 'application/vnd.ms-excel',
  pdf: 'application/pdf',
  java: 'text/java',
  eml: 'message/rfc822',
  ics: 'text/calendar',
  vcf: 'text/x-vcard',
  audio: 'audio/*',
  mov: 'video/*',
  video: 'video/*',
  zip: 'application/zip',
  exe: 'application/octet-stream',
  mms: 'application/vnd.wap.mms-message',
  xml: 'text/xml',
  csv: 'text/csv',
  any: 'application/octet-stream',
}

const thumbnailSupportMimeType4CPMS = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/bmp',
]

// TODO
const getAttachmentIconByFilename = (filename) => {
  const extension = filename.slice(filename.lastIndexOf('.') + 1)
  return global.Common.util.ResourceUtil.getAttachIconByType(extension)
}

/**
 * Get the thumbnail URL of an attachment
 * Notice: on CPMS only support image thumbnail, and MX will support more MimeType in future
 * @param accountId
 * @param folder
 * @param uid
 * @param part
 * @param width {number} - The width expected of a thumbnail
 * @param height {number} - The height expected of a thumbnail
 * @returns {string}
 */
const getAttachmentThumbnailURL = (accountId = '', folder, uid, part, width = '', height = '') => {
  const csrf = getSyncCsrfToken()
  const param = {
    descriptor: {
      '@resolver': 'Mail',
      folder,
      uid,
      part,
    },
    inline: true,
    dataUri: false,
    dimensions: {
      width,
      height,
    },
  }
  const url = `bin?csrf=${csrf}&r=resource.download${JSON.stringify(param)}`

  return global.encodeURI(url)
}

const getThumbnailURL = (mimeType, fileInfo) => {
  if (/^(dev|test)$/i.test(process.env.NODE_ENV)) {
    return 'resources/images/default/app/mail/ic_attachment_doc.png'
  }

  if (thumbnailSupportMimeType4CPMS.includes(mimeType)) {
    const { account, folderPath, uid, part, width, height } = fileInfo
    return getAttachmentThumbnailURL(account, folderPath, uid, part, width, height)
  }

  const { filename } = fileInfo
  return getAttachmentIconByFilename(filename)
}

export {
  formatByteSize,
  getAttachmentIconByFilename,
  getThumbnailURL,
  getAttachmentThumbnailURL,
}
