import { connect } from 'react-redux'
import {
  // fetchAttachmentListIfNeeded,
  fetchAttachmentList,
} from '../actions'
import AttachmentList from '../components/AttachmentList'

const getVisibleAttachments = (attachments, keyword) => {
  debugger
  return {}
}

const mapStateToProps = ({ attachments: { items, keyword } }) => ({
  listData: getVisibleAttachments(items, keyword),
})

const mapDispatchToProps = dispatch => ({
  fetchAttachmentList: () => dispatch(fetchAttachmentList()),
})

export default connect(mapStateToProps, mapDispatchToProps)(AttachmentList)
