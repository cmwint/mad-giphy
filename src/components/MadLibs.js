import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Phrase from './Phrase';
import LibInput from './LibInput';

class MadLibs extends Component {
  giphyfyMadLibs(event) {
      // prevent default to stop form from refreshing the page
      event.preventDefault();

      // then move the url from home page (/) to /mad-giphy
      this.context.router.history.push('/mad-giphy/');
  }

  render() {
    var madLibParts = this.props.displayMadLibs;
    return (
      <form className="mad-lib" onSubmit={(e) => this.giphyfyMadLibs(e)}>
        <h2>hi hello this is a mad lib!</h2>
        <p className="">
          {
            madLibParts.map(function(part, index){
              if(index % 2 === 0){
                return <Phrase key={ index } info={ part } />;
              }else{
                return <LibInput key={ index } placeholder={ part } />;
              }
            })
          }
        </p>

        <h3>Giphy-fy this stuff</h3>
        <button type="submit">yay go me!</button>
      </form>
    );
  }
}

// surfacing the router
MadLibs.contextTypes = {
  router: PropTypes.object
}

export default MadLibs;
