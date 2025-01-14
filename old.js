// Board
const Gameboard = (function () {

    const gameboard = [];

    const boardSize = 3;
    const createBoard = (function () {
        function createTile(id, owner) {
            return { id: id, owner: owner, isAvailable: true, }
        }

        let i = 0;
        while (i < boardSize * boardSize) {
            gameboard.push(createTile(i + 1, "free"));
            i++;
        }

    })();

    return {
        gameboard,
        boardSize,
    }

})();
// console.log(Gameboard.gameboard);


// Players
const Players = (function () {

    const players = [];

    function createPlayer(name, token) {
        let player = { name: name, token: token }
        players.push(player);
    }

    // A remettre après !!!
    // createPlayer(prompt('Name of Player 1','type name'), 'X');
    // createPlayer(prompt('Name of Player 1','type name'), 'O');

    // En attendant
    createPlayer("Kylo", 'X');
    createPlayer("Ren", 'O');

    return {
        players,
    }

})();

let winnerName = "";


// Turns
let turn = 10;

while (winnerName.length <= 0) {
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
            const index = parseInt(prompt('Where do you want to play ?', 'number from 0 to 8'));
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


        // Checking is someone won
        const isWin = (function () {

            //     1 2 3             1 2 3
            // 
            // A   0 1 2         1   1 2 3
            // B   3 4 5         2   4 5 6
            // C   6 7 8         3   7 8 9


            const board = Gameboard.gameboard;
            const input = PlaceToken.tile
            const playerTile = board[input];


            // 
            // board[3].owner = "Kylo";
            // board[3].isAvailable = "False";
            // board[4].owner = "Kylo";
            // board[5].owner = "Kylo";
            // board[4].isAvailable = "False";
            // let player = { name: "Kylo" }
            // 


            function getTilePosition(tile) {
                function getRow(input) {
                    return Math.ceil(input / Gameboard.boardSize);
                }

                function getColumn(input) {
                    let result = input % Gameboard.boardSize;
                    return (result === 0) ? Gameboard.boardSize : result;
                }

                let row = getRow(tile);
                let column = getColumn(tile);

                return { row, column }
            }

            function isLineWon(line) {
                let player = PlayerTurn.getName();
                let playerTile = PlayerChoice.getTile();
                let boardTileLine;
                let playerTileLine;
                let tileInARow = 0

                board.forEach((tile) => {
                    if (line === "row") {
                        boardTileLine = getTilePosition(tile.id).row;
                        playerTileLine = getTilePosition(playerTile.id).row;
                    } else if (line === "column") {
                        boardTileLine = getTilePosition(tile.id).column;
                        playerTileLine = getTilePosition(playerTile.id).column;
                    }

                    if (boardTileLine === playerTileLine) {
                        if (tile.owner === player.name) {
                            tileInARow++;
                        }
                    }
                })

                return (tileInARow === 3) ? true : false;
            };

            return (isLineWon("row") === true || isLineWon("column") === true) ? true : false;
        })();

        // console.table(Gameboard.gameboard);
        return {
            isWin,
            player: PlayerTurn.getName(),
        }
    })();
}

console.log(playTurn.isWin)

const setWinner = (function () {
    console.log(`The winner is ${playTurn.player.name}`);
    return (playTurn.isWin === true) ? winnerName = playTurn.player : winnerName = "";
})();