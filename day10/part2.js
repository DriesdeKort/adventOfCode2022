"use strict";
exports.__esModule = true;
var fs = require("fs");
var file = fs.readFileSync('input.txt', 'utf8');
var lines = file.split('\n');
var cycle = 1;
var value = 1;
var pixels = '';
var drawCyclePixel = function () {
    var drawColumn = (cycle - 1) % 40;
    pixels += Math.abs(drawColumn - value) <= 1 ? '#' : ' ';
};
drawCyclePixel();
for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
    var line = lines_1[_i];
    var parts = line.split(' ');
    if (parts[0] === 'addx') {
        ++cycle; // addx takes 2 cycle
        drawCyclePixel();
        value += parseInt(parts[1]);
    }
    ++cycle;
    drawCyclePixel();
}
// Draw the CRT screen
for (var i = 0; i < 6; ++i) {
    console.log(pixels.substring(i * 40, (i + 1) * 40));
}
