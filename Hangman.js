/*hangman javascript file*/

let HangmanWordService = (function(){
    let WordService = {};
    WordService.getGuessWord = function(){
        let guessWordPromise = new Promise((resolve, reject )=>{
            let wordToGuess = document.querySelector("input[name='word']").value;
            resolve(wordToGuess);
        });
        return guessWordPromise;
    }

    return WordService;
}());

let Hangman = (function(){
    let Hangman = {};

    Hangman.init = function(config = {
        boardSelector : "#board"
    }){
        Hangman.board = document.querySelector(config.boardSelector);
        Hangman.startButton = Hangman.board.querySelector(".start-game-button");
        Hangman.startButton.addEventListener('click', Hangman.startGameButtonClicked);
    }

    Hangman.startGameButtonClicked = function(){
        HangmanWordService.getGuessWord().then(Hangman.start);
    }

    Hangman.start = function(wordToGuess){
        Hangman.wordToGuess = wordToGuess.split("");
        Hangman.mask = Hangman.wordToGuess.map(()=>"*");
        Hangman.guesses = 0;
        console.log(Hangman.wordToGuess, Hangman.mask);
    }
    return Hangman;
}());