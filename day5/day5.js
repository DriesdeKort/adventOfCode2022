"use strict";
exports.__esModule = true;
var fs = require("fs");
function main(filename) {
    var text = fs.readFileSync(filename, 'utf8');
    var _a = text.split('\n\n').map(function (x) { return x.split('\n'); }), stackRows = _a[0], instructions = _a[1];
    var stackDict = parseStacks(stackRows);
    var instructionList = parseInstructions(instructions);
    for (var _i = 0, instructionList_1 = instructionList; _i < instructionList_1.length; _i++) {
        var instruction = instructionList_1[_i];
        // doInstruction(instruction, stackDict);
        doInstructionInOneMove(instruction, stackDict);
    }
    console.log(stackDict);
    return getTopLetters(stackDict);
}
function parseStacks(stackRows) {
    var stackDict = {};
    for (var _i = 0, stackRows_1 = stackRows; _i < stackRows_1.length; _i++) {
        var row = stackRows_1[_i];
        var col = 1;
        for (var i = 1; i < row.length; i += 4) {
            if (row[i] == ' ' || !Number.isNaN(parseInt(row[i]))) {
                col++;
                continue;
            }
            if (stackDict[col] == undefined) {
                stackDict[col] = [row[i]];
            }
            else {
                stackDict[col].push(row[i]);
            }
            col++;
        }
    }
    for (var key in stackDict) {
        stackDict[key].reverse();
    }
    return stackDict;
}
function parseInstructions(instructions) {
    var instructionList = [];
    instructions.map(function (x) { return x.split(' '); }).forEach(function (x) {
        instructionList.push([parseInt(x[1]), parseInt(x[3]), parseInt(x[5])]);
    });
    return instructionList;
}
function doInstruction(_a, stackDict) {
    var amount = _a[0], source = _a[1], destination = _a[2];
    for (var i = 0; i < amount; i++) {
        var letter = stackDict[source].pop();
        stackDict[destination].push(letter);
    }
}
function doInstructionInOneMove(_a, stackDict) {
    var _b;
    var amount = _a[0], source = _a[1], destination = _a[2];
    var letters = stackDict[source].splice(stackDict[source].length - amount, amount);
    console.log(letters);
    (_b = stackDict[destination]).push.apply(_b, letters);
    return stackDict;
}
function getTopLetter(stack) {
    return stack[stack.length - 1];
}
function getTopLetters(stackDict) {
    var topLetters = "";
    for (var key in stackDict) {
        topLetters += getTopLetter(stackDict[key]);
    }
    return topLetters;
}
var text = main('test.txt');
console.log(text);
