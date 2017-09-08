/*hangman javascript file*/

let HangmanWordService = (function(){
    let WordService = {};
    WordService.url = "http://setgetgo.com/randomword/get.php";
    WordService.getGuessWord = function(){
        let guessWordPromise = new Promise(WordService.guessWordPromiseResolver);
        return guessWordPromise;
    }
    WordService.guessWordPromiseResolver = function(resolve, reject){
        let request = new XMLHttpRequest();
        request.addEventListener("load", ()=>{
   
            resolve(request.responseText);
        });
        request.open("GET", WordService.url);
        request.send();
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
        Hangman.setupBoard();
    }

    Hangman.setupBoard = function(){
        Hangman.board.innerHTML = Hangman.boardTemplate();
        let inputArea = Hangman.board.querySelector("#input");
        inputArea.addEventListener("click", Hangman.guessButtonCallback);
    }

    Hangman.guessButtonCallback = function(event){
        let button = event.target;
        let guess = button.dataset.value;
        if(!guess){return;}
        let correctGuess = Hangman.checkGuess(guess);
        Hangman.updateMask();
        Hangman.updateGuesses(correctGuess);
        Hangman.updateButton(button, correctGuess);
    }

    Hangman.updateButton = function(button, correctGuess){
        button.disabled = true;
        button.classList.add("guessed");
        button.classList.add((correctGuess)? "right" : "wrong");
    }

    Hangman.updateGuesses = function(correctGuess){
        if(!correctGuess){
            Hangman.guesses += 1;
            Hangman.board.querySelector("#guesses").innerHTML = Hangman.guesses;
        }
    }

    Hangman.updateMask = function(){
        Hangman.board.querySelector("#mask").innerHTML = Hangman.mask.join("");
    }

    Hangman.checkGuess = function(guess){
        let correctGuess = false;
        for(let i = 0; i < Hangman.wordToGuess.length; i++){
            let character = Hangman.wordToGuess[i];
            if(character === guess){
                Hangman.mask[i] = character;
                correctGuess = true;
            }
        }
        return correctGuess;
    }

    Hangman.boardTemplate = function(){
        return `
            <div id = "guesses">${Hangman.guesses}</div>
            <div id = "mask">${Hangman.mask.join('')}</div>
            <div id = "input">${Hangman.buttonTemplate()}</div>
        `;
    }

    Hangman.buttonTemplate = function(){
        let alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
        let alphabetButton = alphabet
            .map(letter=>`<button class="guess-button" data-value="${letter}">${letter}</button>`)
            
        return alphabetButton.join('');
    }

    return Hangman;
}());