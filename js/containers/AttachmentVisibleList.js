import { connect } from 'react-redux'
import {
  // fetchAttachmentListIfNeeded,
  fetchAttachmentList,
} from '../actions'
import AttachmentList from '../components/AttachmentList'
// import { denormalizeAttachments } from '../transformers/attachments'

const folder = 'Inbox'

const getVisibleAttachments = (items, messageSummaries, keyword) => {
  if (!items[folder]) {
    return []
  }
  const data = Object.values(items[folder]).map((attach) => {
    // attach.messageInfo = messageSummaries[folder][attach.messageInfo]
    return {
      ...attach,
      messageInfo: messageSummaries[folder][attach.messageInfo],
    }
  })
  if (keyword.trim()) {
    return data.filter(attach => attach.filename.includes(keyword))
  }
  return data
}

const mapStateToProps = ({
  attachments: {
    items,
    messageSummaries,
    keyword,
  },
}) => ({
  listData: getVisibleAttachments(items, messageSummaries, keyword),
})

const mapDispatchToProps = dispatch => ({
  fetchAttachmentList: () => dispatch(fetchAttachmentList()),
})

export default connect(mapStateToProps, mapDispatchToProps)(AttachmentList)
