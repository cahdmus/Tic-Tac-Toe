const numOfTiles = 3;

function createDiag(input) {
    let diagTiles = [];
    let row;
    let rowModifier;
    let surveyRow;
    let col = 1;

    
    if (input === 1) {
        row = 1;
        modifyRow = (row) => row + 1;
        surveyRow = (row) => ((row <= numOfTiles) ? true : false);
    } else if (input === 2) {
        row = numOfTiles;
        modifyRow = (row) => row - 1;
        surveyRow = (row) => ((row >= 1) ? true : false);
    }
    
    while (surveyRow(row) === false) {
        diagTiles.push([row, col]);
        col++;
        modifyRow(row);
        return row
    }
    
    return diagTiles;
}

let diag1 = createDiag(1);

console.log(diag1);