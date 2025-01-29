const PlayGame = (function () {

    // Creating the board
    const gameboard = {

        boardSize: 3, // I plan on making the board resizable one day
        tiles: [],
        init() {
            this.cacheDom();
            this.createBoard();
            this.reset();
        },
        cacheDom() {
            this.gameboard = document.querySelector('#gameboard');
            this.board = document.querySelector('#board');
            this.boardTiles = document.querySelectorAll('.tile');

            // this.boardSizeinput = document.querySelector('#boardSize').querySelector('input');
            this.buttons = document.querySelectorAll('button');

            this.turnDisplay = document.querySelector('#turnDisplay').querySelector('span');

            this.player1DisplayName = document.querySelector('#player1').querySelector('h2');
            this.player1DisplayScore = document.querySelector('#player1').querySelector('span');
            this.player2DisplayName = document.querySelector('#player2').querySelector('h2');
            this.player2DisplayScore = document.querySelector('#player2').querySelector('span');
        },
        getBoardSize() {
            return this.boardSize;
            // return (this.boardSizeinput.value.length === 0) ? 3 : this.boardSizeinput.value;
        },
        setGridSize(boardSize) {
            // set max of 12 or something
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
                let id = tile.id;

                tile = document.createElement('div');
                token = document.createElement('img');
                tile.id = id;
                tile.classList.add('tile');
                tile.classList.add('swell');
                token.src = 'images/tokens/token0.svg';
                tile.appendChild(token);
                this.board.appendChild(tile);
            })
        },
        createBoard() {
            let boardSize = this.getBoardSize();
            let i = 0;

            while (i < boardSize * boardSize) {
                this.tiles.push(this.setTileData(i + 1,
                    "",
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
        reset() {
            this.removeTiles();
            this.createBoard();
        }
    }


    // Creating the players
    const players = {
        players: [],
        tokens: [
            { src: 'images/tokens/token1b.svg', id: 'player1'},
            { src: 'images/tokens/token12b.svg', id: 'player2' } // isAvailable: true / for later
        ],
        init(player1Name, player2Name) {
            this.players.push(this.createPlayer(player1Name));
            this.players.push(this.createPlayer(player2Name));
            this.displayPlayers();
        },
        createPlayer(playerName) {
            return { name: playerName, token: this.getPlayerToken(), score: 0 }
        },
        getPlayerToken() {
            // At some point players will be able to pick their token
            return (this.players.length === 0) ? this.tokens[0] : this.tokens[1];
        },
        displayPlayers() {
            gameboard.cacheDom();
            gameboard.player1DisplayName.textContent = this.players[0].name;
            gameboard.player1DisplayScore.textContent = this.players[0].score;
            gameboard.player2DisplayName.textContent = this.players[1].name;
            gameboard.player2DisplayScore.textContent = this.players[1].score;
        },
        reset() {
            this.players = [];
            startGame.init();
        }
    }


    // Declare a winner
    const checkWinner = {
        board,
        init(player, tile) {
            this.board = gameboard.tiles;
            return (this.checkLine('row', tile, player) === true ||
                this.checkLine('col', tile, player) === true ||
                this.checkLine('diag1', tile, player) === true ||
                this.checkLine('diag2', tile, player) === true) ? player : '';
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
                    if (tile.owner === player && tileLine != false) {
                        streak++;
                    }
                }
            })
            return (streak == gameboard.getBoardSize()) ? true : false;
        }
    }


    // Rules of a Turn 
    const playTurn = {
        players,
        board,
        turn: 0,
        winnerName: '',
        init() {
            this.reset();
            this.getPlayerChoice(this.turn);
        },
        getTurnPlayerName() {
            const isOdd = number => number % 2 !== 0;
            return (isOdd(this.turn) === false) ? this.players[0] : this.players[1];
        },
        placeToken(tile, turn) {
            let player = this.getTurnPlayerName(turn);
            let playerName = player.name;
            let playerToken = player.token.src;
            const index = tile.id - 1;


            if (tile.isAvailable === true) {
                tile.owner = playerName;
                tile.isAvailable = false;
                gameboard.boardTiles[index].innerHTML = `<img src="${playerToken}">`;
                this.winnerName = checkWinner.init(playerName, tile);
                this.announceWinner(player);
                this.turn++;
            }
        },
        getPlayerChoice(turn) {
            gameboard.cacheDom();
            this.displayTurnPlayer(turn);
            gameboard.boardTiles.forEach((tile) => {
                tile.addEventListener('click', () => {
                    this.placeToken(this.board[tile.id - 1], turn);
                    this.displayTurnPlayer(turn);
                })
            })
        },
        displayTurnPlayer(turn) {
            gameboard.cacheDom();
            let turnPlayer = this.getTurnPlayerName(turn);
            gameboard.turnDisplay.removeAttribute('class');
            gameboard.turnDisplay.classList.add(turnPlayer.token.id);
            gameboard.turnDisplay.innerHTML = turnPlayer.name;
        },
        announceWinner(player) {
            let message;
            let isTie = this.checkForTie();

            if (this.winnerName.length > 0 && isTie === false) {
                player.score++;
                message = `The winner is <span>${this.winnerName}</span>`;
                this.createEndGamePopUp(message);
                players.displayPlayers();
            } else if (isTie === true) {
                message = `It's a <span>tie</span>`;
                this.createEndGamePopUp(message);
            }
        },
        checkForTie() {
            let board = gameboard.tiles;
            let tie = 0;

            board.forEach((tile) => {
                if (tile.isAvailable === false) {
                    tie++;
                }
            })

            return (tie === 9) ? true : false;
        },
        createEndGamePopUp(message) {
            overlay = document.createElement('div');
            overlay.classList.add('overlay');
            popUp = document.createElement('div');
            popUp.classList.add('box');
            popUp.id = 'popup';

            title = document.createElement('h1');
            title.innerHTML = message;

            closeBtn = document.createElement('button');
            closeBtn.id = 'closeBtn';
            closeBtn.textContent = 'close';

            restartBtn = document.createElement('button');
            restartBtn.id = 'restartGame';
            restartBtn.textContent = 'Play again';

            popUp.appendChild(closeBtn);
            popUp.appendChild(title);
            popUp.appendChild(restartBtn);

            document.body.appendChild(popUp);
            document.body.appendChild(overlay);

            closeBtn.addEventListener('click', () => {
                startGame.removePopUp();
            })

            restartBtn.addEventListener('click', () => {
                startGame.removePopUp();
                startGame.play();
            })

        },
        reset() {
            this.board = gameboard.tiles;
            this.players = players.players;
            this.turn = 0;
            this.winnerName = '';
        }
    }


    // Playing the game
    const startGame = {
        init() {
            this.createPlayerPopUp();
            btn.addEventListener('click', () => {
                let player1Name = this.getPlayerInfos().player1;
                let player2Name = this.getPlayerInfos().player2;

                if (player1Name.length <= 0 || player2Name.length <= 0) {
                    alert(`Invalid names (they're too short)`)
                } else if (player1Name === player2Name) {
                    alert(`Those are the same names... Don't play me !`)
                } else {
                    this.removePopUp();
                    players.init(player1Name, player2Name);
                    this.play();
                }
            });
            this.reset();
        },
        play() {
            gameboard.init();
            gameboard.gameboard.classList.remove('hidden');
            playTurn.init();
        },
        createPlayerPopUp() {
            overlay = document.createElement('div');
            overlay.classList.add('overlay');
            popUp = document.createElement('div');
            popUp.classList.add('box');
            popUp.id = 'popup';

            title = document.createElement('h1');
            title.innerHTML = 'Create <span>players</span>';

            form = document.createElement('form');

            playersInfo = document.createElement('div')
            playersInfo.classList.add('playersInfo');

            let fieldsets = [
                { tag: 'player1Name', text: 'Player One' },
                { tag: 'player2Name', text: 'Player Two' }
            ]
            fieldsets.forEach((fieldsetTag) => {
                fieldset = document.createElement('fieldset');

                label = document.createElement('label');
                label.htmlFor = fieldsetTag.tag;
                label.innerHTML = fieldsetTag.text;
                fieldset.appendChild(label);

                input = document.createElement('input');
                input.type = 'text';
                input.id = fieldsetTag.tag;
                input.name = fieldsetTag.tag;
                input.placeholder = 'Enter name';

                fieldset.appendChild(input);
                playersInfo.appendChild(fieldset);
            })

            btn = document.createElement('button');
            btn.type = 'submit';
            btn.id = 'startGame';
            btn.textContent = 'Start Game';

            form.appendChild(playersInfo);
            form.appendChild(btn);
            popUp.appendChild(title);
            popUp.appendChild(form);

            document.body.appendChild(popUp);
            document.body.appendChild(overlay);
        },
        removePopUp() {
            document.body.removeChild(popUp);
            document.body.removeChild(overlay);
        },
        getPlayerInfos() {
            return {
                player1: document.getElementById('player1Name').value,
                player2: document.getElementById('player2Name').value
            }
        },
        reset() {
            gameboard.cacheDom();
            gameboard.buttons.forEach((button) => {
                button.addEventListener('click', () => {
                    switch (button.id) {
                        // case 'boardSizeBtn':
                        //     gameboard.reset();
                        //     break;
                        case 'resetBoardBtn':
                            gameboard.reset();
                            // but don't resize
                            break;
                        case 'resetPlayersBtn':
                            players.reset();
                            break;
                    }
                    this.play();
                })
            })
        }
    }

    startGame.init();
})();