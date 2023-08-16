import {
  calculate
} from './calculator.js';

// // TODO: Faire la manipulation du DOM dans ce fichier

const form = document.querySelector("form");
const userInput = form.elements["userInput"];
const display1Element = document.querySelector('#calcul');
const display2Element = document.querySelector('#input');
const numberEl = document.querySelectorAll('.numpad');
const operationEL = document.querySelectorAll('#divideby, #times, #minus, #plus');
const equalEl = document.querySelector('#equals');
const clearEl = document.querySelector('#reset');
const clearLastEl = document.querySelector('#clear');
const pourcentage = document.querySelector('#percentage')
const plusoumoins = document.querySelector('#plusoumoins');

display2Element.setAttribute('readonly', 'readonly')


let dis1Num = '';
let dis2Num = '';
display2Element.value = '';
let result = null;
let lastOperation = '';
let haveDot = false;


// selector number onclick
numberEl.forEach(number => {
  number.addEventListener('click', (e) => {
    if (e.target.innerText === '.' && !haveDot) {
      haveDot = true;
    } else if (e.target.innerText === '.' && haveDot) {
      return;
    }
    if (display2Element.value.length < 10) {
      dis2Num += e.target.innerText;
      display2Element.value = dis2Num;
      if (display2Element.value == 0) {
        if (display2Element.value == '00') {
          dis2Num = '';
          display2Element.value = eval('0');
        }
      }
    }
  })
});

//selector operator onclick
operationEL.forEach(operation => {
  operation.addEventListener('click', (e) => {
    if (!dis2Num) return;
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

// delete all value in ibput and id calcul
function clearVar(name = '') {
  dis1Num += dis2Num + ' ' + name + ' ';
  display1Element.innerText = dis1Num;
  display2Element.value = '';
  dis2Num = '';
}

// all calcul in calculator
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


// using button equal
equalEl.addEventListener('click', (e) => {
  if (!dis1Num || !dis2Num) return;
    haveDot = false;
    mathOperation();
    clearVar();
  if (result == "Infinity" || result == "NaN") {
    display2Element.value = 'Error'
  } else {
    display1Element.innerHTML += '='
    display2Element.value = result;
  }
  dis2Num = result
  dis1Num = ''
})

//button %
pourcentage.addEventListener('click', (e) => {
  display2Element.value = (display2Element.value) / 100
})


//button plusoumoins
plusoumoins.addEventListener('click', (e) => {
  dis2Num = parseFloat(dis2Num) * -1
  display2Element.value = dis2Num
})


// function button delete value in input
clearEl.addEventListener('click', (e) => {
  display1Element.innerText = '';
  display2Element.value = '';
  dis2Num = '';
  dis1Num = '';
  result = '';
});

//button delete all value in ibput and id calcul
clearLastEl.addEventListener('click', (e) => {
  if (display2Element.value == '') {
    return
  } else {
    display2Element.value = display2Element.value.slice(0,-1);
    // display2Element.value = ''
    // dis2Num = '';
  }
})

// input the value in the key
window.addEventListener('keydown', (e) => {
  if (
    e.key == '0' ||
    e.key == '1' ||
    e.key == '2' ||
    e.key == '3' ||
    e.key == '4' ||
    e.key == '5' ||
    e.key == '6' ||
    e.key == '7' ||
    e.key == '8' ||
    e.key == '9' ||
    e.key == '.'
  ) {
    clickButtonEl(e.key);
  } else if (
    e.key == '+' ||
    e.key == '-' ||
    e.key == '%'
  ) {
    clickOperation(e.key);
  } else if (e.key == "*") {
    clickOperation('x');
  } else if (e.key == 'Enter' || e.key == "=") {
    clickEqual();
  }
});

function clickButtonEl(key) {
  numberEl.forEach(button => {
    if (button.innerText === key) {
      button.click();
    }
  })
}

function clickOperation(key) {
  operationEL.forEach(button => {
    if (button.innerText === key) {
      button.click();
    }
  })
}

function clickEqual() {
  equalEl.click();
}

userInput.addEventListener("input", function () {
  this.value = this.value.match(/[0-9.]*/)[0];
});
form.addEventListener("submit", function (event) {
  event.preventDefault();
});
form.addEventListener("reset", function (event) {
  event.preventDefault();
});

