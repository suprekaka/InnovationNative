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
  }
  render() {
    const { 
      name, 
      size,
      subject,
      from,
      onClickImage, 
      onClickDetail, 
      imgSource 
    } = this.props
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={onClickImage}>
        <View>
          <Image 
            style={styles.image} 
            source={imgSource}>
          </Image>
        </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={onClickDetail}>      
          <View style={styles.detailContainer}>
            <Text className='name'>{name}</Text>
            <Text className='size'>{size}</Text>
            <Text className='subject'>{subject}</Text>
            <Text className='from'>{from}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
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
  }
})

export default AttachmentItem