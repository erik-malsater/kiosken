import React from 'react';
import './App.css';
import CheckoutComponent from './components/CheckoutComponent/CheckoutComponent';
import {Helmet} from 'react-helmet';

class App extends React.Component<{}, {}> {
  render() {
    return(
      <div className="App">

        <Helmet>
          <meta name="robots" content="noindex" />
        </Helmet>

        <CheckoutComponent />

      </div>
    )
  }

}
export default App;
