import { connect } from 'react-redux'
import AttachmentPreview from '../components/AttachmentPreview'
import { defaultFolder } from '../config'

const previewDataSelector = ({
  attachments: {
    items,
    messageSummaries,
    selected,
  },
}) => {
  const aid = selected[0]
  if (!aid) {
    return {}
  }
  return {
    ...items[defaultFolder][aid],
    messageInfo: messageSummaries[defaultFolder][items[defaultFolder][aid].messageInfo],
  }
}

const mapStateToProps = state => ({
  previewData: previewDataSelector(state),
})

export default connect(mapStateToProps)(AttachmentPreview)
