import * as fs from 'fs';

function input1(filename: string): number[][]{
    let input = fs.readFileSync(filename, 'utf8');
    let splittext = input.split("\n");
    let splittext2 = splittext.map((line) => mapLettersToPriority(line.split("")));
    return splittext2;
}

//map letters to int: a = 1, b = 2, c = 3, etc and A = 27, B = 28, C = 29, etc    
function mapLettersToPriority(letters: string[] ): number[] {
    let priority: number[] = [];
    for (let letter of letters) {
        if (letter === letter.toUpperCase()) {
            priority.push(letter.charCodeAt(0) - 64 + 26);
        } else {
            priority.push(letter.charCodeAt(0) - 96);
        }
    }
    return priority;
}

function splitArrayInHalf(array: number[]): number[][] {
    let half = Math.ceil(array.length / 2);
    let firstHalf = array.slice(0, half);
    let secondHalf = array.slice(half);
    firstHalf.sort((a, b) => a - b);
    secondHalf.sort((a, b) => a - b);
    return [firstHalf, secondHalf];
}

function getDoublePriority(array: number[][]): number {
    let firstHalf = array[0];
    let secondHalf = array[1];
    for (let number of firstHalf) {
        for (let number2 of secondHalf) {
            if (number < number2) {
                break;
            }
            if (number === number2) {
                return number;
            }
        }
    }
    return 0
}

function getTripplePrioritySum(filename: string): number {
    let inputArray = input1(filename);
    let tripplePrioritySum = 0;
    for (let i = 0 ; i < inputArray.length-2; i = i + 3) {
        console.log(i)
        let firstArray = inputArray[i].sort((a, b) => a - b);
        let secondArray = inputArray[i+1].sort((a, b) => a - b);
        let thirdArray = inputArray[i+2].sort((a, b) => a - b);
        let tripplePriority = getTripplePriority(firstArray, secondArray, thirdArray);
        console.log(tripplePriority);
        tripplePrioritySum += tripplePriority;

    }
    return tripplePrioritySum;
}

function getTripplePriority(firstArray: number[], secondArray: number[], thirdArray: number[]): number {
    let tripplePriority = 0;
    for (let number of firstArray) {
        for (let number2 of secondArray) {
            for (let number3 of thirdArray) {
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


function getDoublePrioritySum(filename: string): number {
    let inputArray = input1(filename);
    let splittedArray = inputArray.map((line) => splitArrayInHalf(line));
    let doublePrioritySum = 0;
    for (let array of splittedArray) {
        doublePrioritySum += getDoublePriority(array);
    }
    return doublePrioritySum;
}


console.log("part1: test = ", getDoublePrioritySum("test.txt"));
console.log("part1: input = ", getDoublePrioritySum("input.txt"));
console.log("part2: test = ",getTripplePrioritySum("test.txt"));
console.log("part2: input = ",getTripplePrioritySum("input.txt"));