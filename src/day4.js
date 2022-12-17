const fs = require('fs')
const rawData = fs.readFileSync('inputs/day4.dat', {encoding : 'utf-8'})

var pairs = []
let inputSectorIdRegex = /([0-9]*)\-([0-9]*),([0-9]*)\-([0-9]*)/;
rawData.split('\r\n').forEach(row => {
    let match = row.match(inputSectorIdRegex);
    pairs.push({
        e1l : parseInt(match[1]),
        e1u : parseInt(match[2]),
        e2l : parseInt(match[3]),
        e2u : parseInt(match[4])
    })
})

let redundantPairs = [];
pairs.forEach(p => {
    if((p.e1l >= p.e2l && p.e1u <= p.e2u) || (p.e2l >= p.e1l && p.e2u <= p.e1u)){
        redundantPairs.push(p);
    }
})

console.log('--Part 1--')
console.log('Number of redundant assignmnets: ' + redundantPairs.length)
//console.log(redundantPairs.map(p=>{return `${p.e1l}-${p.e1u}, ${p.e2l}-${p.e2u}`}))

console.log('--Part 2--')
let nonexclusivepairs = []
pairs.forEach(p => {
    let c1 = (p.e1u >= p.e2l) && (p.e1u <= p.e2u);
    let c2 = (p.e1l >= p.e2l) && (p.e1l <= p.e2u);
    let c3 = (p.e1l <= p.e2l) && (p.e1u >= p.e2u);
    if(c1 || c2 || c3){
        nonexclusivepairs.push(p);
    }
})
console.log('Number of non-mutually exclusive assignmnets: ' + nonexclusivepairs.length)
