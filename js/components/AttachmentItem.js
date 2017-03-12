import React, { PropTypes } from 'react'
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
    marginLeft: 24,
    paddingVertical: 10,
    paddingRight: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#d5d5d5',
  },
  image: {
    width: 80,
    height: 80,
    borderColor: '#eee',
    borderWidth: StyleSheet.hairlineWidth,
  },
  detailContainer: {
    flex: 1,
    marginLeft: 20,
  },
})

const AttachmentItem = ({
  imgSrc,
  filename,
  size,
  subject,
  from,
  onPress,
}) => (
  <TouchableWithoutFeedback
    onPress={onPress}
  >
    <View style={styles.container}>
      <View>
        <Image
          style={styles.image}
          source={imgSrc}
        />
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

AttachmentItem.defaultProps = {
  onPress: () => {},
}

AttachmentItem.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  filename: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired,
  onPress: PropTypes.func,
}

export default AttachmentItem
