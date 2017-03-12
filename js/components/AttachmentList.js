import React, { Component, PropTypes } from 'react'
import {
  ListView,
} from 'react-native'
import AttachmentItem from '../components/AttachmentItem'

const mockData = []
for (let i = 0; i < 100; i += 1) {
  mockData.push({
    filename: `filename ${i}`,
    size: '100kb',
    subject: 'attachment',
    from: 'test@synchronoss.com',
    imgSrc: {
      uri: 'http://www.baidu.com/img/bd_logo1.png',
    },
  })
}

export default class AttachmentList extends Component {
  constructor(props) {
    super(props)

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    })

    this.state = {
      dataSource: ds.cloneWithRows(props.listData),
    }

    this.renderRow = this.renderRow.bind(this)
    this.handlePressAttachmentItem = this.handlePressAttachmentItem.bind(this)
  }

  componentDidMount() {
    this.props.fetchAttachmentList()
  }

  handlePressAttachmentItem() {
    this.props.gotoPreviewScene()
  }

  renderRow(data) {
    return (
      <AttachmentItem
        filename={data.filename}
        size={data.size}
        subject={data.subject}
        from={data.from}
        imgSrc={data.imgSrc}
        onPress={this.handlePressAttachmentItem}
      />
    )
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        initialListSize={10}
        pageSize={5}
        scrollRenderAheadDistance={500}
      />
    )
  }
}

AttachmentList.defaultProps = {
  gotoPreviewScene: () => {},
}

AttachmentList.propTypes = {
  fetchAttachmentList: PropTypes.func.isRequired,
  gotoPreviewScene: PropTypes.func,
}
