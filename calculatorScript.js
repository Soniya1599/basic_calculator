// Create class to store all the information
class Calculator {
    // constructor which is going to take all the inputs as well as all the functions 
    // Our constructor is essentially just going to take previousOperandTextElement and currentOperandTextElement and this is because we need to know where to place our display text for a calculator.
    constructor(previousOperandTextElement,currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined // They don't have any operation selected if we clear things.
    }

    delete() {
        //Here we are chopping of the last number using toString() to convert in string and then slice which tells start from 0 and remove the last number at -1 position.
        this.currentOperand = this.currentOperand.toString().slice(0,-1) 
    }

    appendNumber(number) {
        if(number === '.' && this.currentOperand.includes('.')) return 
        this.currentOperand = this.currentOperand.toString() + number.toString() // To append nubers together
    }

    chooseOperation(operation) { 
        // If current operand is empty then operation should not work and return.
        if(this.currentOperand === '') return 
        // If previous operand is not empty then we have to compute then display the value.
        if(this.previousOperand !== '') {  
            this.compute()
        }
        this.operation = operation
         // we need to clear current operand to write new current operand after operation and append this operator to previous operand.
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        // If prev and currewnt operant is not a nuber then it will not work and just return.
        if(isNaN(prev) || isNaN(current)) return 
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '×':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default: 
                return
        }

        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number) {
        //------ Coded later to opragnise the period (.) and zero problems that was coming during straight forwarded code.
        // Period will not show up initially until and unless we select any diff number :- Because when we try to parse decimal place into a float it can't we parsed into a float, bcz its just a decimal place.
        // If you want to add bunch of zeros after the decimal place, nothing will happen.
        // So to solve those problems we're going to split the number we get into both the integer part which is before the decimal place and decimal part which comes after the decimal place.

        const stringNumber = number.toString() // we want string here to split it.
        const integerDigits = stringNumber.split('.')[0] // we're getting nuber before period.
        const decimalDigits = stringNumber.split('.')[1] // we won't parse it into float, bcz we don't need it to be in number and we want to get second portion of that array which is the numbers after the decimal place.
        let integerDisplay;
        console.log(integerDigits);
        
        // we are checking NaN bcz if could happen that someone put nothing on the screen or inputs just a decimal place.
        if(isNaN(parseFloat(integerDigits))) {
            integerDisplay = '' 
        } else {
            // But if there is integer value that when we will use toLocaleString.
            integerDisplay = integerDigits.toLocaleString('en', {   
                // we want to make sure that we don't have any decimal places after this value when its gets converted into string with a bunch of commas which is perfect for our usecase.
                maximumFractionDigits: 0   
            })
        }

        // We want to check if we have any decimal digits
        // And if decimalDigits != nullthat means user does enter some number after decimal digit and have decimal places.
        if(decimalDigits != null) {            
            return `${integerDigits}.${decimalDigits}`
        } else {
            // And if we do not have any decimal digits we will just return integer digits.
            return integerDisplay 
        }

    //---- first coded (straight forward code) - rough code, not used later :-
    //     const floatNumber = parseFloat(number) // converting the strin into number using parseFloat.
    //     if(isNaN(floatNumber)) return ''
    //     return floatNumber.toLocaleString('en') // covert large numbers and include the comma's where its needed.
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText =this.getDisplayNumber(this.currentOperand)
        if(this.operation != null) {
        this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement)

// To click and select the number in calculator
numberButtons.forEach(button => {    
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})
