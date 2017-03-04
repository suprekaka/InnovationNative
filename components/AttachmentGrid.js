import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  ListView,
  TouchableWithoutFeedback,
} from 'react-native'

import AttachmentItem from './AttachmentItem'

const genRows = function() {
  const datablob = []
  for (let i = 0; i < 100; i++) {
    datablob.push({
      imgSource: {uri: 'https://www.baidu.com/img/bd_logo1.png'},
      name: `Test name ${i}`,
      size: '10',
      subject: `Test subject ${i}`,
      from: `Test from ${i}`
    })
  }
  return datablob
}

class AttachmentGrid extends Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(genRows()),
    }
  }
  render() {
    return (
      <ListView style={this.props.styles}
        contentContainerStyle={styles.list}
        dataSource={this.state.dataSource}
        initialListSize={21}
        pageSize={3}
        scrollRenderAheadDistance={500}
        renderRow={(...args) => this._renderRow(...args)}
        renderSeparator={this._renderSeparator}
      />
    )
  }
  _renderRow(rowData, sessionId, rowId) {
    return (
      <AttachmentItem 
        onClickDetail={this.props.onClickDetail}
        onClickImage={() => console.log(rowData)}
        imgSource={rowData.imgSource}
        name={rowData.name}
        size={rowData.size}
        subject={rowData.subject}
        from={rowData.from}
      />
    )
  }
  _renderSeparator(sessionId, rowId, adjacentRowHighlighted) {
    return (
      <View key={rowId} style={styles.listSeparator}></View>
    )
  }
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#ddd'
  },
  listSeparator: {
    height: 2,
    backgroundColor: '#ccc',
  }
})

export default AttachmentGrid