import { connect } from 'react-redux'
import {
  fetchAttachmentListIfNeeded,
} from '../actions'
import AttachmentList from '../components/AttachmentList'

const mockData = []
for (let i = 0; i < 100; i += 1) {
  mockData.push({
    filename: `filename ${i}`,
    size: '100kb',
    subject: 'attachment',
    from: 'test@synchronoss.com',
    imgSource: {
      uri: 'http://www.baidu.com/img/bd_logo1.png',
    },
  })
}

const getVisibleAttachments = (attachments, keyword) => {
  return attachments
}

const mapStateToProps = ({ attachments: { items, keyword } }) => ({
  data: getVisibleAttachments(items, keyword),
})

const mapDispatchToProps = dispatch => ({
  fetchAttachmentList: () => dispatch(fetchAttachmentListIfNeeded()),
})

export default connect(mapStateToProps, mapDispatchToProps)(AttachmentList)
