import React, { Component } from 'react'
import {
  View,
  StatusBar,
  Navigator,
  TouchableHighlight,
  Text,
  Image,
  TextInput,
  StyleSheet,
  Platform,
} from 'react-native'
import AttachmentList from '../containers/AttachmentList'

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
    const { searchText } = this.state
    switch (route.index) {
      case 0:
      default: {
        return (
          <View style={styles.contentContainer}>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                onChangeText={searchText => this.setState({ searchText })}
                value={searchText}
                placeholder={'Search'}
                autoCapitalize={'none'}
              />
            </View>
            <AttachmentList
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
          <Text>preview preview</Text>
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

// const windowSize = Dimensions.get('window')

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
    backgroundColor: '#37b3ff',
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
  searchContainer: {
    ...Platform.select({
      ios: {
        backgroundColor: '#ddd',
      },
    }),
    height: 40,
  },
  searchInput: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    marginHorizontal: 10,
    ...Platform.select({
      ios: {
        marginTop: 6,
        height: 28,
        borderRadius: 8,
      },
    }),
  },
  contentContainer: {
    // paddingTop: 5,
  },
})
