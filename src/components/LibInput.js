import React, { Component } from 'react';

class LibInput extends Component{
	render() {
		return(
			<input type="text" placeholder={this.props.placeholder} className="lib-input" />
		)
	}
}

export default LibInput;