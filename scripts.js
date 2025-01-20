const PlayGame = (function () {

    let winnerName = "";
    const getWinnerName = () => winnerName;

    // Players
    const Players = (function () {

        const players = [];

        function createPlayer(name, token) {
            let player = { name: name, token: token }
            players.push(player);
        }

        // A remettre après !!!
        //createPlayer(prompt('Name of Player 1','type name'), 'X');
        //createPlayer(prompt('Name of Player 1','type name'), 'O');

        // En attendant
        createPlayer("Kylo", 'X');
        createPlayer("Ren", 'O');;

        return { players }
    })();


    // Board
    const Gameboard = (function () {

        const gameboard = [];

        const boardSize = 3;

        const createBoard = (function () {
            function getTilePosition(tile) {
                function getRow(input) {
                    return Math.ceil(input / boardSize);
                }

                function getColumn(input) {
                    let result = input % boardSize;
                    return (result === 0) ? boardSize : result;
                }

                let row = getRow(tile);
                let column = getColumn(tile);

                return { row, column }
            }

            // Get diagonal informations
            const diagonalCoordonates = (function () {

                let numOfTiles = boardSize;

                const createDiag1 = (function () {
                    let diagTiles = [];
                    let row = 1;
                    let col = 1;

                    while (row <= numOfTiles) {
                        diagTiles.push([row, col]);
                        col++;
                        row++;
                    }

                    return diag1 = diagTiles;
                })();

                const createDiag2 = (function () {
                    let diagTiles = [];
                    let row = numOfTiles;
                    let col = 1;

                    while (row >= 1) {
                        diagTiles.push([row, col]);
                        col++;
                        row--;
                    }

                    return diag2 = diagTiles;
                })();

                return { diag1, diag2 }
            })();

            function isOnDiag(row, col) {
                let tileCoordonates = [row, col];
                let diag1 = diagonalCoordonates.diag1;
                let diag2 = diagonalCoordonates.diag2;
                let value = []


                diag1.forEach(coordinates => {
                    if (coordinates.toString() == tileCoordonates.toString()) {
                        value.push(1)
                    }
                });

                diag2.forEach(coordinates => {
                    if (coordinates.toString() == tileCoordonates.toString()) {
                        value.push(2)
                    }
                });

                if (value.length === 0) {
                    return false
                } else {
                    return value;
                }
            };

            // Create Tile
            function createTile(id, owner, row, column, diagonal) {
                return { id: id, owner: owner, isAvailable: true, row: row, column: column, isOnDiag: diagonal }
            }

            let i = 0;
            while (i < boardSize * boardSize) {
                let row = getTilePosition(i + 1).row;
                let col = getTilePosition(i + 1).column;

                gameboard.push(createTile(i + 1, "free", row, col, isOnDiag(row, col)));
                i++;
            }
        })();




        return {
            gameboard,
            boardSize,
        }
    })();

    // Turn
    let turn = 0;
    while (winnerName.length === 0) {

        const playTurn = (function () {
            // Who's turn is it ? (TurnPlayer.getName())
            const PlayerTurn = (function () {
                const isOdd = number => number % 2 !== 0;
                const player = (isOdd(turn) === false) ? Players.players[0] : Players.players[1];
                const getPlayerName = () => player.name;

                return { getName: () => getPlayerName() }
            })();


            // Where is the player placing their token
            const PlayerChoice = (function () {












                // PLAYER INPUT GOES HERE !!!
                // DOM stuff
                

                    const gameboard = document.querySelector("#gameboard");
                    const tiles = gameboard.querySelectorAll(".tile");
                    let index;

                    tiles.forEach((tile) => tile.addEventListener("click", function () {
                        console.log(this.id);
                        index = this.id;
                    }))











                // const index = parseInt(prompt('Where do you want to play ?', 'number from 1 to 9'));
                const tile = Gameboard.gameboard[index];

                return { getTile: () => tile }
            })();


            // Changing ownership of a tile
            const PlaceToken = (function () {
                const tile = PlayerChoice.getTile();
                const playerName = PlayerTurn.getName();

                if (tile.isAvailable === true) {
                    tile.owner = playerName;
                    tile.isAvailable = false;
                    turn++;

                    return tile;
                }
            })();


            // Check winner
            const isWin = (function () {

                const board = Gameboard.gameboard;
                const playerTile = PlayerChoice.getTile();
                const player = PlayerTurn.getName();

                console.table(board);

                function isLineWon(line) {
                    let boardTileLine;
                    let playerTileLine;
                    let streak = 0;

                    board.forEach((tile) => { // I take a tile

                        if (line === "row") { // I look at the tile in its row
                            boardTileLine = tile.row;
                            playerTileLine = playerTile.row;
                        } else if (line === "column") { // I look at the tile in its column
                            boardTileLine = tile.column;
                            playerTileLine = playerTile.column;
                        } else if (line === "diag1" || line === "diag2") {  // I look at the tile in its diagonal
                            if (tile.isOnDiag === false) { // Is the tile on a diagonal ?
                                return false
                            } else if (tile.isOnDiag.includes(1)) {
                                boardTileLine = 1;
                                playerTileLine = 1;
                            } else if (tile.isOnDiag.includes(2)) {
                                boardTileLine = 2;
                                playerTileLine = 2;
                            }
                        }

                        if (boardTileLine === playerTileLine) {
                            if (tile.owner === player) {
                                streak++;
                            }
                        }
                    })

                    return (streak === Gameboard.boardSize) ? true : false;
                };

                return (isLineWon("row") === true) ||
                    (isLineWon("column") === true) ||
                    (isLineWon("diag1") === true) ||
                    (isLineWon("diag2") === true) ? true : false;
            })();

            return {
                playerWon: isWin,
                player: PlayerTurn.getName()
            }
        })();

        if (playTurn.playerWon === true) {
            winnerName = playTurn.player;
        }
    }

    // End of PlayGame
    return {
        getWinner: () => getWinnerName(),
    }
})();

console.log(`The winner is : ${PlayGame.getWinner()}`);