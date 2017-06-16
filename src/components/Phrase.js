import React, { Component } from 'react';

class Phrase extends Component{
	render() {
		return(
			<span className="phrase">{this.props.info}</span>
		)
	}
}

export default Phrase;