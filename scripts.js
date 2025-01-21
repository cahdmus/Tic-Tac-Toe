const PlayGame = (function () {
    
    // Creating the board
    const gameboard = {

        tiles: [],
        init() {
            this.cacheDom();
            this.createBoard();
            this.updateBoard();
        },
        cacheDom() {
            this.gameboard = document.querySelector('#gameboard');
            this.board = document.querySelector('#board');
            this.button = document.querySelector('#setBoardSize');
            this.input = document.querySelector('input');
        },
        getBoardSize() {
            return (this.input.value.length === 0) ? this.input.placeholder
                : this.input.value;
        },
        setGridSize(boardSize) {
            this.board.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`
        },
        setTileData(id, owner) {
            return { id: id, owner: owner, isAvailable: true }
        },
        createTiles() {
            this.tiles.forEach((tile) => {
                let owner = tile.owner;
                let id = tile.id;

                tile = document.createElement('div');
                tile.id = id;
                tile.classList.add('tile');
                tile.innerHTML = owner;
                this.board.appendChild(tile);
            })
        },
        createBoard() {
            let boardSize = this.getBoardSize();
            let i = 0;

            while (i < boardSize * boardSize) {
                this.tiles.push(this.setTileData(i + 1, "free"));
                i++;
            }
            this.createTiles();
            this.setGridSize(boardSize);
        },
        removeTiles() {
            this.tiles = [];
            this.board.innerHTML = '';
        },
        updateBoard() {
            this.button.addEventListener('click', () => {
                this.removeTiles();
                this.createBoard();
            })
        }
    }


    // Creating the players
    const players = {
        players: [],
        tokens: [
            { name: "X" },
            { name: "O" } // isAvailable: true / for later
        ],
        init() {
            this.players.push(this.createPlayer());
            this.players.push(this.createPlayer());
        },
        createPlayer() {
            return { name: this.getPlayerName(), token: this.getPlayerToken() }
        },
        getPlayerName() {
            // Because I can't be bothered to fill it every time
            return (this.players.length === 0) ? "Kylo" : "Ren";
            // return prompt('Name of Player','type name')
        },
        getPlayerToken() {
            // At some point players will be able to pick their token
            return (this.players.length === 0) ? this.tokens[0] : this.tokens[1];
        }
    }


    // Rules of a Turn 
    const playTurn = {
        turn: 0,
        board: gameboard.tiles,
        players: players.players,
        init() {
            this.getTurnPlayerName();
            this.getPlayerChoice();
            this.PlaceToken();
            this.CheckWinner();
            this.turn++ // Is that a thing ? I'm tired

            // console.log(this.board);
            // console.log(this.players);
        },
        getTurnPlayerName() {

        },
        getPlayerChoice() {

        },
        PlaceToken() {

        },
        CheckWinner() {

        }
    }

    
    // Playing the game
    gameboard.init();
    players.init();
    let winnerName = "";
    let turn = 0;

    // Next line is here while I make tests
    while (turn <= 2) {
    // while (winnerName.length === 0) {
        playTurn.init();
        turn++ // This is only here for now
    }

    return {
        getWinner: () => winnerName,
    }
})();

console.log(`The winner is : ${PlayGame.getWinner()}`);