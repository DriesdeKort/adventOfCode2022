import * as fs from 'fs';

const file = fs.readFileSync('input.txt', 'utf8');
const lines = file.split('\n');

let cycle = 1;
let value = 1;

const values: number[] = [];
values.push(cycle * value);

for (const line of lines) {
    const parts = line.split(' ');
    if (parts[0] === 'addx') {
        ++cycle;
        values.push(cycle * value);
        value += parseInt(parts[1]);
    }
    ++cycle;
    values.push(cycle * value);
}

console.log(values[19] + values[59] + values[99] + values[139] + values[179] + values[219]);
//15680