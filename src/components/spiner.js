import React, { Component } from 'react'
import loading from './loading.gif'

export default class spiner extends Component {
  render() {
    return (
        <div className='text-center'>
      <img src={loading} alt="loading"></img>
      </div>
    )
  }
}
