import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native'

class AttachmentItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: false,
    }
  }
  toggleSelect(e) {
    this.setState((prevState, props) => {
      return {
        checked: !prevState.checked
      }
    })
  }
  render() {
    const { showCheckbox, longPressRow } = this.props
    const { checked } = this.state
    let checkbox
    if (showCheckbox) {
      let checkboxSource = checked ? require('../res/checkbox_checked.png') : require('../res/checkbox_unchecked.png')
      checkbox = (
        <TouchableWithoutFeedback onPress={(e) => this.toggleSelect()}>
          <View style={{width:40,paddingVertical:20}}>
            <Image source={checkboxSource} style={{paddingVertical:10,width:20,height:20}}></Image>
          </View>
        </TouchableWithoutFeedback>
      )
    } 

    return (
    <TouchableWithoutFeedback delayLongPress={2000} onLongPress={longPressRow}>
      <View style={styles.container}>
          {checkbox}
          <View>
            <Image 
              style={styles.image} 
              source={this.props.imgSource} 
              onPress={(e) => this.props.onClickImage()}>
            </Image>
          </View>
          <View style={styles.detailContainer}>
            <Text className='name'>{this.props.name}</Text>
            <Text className='size'>{this.props.size}</Text>
            <Text className='subject'>{this.props.subject}</Text>
            <Text className='from'>{this.props.from}</Text>
          </View>
      </View>
    </TouchableWithoutFeedback>
    )
  }
}

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
  }
})

export default AttachmentItem