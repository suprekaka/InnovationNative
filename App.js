import React, { Component } from 'react'
import AttachmentGrid from './components/AttachmentGrid'

const genRows = function() {
  const datablob = []
  for (let i = 0; i < 100; i++) {
    datablob.push({
      imgSource: {uri: 'https://www.baidu.com/img/bd_logo1.png'},
      name: `Test name ${i}`,
      size: '10',
      subject: `Test subject ${i}`,
      from: `Test from ${i}`
    })
  }
  return datablob
}

class App extends Component {
  render() {
    return (<AttachmentGrid data={genRows()}/>)
  }
}
export default App