"use strict";
exports.__esModule = true;
var fs = require("fs");
function input1(filename) {
    var input = fs.readFileSync(filename, 'utf8');
    var splittext = input.split("\n");
    var splittext2 = splittext.map(function (line) { return mapLettersToPriority(line.split("")); });
    return splittext2;
}
//map letters to int: a = 1, b = 2, c = 3, etc and A = 27, B = 28, C = 29, etc    
function mapLettersToPriority(letters) {
    var priority = [];
    for (var _i = 0, letters_1 = letters; _i < letters_1.length; _i++) {
        var letter = letters_1[_i];
        if (letter === letter.toUpperCase()) {
            priority.push(letter.charCodeAt(0) - 64 + 26);
        }
        else {
            priority.push(letter.charCodeAt(0) - 96);
        }
    }
    return priority;
}
function splitArrayInHalf(array) {
    var half = Math.ceil(array.length / 2);
    var firstHalf = array.slice(0, half);
    var secondHalf = array.slice(half);
    firstHalf.sort(function (a, b) { return a - b; });
    secondHalf.sort(function (a, b) { return a - b; });
    return [firstHalf, secondHalf];
}
function getDoublePriority(array) {
    var firstHalf = array[0];
    var secondHalf = array[1];
    for (var _i = 0, firstHalf_1 = firstHalf; _i < firstHalf_1.length; _i++) {
        var number = firstHalf_1[_i];
        for (var _a = 0, secondHalf_1 = secondHalf; _a < secondHalf_1.length; _a++) {
            var number2 = secondHalf_1[_a];
            if (number < number2) {
                break;
            }
            if (number === number2) {
                return number;
            }
        }
    }
    return 0;
}
function getTripplePrioritySum(filename) {
    var inputArray = input1(filename);
    var tripplePrioritySum = 0;
    for (var i = 0; i < inputArray.length - 2; i = i + 3) {
        console.log(i);
        var firstArray = inputArray[i].sort(function (a, b) { return a - b; });
        var secondArray = inputArray[i + 1].sort(function (a, b) { return a - b; });
        var thirdArray = inputArray[i + 2].sort(function (a, b) { return a - b; });
        var tripplePriority = getTripplePriority(firstArray, secondArray, thirdArray);
        console.log(tripplePriority);
        tripplePrioritySum += tripplePriority;
    }
    return tripplePrioritySum;
}
function getTripplePriority(firstArray, secondArray, thirdArray) {
    var tripplePriority = 0;
    for (var _i = 0, firstArray_1 = firstArray; _i < firstArray_1.length; _i++) {
        var number = firstArray_1[_i];
        for (var _a = 0, secondArray_1 = secondArray; _a < secondArray_1.length; _a++) {
            var number2 = secondArray_1[_a];
            for (var _b = 0, thirdArray_1 = thirdArray; _b < thirdArray_1.length; _b++) {
                var number3 = thirdArray_1[_b];
                if (number < number2 || number2 < number3) {
                    break;
                }
                if (number === number2 && number2 === number3) {
                    return number;
                }
            }
        }
    }
    return tripplePriority;
}
function getDoublePrioritySum(filename) {
    var inputArray = input1(filename);
    var splittedArray = inputArray.map(function (line) { return splitArrayInHalf(line); });
    var doublePrioritySum = 0;
    for (var _i = 0, splittedArray_1 = splittedArray; _i < splittedArray_1.length; _i++) {
        var array = splittedArray_1[_i];
        doublePrioritySum += getDoublePriority(array);
    }
    return doublePrioritySum;
}
console.log("part1: test = ", getDoublePrioritySum("test.txt"));
console.log("part1: input = ", getDoublePrioritySum("input.txt"));
console.log("part2: test = ", getTripplePrioritySum("test.txt"));
console.log("part2: input = ", getTripplePrioritySum("input.txt"));
