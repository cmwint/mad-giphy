import React, { Component } from 'react';

class MadGiphy extends Component {

	getData() {
		// var madLibParts = this.props.madLibsArray;
		// var phrasesArray = [];
		// for(var i = 0; i < madLibParts.length; i += 2) {  // take every second element
		//     phrasesArray.push(madLibParts[i]);
		// }
		// console.log(phrasesArray);

		var gifImages = this.props.gifImages;
		var gifsArray = [];
		for(var g = 0; g < gifImages.length; g += 2) {  // take every second element
		    gifsArray.push(gifImages[g]);
		}
		console.log(gifsArray);
	}

	render() {
	    var madLibParts = this.props.madLibsArray;
	    return (
	        <p className="mad-lib-form__body">
	          {
	            madLibParts.map((part, index) => {
	              if(index % 2 === 0){
	                return <span
	                    key={ index }
	                    className="mad-lib-form__phrase">
	                    { part }
	                  </span>;
	              }else{
	                return 'hello';
	              }
	            })
	          }
	        </p>

	    );
	}
}

export default MadGiphy;
