// oxgame.js
let board = ["_", "_", "_", "_", "_", "_", "_", "_", "_"];

function resetBoard() {
  board = ["_", "_", "_", "_", "_", "_", "_", "_", "_"];
  return board;
}

function checkWin(board, player) {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  return winConditions.some((condition) =>
    condition.every((index) => board[index] === player)
  );
}

function isBoardFull(board) {
  return board.every((cell) => cell !== "_");
}

function botMove(board) {
  // Bot logic to make a move
  const availablePositions = board
    .map((cell, index) => (cell === "_" ? index : null))
    .filter((index) => index != null);
  if (availablePositions.length > 0) {
    const move =
      availablePositions[Math.floor(Math.random() * availablePositions.length)];
    board[move] = "O";
  }
  return board;
}

function playGame(req, res) {
  const position = req.body.position - 1;
  if (position < 0 || position > 8 || board[position] !== "_") {
    return res.status(400).send({ error: "Invalid move" });
  }

  board[position] = "X";
  if (checkWin(board, "X")) {
    const response = { board, result: "You win!" };
    resetBoard();
    return res.json(response);
  } else if (isBoardFull(board)) {
    const response = { board, result: "It's a draw!" };
    resetBoard();
    return res.json(response);
  }

  board = botMove(board);
  if (checkWin(board, "O")) {
    const response = { board, result: "Bot wins!" };
    resetBoard();
    return res.json(response);
  } else if (isBoardFull(board)) {
    const response = { board, result: "It's a draw!" };
    resetBoard();
    return res.json(response);
  }

  res.json({ board, result: "Game continues..." });
}

module.exports = { playGame };
