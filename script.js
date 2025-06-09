const inputDisplay = document.getElementById("calculator-input");
const outputDisplay = document.getElementById("calculator-output");
const buttons = document.querySelectorAll("button");
const historyDisplay = document.getElementById("history-display");
const clearHistoryBtn = document.getElementById("clear-history-btn");

let vstup = "";
let vysledek = "";
let history = [];

function aktualizaceDisplayu() {
    inputDisplay.textContent = vstup || "0";
    outputDisplay.textContent = vysledek || "0";
}

window.onload = () => {
  const ulozenaHistorie = localStorage.getItem("historiePoctu");
  if (ulozenaHistorie) {
    history = JSON.parse(ulozenaHistorie);
    historyDisplay.innerHTML = history.map(item => `<p>${item}</p>`).join("");
  }
};

buttons.forEach(button => {
    button.addEventListener("click", () => {
       fceKalkulacky(button.value, button.id);
    });
});

document.addEventListener("keydown", (event) => {
    const klavesa = event.key;
    fceKalkulacky(klavesa);
});

clearHistoryBtn.addEventListener("click", () => {
    history = [];
    localStorage.removeItem('historiePoctu');
    historyDisplay.innerHTML = "";
});


function vypocet(zadani)
{
  let func = new Function("return " + zadani);
  return func();
}

function fceKalkulacky(klavesa, hodnota) {
  if (klavesa === "Enter" || klavesa === "=") {
        try {
            vysledek = vypocet(vstup);
            if (vysledek % 2 !==0){
                vysledek = Math.round(vysledek * 100) / 100;
            }
            if (isNaN(vysledek) || !isFinite(vysledek) === true) {
                return outputDisplay.textContent = "Error";
            }
            history.push(`${vstup} = ${vysledek}`);
            aktualizaceDisplayu();
            vstup = vysledek.toString();
            inputDisplay.textContent = 0;
            localStorage.setItem("historiePoctu", JSON.stringify(history));
            historyDisplay.innerHTML = history.map(item => `<p>${item}</p>`).join("");
        } catch (error) {
            outputDisplay.textContent = "Error";
        }
    } else if (klavesa === "Backspace" || hodnota === "clear-btn") {
        vstup = vstup.slice(0, -1);
        aktualizaceDisplayu();
    } else if (klavesa === "Escape" || hodnota === "clear-all-btn") {
        vstup = "";
        vysledek = "";
        aktualizaceDisplayu();
    } else if (/^[0-9+\-*/().^,]$/.test(klavesa)) {
        if (klavesa == ",") {
            klavesa = ".";
        }
        else if (klavesa == "^"){
            klavesa = "**";
        }
        vstup += klavesa;
        aktualizaceDisplayu();
    }
};