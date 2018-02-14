var Letter = require('./letter.js');

// Word constructor
function Word(wrd) {
    this.word = wrd;
    this.letters = [];
    this.findWord = false;

    this.getLetters = function() {
        for (var i = 0; i < this.word.length; i++) {
            var newLetter = new Letter(this.word[i]);
            this.letters.push(newLetter);
        }
    };

    this.checkForWord = function() {
        if (this.letters.every(function(lttr) {
                return lttr.guessedLtr === true;
            })) {
            this.findWord = true;
            return true;
        }
    };

    this.checkLetter = function(guessedLetter) {
        var returns = 0;

        this.letters.forEach(function(lttr) {
            if (lttr.letter === guessedLetter) {
                lttr.guessedLtr = true;
                returns++;
            }
        })
        return returns
    };

    this.renderWord = function() {
        var display = '';

        this.letters.forEach(function(lttr) {
            var currentLetter = lttr.displayLtr();
            display += currentLetter;
        })
        return display;
    };
}

module.exports = Word;