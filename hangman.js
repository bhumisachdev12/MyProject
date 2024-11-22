const words = ["javascript", "hangman", "coding", "programming", "developer"];
const maxAttempts = 6;

let chosenWord = words[Math.floor(Math.random() * words.length)];
let attemptsLeft = maxAttempts;
let guessedLetters = [];
let wrongGuesses = [];

function updateWordDisplay() {
    const display = chosenWord
        .split("")
        .map(letter => (guessedLetters.includes(letter) ? letter : "_"))
        .join(" ");
    document.getElementById("word-display").textContent = display;
}

function checkWin() {
    if (chosenWord.split("").every(letter => guessedLetters.includes(letter))) {
        document.getElementById("message").textContent = "You win! 🎉";
        document.getElementById("guess-btn").disabled = true;
    }
}

function checkLoss() {
    if (attemptsLeft <= 0) {
        document.getElementById("message").textContent = `You lose! The word was: ${chosenWord}`;
        document.getElementById("guess-btn").disabled = true;
    }
}

document.getElementById("guess-btn").addEventListener("click", () => {
    const guessInput = document.getElementById("guess-input");
    const guess = guessInput.value.toLowerCase();

    if (!guess || guess.length !== 1) {
        alert("Please enter a single letter.");
        return;
    }

    if (guessedLetters.includes(guess) || wrongGuesses.includes(guess)) {
        alert("You already guessed that letter.");
        return;
    }

    if (chosenWord.includes(guess)) {
        guessedLetters.push(guess);
    } else {
        wrongGuesses.push(guess);
        attemptsLeft--;
    }

    document.getElementById("wrong-guesses").textContent = wrongGuesses.join(", ");
    document.getElementById("attempts-left").textContent = attemptsLeft;

    updateWordDisplay();
    checkWin();
    checkLoss();

    guessInput.value = "";
    guessInput.focus();
});


updateWordDisplay();