import {
  calculate
} from './calculator.js';

// // TODO: Faire la manipulation du DOM dans ce fichier

const form = document.querySelector("form");
const userInput = form.elements["userInput"];
const display1Element = document.querySelector('#calcul');
const display2Element = document.querySelector('#input');
const numberEl = document.querySelectorAll('.numpad');
const operationEL = document.querySelectorAll('#divideby, #times, #minus, #plus, #plusoumoins');
const equalEl = document.querySelector('#equals');
const clearEl = document.querySelector('#reset');
const clearLastEl = document.querySelector('#clear');
const pourcentage = document.querySelector('#percentage')

let dis1Num = '';
let dis2Num = '';
let result = null;
let lastOperation = '';
let haveDot = false;

numberEl.forEach(number => {
  number.addEventListener('click', (e) => {
    if (e.target.innerText === '.' && !haveDot) {
      haveDot = true;
    } else if (e.target.innerText === '.' && haveDot) {
      return;
    }
    dis2Num += e.target.innerText;
    display2Element.value = dis2Num
  })
});

operationEL.forEach(operation => {
  operation.addEventListener('click', (e) => {
    if (!dis2Num) result;
    haveDot = false;
    const operationName = e.target.innerText;
    if (dis1Num && dis2Num && lastOperation) {
      mathOperation();
    } else {
      result = parseFloat(dis2Num);
    }
    clearVar(operationName);
    lastOperation = operationName;
  })
});

function clearVar(name = '') {
  dis1Num += dis2Num+ ' ' + name + ' ';
  display1Element.innerText = dis1Num;
  display2Element.value = ' ';
  dis2Num = '';
}

function mathOperation() {
  if (lastOperation === '×') {
    result = parseFloat(result) * parseFloat(dis2Num);
  }
  else if (lastOperation === '+') {
    result = parseFloat(result) + parseFloat(dis2Num);
  }
  else if (lastOperation === '-') {
    result = parseFloat(result) - parseFloat(dis2Num);
  } else if (lastOperation === '÷') {
    result = parseFloat(result) / parseFloat(dis2Num);
  } 
}

equalEl.addEventListener('click', (e) => {
  if(!dis1Num || !dis2Num) return;
  haveDot = false;
  mathOperation();
  clearVar();
  display2Element.value = result;
  dis2Num = result;
  dis1Num = ''
})

pourcentage.addEventListener('click', (e) => {
  if (!dis1Num || !dis2Num) return;
  haveDot = false;
  mathOperation();
  clearVar();
  display2Element.value = result / 100;
  dis2Num = result;
  dis1Num = ''
})

clearEl.addEventListener('click', (e)=>{
  display1Element.innerText = '00';
  display2Element.value = '0';
  dis2Num = '';
  dis1Num = '';
  result ='';
});

clearLastEl.addEventListener('click', (e) =>{
  display2Element.value = ''
  dis2Num = '';
})

userInput.addEventListener("input", function() {
  this.value = this.value.match(/[0-9.]*/)[0];
});
form.addEventListener("submit", function(event) {
  event.preventDefault();
});
form.addEventListener("reset", function() {
  clearResult();
});

