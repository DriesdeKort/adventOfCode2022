"use strict";
exports.__esModule = true;
var fs = require("fs");
var globalModulo = 1;
function parseToMonkeys(filename) {
    var monkeys = [];
    var text = fs.readFileSync(filename, 'utf-8').trim().split('\n');
    var _loop_1 = function (i) {
        var index = parseInt(text[i].split(' ')[1][0]);
        var items = text[i + 1].split(':')[1].trim().split(',').map(function (x) { return parseInt(x); });
        //Operation: new = old * 3
        var operationString = text[i + 2].split('=')[1].trim();
        var operationList = operationString.split(' ');
        var operation = function (x) { return x; };
        switch (operationList[1]) {
            case '+':
                operation = function (x) { return x + parseInt(operationList[2]); };
                break;
            case '-':
                operation = function (x) { return x - parseInt(operationList[2]); };
                break;
            case '*':
                if (operationList[2] == 'old') {
                    operation = function (x) { return x * x; };
                }
                else {
                    operation = function (x) { return x * parseInt(operationList[2]); };
                }
                break;
            default:
                break;
        }
        var divisableString = text[i + 3].split('by ')[1].trim();
        var divisor = parseInt(divisableString);
        globalModulo *= divisor;
        var test = function (x) { return x % divisor == 0; };
        var jumpTrue = parseInt(text[i + 4].split('monkey ')[1].trim());
        var jumpFalse = parseInt(text[i + 5].split('monkey ')[1].trim());
        var monkey = {
            index: index,
            items: items,
            operation: operation,
            test: test,
            jumpTrue: jumpTrue,
            jumpFalse: jumpFalse,
            activity: 0
        };
        monkeys.push(monkey);
    };
    for (var i = 0; i < text.length; i += 7) {
        _loop_1(i);
    }
    return monkeys;
}
function runMonkeysRound(monkeys, divideBy) {
    var activity = new Array(monkeys.length).fill(0);
    for (var _i = 0, monkeys_1 = monkeys; _i < monkeys_1.length; _i++) {
        var monkey = monkeys_1[_i];
        // console.log("Monkey " + monkey.index + " has " + monkey.items.length + " items");
        // console.log(activity[monkey.index])
        for (var i = 0; i < monkey.items.length; i++) {
            monkey.activity += 1;
            // console.log(i)
            //remove item of monkey.items
            var item = monkey.items[i];
            var newNumber = monkey.operation(item);
            newNumber = newNumber % globalModulo;
            // console.log("Monkey inspects an item with a worry level of ", item);
            // console.log("new worry level is ", newNumber);
            newNumber = Math.floor(newNumber / divideBy);
            // console.log("after bored ", newNumber);
            if (monkey.test(newNumber)) {
                // console.log("Item with worry level " + newNumber + " is thrown to monkey " + monkey.jumpTrue);
                monkeys[monkey.jumpTrue].items.push(newNumber);
            }
            else {
                monkeys[monkey.jumpFalse].items.push(newNumber);
                // console.log("Item with worry level " + newNumber + " is thrown to monkey " + monkey.jumpFalse);
            }
        }
        monkey.items = [];
    }
    return monkeys;
}
function runMonkeysRounds(monkeys, rounds, divideBy) {
    for (var i = 0; i < rounds; i++) {
        monkeys = runMonkeysRound(monkeys, divideBy);
    }
    // console.log(monkeys)
    var activity = [];
    for (var _i = 0, monkeys_2 = monkeys; _i < monkeys_2.length; _i++) {
        var monkey = monkeys_2[_i];
        activity.push(monkey.activity);
    }
    console.log("activity: ", activity);
    return activity;
}
function twoMostActive(monkeys, rounds, divideBy) {
    var activity = runMonkeysRounds(monkeys, rounds, divideBy);
    var max = Math.max.apply(Math, activity);
    var maxIndex = activity.indexOf(max);
    activity[maxIndex] = 0;
    var max2 = Math.max.apply(Math, activity);
    return max * max2;
}
var monkeys = parseToMonkeys('input.txt');
// console.log(runMonkeysRound(monkeys));
// console.log(runMonkeysRounds(monkeys, 20));
// console.log("part1: ", twoMostActive(monkeys, 20, 3))
console.log(globalModulo);
console.log("part2: ", twoMostActive(monkeys, 10000, 1));
