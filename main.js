const readline = require('readline');
const GenerateBoard = require('./GenerateBoard');
const DepthFirstSearch = require('./DepthFirstSearch');
const AStarSearch = require('./AStarSearch');

const board = new GenerateBoard();
const initialBoard = board.initialBoard();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function readSearchAlgorithm() {
    return new Promise((resolve, reject) => {
        console.log("Pentru starea initiala : ");
        console.log("\n");
        board.printBoard(initialBoard);
        console.log("\n");
        rl.question('Selectati algoritmul de cautare:\n1. Depth First Search\n2. A* Search\nOptiune: ', (algorithm) => {
            if (algorithm === '1' || algorithm === '2') {
                resolve(algorithm);
            } else {
                console.log('Optiune invalida. Va rugam alegeti 1 sau 2.');
                readSearchAlgorithm().then(resolve);
            }
        });
    });
}

async function main() {
    const searchAlgorithm = await readSearchAlgorithm();

    if (searchAlgorithm === '1') {
        console.log("\n");
        console.log("Ati ales algoritmul Depth First Search.");
    } else {
        console.log("\n");
        console.log("Ati ales algoritmul A* Search.");
    }

    console.log("\n");

    if (searchAlgorithm === '1') {
            const solutions = DepthFirstSearch.solveNQueens(Number.MAX_SAFE_INTEGER);
            console.log(`Numărul total de soluții: ${solutions.length}`);
            console.log("\n");
            console.log("Soluțiile sunt:");
            console.log("\n");
            solutions.forEach((solution, index) => {
                console.log(`Soluția ${index + 1}:`);
                console.log("\n");
                solution.forEach(row => console.log(row.join(" ")));
                console.log("\n");
                console.log(`Este stare finala : ${board.isFinalState(solution)}`);
                console.log("\n");
            });
    } else {
        const n = 8; // numar de regine
        const initialState = Array(n).fill(0);
        const aStarSearch = new AStarSearch(n);
        const bestSolution = aStarSearch.search(initialState);
        
        if (bestSolution) {
            console.log("Soluția optimă este:");
            console.log("\n");
            const solutionBoard = Array(n).fill(0).map(() => Array(n).fill(0));
            for (let i = 0; i < n; i++) {
                solutionBoard[bestSolution[i]][i] = 1;
            }
            board.printBoard(solutionBoard);
            console.log("\n");
            console.log(`Este stare finala : ${board.isFinalState(solutionBoard)}`);
            console.log("\n");
        } else {
            console.log("Nu s-a găsit nicio soluție.");
        }
    }
    
    rl.close();
}

main();

