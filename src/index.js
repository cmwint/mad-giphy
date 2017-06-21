import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';

// routing
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// components
import MadLibs from './components/MadLibs';
import MadGiphy from './components/MadGiphy';
import Error404 from './components/Error404';
import Footer from './components/Footer';

import './index.css';

class App extends Component {

	constructor() {
    super();

    this.getNewMadLibs = this.getNewMadLibs.bind(this);
    this.addInputs = this.addInputs.bind(this);
    this.convertInputs = this.convertInputs.bind(this);
    this.getRandomNum = this.getRandomNum.bind(this);
    
    this.state = {
    	title: '',
    	madLibsArray: [],
    	madLibsInput: {},
    	giphyReplace: [],
    };
	}

	getRandomNum(min, max) {
		return Math.floor(Math.random() * (max - min) + min);
	}

	componentDidMount(){
		this.getNewMadLibs();
	}

	getNewMadLibs() {
		axios.get(`http://madlibz.herokuapp.com/api/random?minlength=${this.getRandomNum(1,15)}&maxlength=${this.getRandomNum(16,30)}`)
	      .then(res => {
	        let randomMadLib = res.request.responseText;
	      	// turn string from API into JSON
	        randomMadLib = JSON.parse(randomMadLib);
	      	// merge blanks and value arrays so they aren't separate
	        let mergeMadLibArray = randomMadLib.value.reduce(function(arr, v, i) {
            return arr.concat(v, randomMadLib.blanks[i]); 
          }, []);
	      	// remove weird last three empty values
	        mergeMadLibArray.splice(-3,3);

    		this.setState({
				title: randomMadLib.title,
				madLibsArray: mergeMadLibArray
			});
    });
	}

	addInputs(index, value) {
		// take a copy of the state
    const madLibsInput = {...this.state.madLibsInput};
    // then add in new objects from field inputs
    madLibsInput[index] = value;
    // set state with added objects in it
    this.setState({ madLibsInput });
	}

	convertInputs() {
		var promiseArray = [];
		// for every key/value in the madLibsInput state
		for(var key in this.state.madLibsInput) {
			// save the value
		    var value = this.state.madLibsInput[key];
		    // call out to the API
		    var promise = axios.get(`http://api.giphy.com/v1/gifs/search?q=${value}&api_key=dc6zaTOxFJmzC&rating=pg`);
		    // save it to an array
		    promiseArray.push(promise);

		}
		Promise.all(promiseArray).then((response) => {
			var gifsArray = [];
			for(var object in response) {
				// get giphy images
				var value = response[object].data.data[this.getRandomNum(1,15)].images.downsized_small.mp4;
				// update state
				gifsArray.push(value);

				// set state with added array items
				this.setState({
					giphyReplace: gifsArray
				})
			}
		}).catch(function(err) {
      // dispatch a failure and throw error
      throw err;
   });
	}

	render() {
		var classesArray = [];
		// additional class names
		classesArray.push('mad-giphy-app');
		classesArray.push(this.state.title.toLowerCase().split(' ').join('-').replace('/', ''));
		var classString = classesArray.join(' ');

		return(
			<div className={classString}>
				<div className="mad-giphy-app__wrap">
					<h1>{this.state.title}</h1>
					<BrowserRouter>
						<Switch>
							<Route exact path='/'render={routeProps => 
								<MadLibs {...routeProps}
									gifImages={this.state.giphyReplace}
									displayMadLibs={this.state.madLibsArray}
									convertInputs={this.convertInputs}
									addInputs={this.addInputs} />}
								/>
							<Route exact path="/mad-giphy/" render={routeProps =>
								<MadGiphy {...routeProps}
									gifImages={this.state.giphyReplace}
									madLibsArray={this.state.madLibsArray} />}
								/>
							<Route component={Error404} />
						</Switch>
					</BrowserRouter>
				</div>
				<Footer />
			</div>
		);
	}
}

render(<App />, document.getElementById('root'));
