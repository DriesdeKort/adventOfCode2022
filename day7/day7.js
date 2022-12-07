"use strict";
exports.__esModule = true;
var fs = require("fs");
var input = fs.readFileSync('./test.txt', 'utf-8').trim();
function solve(input) {
    var _a;
    var sizes = { '/': 0 }; // map of path to size
    var paths = ['/']; // stack of paths we're in
    var lines = input.split('\n');
    for (var i = 1; i < lines.length; i++) {
        var _b = lines[i].split(' '), cmd = _b[1], dir = _b[2];
        if (cmd === 'ls') {
            for (i++; i < lines.length; i++) {
                var parts = lines[i].split(' ');
                if (parts[0] === '$') {
                    i--;
                    break;
                }
                if (parts[0] !== 'dir') {
                    for (var _i = 0, paths_1 = paths; _i < paths_1.length; _i++) { // add size to all paths we're in
                        var path = paths_1[_i];
                        sizes[path] = ((_a = sizes[path]) !== null && _a !== void 0 ? _a : 0) + Number.parseInt(parts[0]);
                    }
                }
            }
        }
        else {
            if (dir === '..') {
                paths.pop();
            }
            else {
                paths.push("".concat(paths.at(-1)).concat(dir, "/"));
            }
        }
    }
    console.log(sizes);
    console.log(Object.values(sizes)
        .filter(function (size) { return size <= 100000; })
        .reduce(function (acc, size) { return acc + size; }));
    console.log(Math.min.apply(Math, Object.values(sizes).filter(function (size) { return size >= sizes['/'] - 40000000; })));
}
solve(input);
