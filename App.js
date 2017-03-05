import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Navigator,
  Image,
  TextInput,
  TouchableHighlight,
} from 'react-native'

import AttachmentGrid from './components/AttachmentGrid'
import MailDetail from './components/MailDetail'
import SideBar from './components/SideBar'

const menuImg = require('./res/menu.png')
const backImg = require('./res/back.png')

const routes = [
  {title: 'Attachment View', index: 0},
  {title: 'Mail Detail', index: 1},
]
class App extends Component {
  constructor(props) {
    super(props)
    this.toggleSideBar = this.toggleSideBar.bind(this)
    this._renderScene = this._renderScene.bind(this)
    this.state = {
      showSideBar: false,
    }
  }
  toggleSideBar() {
    this.setState((prevState) => {
      return {
        showSideBar: !prevState.showSideBar,
      }
    })
  }
  _renderScene(route, navigator) {
    if (route.index === 0) {
          let sideBar = this.state.showSideBar ? (<SideBar styles={styles.leftPanel}></SideBar>) : undefined 
      return (
        <View style={{flex:1}}>
          <TextInput></TextInput>
          <AttachmentGrid 
            styles={styles.attachmentGrid} 
            onClickDetail={() => {
              navigator.push(routes[1])
            }}
          />
          {sideBar}
        </View>
      )
    } else if (route.index === 1) {
      return <MailDetail />
    }
  }
  render() {
    return (
      <Navigator
        initialRoute={routes[0]}
        initialRouteStack={routes}
        renderScene={this._renderScene}
        navigationBar={
          <Navigator.NavigationBar 
            routeMapper={{
              LeftButton: (route, navigator, index, navState) => {
                if (route.index === 0) {
                  return (
                    <TouchableHighlight onPress={this.toggleSideBar}>
                      <Image source={menuImg}/>
                    </TouchableHighlight>
                  )
                } else if (route.index === 1) {
                   return (
                    <TouchableHighlight onPress={() => navigator.pop()}>
                      <Image source={backImg}/>
                    </TouchableHighlight>
                  )
                }
              },
              RightButton: (route, navigator, index, navState) =>
                { return null },
              Title: (route, navigator, index, navState) =>
                { return (<Text style={styles.navigationTitle}>{route.title}</Text>) },
            }}
            style={styles.navigationBar}
          />
        }
        style={styles.navigator}
      />
    )
  }
}

const windowSize = Dimensions.get('window')

const styles = StyleSheet.create({
  navigator: {
    paddingTop: 50,
    backgroundColor: '#eee',
  },
  navigationBar: {
    // backgroundColor: '#ddd',
    height: 50,
    // borderStyle: 'solid',
    // borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  navigationTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    padding: 15,
  },
  attachmentGrid: {
    flex: 1,
  },
  leftPanel: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    left: 0,
    top: 0,
    width: windowSize.width,
    height: windowSize.height - 60,
  },
})
export default App