window.addEventListener('DOMContentLoaded', () => {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');
    const audioPal = new Audio('./audios/hinoPalmeiras.mp3');
    const audioCor = new Audio('./audios/hinoCorinthians.mp3');

    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;

    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';


    /*
        Indexes within the board
        [0] [1] [2]
        [3] [4] [5]
        [6] [7] [8]
    */

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            if(currentPlayer === 'X'){
                audioPal.play();
            }else{
                audioCor.play();
            }
            isGameActive = false;
            return;
        }

        if (!board.includes(''))
            announce(TIE);
    }

    const announce = (type) => {
        switch (type) {
            case PLAYERO_WON:
                announcer.innerHTML = 'Corinthians Ganhou';
                break;
            case PLAYERX_WON:
                announcer.innerHTML = 'Palmeiras Ganhou';
                break;
            case TIE:
                announcer.innerText = 'Times Empataram';
        }
        announcer.classList.remove('hide');
    };

    const isValidAction = (tile) => {
        let contents = tile.innerHTML;
        if (
            tile.innerHTML === '<img src="https://i0.wp.com/figurinhasparawhats.com/wp-content/uploads/2020/09/add3bcc5-00ed-4547-ad2a-366c98468b26.png?resize=300%2C300&amp;ssl=1" width="50px" height="50px">' 
        || tile.innerHTML === '<img src="https://images.all-free-download.com/images/graphiclarge/esporte_clube_corinthians_de_laguna_sc_124483.jpg" width="50px" height="50px">') {
        return false;
        }
        return true;
    };

    const updateBoard = (index) => {
        board[index] = currentPlayer;
    }

    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;

        playerDisplay.classList.add(`player${currentPlayer}`);
    }

    const userAction = (tile, index) => {
        if (isValidAction(tile) && isGameActive) {
            let innerImg = currentPlayer === 'X' ? '<img src=\"https://i0.wp.com/figurinhasparawhats.com/wp-content/uploads/2020/09/add3bcc5-00ed-4547-ad2a-366c98468b26.png?resize=300%2C300&ssl=1" width=\"50px\" height=\"50px\">' : '<img src=\"https://images.all-free-download.com/images/graphiclarge/esporte_clube_corinthians_de_laguna_sc_124483.jpg" width=\"50px\" height=\"50px\">';
            tile.innerHTML = innerImg;
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }

    const resetBoard = () => {
        audioPal.pause();
        audioPal.currentTime = 0;
        audioCor.pause();
        audioCor.currentTime = 0;
   
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        announcer.classList.add('hide');

        if (currentPlayer === 'O') {
            changePlayer();
        }

        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });
    }

    tiles.forEach((tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
    });

    resetButton.addEventListener('click', resetBoard);
});