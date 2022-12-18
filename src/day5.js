var rawData = require('fs').readFileSync('inputs/day5.dat', {encoding:'utf-8'});
rawData = rawData.split('\r\n\r\n')

var stackState = {};
let rawState = rawData[0].split('\r\n');
rawState[rawState.length-1].match(/(\d+)/g).forEach(stackId => {
    stackState[stackId] = [];
});

for(let i = rawState.length-2; i >=0; i--){
    rawState[i].match(/( {4}|(\[[A-Z]\]))/g).forEach((e, index) => {
        e = e.trim();
        if(e != ''){
            stackState[index+1].push(e);
        }
    });
}
const cachedStackState = JSON.stringify(stackState);

const moveInstructions = rawData[1].split('\r\n').map(row => {
    const matches = row.match(/(\d+)/g);
    return {n : parseInt(matches[0]), src : parseInt(matches[1]), dst : parseInt(matches[2])}
});

console.log('-- Part 1 --')
moveInstructions.forEach(instruction => {
    for(let i = 0; i < instruction.n; i++){
        stackState[instruction.dst].push(stackState[instruction.src].pop())
    };
})
console.log('Top level crates: ' + Object.keys(stackState).map(i => {
    return stackState[i][stackState[i].length-1];
}))


console.log('-- Part 2 --')
stackState = JSON.parse(cachedStackState);
moveInstructions.forEach(instruction => {
    let stk = [];
    for(let i = 0; i < instruction.n; i++){
        let v = stackState[instruction.src].pop();
        typeof(v) == 'undefined' ? '' : stk.push(v);
    };
    while(stk.length > 0){
        stackState[instruction.dst].push(stk.pop());
    }
})

console.log('Top level crates: ' + Object.keys(stackState).map(i => {
    return stackState[i][stackState[i].length-1];
}))