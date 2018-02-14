var inquirer = require('inquirer');
var isLetter = require('is-letter');

var Word = require('./word.js');
var Game = require('./game.js');

var hangManDisplay = Game.newWord.hangman;

var wordBank = Game.newWord.wordList;
var guessesRemaining = 10;
var guesssedLetters = [];
var display = 0;
var currentWord;

function startGame() {
    console.log('-----------------------------------');
    console.log('');
    console.log('Get Ready for Coding Hangman!');
    console.log('');
    console.log('-----------------------------------');

    if (guesssedLetters.length > 0) {
        guesssedLetters = [];
    }

    inquirer.prompt([{
        name: 'play',
        type: 'confirm',
        message: 'Ready to play?'
    }]).then(function(answer) {
        if (answer.play) {
            console.log('');
            console.log('You get 10 guesses to get the correct word.');
            console.log('Good Luck');
            newGame();
        } else {
            console.log('Goodbye!');
        }
    });
}

startGame();

function newGame() {
    if (guessesRemaining === 10) {
        console.log('-----------------------------------');

        var randomWord = Math.floor(Math.random() * wordBank.length);
        currentWord = new Word(wordBank[randomWord]);
        currentWord.getLetters();

        console.log('');
        console.log(currentWord.renderWord());
        console.log('');
        promptUser();
    } else {
        resetGuessesRemaining();
        newGame();
    }
}

function resetGuessesRemaining() {
    guessesRemaining = 10;
}

function promptUser() {
    inquirer.prompt([{
        name: 'chosenLetter',
        type: 'input',
        message: 'Choose a letter',
        validate: function(value) {
            if (isLetter(value)) {
                return true;
            } else {
                return false;
            }
        }
    }]).then(function(ltr) {
            var letterReturn = (ltr.chosenLetter).toUpperCase();

            var guessedAlready = false;
            for (var i = 0; i < guesssedLetters.length; i++) {
                if (letterReturn === guesssedLetters[i]) {
                    guessedAlready = true;
                }
            }

            if (guessedAlready === false) {
                guesssedLetters.push(letterReturn);

                var found = currentWord.checkLetter(letterReturn);

                if (found === 0) {
                    console.log('Wrong!');

                    guessesRemaining--;

                    display++;

                    console.log('Guesses remaining: ' + guessesRemaining);
                    console.log(hangManDisplay[display - 1]);
                    console.log('-----------------------------------');
                    console.log('');
                    console.log(currentWord.renderWord());
                    console.log('');
                    console.log('-----------------------------------');
                    console.log('Leters guesssed: ' + guesssedLetters);
                } else {
                    console.log('Correct!');

                    if (currentWord.checkForWord() === true) {
                        console.log('');
                        console.log(currentWord.renderWord());
                        console.log('');
                        console.log('------ You Win! ------');
                        startGame();
                    } else {
                        console.log('Guesses remaining: ' + guessesRemaining);
                        console.log('');
                        console.log(currentWord.renderWord());
                        console.log('');
                        console.log('-----------------------------------');
                        console.log(' Letters guessed: ' + guesssedLetters);
                    }
                }

                if (guessesRemaining > 0 && currentWord.findWord === false) {
                    promptUser();
                } else if (guessesRemaining === 0) {
                    console.log('');
                    console.log('----- Game Over! -----');
                    console.log('');
                    console.log('The word was: ' + currentWord.word);
                    console.log('');
                }
            } else {
                    console.log('You already guessed that letter!');
                    promptUser();
            }

        });
    }