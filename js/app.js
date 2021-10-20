let base = document.getElementById('tictactoe');

class Game{
    constructor(){
        this.playersTurn = 1; // Sets the player's turn to 1 by default
        this.gameActive = true; // Variable determining whether the game is in progress or not
    }

    // Runs upon player win
    gameWin(){
        console.log("player " + this.playersTurn + " has won!");
        document.getElementById("turn").innerHTML = "Player " + this.playersTurn + " has won!";
        this.gameActive = false;
    }

    // Runs upon players getting a draw
    gameDraw(){
        console.log("It's a draw!");
        document.getElementById("turn").innerHTML = "It's a draw!";
        this.gameActive = false;
    }
}

// Responsible for drawing out the board and managing the individual tile objects
class Board {
    constructor(line1, line2, line3, line4){
        this.line1 = {x: 0, y: 133, w: 419, h:10};
        this.line2 = {x: 0, y: 276, w: 419, h:10};
        this.line3 = {x: 133, y: 0, w: 10, h:419};
        this.line4 = {x: 276, y: 0, w: 10, h:419};
        this.boardArray = []; // This will contain all of the tile objects
        this.turnCount = 0; // Variable for counting the number of completed turns (used for locating a tie)

        // Draws out the lines for the tic tac toe board
        let line1El = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        line1El.setAttribute("x", this.line1.x);
        line1El.setAttribute("y", this.line1.y);
        line1El.setAttribute("width", this.line1.w);
        line1El.setAttribute("height", this.line1.h);
        base.appendChild(line1El);

        let line2El = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        line2El.setAttribute("x", this.line2.x);
        line2El.setAttribute("y", this.line2.y);
        line2El.setAttribute("width", this.line2.w);
        line2El.setAttribute("height", this.line2.h);
        base.appendChild(line2El);

        let line3El = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        line3El.setAttribute("x", this.line3.x);
        line3El.setAttribute("y", this.line3.y);
        line3El.setAttribute("width", this.line3.w);
        line3El.setAttribute("height", this.line3.h);
        base.appendChild(line3El);

        let line4El = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        line4El.setAttribute("x", this.line4.x);
        line4El.setAttribute("y", this.line4.y);
        line4El.setAttribute("width", this.line4.w);
        line4El.setAttribute("height", this.line4.h);
        base.appendChild(line4El);
    }

    // Initializes the array of tiles
    loadTiles(){
        this.boardArray[0] = new Tile(0,0,133,133);
        this.boardArray[1] = new Tile(143,0,133,133);
        this.boardArray[2] = new Tile(286,0,133,133);
        this.boardArray[3] = new Tile(0,143,133,133);
        this.boardArray[4] = new Tile(143,143,133,133);
        this.boardArray[5] = new Tile(286,143,133,133);
        this.boardArray[6] = new Tile(0,286,133,133);
        this.boardArray[7] = new Tile(143,286,133,133);
        this.boardArray[8] = new Tile(286,286,133,133);
    }

    // Contains all code for win detection
    winCheck(){
        this.turnCount++;
        if((this.boardArray[0].tileValue == this.boardArray[1].tileValue && this.boardArray[0].tileValue == this.boardArray[2].tileValue && this.boardArray[0].tileValue == game.playersTurn)||
        (this.boardArray[3].tileValue == this.boardArray[4].tileValue && this.boardArray[3].tileValue == this.boardArray[5].tileValue && this.boardArray[3].tileValue == game.playersTurn)||
        (this.boardArray[6].tileValue == this.boardArray[7].tileValue && this.boardArray[6].tileValue == this.boardArray[8].tileValue && this.boardArray[6].tileValue == game.playersTurn)||
        (this.boardArray[0].tileValue == this.boardArray[3].tileValue && this.boardArray[0].tileValue == this.boardArray[6].tileValue && this.boardArray[0].tileValue == game.playersTurn)||
        (this.boardArray[1].tileValue == this.boardArray[4].tileValue && this.boardArray[1].tileValue == this.boardArray[7].tileValue && this.boardArray[1].tileValue == game.playersTurn)||
        (this.boardArray[2].tileValue == this.boardArray[5].tileValue && this.boardArray[2].tileValue == this.boardArray[8].tileValue && this.boardArray[2].tileValue == game.playersTurn)||
        (this.boardArray[0].tileValue == this.boardArray[4].tileValue && this.boardArray[0].tileValue == this.boardArray[8].tileValue && this.boardArray[0].tileValue == game.playersTurn)||
        (this.boardArray[2].tileValue == this.boardArray[4].tileValue && this.boardArray[2].tileValue == this.boardArray[6].tileValue && this.boardArray[2].tileValue == game.playersTurn)){
            game.gameWin();
        }else if(this.turnCount==9){
            game.gameDraw();
        }
    }
}

// Class for individual tic tac toe tiles
class Tile {
    constructor(x,y,w,h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.occupied = false; // Boolean determining whether a tile is marked already or not
        this.tileValue = 0;

        var that = this;
        
        // Draws out the visual tile
        let tileEl = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        tileEl.setAttribute("x", this.x);
        tileEl.setAttribute("y", this.y);
        tileEl.setAttribute("width", this.w);
        tileEl.setAttribute("height", this.h);
        tileEl.setAttribute("fill", "white");
        base.appendChild(tileEl);

        // The tile uses motion tweening to fade to the current player's color
        tileEl.addEventListener("mouseover", function(){
            // Only runs if the current tile is not already mark and the game is in progress
            if(!that.occupied && game.gameActive){
                // Fades to red if it is player 1's turn and green if it is player 2's
                if(game.playersTurn == 1){
                    TweenLite.to(tileEl, {duration: .5,  fill:"red"});
                }else{
                    TweenLite.to(tileEl, {duration: .5,  fill:"green"});
                }
            }
        });

        // Fades back to white when not moused over
        tileEl.addEventListener("mouseout", function(){
            if(!that.occupied && game.gameActive){
                TweenLite.to(tileEl, {duration: .5,  fill:"white"});
            }
        });

        // Turns the current player's color on mouse click
        tileEl.addEventListener("click", function(){
            // Only runs if the tile isn't occupied and the game is in progress
            if(!that.occupied && game.gameActive){
                // Makes the tile occupied
                that.occupied = true;
                // Sets the tile color to the current player's color, sets the value of the tile to the current player, and checks for a win.
                if(game.playersTurn==1){
                    tileEl.setAttribute("fill", "red");
                    that.tileValue = 1;
                    board.winCheck();
                    game.playersTurn = 2;
                }else{
                    tileEl.setAttribute("fill", "green");
                    that.tileValue = 2;
                    board.winCheck();
                    game.playersTurn = 1;
                }
            }
        });
    }
}

let game = new Game();
let board = new Board();
board.loadTiles();

