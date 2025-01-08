// Board
const Gameboard = (function () {

    const gameboard = [];

    const createBoard = (function () {
        function createTile(id, owner) {
            return { id: id, owner: owner }
        }

        let i = 0;
        while (i < 9) {
            gameboard.push(createTile(i + 1, "free"));
            i++;
        }
    })();

    return {
        gameboard,
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
// console.log(Players.players);


// Turns
const Turns = (function () {
    let turn = 0;

    
    
    // while à enlever
    while (turn < 9) {
        const playTurn = (function () {

            const turnManager = (function () {
                const isOdd = function (num) { return num & 1 };
        
                const turnPlayer = (function () {
                    if (isOdd(turn) === 0) {
                        return Players.players[0];
                    } else {
                        return Players.players[1];
                    }
                })();
        
                return {
                    turnPlayer,
                }
            })();

            const placeToken = (function () {
                const playerChoice = parseInt(prompt('Where do you want to play ?', 'number from 0 to 8'));
                const tile = Gameboard.gameboard[playerChoice]
        
                return {
                    tile,
                }
            })();

            placeToken.tile.owner = turnManager.turnPlayer.name
            console.log(Gameboard.gameboard);
            // checkWin(player, tile);
            turn++;
        })();
    }


    return {
        turn,
    }

})();