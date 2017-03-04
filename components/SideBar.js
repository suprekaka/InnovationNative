import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
} from 'react-native'

class SideBar extends Component {
  render() {
    const { height, width } = this.props.styles
    console.log(this.props.children)
    return (
      <View style={this.props.styles}>
        <View style={{flex:1,backgroundColor:'#fff'}}>
          {this.props.children}
        </View>
        <View style={{width:80,backgroundColor:'#ddd',opacity:.5}}></View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 20
  },
})

export default SideBar