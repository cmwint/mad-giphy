import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Phrase from './Phrase';
import LibInput from './LibInput';

// styling
import './MadLibs.css';


class MadLibs extends Component {
  giphyfyMadLibs(event) {
      // prevent default to stop form from refreshing the page
      event.preventDefault();

      // then move the url from home page (/) to /mad-giphy
      // this.context.router.history.push('/mad-giphy/');
  }

  render() {
    var madLibParts = this.props.displayMadLibs;
    return (
      <form className="mad-lib-form" onSubmit={(e) => this.giphyfyMadLibs(e)}>
        <p className="mad-lib-form__body">
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

        <div className="mad-lib-form__button">
          <button type="submit">
            <span>Giphy-fy me!</span>
          </button>
        </div>
        
      </form>
    );
  }
}

// surfacing the router
MadLibs.contextTypes = {
  router: PropTypes.object
}

export default MadLibs;
