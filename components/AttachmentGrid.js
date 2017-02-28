import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  ListView,
} from 'react-native'

import AttachmentItem from './AttachmentItem'

class AttachmentGrid extends Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(props.data),
      showCheckbox: false,
    }
  }
  longPressRow() {
    this.setState((prevState) => {
      return {
        showCheckbox: !prevState.showCheckbox
      }
    })
  }
  render() {
    return (
      <ListView style={{flex:1}}
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
        longPressRow={() => this.longPressRow()}
        showCheckbox={this.state.showCheckbox}
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