class DepthFirstSearch {
    constructor() {}

    static isSafe(board, row, col) {
        // Verificăm dacă este în siguranță să plasăm o regină pe tablă la poziția (row, col)
        for (let i = 0; i < col; i++) {
            if (board[row][i]) {
                return false;
            }
        }

        for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j]) {
                return false;
            }
        }

        for (let i = row, j = col; j >= 0 && i < 8; i++, j--) {
            if (board[i][j]) {
                return false;
            }
        }

        return true;
    }

    static solveNQueensUtil(board, col, solutions, solutionCount) {
        if (col >= 8 || solutions.length >= solutionCount) {
            return;
        }

        for (let i = 0; i < 8; i++) {
            if (DepthFirstSearch.isSafe(board, i, col)) {
                board[i][col] = 1;

                if (col === 7 && solutions.length < solutionCount) {
                    const solution = [];
                    for (let row = 0; row < 8; row++) {
                        solution.push(board[row].slice());
                    }
                    solutions.push(solution);
                }

                DepthFirstSearch.solveNQueensUtil(board, col + 1, solutions, solutionCount);

                board[i][col] = 0;
            }
        }
    }

    static solveNQueens(solutionCount, initialBoard = null) {
        const board = initialBoard ? initialBoard : Array(8).fill(0).map(() => Array(8).fill(0));
        const solutions = [];

        DepthFirstSearch.solveNQueensUtil(board, 0, solutions, solutionCount);

        return solutions;
    }
}

module.exports = DepthFirstSearch;
