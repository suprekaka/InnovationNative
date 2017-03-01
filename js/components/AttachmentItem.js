import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
} from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  image: {
    width: 80,
    height: 80,
  },
  detailContainer: {
    flex: 1,
    marginLeft: 5,
    backgroundColor: '#ddd',
  },
})

class AttachmentItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: false,
    }

    this.toggleSelect = this.toggleSelect.bind(this)
  }
  toggleSelect() {
    this.setState((prevState) => {
      return {
        checked: !prevState.checked
      }
    })
  }
  render() {
    const {
      showCheckbox,
      longPressRow,
      onClickImage,
      imgSource,
      filename,
      size,
      subject,
      from,
    } = this.props
    const { checked } = this.state
    let checkbox
    if (showCheckbox) {
      let checkboxSource = checked ? require('../../res/checkbox_checked.png') : require('../../res/checkbox_unchecked.png')
      checkbox = (
        <TouchableWithoutFeedback onPress={this.toggleSelect}>
          <View style={{ width: 40, paddingVertical: 20 }}>
            <Image source={checkboxSource} style={{paddingVertical:10,width:20,height:20}}></Image>
          </View>
        </TouchableWithoutFeedback>
      )
    } 

    return (
      <TouchableWithoutFeedback
        delayLongPress={800}
        onLongPress={() => {
          longPressRow()
          this.toggleSelect()
        }}
      >
        <View style={styles.container}>
            {checkbox}
            <View>
              <Image
                style={styles.image}
                source={imgSource}
                onPress={onClickImage}
              >
              </Image>
            </View>
            <View style={styles.detailContainer}>
              <Text className="name">{filename}</Text>
              <Text className="size">{size}</Text>
              <Text className="subject">{subject}</Text>
              <Text className="from">{from}</Text>
            </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

export default AttachmentItem
