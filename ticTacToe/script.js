class TicTacToe {
  constructor(numberOfPlayers) {
    this.numberOfPlayers = numberOfPlayers;
    this.boardSize = numberOfPlayers + 1;
    this.board = Array(this.boardSize * this.boardSize).fill(null);
    this.playerSymbols = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ];
    this.colors = [
      "#0D1B2A", // Dark Navy Blue
      "#1A3D1A", // Forest Green
      "#561C24", // Dark Red
      "#2C003E", // Deep Purple
      "#004225", // Deep Green
      "#3C1518", // Deep Crimson
      "#082032", // Dark Cyan
      "#4B5320", // Army Green
      "#31112C", // Maroon
      "#1B263B", // Deep Blue
      "#4E0D3A", // Dark Magenta
      "#2D4739", // Dark Olive Green
      "#38220F", // Coffee Brown
      "#1B1A55", // Dark Indigo
      "#0F3D3E", // Teal
      "#3A2E39", // Eggplant
      "#2C2C54", // Deep Blue Indigo
      "#342A21", // Dark Walnut
      "#2E3B3E", // Slate Grey
      "#422040", // Plum Purple
      "#3D155F", // Dark Violet
      "#4A2511", // Dark Brown
      "#2C3639", // Gunmetal Grey
      "#553C13", // Dark Orange Brown
      "#171717", // Matte Black
      "#202020", // Obsidian Black
    ];
    this.currentPlayerSymbolIndex = 0;
    this.currentPlayer = this.playerSymbols[this.currentPlayerSymbolIndex];
    this.winner = null;
    this.gameEnded = false;
    this.rowCounts = {};
    this.colCounts = {};
    this.diagCounts = {};
    this.antiDiagCounts = {};

    if (numberOfPlayers > 26) {
      const message = "Too many players. Maximum is 26.";
      this.renderLimitError(message);
      throw new Error(message);
    }
  }

  getRowCol(index) {
    const row = Math.floor(index / this.boardSize); // Integer division to get row
    const col = index % this.boardSize; // Modulo to get column
    return { row, col };
  }

  checkWinner(index) {
    const { row, col } = this.getRowCol(index);

    this.rowCounts[this.currentPlayer] =
      this.rowCounts[this.currentPlayer] || {};
    this.colCounts[this.currentPlayer] =
      this.colCounts[this.currentPlayer] || {};
    this.diagCounts[this.currentPlayer] =
      this.diagCounts[this.currentPlayer] || 0;
    this.antiDiagCounts[this.currentPlayer] =
      this.antiDiagCounts[this.currentPlayer] || 0;

    this.rowCounts[this.currentPlayer][row] =
      (this.rowCounts[this.currentPlayer][row] || 0) + 1;
    this.colCounts[this.currentPlayer][col] =
      (this.colCounts[this.currentPlayer][col] || 0) + 1;

    // Check diagonals
    if (row === col) {
      this.diagCounts[this.currentPlayer]++;
    }

    if (row + col === this.boardSize - 1) {
      this.antiDiagCounts[this.currentPlayer]++;
    }

    // Check win condition
    if (
      this.rowCounts[this.currentPlayer][row] === this.boardSize ||
      this.colCounts[this.currentPlayer][col] === this.boardSize ||
      this.diagCounts[this.currentPlayer] === this.boardSize ||
      this.antiDiagCounts[this.currentPlayer] === this.boardSize
    ) {
      console.log(`Player ${this.currentPlayer} wins!`);
      return true;
    }
  }

  move(index) {
    if (this.gameEnded) {
      return;
    }

    if (this.board[index] !== null) {
      return;
    }

    this.board[index] = this.currentPlayer;

    if (this.checkWinner(index)) {
      this.winner = this.currentPlayer;
      this.gameEnded = true;
      this.finish();
    } else if (this.board.every((cell) => cell !== null)) {
      this.gameEnded = true;
      this.finish();
    } else {
      this.currentPlayerSymbolIndex =
        (this.currentPlayerSymbolIndex + 1) % this.numberOfPlayers;
      this.currentPlayer = this.playerSymbols[this.currentPlayerSymbolIndex];
    }
  }

  reset() {
    this.board = Array(this.boardSize * this.boardSize).fill(null);
    this.currentPlayerSymbolIndex = 0;
    this.currentPlayer = this.playerSymbols[this.currentPlayerSymbolIndex];
    this.winner = null;
    this.gameEnded = false;
    this.rowCounts = {};
    this.colCounts = {};
    this.diagCounts = {};
    this.antiDiagCounts = {};

    this.render();
    document.getElementById("message").innerHTML = "";
    document.getElementById("buttons").innerHTML = "";
  }

  render() {
    const board = document.getElementById("root");
    board.innerHTML = "";
    board.style.gridTemplateColumns = `repeat(${this.boardSize}, 1fr)`;
    board.style.gridTemplateRows = `repeat(${this.boardSize}, 1fr)`;
    // board.style.height = `${window.innerHeight}px`;
    this.board.forEach((cell, index) => {
      const isEmpty = cell === null;
      const colorIndex = this.playerSymbols.indexOf(cell);

      const cellElement = document.createElement("button");
      cellElement.textContent = cell;
      cellElement.className = isEmpty ? "cell" : "cell filled";
      cellElement.disabled = this.gameEnded || cell !== null;
      cellElement.style.height = `${window.innerHeight / this.boardSize}px`;
      cellElement.style.width = `${window.innerWidth / this.boardSize}px`;
      cellElement.style.fontSize = `${
        window.innerHeight / this.boardSize / 2
      }px`;
      cellElement.style.backgroundColor = isEmpty
        ? "#f0f0f0"
        : this.colors[colorIndex];
      cellElement.addEventListener("click", () => {
        this.move(index);
        this.render();
      });
      board.appendChild(cellElement);
    });
  }

  start() {
    this.render();
  }

  renderMessage() {
    const message = document.createElement("p");
    message.textContent = this.winner
      ? `Player ${this.winner} wins!`
      : "It's a draw!";
    document.getElementById("message").appendChild(message);
  }

  renderButtons() {
    const buttons = document.getElementById("buttons");
    buttons.innerHTML = "";
    const reset = document.createElement("button");
    reset.textContent = "Reset";
    reset.addEventListener("click", () => {
      this.reset();
    });
    buttons.appendChild(reset);
  }

  finish() {
    this.renderMessage();
    this.renderButtons();
  }

  renderLimitError(message) {
    const error = document.createElement("p");
    error.textContent = message;
    error.style.color = "red";
    document.getElementById("message").appendChild(error);
  }
}

const game = new TicTacToe(3);
game.start();
