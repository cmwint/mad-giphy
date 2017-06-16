import React, { Component } from 'react';
import { render } from 'react-dom';

// routing
import { BrowserRouter, Route, Switch } from 'react-router-dom';


import MadLibs from './components/MadLibs';
import MadGiphy from './components/MadGiphy';
import Error404 from './components/Error404';
//import registerServiceWorker from './registerServiceWorker';

import './index.css';

class App extends Component {

	constructor() {
	    super();
	    
	    this.state = {
	    	madLibsJson: {},
	    	giphyReplace: {},
	    };
	}

	render() {
		return(
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={MadLibs} />
					<Route exact path="/mad-giphy/" component={MadGiphy} />
					<Route component={Error404} />
				</Switch>
			</BrowserRouter>
		);
	}
}


// using the render method from the react-dom package
// first thing we pass it is what component we would like to render
// this is JSX since it's kinda like our own tag
// then the last thing is what DOM element it should render out to
	//render(<App />, document.querySelector('#ohHello'));

render(<App />, document.getElementById('root'));
//registerServiceWorker();
