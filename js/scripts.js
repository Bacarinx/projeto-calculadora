const previousOperationText = document.querySelector("#previous-operation")
const currentOperationText = document.querySelector("#current-operation")
const buttons = document.querySelectorAll("#buttons-container button")

class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText
        this.currentOperationText = currentOperationText
        this.currentOperation = ""
    }

    //add digit ti calculator screen
    addDigit(digit) {
        //check if current operation already has a dot
        if(digit === "." && this.currentOperationText.innerText.includes(".")) {
            return 
        }

        this.currentOperation = digit
        this.updateScreen()
    }

    //process all calculator operations
    processOperation(operation) {
        //checando se o valor atual está vazio
        if(this.currentOperationText.innerText === "" && operation !== "C") {
            //mudança de operação

            if(this.previousOperationText.innerText !== "") {
                this.changeOperation(operation)
            }
            return
        }
        
        //Get current and previous value
        let operationValue 
        let previous = +this.previousOperationText.innerText.split(" ")[0]
        let current = +this.currentOperationText.innerText 

        switch(operation) {
            case "+":
                operationValue = previous + current
                this.updateScreen(operationValue, operation, current, previous)
                break;
                case "-":
                operationValue = previous - current
                this.updateScreen(operationValue, operation, current, previous)
                break;
                case "/":
                operationValue = previous / current
                this.updateScreen(operationValue, operation, current, previous)
                break;
                case "*":
                operationValue = previous * current
                this.updateScreen(operationValue, operation, current, previous)
                break;
                case "DEL":
                    this.processDelOperator()
                    break;
                case "CE":
                    this.processClearCurrentOperation()
                    break;
                case "C":
                    this.processClearValuesAndOperation()
                    break;
                case "=":
                    this.processEqualsOperator()
                    break; 
                default:
                    return;
        }
    }

    //change values of the calculator screen
    updateScreen(operationValue = null,
         operation = null, 
         current = null, 
         previous = null) {   
        
        if(operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation
        } else {
            //checagem se valor é 0, se for adicionar valor
            if(previous == 0) {
                operationValue = current
            }

            // adicionando o valor atual para o anterior
            this.previousOperationText.innerText = `${operationValue} ${operation}`
            this.currentOperationText.innerText = ""
        }
    }

    //mudancao as operações
    changeOperation(operation) {
        const mathOperations = ["*", "/", "+", "-"]
        if(!mathOperations.includes(operation)){
            return
        }
        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation
    }

    //delete o ultimo digito
    processDelOperator() {
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1)
    }

    //limpando a oeração atual
    processClearCurrentOperation() {
        this.currentOperationText.innerText = ""
    }

    //limpando todas as operações
    processClearValuesAndOperation() {
        this.currentOperationText.innerText = ""
        this.previousOperationText.innerText = ""
    }

    //botão de igual
    processEqualsOperator() {
        const operation = previousOperationText.innerText.split(" ")[1]

        this.processOperation(operation)
    }
}


const calc = new Calculator(previousOperationText, currentOperationText)

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText
        
        if(+value >= 0 || value === ".")  { //verificando e separando numeros de operação
            calc.addDigit(value)
        } else {
            calc.processOperation(value)
        }
    })
})