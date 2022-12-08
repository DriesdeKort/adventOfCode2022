"use strict";
exports.__esModule = true;
var fs = require("fs");
function input(filename) {
    var text = fs.readFileSync(filename, 'utf-8').trim();
    var textSplitted = text.split('\n');
    return textSplitted;
}
function getVisibleTrees(input) {
    var visibleTrees = [];
    for (var row = 0; row < input.length; row++) {
        for (var col = 0; col < input[row].length; col++) {
            if (col == 0 || row == 0 || col == input[row].length - 1 || row == input.length - 1) {
                visibleTrees.push(input[row][col]);
                continue;
            }
            //check if there is a tree larger than the current tree in the same row
            var visibleInRowLeft = true;
            var visibleInRowRight = true;
            for (var i = 0; i < input[row].length; i++) {
                if (i == col) {
                    continue;
                }
                if (input[row][i] >= input[row][col] && i < col) {
                    visibleInRowLeft = false;
                }
                if (input[row][i] >= input[row][col] && i > col) {
                    visibleInRowRight = false;
                }
            }
            var visibleInColUp = true;
            var visibleInColDown = true;
            //check if there is a tree larger than the current tree in the same column
            for (var i = 0; i < input.length; i++) {
                if (i == row) {
                    continue;
                }
                if (input[i][col] >= input[row][col] && i < row) {
                    visibleInColUp = false;
                }
                if (input[i][col] >= input[row][col] && i > row) {
                    visibleInColDown = false;
                }
            }
            if (visibleInRowLeft || visibleInRowRight || visibleInColUp || visibleInColDown) {
                visibleTrees.push(input[row][col]);
            }
        }
    }
    return visibleTrees;
}
function getVisibleTreesAt(input, row, col) {
    var visibleTreesScore = 0;
    var visibleTreesUp = [];
    var visibleTreesDown = [];
    var visibleTreesLeft = [];
    var visibleTreesRight = [];
    //count the trees it can see above
    for (var i = row - 1; i >= 0; i--) {
        if (row == 0) {
            break;
        }
        if (input[i][col] < input[row][col]) {
            visibleTreesUp.push(input[i][col]);
        }
        else {
            visibleTreesUp.push(input[i][col]);
            break;
        }
    }
    //count the trees it can see below
    for (var i = row + 1; i < input.length; i++) {
        if (row == input.length - 1) {
            break;
        }
        if (input[i][col] < input[row][col]) {
            visibleTreesDown.push(input[i][col]);
        }
        else {
            visibleTreesDown.push(input[i][col]);
            break;
        }
    }
    //count the trees it can see left
    for (var i = col - 1; i >= 0; i--) {
        if (col == 0) {
            break;
        }
        if (input[row][i] < input[row][col]) {
            visibleTreesLeft.push(input[row][i]);
        }
        else {
            visibleTreesLeft.push(input[row][i]);
            break;
        }
    }
    //count the trees it can see right
    for (var i = col + 1; i < input[row].length; i++) {
        if (col == input[row].length - 1) {
            break;
        }
        if (input[row][i] < input[row][col]) {
            visibleTreesRight.push(input[row][i]);
        }
        else {
            visibleTreesRight.push(input[row][i]);
            break;
        }
    }
    console.log(visibleTreesUp.length, visibleTreesDown.length, visibleTreesLeft.length, visibleTreesRight.length);
    visibleTreesScore = visibleTreesUp.length * visibleTreesDown.length * visibleTreesLeft.length * visibleTreesRight.length;
    return visibleTreesScore;
}
function getVisibleTreesAtMax(input) {
    var visibleTreeScoreMax = 0;
    for (var row = 0; row < input.length; row++) {
        for (var col = 0; col < input[row].length; col++) {
            visibleTreeScoreMax = Math.max(getVisibleTreesAt(input, row, col), visibleTreeScoreMax);
        }
    }
    return visibleTreeScoreMax;
}
var text = input('input.txt');
// console.log(getVisibleTrees(text));
// console.log(getVisibleTrees(text).length);
console.log(getVisibleTreesAt(text, 3, 2));
console.log(getVisibleTreesAtMax(text));
