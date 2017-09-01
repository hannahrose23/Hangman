/*hangman javascript file*/

let Hangman = (function(){
    let Hangman = {};

    Hangman.init = function(config = {
        boardSelector : "#board"
    }){
        Hangman.board = document.querySelector(config.boardSelector);
        Hangman.startButton = Hangman.board.querySelector(".start-game-button");
        Hangman.startButton.addEventListener('click',()=>{
            console.log("click called!");
        });
    }

    return Hangman;
}())