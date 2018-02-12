var Letter = require('./letter.js');

// Word constructor
var Word = function(wrd) {
	var that = this;
	this.word = wrd;
	this.letters = [];
	this.findWord = false;

	this.getLetters = function() {
		for(var i = 0; i<that.word.length; i++) {
			var newLetter = new Letter(that.word[i]);
			this.letters.push(newLetter);
		}
	};

	this.checkForWord = function() {
		if(this.letters.every(function(lttr){
			return lttr.appear === true;
		})){
			this.findWord = true;
			return true;
		}
	};

	this.checkLetter = function(guessedLetter) {
		var returns = 0;

		this.letters.forEach(function(lttr){
			if(lttr.letter === guessedLetter){
				lttr.appear = true;
				returns++;
			}
		})
		return returns
	};

	this.renderWord = function() {
		var display = '';

		that.letters.forEach(function(lttr){
			var currentLetter = lttr.letterRender();
			display+= currentLetter;
		});
		return display;
	};
}


var test = new Word("derek");
test.checkForWord();
console.log(test);

module.exports = Word;