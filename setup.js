"use strict";
exports.__esModule = true;
var fs = require("fs");
//create a folder for every day from day1 to day30
//add files to each folder: day1.ts, input.txt, test.txt, instruction.txt
function createFolders() {
    for (var i = 1; i <= 30; i++) {
        var folderName = "day".concat(i);
        var folderPath = "./".concat(folderName);
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }
    }
}
createFolders();
function createFiles() {
    var _loop_1 = function (i) {
        var folderName = "day".concat(i);
        var folderPath = "./".concat(folderName);
        var files = ['input.txt', 'test.txt', 'instruction.txt'];
        files.forEach(function (file) {
            var filePath = "".concat(folderPath, "/").concat(file);
            if (!fs.existsSync(filePath)) {
                //create file
                fs.writeFileSync(filePath, '');
            }
        });
    };
    for (var i = 1; i <= 30; i++) {
        _loop_1(i);
    }
}
createFiles();
