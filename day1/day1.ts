import * as fs from 'fs';
//parse input file


function parseInput(filename: string): number[]{
    let input = fs.readFileSync(filename, 'utf8');
    let elfListString: string[] = input.split("\n\n");
    let elfListCalories: number[] = [];
    elfListString.forEach(element => {
        let elfCalories = 0;
        element.split("\n").forEach(element => {
            elfCalories += parseInt(element);
        });
        elfListCalories.push(elfCalories);
        
    });
    return elfListCalories;
}

function getMaxCalories(elfListCalories: number[]): number{
    let maxCalories = 0;
    elfListCalories.forEach(element => {
        if(element > maxCalories){
            maxCalories = element;
        }
    });
    return maxCalories;
}

function getThreeLargestCalories(elfListCalories: number[]): number[] {
    elfListCalories.sort((a, b) => b - a )
    return elfListCalories.slice(0,3)
}

function sumOfList(inputList: number[]): number{
    return inputList.reduce((sum, current) => sum + current)
}

let input = parseInput("input.txt")
// console.log(parseInput("input.txt"))
// console.log(getMaxCalories(parseInput("input.txt")))
console.log(sumOfList(getThreeLargestCalories(input)));

