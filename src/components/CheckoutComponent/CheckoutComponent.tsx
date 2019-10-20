import React from 'react';
import './CheckoutComponent.scss';
import $ from 'jquery';

interface ICheckoutState {
  identityNumberFirstSix: string,
  identityNumberLastFour: string,
  phone: string,
  focusedInput: string,
  productAmount1: number,
  productAmount2: number
}

class CheckoutComponent extends React.Component<{}, ICheckoutState> {
  constructor(props: any) {
    super(props);
    this.state = {
      identityNumberFirstSix: "",
      identityNumberLastFour: "",
      phone: "",
      focusedInput: "",
      productAmount1: 1,
      productAmount2: 1
    }
  }

  componentDidMount = () => {
    
  }

  handleIdentityInputChange = (e: any) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    } as ICheckoutState);
    if (target.value.length === 6) {
      $("#identityNumberLastFour").focus();
    }
  }

  handlePhoneInputChange = (e: any) => {
    const value = e.target.value;
    this.setState({
      phone: value
    });
  }

  handleBackspace = () => {
    if(this.state.focusedInput === "identityForm") {
      if(this.state.identityNumberLastFour.length > 0) {
        let currentValue = this.state.identityNumberLastFour;
        let newValue = currentValue.slice(0, -1);
        this.setState({
          identityNumberLastFour: newValue
        })
      } else {
        let currentValue = this.state.identityNumberFirstSix;
        let newValue = currentValue.slice(0, -1);
        this.setState({
          identityNumberFirstSix: newValue
        })
      }
    } else if (this.state.focusedInput === "phoneForm") {
        let currentValue = this.state.phone;
        let newValue = currentValue.slice(0, -1);
        this.setState({
          phone: newValue
        })
    }
  }

  handleKeypad = (value: string) => {
    if(this.state.focusedInput === "identityForm") {
      if(this.state.identityNumberFirstSix.length === 6 && this.state.identityNumberLastFour.length < 4) {
        let currentValue = this.state.identityNumberLastFour;
        let newValue = currentValue + value;
        this.setState({
          identityNumberLastFour: newValue
        })
      } else if (this.state.identityNumberFirstSix.length < 6) {
        let currentValue = this.state.identityNumberFirstSix;
        let newValue = currentValue + value;
        this.setState({
          identityNumberFirstSix: newValue
        })
      }
    } else if (this.state.focusedInput === "phoneForm") {
      let currentValue = this.state.phone;
      let newValue = currentValue + value;
      this.setState({
        phone: newValue
      })
    }
  }

  focusIdentityForm = (e: any) => {
    $("#phoneInputContainer").removeClass("focused");
    $("#phoneInputContainer .editIcon").removeClass("hiddenIcon");
    if(this.state.focusedInput === "identityForm") {
      this.setState({
        focusedInput: ""
      })
    } else {
      this.setState({
        focusedInput: "identityForm"
      })
    }
    $("#identityNumberContainer").toggleClass("focused");
    $("#identityNumberContainer .editIcon").toggleClass("hiddenIcon");
    if(this.state.identityNumberFirstSix.length === 6 && e.target.name !== "identityNumberFirstSix"){
      $("#identityNumberLastFour").focus();
    } else {
      $("#identityNumberFirstSix").focus();
    }
  }

  focusPhoneForm = () => {
    $("#identityNumberContainer").removeClass("focused");
    $("#identityNumberContainer .editIcon").removeClass("hiddenIcon");
    if(this.state.focusedInput === "phoneForm") {
      this.setState({
        focusedInput: ""
      })
    } else {
      this.setState({
        focusedInput: "phoneForm"
      })
    }
    $("#phoneInputContainer").toggleClass("focused");
    $("#phoneInputContainer .editIcon").toggleClass("hiddenIcon");
    $("#phone").focus();
  }

  handleDone = () => {
    if(this.state.focusedInput === "identityForm") {
      $("#identityNumberContainer").removeClass("focused");
      $("#identityNumberContainer .editIcon").removeClass("hiddenIcon");
    } else if (this.state.focusedInput === "phoneForm") {
      $("#phoneInputContainer").removeClass("focused");
      $("#phoneInputContainer .editIcon").removeClass("hiddenIcon");
    }
    this.setState({
      focusedInput: ""
    })
  }

  handleIncrease = (product: string) => {
    if(product === "product1") {
      let currentValue = this.state.productAmount1;
      let newValue = currentValue + 1;
      this.setState({
        productAmount1: newValue
      })
    }
    if(product === "product2") {
      let currentValue = this.state.productAmount2;
      let newValue = currentValue + 1;
      this.setState({
        productAmount2: newValue
      })
    }
  }

  handleDecrease = (product: string) => {
    if(product === "product1" && this.state.productAmount1 !== 0) {
      let currentValue = this.state.productAmount1;
      let newValue = currentValue - 1;
      this.setState({
        productAmount1: newValue
      })
    }
    if(product === "product2" && this.state.productAmount2 !== 0) {
      let currentValue = this.state.productAmount2;
      let newValue = currentValue - 1;
      this.setState({
        productAmount2: newValue
      })
    }
  }

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
            <div className="addressContainer">
              <div className="formContainer">
                <h2>Kunduppgifter</h2>
                <p>Hämta dina adressuppgifter genom att fylla i ditt personnummer</p>
              </div>
              <div id="identityNumberContainer" className="formContainer" onClick={this.focusIdentityForm}>
                <p>Personnummer:</p>
                <div className="inputRow">
                  <input type="text" id="identityNumberFirstSix" className="identityInput" name="identityNumberFirstSix" aria-label="Första sex siffrorna i ditt personnummer" value={this.state.identityNumberFirstSix} onChange={this.handleIdentityInputChange} maxLength={6}/>
                  <p>–</p>
                  <input type="text" id="identityNumberLastFour" className="identityInput" name="identityNumberLastFour" aria-label="Sista fyra siffrorna i ditt personnummer" value={this.state.identityNumberLastFour} onChange={this.handleIdentityInputChange} maxLength={4}/>
                  <img className="editIcon" src={require("../../images/edit-icon.png")} alt=""/>
                </div>
                <div className="identityNumberBorderRow">
                  <div className="sixNumberBorder"></div>
                  <div className="fourNumberBorder"></div>
                </div>
              </div>
              <div className="formContainer fetchedCustomerContainer">
                <h3>Bo Göran</h3>
                <p>Rävgatan 1b</p>
                <p>123 45 Boliden</p>
              </div>
            </div>
            <div className="phoneContainer">
              <div className="formContainer">
                <h2>Kontaktuppgifter</h2>
                <p>Fyll i ditt telefonnummer för att få ett SMS när din order är redo.</p>
              </div>
              <div id="phoneInputContainer" className="formContainer" onClick={this.focusPhoneForm}>
                <p>Mobilnummer:</p>
                <div className="inputRow">
                  <input type="text" id="phone" name="phoneNoAutocomplete" aria-label="Mobilnummer" value={this.state.phone} onChange={this.handlePhoneInputChange} maxLength={10}/>
                  <img className="editIcon" src={require("../../images/edit-icon.png")} alt=""/>
                </div>
                <div className="identityNumberBorderRow">
                  <div className="phoneNumberBorder"></div>
                </div>
                
              </div>
            </div>
           </div>

           <div className="cartContainer formContainer">
              <div className="productContainerRow">
                <div className="productColumns">
                  <div className="itemImageFrame">
                    <img className="itemImage" src={require("../../images/saw.jpg")} alt=""/>
                  </div>
                  <div>
                    <h3>Bosch</h3>
                    <p className="modelName">PST 700 E</p>
                  </div>
                </div>
                <div className="productAmountContainer">
                  <button className="operatorButton" onClick={() => this.handleIncrease("product1")}><img className="operatorIcon" src={require("../../images/plus-icon.png")} alt="Plus icon"/></button>
                  <p>{this.state.productAmount1}st</p>
                  <button className="operatorButton" onClick={() => this.handleDecrease("product1")}><img className="operatorIcon" src={require("../../images/minus-icon.png")} alt="Minus icon"/></button>
                </div>
                <p className="priceColumn">599 kr</p>
              </div>
              <div className="productContainerRow">
                <div className="productColumns">
                  <div className="itemImageFrame">
                    <img className="itemImage" src={require("../../images/sawblades.jpg")} alt=""/>
                  </div>
                  <div>
                    <h3>Bosch</h3>
                    <p className="modelName">10-delars sticksågblad</p>
                  </div>
                </div>
                <div className="productAmountContainer">
                  <button className="operatorButton" onClick={() => this.handleIncrease("product2")}><img className="operatorIcon" src={require("../../images/plus-icon.png")} alt="Plus icon"/></button>
                  <p>{this.state.productAmount2}st</p>
                  <button className="operatorButton" onClick={() => this.handleDecrease("product2")}><img className="operatorIcon" src={require("../../images/minus-icon.png")} alt="Minus icon"/></button>
                </div>
                <p className="priceColumn">139 kr</p>
              </div>
              <div className="cartBottomContainer">
                <div className="productContainerRow">
                  <div className="productColumns">
                    <div className="itemImageFrame">
                      <img className="itemImage" src={require("../../images/delivery-icon.png")} alt="Delivery icon"/>
                    </div>
                    <label className="checkboxContainer">
                      <input type="checkbox"/>
                      <span className="checkmark"></span>
                      <p>Hemleverans</p>
                    </label>
                    
                  </div>
                  <p className="priceColumn">79 kr</p>
                </div>
                <div className="productContainerRow">
                  <div className="productColumns">
                    <div className="itemImageFrame">
                      <img className="itemImage" src={require("../../images/shop-icon.png")} alt="Delivery icon"/>
                    </div>
                    <label className="checkboxContainer">
                      <input type="checkbox"/>
                      <span className="checkmark"></span>
                      <p>Hämta i butik</p>
                    </label>
                    
                  </div>
                </div>

                <div className="paymentContainer">
                  <div className="paymentRow">
                    <h2>Att betala:</h2>
                    <h2>kr</h2>
                  </div>
                  <div className="paymentRow">
                    <p>Varav moms:</p>
                    <p>kr</p>
                  </div>
                </div>
              </div>
              
           </div>

          </main>
          <footer>
            <a href=""><img className="returnArrowIcon" src={require("../../images/return-arrow-icon.png")} alt=""/>Fortsätt handla</a>
            <div className="orderContainer">
              <a className="orderLink" href="">BESTÄLL <img src={require("../../images/forward-arrow-icon.png")} alt=""/></a>
            </div>
          </footer>
        </div>
        
        <aside>
          <div className="keypadContainer">
            <h3>Kassan</h3>
            <p>Använd knappsatset nedan för att mata in ditt personnummer 
              respektie telefonnummer i formuläret till vänster. 
              Välj sedan ditt önskade leveranssätt och klicka på "Beställ".</p>
              <div className="keypad">
                <button onClick={() => this.handleKeypad("1")}>1</button>
                <button onClick={() => this.handleKeypad("2")}>2</button>
                <button onClick={() => this.handleKeypad("3")}>3</button>
                <button onClick={() => this.handleKeypad("4")}>4</button>
                <button onClick={() => this.handleKeypad("5")}>5</button>
                <button onClick={() => this.handleKeypad("6")}>6</button>
                <button onClick={() => this.handleKeypad("7")}>7</button>
                <button onClick={() => this.handleKeypad("8")}>8</button>
                <button onClick={() => this.handleKeypad("9")}>9</button>
                <button><img className="backspaceIcon" src={require("../../images/backspace-icon.png")} alt="Backspace icon" onClick={this.handleBackspace}/></button>
                <button onClick={() => this.handleKeypad("0")}>0</button>
                <button><img className="checkmarkIcon" src={require("../../images/checkmark-icon.png")} alt="Checkmark icon" onClick={this.handleDone}/></button>
              </div>
          </div>
        </aside>
      </div>
    )
  }
}
export default CheckoutComponent;