import React, { Component } from 'react'
import {
  View,
  StyleSheet,
} from 'react-native'
import AttachmentList from './containers/AttachmentList'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <AttachmentList />
      </View>
    )
  }
}
