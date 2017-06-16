import React, { Component } from 'react';

class Phrase extends Component{
	render() {
		return(
			<span className="mad-lib-form__phrase">{this.props.info}</span>
		)
	}
}

export default Phrase;