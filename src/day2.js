const fs = require('fs')
var data = null;


const ROCK = 1, PAPER = 2, SCISSOR = 3;
const WIN = -1, DRAW = 0, LOSS = 1;
const handState = {
    A : ROCK,
    B : PAPER,
    C : SCISSOR,
    X : ROCK,
    Y : PAPER,
    Z : SCISSOR
} 

const CalculateRoundScore = function(p1move, p2move){
    const scoreChoice = {
        [ROCK] : 1,
        [PAPER] : 2,
        [SCISSOR] : 3
    }

    const scoreResult = {
        [WIN] : 6,
        [DRAW] : 3,
        [LOSS] : 0
    }
    
    const GameLogic = {
        [ROCK]      : {[ROCK] : [DRAW, DRAW], [PAPER] : [LOSS, WIN ], [SCISSOR] : [WIN , LOSS]},
        [PAPER]     : {[ROCK] : [WIN , LOSS], [PAPER] : [DRAW, DRAW], [SCISSOR] : [LOSS, WIN ]},
        [SCISSOR]   : {[ROCK] : [LOSS, WIN ], [PAPER] : [WIN , LOSS], [SCISSOR] : [DRAW, DRAW]},
    }

    const state = GameLogic[p1move][p2move];
    return {p1 : scoreChoice[p1move] + scoreResult[state[0]], p2: scoreChoice[p2move] + scoreResult[state[1]]};
}


//load and process raw data
const rawData = fs.readFileSync('inputs/day2.txt', {encoding : 'utf-8'}).split('\r\n')
data = rawData.map(row => row.split(' ').map(state => handState[state]));


console.log('--Part 1--')
data = data.map(([p1, p2]) => CalculateRoundScore(p1, p2)).reduce((total, p) => {
    total[0]+=p.p1;
    total[1]+=p.p2;
    return total; 
}, [0,0]);
console.log('Total score: ' + data[1])



console.log('--Part 2--')
const cheatMap = {
    X : LOSS,
    Y : DRAW,
    Z : WIN
}
const mappedMoves = {
    [ROCK]      : {[WIN ] : PAPER,   [DRAW] : ROCK,     [LOSS] : SCISSOR},
    [PAPER]     : {[WIN ] : SCISSOR, [DRAW] : PAPER,    [LOSS] : ROCK},
    [SCISSOR]   : {[WIN ] : ROCK,    [DRAW] : SCISSOR,  [LOSS] : PAPER}
}

data = rawData.map(row => row.split(' ')).map(([os, outcome]) => {
    let opponentState = handState[os];
    return [opponentState, mappedMoves[opponentState][cheatMap[outcome]]]
}).map(([p1, p2]) => CalculateRoundScore(p1, p2)).reduce((total, p) => {
    total[0]+=p.p1;
    total[1]+=p.p2;
    return total; 
}, [0,0]);
console.log('Total score: ' + data[1])
