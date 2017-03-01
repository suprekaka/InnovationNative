import React, { Component } from 'react'
import {
  View,
  StyleSheet,
} from 'react-native'

import AttachmentToolbar from './components/AttachmentToolbar'
import AttachmentGrid from './components/AttachmentGrid'

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

class App extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <View style={styles.container}>
        <AttachmentToolbar styles={styles.attahmentToolbar}/>
        <AttachmentGrid styles={styles.attachmentGrid} data={genRows()}/>
      </View>  
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
  },
  attahmentToolbar: {
    height: 60,
    backgroundColor: '#ccc',
    borderStyle: 'solid',
    borderBottomWidth: 3,
    borderBottomColor: '#000',
  },
  attachmentGrid: {
    flex: 1,
  }
})
export default App