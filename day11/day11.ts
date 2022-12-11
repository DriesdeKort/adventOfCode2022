import * as fs from 'fs';

type Monkey = {
    index: number, 
    items: number[],
    operation: (x:number) => number,
    test: (x:number) => boolean, 
    jumpTrue: number, 
    jumpFalse:number,
    activity: number
}

let globalModulo = 1;

function parseToMonkeys(filename: string): Monkey[] {
    let monkeys: Monkey[] = [];
    let text = fs.readFileSync(filename, 'utf-8').trim().split('\n');
    for (let i = 0; i < text.length; i += 7) {
        let index = parseInt(text[i].split(' ')[1][0]); 
        let items = text[i+1].split(':')[1].trim().split(',').map(x => parseInt(x));
        //Operation: new = old * 3
        let operationString = text[i+2].split('=')[1].trim();
        let operationList= operationString.split(' ')
        let operation = (x:number):number => {return x};
        switch (operationList[1]) {
            case '+':
                operation = (x:number):number => {return x + parseInt(operationList[2])};
                break;
            case '-':
                operation = (x:number):number => {return x - parseInt(operationList[2])};
                break;
            case '*':
                if (operationList[2] == 'old'){
                    operation = (x:number):number => {return x * x};
                } else {
                    operation = (x:number):number => {return x * parseInt(operationList[2])};
                }
                break;
            default :
                break;
        }

        let divisableString = text[i+3].split('by ')[1].trim();
        let divisor = parseInt(divisableString);
        globalModulo *= divisor;
        let test = (x:number):boolean => {return x%divisor == 0};
        let jumpTrue = parseInt(text[i+4].split('monkey ')[1].trim());
        let jumpFalse = parseInt(text[i+5].split('monkey ')[1].trim());
        
        let monkey: Monkey = {
            index: index,
            items: items,
            operation: operation,
            test: test,
            jumpTrue: jumpTrue,
            jumpFalse: jumpFalse,
            activity: 0,
        }
        
        monkeys.push(monkey);
    }
    return monkeys;
}

function runMonkeysRound(monkeys: Monkey[], divideBy: number): Monkey[] {
    let activity: number[] = new Array(monkeys.length).fill(0)
    for (let monkey of monkeys){
        
        // console.log("Monkey " + monkey.index + " has " + monkey.items.length + " items");
        // console.log(activity[monkey.index])
        for (let i = 0; i < monkey.items.length; i++){
            monkey.activity += 1;
            // console.log(i)
            //remove item of monkey.items
            let item = monkey.items[i];
            let newNumber = monkey.operation(item);
            newNumber = newNumber % globalModulo;
            // console.log("Monkey inspects an item with a worry level of ", item);
            // console.log("new worry level is ", newNumber);
            newNumber = Math.floor(newNumber / divideBy);
            // console.log("after bored ", newNumber);
            if (monkey.test(newNumber)){
                // console.log("Item with worry level " + newNumber + " is thrown to monkey " + monkey.jumpTrue);
                monkeys[monkey.jumpTrue].items.push(newNumber);

            } else {
                monkeys[monkey.jumpFalse].items.push(newNumber);
                // console.log("Item with worry level " + newNumber + " is thrown to monkey " + monkey.jumpFalse);
            }

        }
        monkey.items = [];
    }
    return monkeys;
}

function runMonkeysRounds(monkeys: Monkey[], rounds: number, divideBy:number): number[]{    
    for (let i = 0; i < rounds; i++){
        monkeys = runMonkeysRound(monkeys, divideBy);
    }
    // console.log(monkeys)
    let activity: number[] = [];
    for (let monkey of monkeys){
        activity.push(monkey.activity);
    }
    console.log("activity: ", activity)
    return activity;
}

function twoMostActive(monkeys: Monkey[], rounds: number, divideBy:number): number {
    let activity = runMonkeysRounds(monkeys, rounds, divideBy);
    let max = Math.max(...activity);
    let maxIndex = activity.indexOf(max);
    activity[maxIndex] = 0;
    let max2 = Math.max(...activity);
    return max * max2;
}


let monkeys = parseToMonkeys('input.txt');

// console.log(runMonkeysRound(monkeys));
// console.log(runMonkeysRounds(monkeys, 20));
// console.log("part1: ", twoMostActive(monkeys, 20, 3))

console.log(globalModulo)
console.log("part2: ", twoMostActive(monkeys, 10000, 1))
