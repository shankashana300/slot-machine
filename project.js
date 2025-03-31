
const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOL_COUNTS =
{
    A: 2,
    B: 4,
    C: 6,
    D: 8,
};

const SYMBOL_VALUES =
{
    A: 8,
    B: 6,
    C: 4,
    D: 2,
};

//INPUT functions
const deposit = () => {
    //repeatition
    while (true) {
        const depositAmount = prompt("Enter the amount to deposit: ");
        //convert str to decimal
        const numberDepositAmount = parseFloat(depositAmount);

        //Validation
        if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
            console.log("Please enter an valid value. Try again.")
        } else {
            return numberDepositAmount;
        }
    };
};

const getNumberOfLines = () => {
    //repeatition
    while (true) {
        const lines = prompt("Enter the line or lines (1-3): ");
        //convert str to decimal
        const lineNumbers = parseFloat(lines);

        //Validation
        if (isNaN(lineNumbers) || lineNumbers <= 0 || lineNumbers > 3) {
            console.log("Please enter an valid line. Try again.")
        } else {
            return lineNumbers;
        }
    };
};

const getBet = (balance, lines) => {
    //repeatition
    while (true) {
        const bet = prompt("Enter the total bet per line: ");
        //convert str to decimal
        const betAmount = parseFloat(bet);

        //Validation
        if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance / lines) {
            console.log("Please enter an valid line. Try again.")
        } else {
            return betAmount;
        }
    };
}

//SLOT MACHINE
const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOL_COUNTS)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }

    const reels = [];
    for (let i = 0; i < COLS; i++) {
        reels.push([]);
        const reelSymbols = [...symbols];
        for (let j = 0; j < ROWS; j++) {
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }
    }
    return reels;
}
//Helperfunction - transposination Matrix, converting horizontal ver to an horizontal ver of the Slot Machine.
const transpose = (reels) => {
    const rows = [];
    for (let i = 0; i < ROWS; i++) {
        rows.push([]);
        for (let j = 0; j < COLS; j++) {
            rows[i].push(reels[j][i]);
        }
    };
    return rows;
};

const printRows = (rows) => {
    for (const row of rows) {
        let rowString = "";
        for (const [i, symbol] of row.entries()) {
            rowString += symbol;
            if (i != row.length - 1) {
                rowString += "|";
            }
        }
        console.log(rowString);
    }
};

//Winnings
const getWinnings = (rows, bet, lines) => {
    let winnings = 0;

    for (let row = 0; row < lines; row++) {
        const symbols = rows[row];
        let allSame = true;

        for (const symbol of symbols) {
            if (symbol != symbols[0]) {
                allSame = false;
                break;
            }
        }

        if (allSame) {
            winnings += bet * SYMBOL_VALUES[symbols[0]];
        }
    }
    return winnings;
};

//GameLog
const game = () => {
    let balance = deposit();
    while (true) {
        console.log("You have balance of $" + balance);
        const lineNumbers = getNumberOfLines();
        const bet = getBet(balance, lineNumbers);
        balance -= bet * lineNumbers;
        const reels = spin();
        const rows = transpose(reels);
        // console.log(reels);
        // console.log(rows);
        printRows(rows);
        const winnings = getWinnings(rows, bet, lineNumbers);
        balance += bet * winnings;
        console.log("You won $" + winnings.toString());

        if (balance <= 0) {
            console.log("You have run out of money");
            break;
        }

        const playAgain = prompt("Do you want to play again (y/n) ?");

        if (playAgain != "y") {
            break;
        }
    }
};
game();