"use strict";
exports.__esModule = true;
var fs = require("fs");
function input(filename) {
    var text = fs.readFileSync(filename, 'utf-8').trim();
    var textSplitted = text.split('\n');
    return textSplitted;
}
function doInstructions(instructions, knots) {
    var visitedPlacesT = {};
    var H = { x: 0, y: 0 };
    var tails = [];
    for (var i = 0; i < knots - 1; i++) {
        tails.push({ x: 0, y: 0 });
    }
    visitedPlacesT[H.x + "_" + H.y] = 1; //start position
    for (var _i = 0, instructions_1 = instructions; _i < instructions_1.length; _i++) {
        var instruction = instructions_1[_i];
        var steps = parseInt(instruction.split(' ')[1]);
        var direction = instruction.split(' ')[0];
        while (steps > 0) {
            switch (direction) {
                case 'U':
                    H.y += 1;
                    break;
                case 'D':
                    H.y -= 1;
                    break;
                case 'R':
                    H.x += 1;
                    break;
                case 'L':
                    H.x -= 1;
                    break;
                default:
                    break;
            }
            for (var i = 0; i < knots - 1; i++) {
                if (i == 0) {
                    tails[i] = moveTail(tails[i], H);
                }
                else {
                    tails[i] = moveTail(tails[i], tails[i - 1]);
                }
            }
            if (visitedPlacesT[tails[knots - 2].x + "_" + tails[knots - 2].y] == undefined) {
                visitedPlacesT[tails[knots - 2].x + "_" + tails[knots - 2].y] = 1;
            }
            steps--;
        }
    }
    return visitedPlacesT;
}
function moveTail(tail, head) {
    if (head == tail) {
        return tail;
    }
    var xDiff = head.x - tail.x;
    var yDiff = head.y - tail.y;
    if (Math.abs(xDiff) == 2 && Math.abs(yDiff) == 2) {
        tail.x += xDiff / 2;
        tail.y += yDiff / 2;
    }
    else if (Math.abs(xDiff) == 2) {
        tail.x += xDiff / 2;
        tail.y = head.y;
    }
    else if (Math.abs(yDiff) == 2) {
        tail.y += yDiff / 2;
        tail.x = head.x;
    }
    return tail;
}
var testInstructions = input('test.txt');
// console.log(testInstructions)
var inputInstructions = input('input.txt');
var tPlaces = doInstructions(inputInstructions, 10);
console.log(tPlaces);
console.log(Object.keys(tPlaces).length);
