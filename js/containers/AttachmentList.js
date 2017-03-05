import React, { Component } from 'react'
import {
  ListView,
  StyleSheet,
} from 'react-native'
import AttachmentItem from '../components/AttachmentItem'

const mockData = []
for (let i = 0; i < 100; i++) {
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

export default class App extends Component {
  constructor(props) {
    super(props)

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    })

    this.state = {
      dataSource: ds.cloneWithRows(mockData),
    }

    this.renderRow = this.renderRow.bind(this)
    this.handlePressAttachmentItem = this.handlePressAttachmentItem.bind(this)
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
        imgSource={data.imgSource}
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
