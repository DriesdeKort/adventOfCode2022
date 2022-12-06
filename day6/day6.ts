import * as fs from 'fs';

function getFirstAmountUniqueLettersLocation(input: string, amount:number): number {
    let i = 0;
    input.split('').reduce((acc, letter) => {
        if (acc.length < amount ){
            if (acc.includes(letter)) {
                acc = acc.slice(acc.indexOf(letter) + 1);
            }
            i ++;
            acc += letter;
        }
        return acc;
    }, '');
    return i;
}

let text = fs.readFileSync("input.txt", 'utf8');
console.log(getFirstAmountUniqueLettersLocation(text, 4));
console.log(getFirstAmountUniqueLettersLocation(text, 14));
