import React, { Component } from 'react'
import {
  View,
  StatusBar,
  Navigator,
  TouchableHighlight,
  Text,
  Image,
  StyleSheet,
  Platform,
} from 'react-native'
// import AttachmentList from './AttachmentList'
import AttachmentVisibleList from '../containers/AttachmentVisibleList'
import AttachmentSearchBar from '../containers/AttachmentSearchbar'

const styles = StyleSheet.create({
  navigator: {
    ...Platform.select({
      ios: {
        paddingTop: 64,
      },
      android: {
        paddingTop: 50,
      },
    }),
  },
  navigationBar: {
    backgroundColor: '#008cfa',
    // padding: 30,
    ...Platform.select({
      ios: {
        height: 64,
      },
      android: {
        height: 50,
        borderStyle: 'solid',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
      },
    }),
  },
  navigationTitle: {
    // fontWeight: 'bold',
    fontSize: 20,
    paddingTop: 15,
  },
  attachmentList: {
    flex: 1,
  },
  contentContainer: {
    // paddingTop: 5,
  },
})

const routes = [
  { title: 'Attachment View', index: 0 },
  { title: 'Attachment Preview', index: 1 },
]
const menuImg = require('../../res/menu.png')
const backImg = require('../../res/back.png')

export default class AttachmentView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      text: '',
    }
    this.renderScene = this.renderScene.bind(this)
  }

  getNavigationBar() {
    return (
      <Navigator.NavigationBar
        routeMapper={{
          LeftButton: (route, navigator, index, navState) => {
            switch (route.index) {
              default:
              case 0: {
                return (
                  <TouchableHighlight onPress={this.toggleSideBar}>
                    <Image source={menuImg} />
                  </TouchableHighlight>
                )
              }
              case 1: {
                return (
                  <TouchableHighlight onPress={() => navigator.pop()}>
                    <Image source={backImg} />
                  </TouchableHighlight>
                )
              }
            }
          },
          RightButton: (route, navigator, index, navState) => null,
          Title: (route, navigator, index, navState) => (
            <Text style={styles.navigationTitle}>{route.title}</Text>
          ),
        }}
        style={styles.navigationBar}
      />
    )
  }

  renderScene(route, navigator) {
    // const { searchText } = this.state
    switch (route.index) {
      case 0:
      default: {
        return (
          <View style={styles.contentContainer}>
            <AttachmentSearchBar />
            <AttachmentVisibleList
              style={styles.attachmentList}
              gotoPreviewScene={() => {
                navigator.push(routes[1])
              }}
            />
          </View>
        )
      }
      case 1: {
        return (
          <View style={{ backgroundColor: '#fff', flex: 1 }}>
            <Text>preview preview</Text>
          </View>
        )
      }
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          backgroundColor="blue"
          translucent={false}
          barStyle={'light-content'}
        />
        <Navigator
          initialRoute={routes[0]}
          initialRouteStack={routes}
          renderScene={this.renderScene}
          navigationBar={this.getNavigationBar()}
          style={styles.navigator}
        />
      </View>
    )
  }
}
