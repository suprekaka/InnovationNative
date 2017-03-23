import React from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native'
import { host } from '../config'
import { formatByteSize } from '../utils'

const {
  height: windowHeight,
  width: windowWidth,
} = Dimensions.get('window')

const styles = StyleSheet.create({
  previewContainer: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: windowWidth - 10,
    height: windowHeight - 200,
  },
  imageContainer: {
    marginTop: 20,
  },
  fieldContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  field: {
    lineHeight: 20,
  },
  filename: {
    fontSize: 16,
    fontWeight: 'bold',
  },
})

const AttachmentPreview = ({ previewData }) => {
  return (
    <View style={styles.previewContainer}>
      <View style={styles.fieldContainer}>
        <Text style={[styles.field, styles.filename]}>
          {previewData.filename}
        </Text>
        <Text style={styles.field}>
          {formatByteSize(previewData.size)}
        </Text>
        <Text style={styles.field}>
          {previewData.messageInfo && previewData.messageInfo.subject}
        </Text>
        <Text style={styles.field}>
          {previewData.messageInfo && previewData.messageInfo.from.address}
        </Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: previewData.thumbSrc }}
          style={styles.image}
        />
      </View>
    </View>
  )
}

export default AttachmentPreview
