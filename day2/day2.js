"use strict";
exports.__esModule = true;
var fs = require("fs");
function parseInput2(filename) {
    var input = fs.readFileSync(filename, 'utf8');
    var splittext = input.split("\n");
    var elfMatches = [];
    for (var _i = 0, splittext_1 = splittext; _i < splittext_1.length; _i++) {
        var text = splittext_1[_i];
        var match = text.split(" ");
        match[0] = opponentLanguage(match[0]);
        match[1] = myLanguage2(match[1]);
        // console.log(match);
        elfMatches.push(match);
    }
    return elfMatches;
}
function parseInput1(filename) {
    var input = fs.readFileSync(filename, 'utf8');
    var splittext = input.split("\n");
    var elfMatches = [];
    for (var _i = 0, splittext_2 = splittext; _i < splittext_2.length; _i++) {
        var text = splittext_2[_i];
        var match = text.split(" ");
        match[0] = opponentLanguage(match[0]);
        match[1] = myLanguage1(match[1]);
        // console.log(match);
        elfMatches.push(match);
    }
    return elfMatches;
}
function opponentLanguage(input) {
    var output = "";
    switch (input) {
        case "A":
            output = "Rock";
            break;
        case "B":
            output = "Paper";
            break;
        case "C":
            output = "Scissors";
            break;
    }
    return output;
}
function myLanguage2(input) {
    var output = "";
    switch (input) {
        case "X":
            output = "Lose";
            break;
        case "Y":
            output = "Draw";
            break;
        case "Z":
            output = "Win";
            break;
    }
    return output;
}
function myLanguage1(input) {
    var output = "";
    switch (input) {
        case "X":
            output = "Rock";
            break;
        case "Y":
            output = "Paper";
            break;
        case "Z":
            output = "Scissors";
            break;
    }
    return output;
}
function calculateScore(elfMatch) {
    var score = 0;
    var possibleOptions = ["Rock", "Paper", "Scissors"];
    if (!possibleOptions.includes(elfMatch[0]) || !possibleOptions.includes(elfMatch[1])) {
        return 0;
    }
    if (elfMatch[0] == elfMatch[1]) {
        score += 3;
    }
    switch (elfMatch[1]) {
        case "Rock":
            score += 1;
            if (elfMatch[0] == "Paper") {
                score += 0;
            }
            else if (elfMatch[0] == "Scissors") {
                score += 6;
            }
            break;
        case "Paper":
            score += 2;
            if (elfMatch[0] == "Rock") {
                score += 6;
            }
            else if (elfMatch[0] == "Scissors") {
                score += 0;
            }
            break;
        case "Scissors":
            score += 3;
            if (elfMatch[0] == "Rock") {
                score += 0;
            }
            else if (elfMatch[0] == "Paper") {
                score += 6;
            }
            break;
    }
    // console.log("Score: " + score, "Opponent: " + elfMatch[0], ",Me: " + elfMatch[1]);
    return score;
}
function calculateScore2(elfMatch) {
    var score = 0;
    if (elfMatch[1] == "Win") {
        score += 6;
        switch (elfMatch[0]) {
            case "Rock":
                score += 2;
                break;
            case "Paper":
                score += 3;
                break;
            case "Scissors":
                score += 1;
                break;
        }
    }
    else if (elfMatch[1] == "Draw") {
        score += 3;
        switch (elfMatch[0]) {
            case "Rock":
                score += 1;
                break;
            case "Paper":
                score += 2;
                break;
            case "Scissors":
                score += 3;
                break;
        }
    }
    else if (elfMatch[1] == "Lose") {
        switch (elfMatch[0]) {
            case "Rock":
                score += 3;
                break;
            case "Paper":
                score += 1;
                break;
            case "Scissors":
                score += 2;
                break;
        }
    }
    return score;
}
function getTotalScore(elfMatches) {
    var score = 0;
    elfMatches.forEach(function (element) {
        score += calculateScore(element);
    });
    return score;
}
function getTotalScore2(elfMatches) {
    var score = 0;
    elfMatches.forEach(function (element) {
        score += calculateScore2(element);
    });
    return score;
}
var matches1 = parseInput1("input.txt");
var matches2 = parseInput2("input.txt");
console.log(getTotalScore(matches1));
console.log(getTotalScore2(matches2));
