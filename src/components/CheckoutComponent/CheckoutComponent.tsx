import React from 'react';
import './CheckoutComponent.scss';
import $ from 'jquery';

interface ICheckoutState {
  identityNumberFirstSix: string,
  identityNumberLastFour: string,
  focusedInput: string
}

class CheckoutComponent extends React.Component<{}, ICheckoutState> {
  constructor(props: any) {
    super(props);
    this.state = {
      identityNumberFirstSix: "",
      identityNumberLastFour: "",
      focusedInput: ""
    }
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

  handleBackspace = () => {
    if(this.state.focusedInput === "identityForm") {
      
      if(this.state.identityNumberLastFour.length > 0) {
        console.log("lalala");
        let currentValue = this.state.identityNumberLastFour;
        let newValue = currentValue.slice(0, -1);
        this.setState({
          identityNumberLastFour: newValue
        })
      } else {
        let currentValue = this.state.identityNumberFirstSix;
        let newValue = currentValue.slice(0, -1);
        console.log("taaar bort");
        this.setState({
          identityNumberFirstSix: newValue
        })
      }
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
    }
  }

  focusIdentityForm = (e: any) => {
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
/*
  focusIdentityFormSection = () => {
    $("#identityNumberFirstSix").focus();
  }*/

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
                <label htmlFor="identityNumber">Personnummer:</label>
                <div className="inputRow">
                  <input type="text" id="identityNumberFirstSix" className="identityInput" name="identityNumberFirstSix" value={this.state.identityNumberFirstSix} onChange={this.handleIdentityInputChange} maxLength={6}/>
                  <p>–</p>
                  <input type="text" id="identityNumberLastFour" className="identityInput" name="identityNumberLastFour" value={this.state.identityNumberLastFour} onChange={this.handleIdentityInputChange} maxLength={4}/>
                  <img className="editIcon" src={require("../../images/edit-icon.png")} alt=""/>
                </div>
                <div className="identityNumberBorderRow">
                  <div className="sixNumberBorder"></div>
                  <div className="fourNumberBorder"></div>
                </div>
                
              </div>
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
                <button><img className="checkmarkIcon" src={require("../../images/checkmark-icon.png")} alt="Checkmark icon"/></button>
              </div>
          </div>
          <div className="orderContainer">
            <a className="orderLink" href="">BESTÄLL <img src={require("../../images/forward-arrow-icon.png")} alt=""/></a>
          </div>
        </aside>
      </div>
    )
  }
}
export default CheckoutComponent;