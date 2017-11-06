import React, { Component } from 'react';

export default class Landing extends Component {
  render() {
    return (
       <div className="landingPage row" onClick={() => this.props.history.push('/login')}>	     
	   </div>
    )
  }
}