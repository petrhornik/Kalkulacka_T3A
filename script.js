console.log("JS kód pro kalkulačku");

const inputDisplay = document.getElementById('calculator-input');
const outputDisplay = document.getElementById('calculator-output');
/*const button1 = document.querySelector('.calculator-buttons')[1];*/
/*const button1 = document.querySelector('.calculator-buttons').children[1];*/

const buttons = document.getElementById('calculator-buttons');


/*Test Fce*/

outputDisplay.innerText = "Zde bude výstup";

/*button1.innerText = "Tlačítko 1";*/  

buttons.addEventListener('click', function(event) {

    if (event.target.tagName === 'BUTTON') {
        const buttonValue = event.target.innerText;
        console.log(`Stisknuto tlačítko: ${buttonValue}`);
        
        // Přidání hodnoty tlačítka do vstupního pole
        inputDisplay.innerText = buttonValue;
        
        // Zde můžete přidat další logiku pro zpracování vstupu
    }
});