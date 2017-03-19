import { connect } from 'react-redux'
import {
  // fetchAttachmentListIfNeeded,
  fetchAttachmentList,
  selectAttachment,
} from '../actions'
import AttachmentList from '../components/AttachmentList'
// import { denormalizeAttachments } from '../transformers/attachments'
import { defaultFolder } from '../config'

const getVisibleAttachments = (items, messageSummaries, keyword) => {
  if (!items[defaultFolder]) {
    return []
  }
  const data = Object.values(items[defaultFolder]).map((attach) => {
    // attach.messageInfo = messageSummaries[defaultFolder][attach.messageInfo]
    return {
      ...attach,
      messageInfo: messageSummaries[defaultFolder][attach.messageInfo],
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
  onPressAttachmentItem: id => dispatch(selectAttachment([id])),
})

export default connect(mapStateToProps, mapDispatchToProps)(AttachmentList)
