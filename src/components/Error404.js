import React, { Component } from 'react';
import PropTypes from 'prop-types';


class Error404 extends Component {
	startOver(event) {
	    // prevent default to stop form from refreshing the page
	    event.preventDefault();

	    // direct user back to the home page
	    this.context.router.history.push('/');
	}
	render() {
		return (
			<div className="error-404">
				<div className="error-404__header">
					<h2>Sorry! This page does not exist.</h2>
				</div>
				<form className="error-404__form" onSubmit={(e) => this.startOver(e)}>
	       			<button type="submit">Please start over</button>
				</form>
			</div>
		);
	}
}

// surfacing the router
Error404.contextTypes = {
	router: PropTypes.object
}

export default Error404;
