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
import AttachmentVisibleList from '../containers/AttachmentVisibleList'
import AttachmentSearchBar from '../containers/AttachmentSearchbar'
import AttachmentPreview from '../containers/AttachmentPreview'

const styles = StyleSheet.create({
  navigator: {
    paddingTop: 60,
  },
  navigationBar: {
    backgroundColor: '#008cfa',
    height: 60,
  },
  navigationTitle: {
    fontSize: 20,
    ...Platform.select({
      ios: {
        marginTop: 10,
      },
      android: {
        marginTop: 22,
        marginLeft: 50,
      },
    }),
  },
  attachmentList: {
    flex: 1,
  },
  contentContainer: {
    // paddingTop: 5,
    flex: 1,
    backgroundColor: '#fff',
  },
  leftImgBtn: {
    marginLeft: 4,
    height: 35,
    width: 35,
    ...Platform.select({
      ios: {
        marginTop: 4,
      },
      android: {
        marginTop: 22,
      },
    }),
  },
})

const routes = [
  { title: 'Attachment View', index: 0 },
  { title: 'Attachment Preview', index: 1 },
]
const menuImg = require('./images/menu.png')
const backImg = require('./images/back.png')

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
                  <TouchableHighlight
                    onPress={this.toggleSideBar}
                    underlayColor={'#fff0'}
                  >
                    <Image
                      style={styles.leftImgBtn}
                      source={menuImg}
                    />
                  </TouchableHighlight>
                )
              }
              case 1: {
                return (
                  <TouchableHighlight
                    onPress={() => navigator.pop()}
                    underlayColor={'#fff0'}
                  >
                    <Image
                      style={styles.leftImgBtn}
                      source={backImg}
                    />
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
          <View style={styles.contentContainer}>
            <AttachmentPreview />
          </View>
        )
      }
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          backgroundColor="#ffffff00"
          translucent
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
