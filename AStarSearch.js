class AStarSearch {
    constructor(n) {
        this.n = n;
        this.openList = [];
        this.closedList = new Set();
    }

    // Funcție pentru a calcula euristica
    calculateHeuristic(board) {
        let conflicts = 0;
        for (let i = 0; i < this.n; i++) {
            for (let j = i + 1; j < this.n; j++) {
                if (board[i] === board[j] || Math.abs(board[i] - board[j]) === Math.abs(i - j)) {
                    conflicts++;
                }
            }
        }
        return conflicts;
    }

    // Funcție pentru a genera stările succesoare
    generateSuccessors(currentState) {
        const successors = [];
        for (let col = 0; col < this.n; col++) {
            for (let row = 0; row < this.n; row++) {
                if (currentState[col] !== row) {
                    const nextState = currentState.slice();
                    nextState[col] = row;
                    successors.push(nextState);
                }
            }
        }
        return successors;
    }

    // Funcție pentru a găsi soluția utilizând algoritmul A*
    search(initialState) {
        this.openList.push({ cost: 0, state: initialState });

        while (this.openList.length > 0) {
            this.openList.sort((a, b) => (a.cost + this.calculateHeuristic(a.state)) - (b.cost + this.calculateHeuristic(b.state)));
            const { cost, state } = this.openList.shift();

            this.closedList.add(JSON.stringify(state));

            if (this.calculateHeuristic(state) === 0) {
                return state;
            }

            const successors = this.generateSuccessors(state);
            for (const successor of successors) {
                const successorString = JSON.stringify(successor);
                if (!this.closedList.has(successorString)) {
                    this.openList.push({ cost: cost + 1, state: successor });
                }
            }
        }

        return null;
    }
}

module.exports = AStarSearch;