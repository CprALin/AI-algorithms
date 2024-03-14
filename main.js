const readline = require('readline');
const DepthFirstSearch = require('./DepthFirstSearch');
const GenerateBoard = require('./GenerateBoard');

const board = new GenerateBoard();

const initialBoard = board.initialBoard();

// Creează o interfață pentru citirea de la intrarea standard (consolă)
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Funcție pentru a citi opțiunea algoritmului de căutare ales de utilizator
function readSearchAlgorithm() {
    return new Promise((resolve, reject) => {
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

// Funcție pentru a citi opțiunea utilizatorului: găsirea tuturor soluțiilor sau un număr specific de soluții
function readOption() {
    return new Promise((resolve, reject) => {
        rl.question('Selectati optiunea:\n1. Găsirea tuturor soluțiilor\n2. Găsirea unui număr specific de soluții\nOptiune: ', (option) => {
            if (option === '1' || option === '2') {
                resolve(option);
            } else {
                console.log('Optiune invalida. Va rugam alegeti 1 sau 2.');
                readOption().then(resolve);
            }
        });
    });
}

// Funcție pentru a citi numărul de soluții dorit de utilizator
function readSolutionCount() {
    return new Promise((resolve, reject) => {
        rl.question('Introduceti numarul de solutii dorit: ', (solutionCount) => {
            if (!isNaN(solutionCount) && parseInt(solutionCount) > 0) {
                resolve(parseInt(solutionCount));
            } else {
                console.log('Va rugam introduceti un numar pozitiv.');
                readSolutionCount().then(resolve);
            }
        });
    });
}

// Funcția principală care rezolvă problema celor 8 regine
async function main() {
    const searchAlgorithm = await readSearchAlgorithm();

    if (searchAlgorithm === '1') {
        console.log("Ati ales algoritmul Depth First Search.");
        console.log("\n");
        console.log("Starea initiala : ");
        board.printBoard(initialBoard);
        console.log("\n");
    } else {
        console.log("Ati ales algoritmul A* Search. (De implementat)");
    }

    console.log("\n");

    const option = await readOption();

    if (option === '1') {
        const solutions = DepthFirstSearch.solveNQueens(Number.MAX_SAFE_INTEGER);
        console.log(`Numărul total de soluții: ${solutions.length}`);
        console.log("\n");
        console.log("Soluțiile sunt:");
        console.log("\n");
        solutions.forEach((solution, index) => {
            console.log(`Soluția ${index + 1}:`);
            solution.forEach(row => console.log(row.join(" ")));
            console.log("\n");

            if (board.isFinalState(solution)) {
                console.log("Aceasta solutie este valida.");
            } else {
                console.log("Aceasta solutie este invalida.");
            }
            console.log("\n");
        });
    } else {
        const solutionCount = await readSolutionCount();

        const solutions = DepthFirstSearch.solveNQueens(solutionCount, initialBoard);
        console.log(`Numărul de soluții: ${solutions.length}`);
        console.log("\n");
        console.log("Soluțiile sunt:");
        console.log("\n");
        solutions.forEach((solution, index) => {
            console.log(`Soluția ${index + 1}:`);
            solution.forEach(row => console.log(row.join(" ")));
            console.log("\n");

            if (board.isFinalState(solution)) {
                console.log("Aceasta solutie este valida.");
            } else {
                console.log("Aceasta solutie este invalida.");
            }
            console.log("\n");
        });
    }

    rl.close();
}

// Apelarea funcției principale
main();
