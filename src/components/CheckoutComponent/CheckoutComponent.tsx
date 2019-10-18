import React from 'react';
import './CheckoutComponent.scss';

class CheckoutComponent extends React.Component<{}, {}> {
  render() {
    return(
      <div className="checkoutContainer">
        <div className="centeredContainer">
          <header>
            <a href=""><img src={require("../../images/back-arrow-icon.png")} />Tillbehör</a>
            <h1>Kassa</h1>
          </header>
          <main>

           <div className="customerInformationContainer">
            <div className="addressContainer formContainer">
              Skriv personnummer
            </div>
            <div className="phoneContainer formContainer">
              Fyll i telefonnummer
            </div>
           </div>

           <div className="cartContainer formContainer">

           </div>

          </main>
        </div>
        <aside>
          <div className="keypadContainer">
            keypad
          </div>
        </aside>
      </div>
    )
  }
}
export default CheckoutComponent;