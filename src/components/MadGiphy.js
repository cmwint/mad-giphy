import React, { Component } from 'react';

class MadGiphy extends Component {

	getData() {
        if (!this.props.gifImages) { return null; }
        return (
            <div>{this.props.gifImages}</div>
        )
	}

	render() {
        return (
            <div>{this.getData()}</div>
        )
	}
}

export default MadGiphy;
