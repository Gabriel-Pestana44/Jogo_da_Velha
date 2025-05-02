document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const timerElement = document.getElementById('timer');
    const startButton = document.getElementById('startButton');
    const restartButton = document.getElementById('restartButton');
    const resultContainer = document.getElementById('resultContainer');
    const resultMessage = document.getElementById('resultMessage');
    
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = false;
    let timer;
    let timeLeft = 5;

    // Criação do tabuleiro
    function createBoard() {
        board.innerHTML = '';
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.setAttribute('data-index', i);
            cell.addEventListener('click', handleCellClick);
            board.appendChild(cell);
        }
    }

    function endGame(message) {
        gameActive = false;
        clearInterval(timer);
        resultMessage.textContent = message;
        resultContainer.classList.remove('hidden');
        resultOverlay.classList.remove('hidden');
        startButton.disabled = false;
    }

    // Inicia o jogo
    function startGame() {
        gameActive = true;
        currentPlayer = 'X';
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        timeLeft = 5;
        timerElement.textContent = timeLeft; // <- Adicionado aqui
        startButton.disabled = true;
        resultContainer.classList.add('hidden');
    
        document.querySelectorAll('.cell').forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o');
        });
    
        clearInterval(timer);
        timer = setInterval(() => {
            timeLeft--;
            timerElement.textContent = timeLeft;
    
            if (timeLeft <= 0) {
                endGame(`TEMPO ESGOTADO! EMPATE!!`);
            }
        }, 1000);
        resultContainer.classList.add('hidden');
        resultOverlay.classList.add('hidden');
    }

    // Lógica de clique na célula
    function handleCellClick(e) {
        if (!gameActive) return;
        
        const index = e.target.getAttribute('data-index');
        
        if (gameBoard[index] !== '') return;
        
        gameBoard[index] = currentPlayer;
        e.target.textContent = currentPlayer;
        e.target.classList.add(currentPlayer.toLowerCase());
        
        if (checkWinner()) {
            endGame(`Jogador ${currentPlayer} VENCEU!`);
            return;
        }
        
        if (gameBoard.every(cell => cell !== '')) {
            endGame('EMPATE!');
            return;
        }
        
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        timeLeft = 5; // Reset do timer
    }

    // Verificação de vitória
    function checkWinner() {
        const winCombos = [
            [0,1,2], [3,4,5], [6,7,8], // Linhas
            [0,3,6], [1,4,7], [2,5,8], // Colunas
            [0,4,8], [2,4,6] // Diagonais
        ];

        return winCombos.some(combo => {
            const [a, b, c] = combo;
            return gameBoard[a] && 
                   gameBoard[a] === gameBoard[b] && 
                   gameBoard[a] === gameBoard[c];
        });
    }

    // Finaliza o jogo
    function endGame(message) {
        gameActive = false;
        clearInterval(timer);
        resultMessage.textContent = message;
        resultContainer.classList.remove('hidden');
        startButton.disabled = false;
    }

    // Event Listeners
    startButton.addEventListener('click', startGame);
    restartButton.addEventListener('click', startGame);

    // Inicialização
    createBoard();
});