var words = ['array','variable','object','boolean','string','function','method'];
var wins = 0;
var losses = 0;
var guessesRemaining = 9;
var partialWord = [];
var guessesAlready = [];
var guessesAlreadyWrong = [];

// Generate random word
var correctWord = words[Math.floor(Math.random() * words.length)];
console.log('Correct word: ' + correctWord);

// Build partial word array with empty underscores
for (i=0; i < correctWord.length; i++) {
    partialWord[i] = '_';
}

$("#wrapper").hide();

function updateHTML() {
    $("#wins").text("Wins: " + wins);
    $("#losses").text("Losses: " + losses);
    $("#blanks").text(partialWord.join(''));
    $("#guesses-remaining").text(guessesRemaining);
    $("#letters-already-guessed").text(guessesAlreadyWrong);
}

function updatePartialWord(index, letter) {
    console.log(letter + " is at index " + index + " of " + correctWord);
    partialWord.splice(index, 1, letter);
}

function reset(outcome) {
    if (outcome == 'win') {
        wins++;
        console.log("You win!");
        $("#message").html("<h2 style=\"color: green;\">You won!")
    } else if (outcome == 'lose') {
        losses++;
        console.log("You lost...");
        $("#message").html("<h2 style=\"color: red;\">You lost!")
    }

    guessesRemaining = 9;
    partialWord = [];
    guessesAlready = [];
    guessesAlreadyWrong = [];

    // New random word
    correctWord = words[Math.floor(Math.random() * words.length)];
    console.log('Correct word: ' + correctWord);

    for (i = 0; i < correctWord.length; i++) {
        partialWord[i] = "_";
    }
    updateHTML();
};

// Test function, checks if you won or lost
function testOutcome() {
    if (!partialWord.includes('_')) {
        reset('win');
    } else if (guessesRemaining == 0) {
        reset('lose');
    }
}



$(document).ready(function() {

    // On key press...
    $("html").keydown(function(event) {

        // Hide "press to start"
        $("#start").hide();
        $("#wrapper").show();
        $("#message").html('');

        var userGuess = event.key;
        console.log("Clicked: " + userGuess);

        // Check if you repeated a guess
        if (guessesAlready.includes(userGuess)) {
            alert('You already guessed ' + userGuess + '. Guess again!')
            return;
        }
        guessesAlready.push(userGuess);

        if (correctWord.includes(userGuess)) {
            // Test if key is a character in correct word
            for (var z=0; z < correctWord.length; z++) {
                if (userGuess == correctWord[z]) {
                    updatePartialWord(z, userGuess)
                };
            };
        } else {
            // Decrement guesses remaining if not correct
            guessesAlreadyWrong.push(userGuess);
            guessesRemaining--;
            console.log("Guesses remaining: " + guessesRemaining);
        };

        // Run test to see if you are out of guesses or if you won
        testOutcome();

        updateHTML();
    });
});
