"use strict";
exports.__esModule = true;
var fs = require("fs");
var file = fs.readFileSync('input.txt', 'utf8');
var lines = file.split('\n');
var cycle = 1;
var value = 1;
var values = [];
values.push(cycle * value);
for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
    var line = lines_1[_i];
    var parts = line.split(' ');
    if (parts[0] === 'addx') {
        ++cycle;
        values.push(cycle * value);
        value += parseInt(parts[1]);
    }
    ++cycle;
    values.push(cycle * value);
}
console.log(values[19] + values[59] + values[99] + values[139] + values[179] + values[219]);
//15680
