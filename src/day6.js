const rawData = require('fs').readFileSync('inputs/day6.dat', {encoding:'utf-8'}).trim();

console.log('-- Part 1 --')
var WIN_LEN = 4;
let markers = [];

for(let i = 0; i < rawData.length-WIN_LEN; i++){
    let slidingWindow = rawData.slice(i, i+WIN_LEN);
    if(new Set(slidingWindow).size == WIN_LEN){
        markers.push(`${i+WIN_LEN} - ${slidingWindow}`)
    }
}

console.log(`The first marker is: ${markers[0]}`)

console.log('-- Part 2 --')
WIN_LEN = 14;
markers = [];
for(let i = 0; i < rawData.length-WIN_LEN; i++){
    let slidingWindow = rawData.slice(i, i+WIN_LEN);
    if(new Set(slidingWindow).size == WIN_LEN){
        markers.push(`${i+WIN_LEN} - ${slidingWindow}`)
    }
}
console.log(`The first marker is: ${markers[0]}`)