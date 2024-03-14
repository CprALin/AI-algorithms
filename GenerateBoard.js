class GenerateBoard{
    constructor(){
        this.board = [];
    }
   
    initialBoard() {
        this.board = Array(8).fill(0).map(() => Array(8).fill(0));
        
        return this.board;
    }

    printBoard(board) {
        for(let i = 0 ; i < 8 ; i++)
        {
            console.log(board[i].join(" "));
        }
    }

    isFinalState(state) {
        // Verificăm dacă fiecare rând conține exact o regină
        for (let i = 0; i < 8; i++) {
            let queensInRow = 0;
            for (let j = 0; j < 8; j++) {
                if (state[i][j] === 1) {
                    queensInRow++;
                }
            }
            if (queensInRow !== 1) {
                return false;
            }
        }
    
        // Verificăm dacă fiecare coloană conține exact o regină
        for (let j = 0; j < 8; j++) {
            let queensInColumn = 0;
            for (let i = 0; i < 8; i++) {
                if (state[i][j] === 1) {
                    queensInColumn++;
                }
            }
            if (queensInColumn !== 1) {
                return false;
            }
        }
    
        // Verificăm diagonalele principale (de la stânga sus la dreapta jos)
        for (let d = -7; d <= 7; d++) {
            let queensInDiagonal = 0;
            for (let i = 0; i < 8; i++) {
                const j = i + d;
                if (j >= 0 && j < 8 && state[i][j] === 1) {
                    queensInDiagonal++;
                }
            }
            if (queensInDiagonal > 1) {
                return false;
            }
        }
    
        // Verificăm diagonalele secundare (de la stânga jos la dreapta sus)
        for (let d = 0; d <= 14; d++) {
            let queensInDiagonal = 0;
            for (let i = 0; i < 8; i++) {
                const j = d - i;
                if (j >= 0 && j < 8 && state[i][j] === 1) {
                    queensInDiagonal++;
                }
            }
            if (queensInDiagonal > 1) {
                return false;
            }
        }
    
        return true; // Dacă nu s-au găsit probleme, starea este finală
    }
}

module.exports = GenerateBoard;