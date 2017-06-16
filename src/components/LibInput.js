import React, { Component } from 'react';

class LibInput extends Component{
	render() {
		return(
			<input type="text" placeholder={this.props.placeholder} className="mad-lib-form__input" />
		)
	}
}

export default LibInput;