import React, { Component } from 'react';
import './App.css';

import { Provider } from 'react-redux';

/**
 * Internal dependencies
 */
import reduxStore from './state';
import ServerConfiguration from './components/server-configuration';

class App extends Component {
  render() {
    return (
      <div className="App">
		  <div className="app-container">
			  <Provider store={ reduxStore }>
				  <ServerConfiguration/>
			  </Provider>
		  </div>
      </div>
    );
  }
}

export default App;
