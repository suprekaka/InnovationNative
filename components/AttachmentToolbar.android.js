import React, { Component } from 'react'
import {
  ToolbarAndroid,
} from 'react-native'


class AttachmentToolbar extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <ToolbarAndroid 
        title="Attachment View"
        style={this.props.styles}
        contentInsetEnd={10} 
        actions={this._renderActions()}/> 
    )
  }
  _renderActions() {
    const actions = [
      {title: 'Sortby', show:'always', showWithText:true},
      {title: 'Filter', show:'always', showWithText:true},
    ]
    return actions
  }
}

export default AttachmentToolbar