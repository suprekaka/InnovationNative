import React, { PropTypes } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native'
import { host } from '../config'
import { formatByteSize } from '../utils'

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
  field: {
    color: '#444',
    ...Platform.select({
      ios: {
        marginBottom: 2,
      },
    }),
  },
  filename: {
    fontSize: 16,
    color: '#000',
  },
})

const AttachmentItem = ({
  imgSrc,
  filename,
  size,
  subject,
  from,
  uid,
  part,
  onPress,
}) => (
  <TouchableWithoutFeedback
    onPress={e => onPress(`${uid}_${part}`, e)}
  >
    <View style={styles.container}>
      <View>
        <Image
          style={styles.image}
          source={{ uri: imgSrc }}
        />
      </View>
      <View style={styles.detailContainer}>
        <Text style={[styles.field, styles.filename]} className="name">{filename}</Text>
        <Text style={styles.field} className="size">{formatByteSize(size)}</Text>
        <Text style={styles.field} className="subject">{subject}</Text>
        <Text style={styles.field} className="from">{from}</Text>
      </View>
    </View>
  </TouchableWithoutFeedback>
)

AttachmentItem.defaultProps = {
  onPress: () => {},
  // imgSrc: 'https://www.baidu.com/img/bd_logo1.png',
  imgSrc: `${host}images/victo.png`,
}

AttachmentItem.propTypes = {
  uid: PropTypes.number.isRequired,
  part: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  filename: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  subject: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired,
  onPress: PropTypes.func,
}

export default AttachmentItem
