"use strict";
exports.__esModule = true;
var fs = require("fs");
function input(filename) {
    var input = fs.readFileSync(filename, 'utf8');
    return input;
}
function parseInput(input) {
    //71-89,66-70\n71-89,66-70 -> 
    //[      [ [71,89],[66,70] ], [[71,89],[66,70]]   ]
    var list = input.split('\n').map(function (line) {
        return line.split(',').map(function (range) {
            var _a = range.split('-').map(function (x) { return parseInt(x); }), min = _a[0], max = _a[1];
            return [min, max];
        });
    });
    console.log(list);
    return list;
}
// function fullyContain(surroundingPair: number[], list: number[][]): boolean {
//     //check if pair fully contains any of the ranges in list
//     let fullyContains = false;
//     for (let insidePair of list) {
//         if (surroundingPair[0] <= insidePair[0] && insidePair[1] <= surroundingPair[1]) {
//             fullyContains = true;
//             break;
//         }
//     }
//     return fullyContains;
// }
function countFullyContains(list) {
    var count = 0;
    list.forEach(function (pair) {
        // console.log(pair);
        var fullyContains = false;
        var insidePair = pair[0];
        var surroundingPair = pair[1];
        if (surroundingPair[0] <= insidePair[0] && insidePair[1] <= surroundingPair[1]) {
            fullyContains = true;
        }
        if (insidePair[0] <= surroundingPair[0] && surroundingPair[1] <= insidePair[1]) {
            fullyContains = true;
        }
        if (fullyContains) {
            count++;
        }
    });
    return count;
}
/*

    5-7,7-9 overlaps in a single section, 7.
    2-8,3-7 overlaps all of the sections 3 through 7.
    6-6,4-6 overlaps in a single section, 6.
    2-6,4-8 overlaps in sections 4, 5, and 6.
*/
function countMutualOverlaps(list) {
    var count = 0;
    list.forEach(function (pair) {
        console.log(pair);
        var overlaps = false;
        var firstPair = pair[0];
        var secondPair = pair[1];
        //check if x or y of first pair is in between x and y of second pair
        var x = firstPair[0];
        var y = firstPair[1];
        if (x >= secondPair[0] && x <= secondPair[1]) {
            overlaps = true;
        }
        if (y >= secondPair[0] && y <= secondPair[1]) {
            overlaps = true;
        }
        //check if x or y of second pair is in between x and y of first pair
        x = secondPair[0];
        y = secondPair[1];
        if (x >= firstPair[0] && x <= firstPair[1]) {
            overlaps = true;
        }
        if (y >= firstPair[0] && y <= firstPair[1]) {
            overlaps = true;
        }
        if (overlaps) {
            count++;
        }
    });
    return count;
}
var input1 = input('input.txt');
var parsedInput = parseInput(input1);
console.log(countFullyContains(parsedInput));
console.log(countMutualOverlaps(parsedInput));
