import * as fs from 'fs';



function parseInput2(filename: string): string[][]{
    let input = fs.readFileSync(filename, 'utf8');
    let splittext = input.split("\n");
    let elfMatches: string[][] = [];
    for (let text of splittext){
        let match = text.split(" ");
        match[0] = opponentLanguage(match[0])
        match[1] = myLanguage2(match[1])
        // console.log(match);
        elfMatches.push(match);
    }
    return elfMatches;
}

function parseInput1(filename: string): string[][]{
    let input = fs.readFileSync(filename, 'utf8');
    let splittext = input.split("\n");
    let elfMatches: string[][] = [];
    for (let text of splittext){
        let match = text.split(" ");
        match[0] = opponentLanguage(match[0])
        match[1] = myLanguage1(match[1])
        // console.log(match);
        elfMatches.push(match);
    }
    return elfMatches;
}

function opponentLanguage(input: string): string{
    let output = "";
    switch (input){
        case "A":
            output =  "Rock"
            break
        case "B":
            output = "Paper";
            break;
        case "C":
            output = "Scissors";
            break;

    }
    return output

}

function myLanguage2(input: string): string{
    let output = "";
    switch (input){
        case "X":
            output =  "Lose"
            break
        case "Y":
            output = "Draw";
            break;
        case "Z":
            output = "Win";
            break;

    }
    return output
}

function myLanguage1(input: string): string{
    let output = "";
    switch (input){
        case "X":
            output =  "Rock"
            break
        case "Y":
            output = "Paper";
            break;
        case "Z":
            output = "Scissors";
            break;

    }
    return output
}

function calculateScore(elfMatch: string[]): number{
    
    let score = 0;
    let possibleOptions = ["Rock", "Paper", "Scissors"];
    if (!possibleOptions.includes(elfMatch[0]) || !possibleOptions.includes(elfMatch[1])){
        return 0;
    }
    if (elfMatch[0] == elfMatch[1]){
        score += 3;
    }
    switch (elfMatch[1]){
        case "Rock":
            score += 1;
            if (elfMatch[0] == "Paper"){
                score += 0;
            } else if (elfMatch[0] == "Scissors"){
                score += 6;
            }
            break;
        case "Paper":
            score += 2;
            if (elfMatch[0] == "Rock"){
                score += 6;
            } else if (elfMatch[0] == "Scissors"){
                score += 0;
            }
            break;
        case "Scissors":
            score += 3;
            if (elfMatch[0] == "Rock"){
                score += 0;
            } else if (elfMatch[0] == "Paper"){
                score += 6;
            }
            break;
    }
    // console.log("Score: " + score, "Opponent: " + elfMatch[0], ",Me: " + elfMatch[1]);
    return score

}

function calculateScore2(elfMatch: string[]): number{
    let score = 0;
    if(elfMatch[1] == "Win"){
        score += 6;
        switch (elfMatch[0]){
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
    } else if (elfMatch[1] == "Draw"){
        score += 3;
        switch (elfMatch[0]){
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
    } else if (elfMatch[1] == "Lose"){
        switch (elfMatch[0]){
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

function getTotalScore(elfMatches: string[][]): number{
    let score = 0;
    elfMatches.forEach(element => {
        score += calculateScore(element);
    });
    return score
}

function getTotalScore2(elfMatches: string[][]): number{
    let score = 0;
    elfMatches.forEach(element => {
        score += calculateScore2(element);
    });
    return score
}

let matches1 = parseInput1("input.txt")
let matches2 = parseInput2("input.txt")
console.log(getTotalScore(matches1))
console.log(getTotalScore2(matches2))
