// var validInput = /^[a-zA-Z]$/.test(userGuess);
var words = ['array','variable','object','boolean','string','function','method'];
var wins = 0;
var losses = 0;
var guessesRemaining = 9;
var partialWord = [];
var guessesAlready = [];

// Generate random word
var correctWord = words[Math.floor(Math.random() * words.length)];
console.log('Correct word: ' + correctWord);

// Build partial word array with empty underscores
for (i=0; i < correctWord.length; i++) {
    partialWord[i] = '_';
}

function updateHTML() {
    $("#wins").text(wins);
    $("#losses").text(losses);
    $("#blanks").text(partialWord.join(''));
    $("#guesses-remaining").text(guessesRemaining);
    $("#letters-already-guessed").text(guessesAlready);
}

function updatePartialWord(index, letter) {
    console.log(letter + " is at index " + index + " of " + correctWord);
    partialWord.splice(index, 1, letter);
}

function reset(outcome) {
    if (outcome == 'win') {
        wins++;
        console.log("You win!");
    } else if (outcome == 'lose') {
        losses++;
        console.log("You lost...");
    }

    guessesRemaining = 9;
    partialWord = [];
    guessesAlready = [];

    // New random word
    correctWord = words[Math.floor(Math.random() * words.length)];
    console.log('Correct word: ' + correctWord);

    for (i = 0; i < correctWord.length; i++) {
        partialWord[i] = "_";
    }
    updateHTML();
};


// Test if user guess is in word
function test(letter) {
    for (var z=0; z < correctWord.length; z++) {
        if (correctWord.includes(letter)) {
            updatePartialWord(z, letter)
        };
    };
    updateHTML();
}




$(document).ready(function() {

    // On key press...
    $("html").keydown(function(event) {

        var userGuess = event.key;
        console.log("Clicked: " + userGuess);

        // Test if key is a character in correct word
        for (var z=0; z < correctWord.length; z++) {
            if (userGuess == correctWord[z]) {
                updatePartialWord(z, userGuess)
            };
        };


        updateHTML();
    });
});
