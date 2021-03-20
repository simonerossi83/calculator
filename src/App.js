import logo from './logo.svg';
import './App.css';
import React from 'react';

//----------- DEFINIZIONE DEL TASTO = -----------------------------------------------------------

const Equals = props => {
  return(
  <button id="equals" type="button" className="btn btn-success fs-1" onClick={props.onClick}> = </button>
  )
};

//----------- DEFINIZIONE DEL TASTO C -----------------------------------------------------------

const Clear = props => {
  return(
  <button id="clear" type="button" className="btn btn-danger fs-1" onClick={props.onClick}> C </button>
  )
};

//----------- DEFINIZIONE DEI TASTI PER LE OPERAZIONI -----------------------------------------------------------

const Operations = props => {
  const operations = [
    {symbol: '+',
    letter: "add",
    ops: '+'},
    {symbol: '-',
    letter: "subtract",
    ops: '-'},
    {symbol: 'x',
    letter: "multiply",
    ops: '*'},
    {symbol: '÷',
    letter: "divide",
    ops: '/'}
    ];
  
    return(
    <>
      {operations.map(ele => 
               <button id={ele.letter} key={ele.letter} className="btn btn-warning fs-1" onClick={props.onClick} value={ele.ops}> 
                     {ele.symbol} 
              </button>)}
      </>
  )
};

//----------- DEFINIZIONE DEI TASTI PER I NUMERI E LA VIRGOLA -----------------------------------------------------------
const Numbers = (props) => {
  const numbers = [
    {number: '0',
    letter: "zero"},
    {number: '1',
    letter: "one"},
    {number: '2',
    letter: "two"},
    {number: '3',
    letter: "three"},
    {number: '4',
    letter: "four"},
    {number: '5',
    letter: "five"},
    {number: '6',
    letter: "six"},
    {number: '7',
    letter: "seven"},
    {number: '8',
    letter: "eight"},
    {number: '9',
    letter: "nine"},
    {number: '.',
    letter: "decimal"}
  ];
  
  return(
    <>
      {numbers.map(ele => 
               <button id={ele.letter} key={ele.letter} className="btn btn-secondary fs-1" onClick={props.onClick}> 
                     {ele.number} 
              </button>)}
      </>
  )
};


//----------- DEFINIZIONE DEL DISPLAY -----------------------------------------------------------

const Display = props => {
  
  return(
  <div id="display" className="fs-1 text-end"> {props.num} </div>
  )
  
};
//-------------------------------------------


//----------- DEFINIZIONE DELLA CALCOLATRICE VERA E PROPRIA -----------------------------------------------------------

function App() {
  
  //definisco lo stato della calcolatrice, cioè il display
    const [disp, setDisp] = React.useState('0');
  
  //definisco lo stato del click sul tasto =
    const [pressEqual, setPressEqual] = React.useState(0);
  
  
  //definisco lo stato del click sul tasto delle operazioni
    const [pressOps, setPressOps] = React.useState(0);
  
      
  //gestione del click sui numeri. aggiorno lo stato
  
  const handleNumClick = (event) => {
    if(disp === '0' || (pressEqual === 1 && pressOps === 0))
      setDisp('');
    
    setPressEqual(0);
    setPressOps(0);
    
    if(disp === '0')
      setDisp('');
    
    setDisp(prev => prev + event.target.innerHTML);
   
    if(event.target.innerHTML === '.') 
      document.getElementById("decimal").disabled = true;
    
  };
  
  //gestione del click sul tasto C
  
    const handleClearClick = () => {
    setDisp('0');
    document.getElementById("decimal").disabled = false;
  };
  
  //gestione del click sulle operazioni
  
  const handleOpsClick = (event) => {
   
    // gestione delle varie operazioni 
    if(pressOps === 0){
       setDisp(prev => prev + event.target.value);  
       setPressOps(1);
     } else if (pressOps === 1 && event.target.value === '-')
       { 
       setDisp(prev => prev + event.target.value);
       setPressOps(2);
       } else if (pressOps === 2 && event.target.value === '+'){
         
       setDisp(prev => prev.slice(0, -2) + event.target.value);
     }
    
     document.getElementById("decimal").disabled = false;
    
    
  };
  
  //gestione del tasto uguale 
  
  const handleEqualsClick = () =>{
    setDisp(eval(disp));
    setPressEqual(1);
    document.getElementById("decimal").disabled = false;
  }
  
  
  return (
     <div id="calculator">
       <Equals onClick={handleEqualsClick}/>
       <Clear onClick={handleClearClick}/>
       <Numbers onClick={handleNumClick}/>
       <Operations onClick={handleOpsClick}/>
       <Display num={disp}/>
     </div>
   )
 
}


export default App;
