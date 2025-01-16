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

            function createTile(id, owner, row, column) {
                return { id: id, owner: owner, isAvailable: true, row: row, column: column }
            }

            let i = 0;
            while (i < boardSize * boardSize) {
                gameboard.push(createTile(i + 1, "free", getTilePosition(i + 1).row, getTilePosition(i + 1).column));
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
                const index = parseInt(prompt('Where do you want to play ?', 'number from 1 to 9'));
                const tile = Gameboard.gameboard[index - 1];

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


                    board.forEach((tile) => {
                        if (line === "row") {
                            boardTileLine = tile.row;
                            playerTileLine = playerTile.row;
                        } else if (line === "column") {
                            boardTileLine = tile.column;
                            playerTileLine = playerTile.column;
                        }
                        
                        if (boardTileLine === playerTileLine) {
                            if (tile.owner === player) {
                                streak++;
                            }
                        }
                    })

                    return (streak === 3) ? true : false;
                };

                return (isLineWon("row") === true) || (isLineWon("column") === true) ? true : false;
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