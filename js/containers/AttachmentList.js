import React, { Component } from 'react'
import {
  ListView,
  StyleSheet,
} from 'react-native'
import AttachmentItem from '../components/AttachmentItem'

const styles = StyleSheet.create({
  list: {
    marginTop: 20,
  },
})

const mockData = []
for (let i = 0; i < 100; i++) {
  mockData.push({
    filename: `filename ${i}`,
    size: '100kb',
    subject: 'attachment',
    from: 'test@synchronoss.com',
    imgSource: {
      uri: 'https://www.baidu.com/img/bd_logo1.png',
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
  }

  renderAttachmentItem(data) {
    return (
      <AttachmentItem
        filename={data.filename}
        size={data.size}
        subject={data.subject}
        from={data.from}
        imgSource={data.imgSource}
      />
    )
  }

  render() {
    return (
      <ListView
        style={styles.list}
        dataSource={this.state.dataSource}
        renderRow={this.renderAttachmentItem}
      />
    )
  }
}
