import { connect } from 'react-redux'
import {
  searchAttachments,
} from '../actions'
import SearchBar from '../components/Searchbar'

const mapStateToProps = ({ attachments: { keyword } }) => ({
  keyword,
})

const mapDispatchToProps = dispatch => ({
  onKeywordChange: keyword => dispatch(searchAttachments(keyword)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)
