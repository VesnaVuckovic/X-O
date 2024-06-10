document.addEventListener ('DOMContentLoaded', function () {
  const cells = document.querySelectorAll ('.cell');
  const message = document.getElementById ('message');
  const playButton = document.getElementById ('playButton');
  const playAgainButton = document.getElementById ('playAgainButton');

  let currentPlayer = 'X';
  let board = ['', '', '', '', '', '', '', '', ''];
  let gameActive = false;

  function enableCellListeners () {
    for (let i = 0; i < cells.length; i++) {
      cells[i].addEventListener ('click', handleCellClick);
    }
  }

  function disableCellListeners () {
    for (let i = 0; i < cells.length; i++) {
      cells[i].removeEventListener ('click', handleCellClick);
    }
  }

  function startGame () {
    gameActive = true;
    message.textContent = `Player ${currentPlayer} is playing.`;
    playButton.style.display = 'none';
    enableCellListeners ();
  }

  function endGame () {
    gameActive = false;
    disableCellListeners ();
  }

  function checkWinner () {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
        combination.forEach (index => {
          cells[index].classList.add ('winning-cell');
        });
        return true;
      }
    }
    return false;
  }

  function resetGame () {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = false;
    message.textContent = 'Click "PLAY" to start the game.';
    cells.forEach (cell => {
      cell.textContent = '';
      cell.classList.remove ('winning-cell');
    });
    playAgainButton.style.display = 'none';
    playButton.style.display = 'block';
  }

  function playAgain () {
    resetGame ();
  }

  function handleCellClick (event) {
    const index = Array.from (cells).indexOf (event.target);

    if (board[index] === '' && gameActive) {
      board[index] = currentPlayer;
      cells[index].textContent = currentPlayer;

      if (checkWinner ()) {
        message.textContent = `Player ${currentPlayer} is the winner!`;
        gameActive = false;
        playAgainButton.style.display = 'block';
      } else if (board.every (cell => cell !== '')) {
        message.textContent = 'No winner!';
        gameActive = false;
        playAgainButton.style.display = 'block';
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.textContent = `Player ${currentPlayer}`;
      }
    }
  }

  cells.forEach ((cell, index) => {
    cell.addEventListener ('click', handleCellClick);
  });

  playButton.addEventListener ('click', startGame);
  playAgainButton.addEventListener ('click', playAgain);

  var modal = document.getElementById ('rulesModal');
  var btn = document.getElementById ('rulesButton');
  var span = document.getElementsByClassName ('close')[0];

  btn.onclick = function () {
    modal.style.display = 'block';
  };

  span.onclick = function () {
    modal.style.display = 'none';
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };
});
