import React, { Component } from 'react';
import PropTypes from 'prop-types';

// styling
import './MadLibs.css';


class MadLibs extends Component {

  giphyfyMadLibs(event) {
      // prevent default to stop form from refreshing the page
      event.preventDefault();

      console.log(this.props);
  }
  
  handleChange(event) {
    console.log('hello');
  }

  render() {
    var madLibParts = this.props.displayMadLibs;
    return (
      <form className="mad-lib-form" onSubmit={(e) => this.giphyfyMadLibs(e)}>
        <p className="mad-lib-form__body">
          {
            madLibParts.map(function(part, index){
              if(index % 2 === 0){
                return <span
                    key={ index }
                    className="mad-lib-form__phrase">
                    { part }
                  </span>;
              }else{
                return <input
                    key={ index }
                    type="text"
                    placeholder={ part }
                    className="mad-lib-form__input"
                    onChange={(e) => this.handleChange(e)}
                  />;
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
