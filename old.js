// const players = function () {

// }


const Gameboard = (function () {

    const players = [];

    // Create players
    function createPlayer(name, token) {
        let player = {
            name: name,
            token: token,
        }

        players.push(player);
    }

    // A remettre après !!!
    // let player1 = createPlayer(prompt('Name of Player 1','type name'), 'X');
    // let player2 = createPlayer(prompt('Name of Player 1','type name'), 'O');

    // En attendant
    let player1 = createPlayer("Kylo", 'X');
    let player2 = createPlayer("Ren", 'O');

    // console.log(players);




    const gameboard = [];

    // Creating the template for the squares of the board ?
    const square = function (owner) {
        return this.owner = owner;
    }

    const createBoard = (function () {
        let i = 0;
        while (i < 9) {
            gameboard.push(square("empty"));
            i++;
        }
    })();





    let turn = 0;

    // Play ?
    function turnCounter (turn) {
        const isOdd = function(num) { return num & 1 };

        if (isOdd(turn) === 0) {
            return console.log(`it's player 1's turn`)
        } else {
            return console.log(`it's player 1's turn`)
        }
    };


    while (turn < 9) {
        const playTurn = (function () {
            // let squareChoice = 1;
            // // let squareChoice = parseInt(prompt('Where do you want to play ?', 'number from 0 to 8'));
            // gameboard[squareChoice] = "idk";
            turnCounter(turn);
            turn++;
        })();
    }








    // return console.log(gameboard);

})()





const Gameboard = (function () {

    let turn = 0;

    function turnCounter (turn) {
        const isOdd = function(num) { return num & 1 };

        if (isOdd(turn) === 0) {
            return console.log(`it's player 1's turn`)
        } else {
            return console.log(`it's player 2's turn`)
        }
    };

    while (turn < 9) {
        const playTurn = (function () {
            turnCounter(turn);
            turn++;
        })();
    }

    // return console.log(gameboard);

})();



const turnManager = (function () {
    let turn = 0;

    return {
        turn: turn,
        player: player,
    }
})();
