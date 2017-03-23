import React, { Component, PropTypes } from 'react'
import {
  ListView,
} from 'react-native'
import AttachmentItem from '../components/AttachmentItem'

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
})

const getListData = data => ds.cloneWithRows(data)

export default class AttachmentList extends Component {
  constructor(props) {
    super(props)

    this.renderRow = this.renderRow.bind(this)
    this.handlePressAttachmentItem = this.handlePressAttachmentItem.bind(this)
  }

  componentDidMount() {
    this.props.fetchAttachmentList()
  }

  handlePressAttachmentItem(id) {
    const {
      gotoPreviewScene,
      onPressAttachmentItem,
    } = this.props
    onPressAttachmentItem(id)
    gotoPreviewScene()
  }

  renderRow(data) {
    return (
      <AttachmentItem
        filename={data.filename}
        size={data.size}
        subject={data.messageInfo.subject}
        from={data.messageInfo.from.address}
        imgSrc={data.thumbSrc}
        onPress={this.handlePressAttachmentItem}
        uid={data.messageInfo.uid}
        part={data.part}
      />
    )
  }

  render() {
    const { listData } = this.props
    return (
      <ListView
        dataSource={getListData(listData)}
        renderRow={this.renderRow}
        initialListSize={10}
        pageSize={5}
        scrollRenderAheadDistance={500}
        enableEmptySections
      />
    )
  }
}

AttachmentList.defaultProps = {
  gotoPreviewScene: () => {},
  onPressAttachmentItem: () => {},
}

AttachmentList.propTypes = {
  listData: PropTypes.arrayOf(
    PropTypes.shape({
      filename: PropTypes.string.isRequired,
      size: PropTypes.number.isRequired,
      messageInfo: PropTypes.shape({
        subject: PropTypes.string.isRequired,
        from: PropTypes.shape({
          address: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
      imgSrc: PropTypes.string,
    }),
  ).isRequired,
  fetchAttachmentList: PropTypes.func.isRequired,
  gotoPreviewScene: PropTypes.func,
  onPressAttachmentItem: PropTypes.func,
}
