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
        navIcon={require('../res/menu.png')}
        onIconClicked={this.props.onIconClicked}
        onActionSelected={this.props.onEditClicked} 
        style={this.props.styles}
        contentInsetEnd={10} 
        actions={this._renderActions()}/> 
    )
  }
  _renderActions() {
    const actions = [
      {title: 'Edit', show:'always', showWithText:true},
    ]
    return actions
  }
}

export default AttachmentToolbar