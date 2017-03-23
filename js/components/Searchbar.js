import React, { PropTypes } from 'react'
import {
  View,
  TextInput,
  StyleSheet,
  Platform,
} from 'react-native'

const styles = StyleSheet.create({
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
})

const SearchBar = ({
  keyword,
  onKeywordChange,
}) => (
  <View style={styles.searchContainer}>
    <TextInput
      style={styles.searchInput}
      onChangeText={onKeywordChange}
      value={keyword}
      placeholder={'Search'}
      autoCapitalize={'none'}
    />
  </View>
)

SearchBar.defaultProps = {
  keyword: '',
  onKeywordChange: () => {},
}

SearchBar.propTypes = {
  keyword: PropTypes.string,
  onKeywordChange: PropTypes.func,
}

export default SearchBar
