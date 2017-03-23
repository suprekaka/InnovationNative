import React, { Component } from 'react'
import {
  View,
  StatusBar,
  // Navigator,
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

export default class Attachment extends Component {
  constructor(props) {
    super(props)

    this.state = {
      text: '',
      renderScene: routes[0],
    }
    this.renderScene = this.renderScene.bind(this)
  }
  renderScene(view) {
    this.setState({renderScene: view})
  }

  render() {
    const { renderScene } = this.state
    let view
    let button
    if (renderScene.index === 0) {
      view = (<View style={styles.contentContainer}>
        <AttachmentSearchBar />
          <AttachmentVisibleList
            style={styles.attachmentList}
            gotoPreviewScene={() => {
              this.renderScene(routes[1])
            }}
          /></View>)
      button = (
        <TouchableHighlight
          onPress={() => console.log('menu')}
          underlayColor={'#fff0'}
        >
          <Image
            style={styles.leftImgBtn}
            source={menuImg}
          />
        </TouchableHighlight>
      )
    } else {
      view = (<View style={styles.contentContainer}>
        <AttachmentPreview />
      </View>)
      button = (
        <TouchableHighlight
            onPress={() => this.renderScene(routes[0])}
            underlayColor={'#fff0'}
          >
          <Image
            style={styles.leftImgBtn}
            source={backImg}
          />
        </TouchableHighlight>
      )
    }
    return (
      <View style={{ flex: 1 }}>
          <div style={{height:60,background:'#ddd',display:'flex'}}>
            {button}
            <div  style={{flex:1,margin:'auto',textAlign:'center'}}><span>{renderScene.title}</span></div>
          </div>
          {view}
      </View>
    )
  }
}