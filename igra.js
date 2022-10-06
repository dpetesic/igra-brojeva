const min = 1
const max = 100
const maxTries = 10
const btnGuess  = document.getElementById("btnPogodi")
const numField = document.getElementById("txtBroj")
const allGuess = document.getElementById("sviPokusaji")
const result = document.getElementById("zadnjiRezultat")
const biggerSmaller = document.getElementById("manjiIliVeci")
const attempts = document.getElementById("brojPokusaja")

let tries = 1
let number = genNumber(1, 100)
let guessed = false


function genNumber(min, max){
    return Math.floor(Math.random() * (max-min+1)) + min;
}

function listGuess(num){
    let separator = ","
    if (allGuess.textContent.length == 0){
        allGuess.textContent = "Used numbers:"
    }
    allGuess.textContent += num + separator

}

function restartGame(){
    number = genNumber(1, 100)
    tries = 1
    guessed = false
    result.textContent = ""
    numField.value = ""
    biggerSmaller.textContent = ""
    allGuess.textContent = ""
    attempts.textContent = ""
    restartBtn.hidden = true
}


let restartBtn = document.createElement("button")
restartBtn.textContent = "Try again"
restartBtn.hidden = true
restartBtn.addEventListener("click", () => {
    restartGame()
})
document.body.appendChild(restartBtn)

btnGuess.addEventListener("click", () => {

    let guess = Number(numField.value)

    if (tries > maxTries || guessed){
        return
    }

    if (numField.value == 0){
        alert("Enter a guess")
        return
    }

    if(Number.isNaN(guess)){
        alert("Must be a number")
        return
    }

    if (!(guess >= min && guess <= max)){
        alert("Guess must be between 1-100")
        return
    }

    if(guess == number){
        result.textContent = `You guessed the number in ${tries} tries`
        restartBtn.hidden = false
        guessed = true
    } else {

        result.textContent = "Incorrect guess"

        if (guess > number){
            biggerSmaller.textContent = "Your guess is bigger than the number"
        } else {
            biggerSmaller.textContent = "Your guess is smaller than the number"
        }
        if (tries == maxTries){
            result.textContent = "Out of tries"
            restartBtn.hidden = false
        }
    }
    listGuess(guess)
    attempts.textContent = `Tries: ${tries}/${maxTries}`
    tries += 1 
})

restartGame()