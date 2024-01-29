let currentPlayer = 'X';
let player1 = '';
let player2 = '';
let winner = null;
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
const cells = document.querySelectorAll('.cell');
const turnDisplay = document.getElementById('turn');
const resultDisplay = document.getElementById('result');

function startGame() {
  player1 = document.getElementById('player1').value;
  player2 = document.getElementById('player2').value;
  turnDisplay.innerText = `${player1}'s turn`;
}

function makeMove(event) {
  const cell = event.target;
  const index = parseInt(cell.getAttribute('data-cell'));

  if (winner || cell.innerText !== '') return;

  cell.innerText = currentPlayer;

  if (checkWin()) {
    winner = currentPlayer;
    resultDisplay.innerText = `${winner === 'X' ? player1 : player2} venceu!`;
    cells.forEach(cell => {
      if (winningCombos.some(combo => combo.includes(parseInt(cell.getAttribute('data-cell'))))) {
        cell.classList.add('winner');
      }
    });
  } else if ([...cells].every(cell => cell.innerText !== '')) {
    resultDisplay.innerText = 'Empate!';
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    turnDisplay.innerText = currentPlayer === 'X' ? `${player1}'s turn` : `${player2}'s turn`;
  }
}

function checkWin() {
  return winningCombos.some(combo => {
    return combo.every(index => cells[index].innerText === currentPlayer);
  });
}

function resetGame() {
  currentPlayer = 'X';
  winner = null;
  resultDisplay.innerText = '';
  cells.forEach(cell => {
    cell.innerText = '';
    cell.classList.remove('winner');
  });
}
