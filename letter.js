// Letter constructor
var Letter = function (ltr) {
    this.letter = ltr;
    this.guessedLtr = false;

    this.displayLtr = function() {
        if (this.letter == ' ') {
            this.guessedLtr = true;
            return '  ';
        } else if(this.guessedLtr === false){
            return ' _ ';
        } else{
            return this.letter;
        }
    };
};

module.exports = Letter;