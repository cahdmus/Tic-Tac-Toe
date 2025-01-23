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
            this.boardTiles = document.querySelectorAll('.tile');
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
        isOnRow(tile) {
            return Math.ceil(tile / gameboard.getBoardSize());
        },
        isOnCol(tile) {
            let result = tile % gameboard.getBoardSize();
            return (result === 0) ? 3 : result;
        },
        getDiag1(boardSize) {
            const diag1 = [];
            let index = 1;
            while (diag1.length < boardSize) {
                diag1.push(index);
                index = index + parseInt(boardSize) + 1;
            }
            return diag1;
        },
        getDiag2(boardSize) {
            const diag2 = [];
            let index = parseInt(boardSize);
            while (diag2.length < boardSize) {
                diag2.push(index);
                index = index + parseInt(boardSize) - 1;
            }
            return diag2;
        },
        isOnDiag(tile) {
            const diag1 = this.getDiag1(this.getBoardSize());
            const diag2 = this.getDiag2(this.getBoardSize());

            return {
                diag1: (diag1.includes(tile)) ? true : false,
                diag2: (diag2.includes(tile)) ? true : false
            }
        },
        getTilePosition(tile) {
            return {
                row: this.isOnRow(tile),
                col: this.isOnCol(tile),
                diag1: this.isOnDiag(tile).diag1,
                diag2: this.isOnDiag(tile).diag2,
            }
        },
        setTileData(id, owner, row, col, diag1, diag2) {
            return { id: id, owner: owner, isAvailable: true, row: row, col: col, diag1: diag1, diag2: diag2 }
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
                this.tiles.push(this.setTileData(i + 1,
                    "free",
                    this.getTilePosition(i + 1).row,
                    this.getTilePosition(i + 1).col,
                    this.getTilePosition(i + 1).diag1,
                    this.getTilePosition(i + 1).diag2,
                ));
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
                this.init();
            })
        },
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

    
    // Declare a winner
    const checkWinner = {
        board: gameboard.tiles,
        init(player, tile) {
            return (this.checkLine('row', tile, player) === true ||
                    this.checkLine('col', tile, player) === true ||
                    this.checkLine('diag1', tile, player) === true ||
                    this.checkLine('diag2', tile, player) === true) ? player : "";
        },
        getLine(line, tile) {
            switch (line) {
                case 'row':
                    return tile.row;
                case 'col':
                    return tile.col;
                case 'diag1':
                    return tile.diag1;
                case 'diag2':
                    return tile.diag2;
            }
        },
        checkLine(line, tile, player) {
            let playerLine = this.getLine(line, tile);
            let streak = 0;

            this.board.forEach((tile) => {
                let tileLine = this.getLine(line, tile);
                if (tileLine === playerLine) {
                    if (tile.owner === player) {
                        streak++;
                    }
                }
            })
            return (streak == gameboard.getBoardSize()) ? true : false;
        }
    }


    // Rules of a Turn 
    const playTurn = {
        board: gameboard.tiles,
        players: players.players,
        turn:0,
        winnerName: '',
        init() {
            this.getPlayerChoice(this.turn);
        },
        getTurnPlayerName() {
            const isOdd = number => number % 2 !== 0;
            return (isOdd(this.turn) === false) ? this.players[0] : this.players[1];
        },
        placeToken(tile, turn) {
            const playerName = this.getTurnPlayerName(turn).name;
            const index = tile.id - 1;

            if (tile.isAvailable === true) {
                tile.owner = playerName;
                tile.isAvailable = false;
                gameboard.boardTiles[index].innerHTML = playerName;
                this.winnerName = checkWinner.init(playerName, tile);
                this.announceWinner();
                this.turn++;
            }
        },
        getPlayerChoice(turn) {
            gameboard.cacheDom();
            gameboard.boardTiles.forEach((tile) => {
                tile.addEventListener('click', () => {
                    this.placeToken(this.board[tile.id - 1], turn);
                })
            })
        },
        announceWinner() {
            let message = `the winner is ${this.winnerName}`;
            return (this.winnerName.length > 0) ? alert(message) : false;
        }
    }


    // Playing the game
    gameboard.init();
    players.init();
    playTurn.init();

})();