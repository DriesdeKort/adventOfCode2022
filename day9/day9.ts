import * as fs from 'fs';


function input(filename: string) {
    let text = fs.readFileSync(filename, 'utf-8').trim();
    let textSplitted = text.split('\n');
    return textSplitted;
}

function doInstructions(instructions: string[], knots:number) {
    let visitedPlacesT= {}
    let H = {x: 0, y: 0};
    let tails: { x: number; y: number; }[] = [];
    for (let i = 0; i < knots-1; i++){
        tails.push({x: 0, y: 0});
    }
    visitedPlacesT[H.x + "_" + H.y]=1 //start position
    for (let instruction of instructions){
        let steps = parseInt(instruction.split(' ')[1]);
        let direction = instruction.split(' ')[0];
        while (steps > 0){
            switch (direction) {
                case 'U':
                    H.y +=1;
                    break;
                case 'D':
                    H.y -=1;
                    break;
                case 'R':
                    H.x += 1;
                    break;
                case 'L':
                    H.x -= 1;
                    break;
                default:
                    break;
            }
            for (let i = 0; i < knots - 1 ; i++){
                if (i == 0){
                    tails[i] = moveTail(tails[i], H)
                } else {
                    tails[i] = moveTail(tails[i], tails[i-1])
                }
                
            }
            if (visitedPlacesT[tails[knots-2].x + "_" + tails[knots-2].y] == undefined){
                visitedPlacesT[tails[knots-2].x + "_" + tails[knots-2].y] =1;
            }
            steps --;
        }           
    }
    return visitedPlacesT

}

function moveTail(tail: {x:number, y: number}, head: {x: number, y: number}): {x:number, y:number}{
    if (head == tail){
        return tail;
    }
    let xDiff = head.x - tail.x;
    let yDiff = head.y - tail.y;
    if (Math.abs(xDiff) == 2 && Math.abs(yDiff) == 2){
        tail.x += xDiff/2;
        tail.y += yDiff/2;
    }
    else if (Math.abs(xDiff) == 2){
        tail.x += xDiff/2;
        tail.y = head.y;
    } else if (Math.abs(yDiff) == 2){
        tail.y += yDiff/2;
        tail.x = head.x;
    }
    return tail;
}

let testInstructions = input('test.txt');
// console.log(testInstructions)
let inputInstructions = input('input.txt');
let tPlaces = doInstructions(inputInstructions, 10)
console.log(tPlaces)
console.log(Object.keys(tPlaces).length)
