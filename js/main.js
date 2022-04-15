
const MAX_NUM_LENGTH = 6;

let calc = {
    num1: '' ,
    num2: '' ,
    operator: '',
    storedNum1: false,
    operations: {'+': () => { return +calc.num1 + +calc.num2},
                 '-': () => { return +calc.num1 - +calc.num2},
                 '/': () => { return +calc.num1 / +calc.num2},
                 'X': () => { return +calc.num1 * +calc.num2},
                 '%': () => { return +calc.num1 % +calc.num2}},
    
    storeOperator() { 
        // Prevents against premature number storage
        if(!calc.num1 || calc.operator) return;    
        
        calc.storedNum1 = true;
        calc.operator = this.innerText;
        calc.display('');
    },

    storeNum() {
        // Determines where to assign stored value - Checks for storage of num1 and num2
        let num;
        if (calc.storedNum1) num = 'num2'
        else num = 'num1'

        // Sets value as negative or positive 
        if ( calc.checkPlusMinus(this.innerText, num) ) return;

        // Limits length of stored value 
        if (calc[num].length < MAX_NUM_LENGTH) {
            // Ensures decimal isnt used twice
            if (calc[num].includes('.') && calc.innerText === '.') return;
            else {
                calc[num] += this.innerText;
                calc.display( calc[num] ); 
            }    
        }       
    },

    checkPlusMinus(buttonClicked, num) {
        if(buttonClicked !== '+/-' || calc[num] === '0') return false;
        else {
            // Checks if stored value is already negative
            if(calc[num][0] === '-') {
                calc[num] = calc[num].replace('-','')
                calc.display( calc[num] );
                return true;
            } else {
                calc[num] = '-' + calc[num]
                calc.display( calc[num] );
                return true;
            }
        }
    },

    calculate() {
        if(!calc.operator) return;

        let result = calc.operations[calc.operator]();
        
        //Determines how long decimal place of result should be
        let numOneDeceimalLength = () => calc.num1.split('.')[1] ? calc.num1.split('.')[1].length : 0
        let numTwoDeceimalLength = () => calc.num2.split('.')[1] ? calc.num2.split('.')[1].length : 0
        let longestDecimalLength = Math.max(numOneDeceimalLength(), numTwoDeceimalLength())
        
        //Enables continuous calculation after an initial result has been achieved
        calc.reset();
        calc.num1 = result.toString()
        calc.display(result.toFixed(longestDecimalLength)) //Displays correct floating point number
        
    },

    reset() {
        calc.storedNum1 = false
        calc.num1 = ''
        calc.operator = ''
        calc.num2 = ''
        calc.display('')
    },

    display(value) {
        document.querySelector('.calculator__screen').innerText = value;
    }
}

document.querySelector('#equals').addEventListener('click', calc.calculate)
document.querySelector('#clear').addEventListener('click', calc.reset)

let numValues = document.querySelectorAll('.num')
numValues.forEach((num) => 
    num.addEventListener('click', calc.storeNum)
);

let operators = document.querySelectorAll('.operator')
operators.forEach((operator) => 
    operator.addEventListener('click', calc.storeOperator)
);