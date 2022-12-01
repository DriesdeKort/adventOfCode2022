"use strict";
exports.__esModule = true;
var fs = require("fs");
//parse input file
function parseInput(filename) {
    var input = fs.readFileSync(filename, 'utf8');
    var elfListString = input.split("\n\n");
    var elfListCalories = [];
    elfListString.forEach(function (element) {
        var elfCalories = 0;
        element.split("\n").forEach(function (element) {
            elfCalories += parseInt(element);
        });
        elfListCalories.push(elfCalories);
    });
    return elfListCalories;
}
function getMaxCalories(elfListCalories) {
    var maxCalories = 0;
    elfListCalories.forEach(function (element) {
        if (element > maxCalories) {
            maxCalories = element;
        }
    });
    return maxCalories;
}
function getThreeLargestCalories(elfListCalories) {
    elfListCalories.sort(function (a, b) { return b - a; });
    return elfListCalories.slice(0, 3);
}
function sumOfList(inputList) {
    return inputList.reduce(function (sum, current) { return sum + current; });
}
var input = parseInput("input.txt");
// console.log(parseInput("input.txt"))
// console.log(getMaxCalories(parseInput("input.txt")))
console.log(sumOfList(getThreeLargestCalories(input)));
