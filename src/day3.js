const fs = require('fs');

//create priority map
var priorityMap = {};
'abcdefghijklmnopqrstuvwxyz'.split('').forEach(char => {priorityMap[char] = char.charCodeAt(0)-96});
'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(char => {priorityMap[char] = char.charCodeAt(0)-38});

const rawData = fs.readFileSync('inputs/day3.dat', {encoding:'utf-8'});

//process the inputs into objects iwth the item types and their quantities in each compartment
var packs = rawData.split('\r\n').map(rawPackData => {
    if(rawPackData.length % 2 != 0){
        console.error('Pack doesnt have an even number of characters');
        return;
    }
    let pack = [rawPackData.slice(0, rawPackData.length/2), rawPackData.slice(rawPackData.length/2)]

    let ItemizeCompartment = (compartmentString) => {
        compartment = {};
        for(let itemType of compartmentString){
            compartment[itemType] = typeof(compartment[itemType]) == 'undefined' ? 1 : compartment[itemType]+1; 
        }
        return compartment;
    }

    pack = pack.map(p => ItemizeCompartment(p));
    return pack;
})


console.log('--Part 1--')
//get a list of all item types in both compartments for each pack where c1 is compartment 1 and c2 is compartment 2
var sharedItems = packs.map(([c1,c2]) => {
    c2keys = Object.keys(c2);
    return Object.keys(c1).filter((e) => {return c2keys.indexOf(e) !== -1;});
});

//get the total priority
var totalPriority = sharedItems.map(itemList => {
    return itemList.map(itemType => {return priorityMap[itemType];}).reduce((total, itemPriority) => {return total + itemPriority}, 0);
}).reduce((total, rowPriority) => {return total + rowPriority}, 0);

console.log(`Total Priority: ${totalPriority}`);

console.log('--Part 2--')
packs = packs.map(([c1,c2]) => {
    let s = new Set([...Object.keys(c1), ...Object.keys(c2)])
    return [...s];
})

//sliding window to consider only 3 packs at a time
var badges = [];
for(let i = 0; i < packs.length; i+=3){
    let firstIntersection = packs[i].filter(e => packs[i+1].indexOf(e) !== -1);
    let secondIntersection = firstIntersection.filter(e => packs[i+2].indexOf(e) !== -1);
    badges.push(secondIntersection);
}
let totalBadgePriority = badges.map(b => priorityMap[b]).reduce((total, badgePriority) => {return total + badgePriority}, 0);
console.log(`Total Priority: ${totalBadgePriority}`);