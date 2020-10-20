import React, {Component} from 'react';
import './App.css';

const Memoria = props => (
  <table>
      <thead>
      <tr>
          <th>
          </th>
      </tr>
      </thead>
      <tbody>
          {props.macaco.map((elemento) => {
          return (
          <tr key = {props.macaco.indexOf(elemento)}>
              <th><Button handleClick = {() => props.BotaoMC1(props.macaco.indexOf(elemento))}>MC</Button></th>
              <th><Button handleClick = {() => props.BotaoMR1(elemento)}>MR</Button></th>
              <th>{elemento}</th>
          </tr>)  
      }
      )}        
      </tbody>
  </table>
)

const isOperator = val => {
  return !isNaN(val) || val === "." || val === "=";
}

const Button = props => (
  <div className={`button-wrapper ${
      isOperator(props.children) ? null: "operator"
  }`}
    onClick={() => props.handleClick(props.children)}
  >
      {props.children}
  </div>
)

const Input = props => <div className="input">{props.input}</div>;
const ClearButton = props => (
  <div className="clear-btn" onClick={props.handleClear}>
    {props.children}
  </div>
);
class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      input: "",
      num_anterior: "",
      num_atual: "",
      operador: "",
      input2: "",
      memoria: [2,3,4,5,111]
    }
  }

  

  BotaoMC = val => {
    this.setState({memoria : []});
  };

  BotaoMR = val => {
    let valor = this.state.memoria.pop();
    this.state.memoria.push(valor);
    this.setState({input : valor});
  };

  BotaoMR1 = val => {
    this.setState({input : val});
  };

   BotaoMC1 = val => {
    const novalista = this.state.memoria.filter((elemento) => this.state.memoria.indexOf(elemento) !== val );
    this.setState(({memoria: novalista}));
  };

  BotaoMMais = val => {
    let valor = this.state.memoria.pop();
    this.state.memoria.push(parseFloat(valor) + parseFloat(this.state.input));
    this.setState({memoria: this.state.memoria});
  };

  BotaoMS = val => {
    this.state.memoria.push(this.state.input)
    this.setState({memoria: this.state.memoria});
  };

  addInput = val => {
    this.setState({input : this.state.input + val});
  };

  addDecimal = val => {
    if (this.state.input.indexOf(".") === -1) {
      this.setState({ input: this.state.input + val });
    }
  };

  addZero = val => {
    if (this.state.input !== "") {
      this.setState({ input: this.state.input + val });
    }
  };

  soma = () => {
    this.state.num_anterior = this.state.input;
    this.setState({ input: "" });
    this.setState({ input2: this.state.num_anterior + '+'});
    this.state.operador = "mais";
  };

  sub = () => {
    this.state.num_anterior = this.state.input;
    this.setState({ input: "" });
    this.setState({ input2: this.state.num_anterior + '-'});
    this.state.operador = "menos";
  };

  div = () => {
    this.state.num_anterior = this.state.input;
    this.setState({ input: "" });
    this.setState({ input2: this.state.num_anterior + '/'});
    this.state.operador = "div";
  };

  mult = () => {
    this.state.num_anterior = this.state.input;
    this.setState({ input: "" });
    this.setState({ input2: this.state.num_anterior + '*'});
    this.state.operador = "mult";
  };

  evaluate = () => {
    this.state.num_atual = this.state.input;

    if (this.state.operador == "mais") {
      this.setState({
        input:
          parseFloat(this.state.num_anterior) +
          parseFloat(this.state.num_atual),
      });
      this.setState({input2:''});

    } else if (this.state.operador == "menos") {
      this.setState({
        input:
          parseFloat(this.state.num_anterior) -
          parseFloat(this.state.num_atual)
      });
      this.setState({input2: ''});

    } else if (this.state.operador == "mult") {
      this.setState({
        input:
          parseFloat(this.state.num_anterior) *
          parseFloat(this.state.num_atual)
      });
      this.setState({input2: ''});

    } else if (this.state.operador == "div") {
      this.setState({
        input:
          parseFloat(this.state.num_anterior) /
          parseFloat(this.state.num_atual)
      });
      this.setState({input2: ''});
    }
    
  };

  render() {
    return <div className="app">
      <div className="Memoria">
      <Memoria macaco = {this.state.memoria} BotaoMC1 = {this.BotaoMC1} BotaoMR1 = {this.BotaoMR1}></Memoria>
      </div>
      <div className="calc-wrapper">
      <Input input={this.state.input2}/>
      <Input input={this.state.input}/>
        <div className="row">
          <Button handleClick = {this.BotaoMC}>MC</Button>
          <Button handleClick = {this.BotaoMR}>MR</Button>
          <Button handleClick = {this.BotaoMMais}>M+</Button>
          <Button handleClick = {this.BotaoMS}>MS</Button>
        </div>
        <div className="row">
          <Button handleClick = {this.addInput}>7</Button>
          <Button handleClick = {this.addInput}>8</Button>
          <Button handleClick = {this.addInput}>9</Button>
          <Button handleClick = {this.soma}>+</Button>
        </div>
        <div className="row">
          <Button handleClick = {this.addInput}>4</Button>
          <Button handleClick = {this.addInput}>5</Button>
          <Button handleClick = {this.addInput}>6</Button>
          <Button handleClick = {this.sub}>-</Button>
        </div>
        <div className="row">
          <Button handleClick = {this.addInput}>1</Button>
          <Button handleClick = {this.addInput}>2</Button>
          <Button handleClick = {this.addInput}>3</Button>
          <Button handleClick = {this.mult}>*</Button>
        </div>
        <div className="row">
          <Button handleClick = {this.addZero}>0</Button>
          <Button handleClick = {this.evaluate}>=</Button>
          <Button handleClick = {this.addDecimal}>.</Button>
          <Button handleClick = {this.div}>/</Button>
        </div>
        <div className="row">
          <ClearButton handleClear={() => this.setState({input: ""})}>AC</ClearButton>
        </div>
      </div>
    </div>
  }
}

export default App;