function calculateResult() {
    calculationString = document.getElementById('cal-input')
    let str = calculationString.value
    str = str.replace("x", "*")
    result = math.evaluate(str)
    document.getElementById('cal-input').value = result
}

function clearInput() {
    document.getElementById('cal-input').value = ""
}

function zero() {
    calculationString = document.getElementById('cal-input')
    calculationString.value = calculationString.value + "0"
    document.getElementById('cal-input').value = calculationString.value
}

function one() {
    calculationString = document.getElementById('cal-input')
    calculationString.value = calculationString.value + "1"
    document.getElementById('cal-input').value = calculationString.value
}

function two() {
    calculationString = document.getElementById('cal-input')
    calculationString.value = calculationString.value + "2"
    document.getElementById('cal-input').value = calculationString.value
}

function three() {
    calculationString = document.getElementById('cal-input')
    calculationString.value = calculationString.value + "3"
    document.getElementById('cal-input').value = calculationString.value
}

function four() {
    calculationString = document.getElementById('cal-input')
    calculationString.value = calculationString.value + "4"
    document.getElementById('cal-input').value = calculationString.value
}

function five() {
    calculationString = document.getElementById('cal-input')
    calculationString.value = calculationString.value + "5"
    document.getElementById('cal-input').value = calculationString.value
}

function six() {
    calculationString = document.getElementById('cal-input')
    calculationString.value = calculationString.value + "6"
    document.getElementById('cal-input').value = calculationString.value
}

function seven() {
    calculationString = document.getElementById('cal-input')
    calculationString.value = calculationString.value + "7"
    document.getElementById('cal-input').value = calculationString.value
}

function eight() {
    calculationString = document.getElementById('cal-input')
    calculationString.value = calculationString.value + "8"
    document.getElementById('cal-input').value = calculationString.value
}

function nine() {
    calculationString = document.getElementById('cal-input')
    calculationString.value = calculationString.value + "9"
    document.getElementById('cal-input').value = calculationString.value
}

function plus() {
    calculationString = document.getElementById('cal-input')
    if (calculationString.value.length == 0) {
        alert('Add a number before adding an operator!')
    } else {
        calculationString.value = calculationString.value + "+"
        document.getElementById('cal-input').value = calculationString.value
    }
}

function minus() {
    calculationString = document.getElementById('cal-input')
    if (calculationString.value.length == 0) {
        alert('Add a number before adding an operator!')
    } else {
        calculationString.value = calculationString.value + "-"
        document.getElementById('cal-input').value = calculationString.value
    }
}

function multiply() {
    calculationString = document.getElementById('cal-input')
    if (calculationString.value.length == 0) {
        alert('Add a number before adding an operator!')
    } else {
        calculationString.value = calculationString.value + "x"
        document.getElementById('cal-input').value = calculationString.value
    }
}

function divide() {
    calculationString = document.getElementById('cal-input')
    if (calculationString.value.length == 0) {
        alert('Add a number before adding an operator!')
    } else {
        calculationString.value = calculationString.value + "/"
        document.getElementById('cal-input').value = calculationString.value
    }
}

function leftParanthesis() {
    calculationString = document.getElementById('cal-input')
    calculationString.value = calculationString.value + "("
    document.getElementById('cal-input').value = calculationString.value
}

function rightParanthesis() {
    calculationString = document.getElementById('cal-input')
    if (calculationString.value.length == 0) {
        alert('Add a number before adding an operator!')
    } else {
        calculationString.value = calculationString.value + ")"
        document.getElementById('cal-input').value = calculationString.value
    }
}