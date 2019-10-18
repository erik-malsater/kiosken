import React from 'react';
import './App.css';
import CheckoutComponent from './components/CheckoutComponent/CheckoutComponent';

class App extends React.Component<{}, {}> {
  render() {
    return(
      <div className="App">

        <CheckoutComponent />

      </div>
    )
  }

}
export default App;
