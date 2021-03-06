const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numberEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generateclipboardEl');
const clipboardEl = document.getElementById('clipboard');
const allColors = document.getElementById('body-colors');

function generateBodyColors() {
    // let hex = '#' + Math.floor(Math.random()*16777215).toString(16)
    document.getElementById("body-color").style.backgroundColor = randomColor({hue: 'orange'});
    document.getElementById("container-color").style.backgroundColor = randomColor({hue: 'yellow'});
    document.querySelector(".btn").style.backgroundColor = randomColor({hue: 'orange'});
    document.getElementById("generate").style.backgroundColor = randomColor({hue: 'orange'});
};

generateBodyColors();

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

// Generate event listen
generate.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasUpper = uppercaseEl.checked;
    const hasLower = lowercaseEl.checked;
    const hasNumber = numberEl.checked;
    const hasSymbol = symbolsEl.checked;

    resultEl.innerText = generatePassword(
        hasLower, 
        hasUpper, 
        hasNumber, 
        hasSymbol, 
        length
    );
});


// Copy to clipboard
clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;

    if(!password) {
        return;
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    // alert('Password copied to clipboard!');
    alert('Password is copied to the clipboard!');
});


// Generate Password function
function generatePassword(lower, upper, number, symbol, length) {
    // 1. innit password variable
    // 2. filter out unchecked types
    // 3. loop over the length then call the generator function for each type
    // 4. add the final password to the password variable   

    let generatePassword = '';
    const typesCount = upper +  lower + number + symbol;
    const typesArr = [{upper}, {lower}, {number}, {symbol}].filter(item => Object.values(item)[0]);

    if(typesCount === 0) {
        return '';
    }

    for(let i = 0; i < length; i+= typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            generatePassword += randomFunc[funcName](); 
        })
    }

    const finalPassword = generatePassword.slice(0, length);
    return finalPassword; 
}   

// Generator functions https://net-comber.com/charset.html

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*()_-+=?/>,<~`';
    return symbols[Math.floor(Math.random() * symbols.length)];
}
