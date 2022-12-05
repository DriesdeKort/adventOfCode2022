import * as fs from 'fs';

function main(filename: string): string {
    let text:string = fs.readFileSync(filename, 'utf8');
    let [stackRows, instructions] =  text.split('\n\n').map(x => x.split('\n'));
    let stackDict = parseStacks(stackRows);
    let instructionList = parseInstructions(instructions);
    for (let instruction of instructionList) {
        // doInstruction(instruction, stackDict);
        doInstructionInOneMove(instruction, stackDict);
    }
    console.log(stackDict);
    return getTopLetters(stackDict);
}

function parseStacks(stackRows: string[]): {} {
    let stackDict = {};

    for (let row of stackRows) {
        let col = 1;
        for (let i = 1; i < row.length; i+= 4) {
            if (row[i] == ' ' || !Number.isNaN(parseInt(row[i]))) {
                col++;
                continue;
            }
            if (stackDict[col] == undefined) {
                stackDict[col] = [row[i]];
            } else {
                stackDict[col].push(row[i]);
            }
            col++;
        }

    }
    for (let key in stackDict) {
        stackDict[key].reverse();
    }
    return stackDict;
}

function parseInstructions(instructions: string[]): [number, number, number][] {
    let instructionList: [number, number, number][] = [];
    instructions.map(x=> x.split(' ')).forEach(x => {
        instructionList.push([parseInt(x[1]), parseInt(x[3]), parseInt(x[5])]);
    });
    return instructionList;
}

function doInstruction([amount, source, destination]: [number, number, number], stackDict: {}) {  
    for (let i = 0; i < amount; i++) {
        let letter = stackDict[source].pop();
        stackDict[destination].push(letter);
    }
}

function doInstructionInOneMove([amount, source, destination], stackDict: {}) {
    let letters = stackDict[source].splice(stackDict[source].length - amount, amount);
    console.log(letters);
    stackDict[destination].push(...letters);
    return stackDict;
}

function getTopLetter(stack: string[]): string {
    return stack[stack.length - 1];
}

function getTopLetters(stackDict: {}): string {
    let topLetters = "";
    for (let key in stackDict) {
        topLetters += getTopLetter(stackDict[key]);
    }
    return topLetters;
}


let text = main('test.txt');
console.log(text);