
// Letter Consrtuctor
var Letter = function(word, correctGuesses) {
    this.displayWord = word;
    this.correctLetter = correctGuesses;
    this.display = '';
    this.winner = false;

// function to diplay letter or '_'
    this.showWord = function() {

        var show = '';

        if (this.correctLetter == undefined) {

            for (var i = 0; i < this.displayWord.length; i++) {
                show += ' _ ';
            }

        } else {
            for (var i = 0; i < this.displayWord.length; i++) {

                var displayLetter = false;

                for (var j = 0; j < this.correctLetter.length; j++) {

                    if (this.displayWord[i] == this.correctLetter[j]) {
                        show += this.correctLetter[j];
                        displayLetter = true;
                    }
                }
                if (!displayLetter) {
                    show += ' _ ';
                }
            }
        }
        this.display = show.trim();
        console.log(this.display);

        if (this.display == this.displayWord) {
            this.winner = true;
        }
    }
};

module.exports = Letter;