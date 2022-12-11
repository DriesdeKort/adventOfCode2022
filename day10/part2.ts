import * as fs from 'fs';

const file = fs.readFileSync('input.txt', 'utf8');
const lines = file.split('\n');

let cycle = 1;
let value = 1;

let pixels = '';

const drawCyclePixel = () => {
    const drawColumn = (cycle - 1) % 40;
    pixels += Math.abs(drawColumn - value) <= 1 ? '#' : ' ';
}

drawCyclePixel();
for (const line of lines) {
    const parts = line.split(' ');
    if (parts[0] === 'addx') {
        ++cycle; // addx takes 2 cycle
        drawCyclePixel();
        value += parseInt(parts[1]);
    }
    ++cycle;
    drawCyclePixel();
}

// Draw the CRT screen
for (let i = 0; i < 6; ++i) {
    console.log(pixels.substring(i * 40, (i + 1) * 40));
}