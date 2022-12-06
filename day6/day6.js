"use strict";
exports.__esModule = true;
var fs = require("fs");
function getFirstAmountUniqueLettersLocation(input, amount) {
    var i = 0;
    input.split('').reduce(function (acc, letter) {
        if (acc.length < amount) {
            if (acc.includes(letter)) {
                acc = acc.slice(acc.indexOf(letter) + 1);
            }
            i++;
            acc += letter;
        }
        return acc;
    }, '');
    return i;
}
var text = fs.readFileSync("input.txt", 'utf8');
console.log(getFirstAmountUniqueLettersLocation(text, 4));
console.log(getFirstAmountUniqueLettersLocation(text, 14));
