import * as fs from 'fs';

function input(filename: string) {
  let text =  fs.readFileSync(filename, 'utf-8').trim();
  let textSplitted = text.split('\n');
  return textSplitted;

}

function getVisibleTrees(input: string[]) {
    let visibleTrees:string[] = [];

    for (let row = 0; row < input.length; row++) {
        for (let col= 0; col < input[row].length; col++) {
            if (col == 0 || row == 0 || col == input[row].length - 1 || row == input.length - 1) {
                visibleTrees.push(input[row][col]);
                continue;
            }
            //check if there is a tree larger than the current tree in the same row
            let visibleInRowLeft = true;
            let visibleInRowRight = true;
            for (let i = 0; i < input[row].length; i++) {
                
                if (i == col){
                    continue;
                }
                if (input[row][i] >= input[row][col] && i < col) {
                    visibleInRowLeft = false;
                }
                if (input[row][i] >= input[row][col] && i > col) {
                    visibleInRowRight = false;
                }
            }
            let visibleInColUp = true;
            let visibleInColDown = true;
            //check if there is a tree larger than the current tree in the same column
            for (let i = 0; i < input.length; i++) {
                
                if (i == row){
                    continue;
                }
                if (input[i][col] >= input[row][col] && i < row) {
                    visibleInColUp = false;
                }
                if (input[i][col] >= input[row][col] && i > row) {
                    visibleInColDown = false;
                }
            }
            if(visibleInRowLeft || visibleInRowRight || visibleInColUp || visibleInColDown) {
                visibleTrees.push(input[row][col]);
            }
           
        }
    }
    return visibleTrees;
}

function getVisibleTreesAt(input:string[], row: number, col: number): number {
    let visibleTreesScore = 0;
    let visibleTreesUp:string[]= [];
    let visibleTreesDown:string[] = [];
    let visibleTreesLeft:string[] = [];
    let visibleTreesRight:string[] = [];
    //count the trees it can see above
    for (let i = row-1; i >= 0; i--) {
        if (row == 0) {
            break;
        }

        if (input[i][col] < input[row][col]) {
            visibleTreesUp.push(input[i][col]);
        } else {
            visibleTreesUp.push(input[i][col]);
            break;
        }
    }
    //count the trees it can see below
    for (let i = row+1; i < input.length; i++) {
        if (row == input.length - 1) {
            break;
        }
        if (input[i][col] < input[row][col]) {
            visibleTreesDown.push(input[i][col]);
        } else {
            visibleTreesDown.push(input[i][col]);
            break;
        }
    }
    //count the trees it can see left
    for (let i = col-1; i >= 0; i--) {
        if (col == 0 ) {
            break;
        }

        if (input[row][i] < input[row][col]) {
            visibleTreesLeft.push(input[row][i]);
        } else {
            visibleTreesLeft.push(input[row][i]);
            break;
        }
    }

    //count the trees it can see right
    for (let i = col+1; i < input[row].length; i++) {
        if ( col == input[row].length - 1) {
            break;
        }

        if (input[row][i] < input[row][col]) {
            visibleTreesRight.push(input[row][i]);
        } else {
            visibleTreesRight.push(input[row][i]);
            break;
        }
    }
    console.log(visibleTreesUp.length, visibleTreesDown.length, visibleTreesLeft.length, visibleTreesRight.length)
    visibleTreesScore = visibleTreesUp.length * visibleTreesDown.length * visibleTreesLeft.length * visibleTreesRight.length;
    return visibleTreesScore;
}

function getVisibleTreesAtMax(input:string[]) {
    let visibleTreeScoreMax = 0;
    for (let row = 0; row < input.length; row++) {
        for (let col= 0; col < input[row].length; col++) {
            visibleTreeScoreMax = Math.max(getVisibleTreesAt(input, row, col), visibleTreeScoreMax);
        }
    }
    return visibleTreeScoreMax;
}

let text = input('input.txt');
// console.log(getVisibleTrees(text));
// console.log(getVisibleTrees(text).length);
console.log(getVisibleTreesAt(text, 3, 2 ));

console.log(getVisibleTreesAtMax(text));
