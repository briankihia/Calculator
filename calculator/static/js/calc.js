// first step we get all our number/operation buttons elements
//  ????????reason for doing this will answer later???????
const numberButtons = document.querySelectorAll(".data-number")
const operationButtons = document.querySelectorAll(".data-operation")
const equalsButton = document.querySelector(".data-equals")
const deleteButton = document.querySelector(".data-delete")
const allClearButton = document.querySelector(".data-all-clear")
const previousOperandTextElement = document.querySelector(".data-previous-operand")
const  currentOperandTextElement= document.querySelector(".data-current-operand")

// NB!!
// NOW WE THINK ABOUT HOW TO CREATE THE JAVASCRIPT THAT WILL MAKE THE CALCULATOR WORK

// 1.THINK BOUT WE ARE GOING TO STORE THE INFORMATION OF WHAT CURRENTLY THE NUMBER IS TYPED AND WHAT OPERATION.
// THE BEST THING TO USE WILL BE A  CLASS


class Calculator{
    // inside of this class we are going to put a constructor which is going to take all the inputs for it as well as all the functions fpr our calculator
    // in our constructor we are going to place this two because we need to know where to place our display text for our calc
    // this gives us a way to set this text elements inside our class
    constructor(previousOperandTextElement,currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        // as soon as we create our calculator we need to call the clear function
        // 2.
        this.clear()
    }
    // now we this about all the operations our calculator can perform
    // 1.clear function, delete function, adding of a number,equals function and the adding of an operation
    // thus let us define some of this operations

    // 1.inside the clear function is remove all this values
    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined

    }

    delete() {

        // 17.  we want when we click delete we delete only one character fro the end each time from the end thus..

        this.currentOperand = this.currentOperand.toString().slice(0,-1)
        // slice(0,-1) this means from zero to the number from th end thus deleting the last number and is going to save it in the currentOperand variable
        // now we go and create the eventListener


    }

    // this function we use it when a user clicks on a number to add to screen 
     // and this function needs to take the exact number that the user selected
    // that is done by putting number inside the brackets(passing the number the user selected)
    appendNumber(number) {
        // 8. if number is equal to the period and that the number already there include a period we just want to return and this disallows addition of more periods
        // with this our appendFunction is done now we go and work on our operationButtons
        if(number === '.' && this.currentOperand.includes('.')) return

        // 5.instead of just appending the number we could just set the currentOperand to equal that number
        // this.currentOperand = number
        // this currentOperand we have just created it in our class not in our html so it was initially empty but now it has a value which is anything that is clicked
        // 7.Now we write the appendNumber function
        // all we need to do is that we want to update our currentOperand value and append the number we get passed to the end of it
        // so now we erase number 5 and type this new
        this.currentOperand = this.currentOperand.toString() + number.toString()
        // we convert this into a string because javascript will actually add this numbers rather than placing them together
        // upto here anytime we click on numbers and continue adding on clicking we can now create a large number like 799
        // but now our problem is that period keeps on getting added if we click on it continuously and we don't want that thus we put an if statement
    }

    // This is what will happen when a user clicks on one of the operations
    // and this function needs to take the exact operation that the user selected
    // that is done by putting operation inside the brackets(passing the operation the user selected)
    chooseOperation(operation) {
        // 12.  Now here we add an if statement to show that if the currentOperand is empty we just want to return

        if (this.currentOperand === '') return
        // we add another if to check if the previousOperand and currentOperand are not empty we need to compute the two

        if (this.previousOperand !== '') {
            // we call function compute()
            this.compute()
        }
        // upto here we have everything to set the values in our calculator thus all we need to do now is how to compute and display things

        // 10. Here we are going to do some fancier math
        // we want when an operation is clicked,the currentNumbers and operation goes to our previousOperandValue and it clears our currentOperand to be able to type in a new number
        // first thing is that we need to set our operation to the operation we passed in so that our calculator knows the operation it is to use when it computes the value
        this.operation = operation
        // know we are going to set the previousOperand to the currentOperand
        this.previousOperand = this.currentOperand
        // now we set the currentOperand to be an empty string
        this.currentOperand = ''
        // upto here our currentOperand will be set to empty but our previousOperand won't show anything yet because on our updateDisplay it is not there thus we go now and update it



    }

    // this takes our values instead of the calculator and  compute a single value for what we need to display on the calculator
    compute() {

        //  14. first thing we need to do is create a variable which will contain the result of our compute function
        let computation
        // we then create a previous variable which will contain the actual number version of our previousOperand
        const prev = parseFloat(this.previousOperand)
        // we do the same thing to our current operand
        const current = parseFloat(this.currentOperand)
        // we are converting this two because before we had converted them to  string

        // next step we want to check if the user has not entered anything in then clicked equal,we don't want the code to actually run

        if (isNaN(prev) || isNaN(current)) return
        // the return stops the code from running

        //  15. now we use a switch statement to carry out a bunch of if statements on this.operation

        switch (this.operation) {
            case '+':
                computation = prev + current
                break

            case '-':
                computation = prev - current
                break

            case '*':
                computation = prev * current
                break

            case '%':
                computation = prev % current
                break

            case '/':
                computation = prev / current
                break

            default:
                return
                // this means that if non of this symbols match we don't do any computation

        }
        // now with our computation done,outside our switch statement we can now set our currentOperand ,operation and previousOperand

        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''

        //but now we need to work on clearing things up(erasing) thus we create an event listener.



    }


    // 20. 

    getDisplayNumber(number) {

        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        // this is going to take our string and turn it into an array

       let integerDisplay
       if (isNaN(integerDigits)) {
        integerDisplay = ''
       } else {
        integerDisplay = integerDigits.toLocaleString('en', {
            maximumFractionDigits: 0
        })
       }
       if(decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`
       } else {
        return integerDisplay
       }
    //    upto here everything works well but our previousOperand did not clear itself thus we work on that on update display
      
    }
    // in number 6 and 19 we use getDisplayNumber there




    // this function allows us to update the values inside our output
    updateDisplay() {
        // 6.
        this.currentOperandTextElement.innerText =this.getDisplayNumber( this.currentOperand)
        // upto here when we click on a number it shows on our screen
        // here is where our currentOperand has become currentOperandTextElement

        // 19.  Here we create an if statement which checks if we have an operation thus we display our previousOperandTextElement

        if(this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
            // this one appends the numbers and the operation being worked on 
            //  21.
        } else {
            this.previousOperandTextElement.innerText = ''
        }


        
        // 11. this part has been bettered in 19
        // upto here yet there are no commas in our values typed thus we work on that by creating another function getDisplayNumber()
       
    }

    // now with all this functions(operations) all defined,lets think bout all the different properties our calculator needs to store
    // 1.The previous operand the user entered , 2.the current operand that they are working on ,  3.The operation that they have selected
    
}

// 3.Now we work on hooking up all our different variables up there and making them operate on our calculator objects
// first thing we need to do is to create our calculator

// here we have made an object calculator
const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement)
// now we can use this calculator object


// 4.To first use it lets go with our number buttons
// we loop through each button and for each button we add an event listener
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        // when a button is clicked we want to reference our calculator function appendNumber of whatever is inside that button(the number)

        calculator.appendNumber(button.innerText)
        // once this is done we need to call calculator function updateDisplay so that our display screen will be updated every time we click on a button
        calculator.updateDisplay()
        // to check if things are working we can now go to updatedisplay function and type in our function
    })

})

// 9. now we work on our operationButtons

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        // when a button is clicked we want to reference our calculator function appendNumber of whatever is inside that button(the number)

        calculator.chooseOperation(button.innerText)
        // once this is done we need to call calculator function updateDisplay so that our display screen will be updated every time we click on a button
        calculator.updateDisplay()
        // to check if things are working we can now go to updatedisplay function and type in our function
    })

})


//  13. we work on equals button

equalsButton.addEventListener('click', () => {
    //   when clicked we want the compute function called

        calculator.compute()
        // once this is done we need to call calculator function updateDisplay so that our display screen will be updated every time we click on a button
        calculator.updateDisplay()
        // to check if things are working we can now go to updatedisplay function and type in our function
    })


// now we go and work on compute

//  16. 


allClearButton.addEventListener('click', () => {
    //   when click we want the clear function called

        calculator.clear()
        // once this is done we need to call calculator function updateDisplay so that our display screen will be updated every time we click on a button
        calculator.updateDisplay()
        // to check if things are working we can now go to updatedisplay function and type in our function
    })
// now we work on our delete button



//  18.

deleteButton.addEventListener('click', () => {
    //   when clicked we want the delete function called

        calculator.delete()
        // once this is done we need to call calculator function updateDisplay so that our display screen will be updated every time we click on a button
        calculator.updateDisplay()
        // to check if things are working we can now go to updatedisplay function and type in our function
    })

    // upto here our calculator is working very well but our digits have no commas thus we work on that.Thus we go to updateDisplay to display things as we want it to