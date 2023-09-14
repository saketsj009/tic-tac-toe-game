const board = document.getElementById("board");
        const winnerText = document.getElementById("winner");
        let currentPlayer = "X";
        let boardState = ["", "", "", "", "", "", "", "", ""];
        const beepSound = document.getElementById("beepSound");
        let isSoundMuted = false;

        // Initialize the game board
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.index = i;
            cell.addEventListener("click", () => makeMove(i));
            board.appendChild(cell);
        }

        function makeMove(index) {
            if (boardState[index] === "" && !isGameOver()) {
                boardState[index] = currentPlayer;
                const cell = board.children[index];
                cell.textContent = currentPlayer;
                playBeepSound(); // Play beep sound when X or O is placed
                if (currentPlayer === "X") {
                    currentPlayer = "O";
                } else {
                    currentPlayer = "X";
                }
                const winningCombination = checkWinner();
                if (winningCombination) {
                    highlightWinningPositions(winningCombination);
                }
            }
        }

        function checkWinner() {
            const winPatterns = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6]
            ];

            for (const pattern of winPatterns) {
                const [a, b, c] = pattern;
                if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                    winnerText.textContent = `${boardState[a]} wins!`;
                    return pattern;
                }
            }

            if (!boardState.includes("")) {
                winnerText.textContent = "It's a draw!";
            }
            return null;
        }

        function isGameOver() {
            return winnerText.textContent !== "";
        }

        function resetGame() {
            for (let i = 0; i < 9; i++) {
                const cell = board.children[i];
                cell.textContent = "";
                cell.classList.remove("highlight"); // Remove the highlight class
            }
            boardState = ["", "", "", "", "", "", "", "", ""];
            winnerText.textContent = "";
            currentPlayer = "X";
        }

        // Function to play the beep sound
        function playBeepSound() {
            if (!isSoundMuted) {
                beepSound.currentTime = 0;
                beepSound.play();
            }
        }

        // Function to toggle sound mute/unmute
        function toggleSound() {
            isSoundMuted = !isSoundMuted;
        }

        // Function to highlight the winning positions
        function highlightWinningPositions(winningCombination) {
            for (const index of winningCombination) {
                const cell = board.children[index];
                cell.classList.add("highlight");
            }
        }