import React from 'react';
import './CheckoutComponent.scss';

class CheckoutComponent extends React.Component<{}, {}> {
  render() {
    return(
      <div className="checkoutContainer">
        <div className="centeredContainer">
          <header>
            <a href=""><img className="backArrowIcon" src={require("../../images/back-arrow-icon.png")} />Tillbehör</a>
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
              Produkter
           </div>

           

          </main>
          <footer>
             <a href=""><img className="returnArrowIcon" src={require("../../images/return-arrow-icon.png")} alt=""/>Fortsätt handla</a>
           </footer>
        </div>
        
        <aside>
          <div className="keypadContainer">
            keypad
          </div>
          <div className="orderContainer">
            <a href="">BESTÄLL</a>
          </div>
        </aside>
      </div>
    )
  }
}
export default CheckoutComponent;