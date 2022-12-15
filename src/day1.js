/*  Day 1 Challenge. [Yes I'm late, deal with it :)]

No need to over think it, assume data is perfect and the data itself isnt that big.
Of course, checks would need to be made to account for erroneous data but that's not the point of this excercise!

*/

const fs = require('fs')

var elfs = [];

let pLoadData = new Promise((res, rej) => {
    fs.readFile('inputs/day1.txt', 'utf-8', (err, data) => {
        if(err){
            console.error(err)
            rej();
            return;
        }
    
        //parse each elf's inventories
        const rawInventory = data.split('\r\n\r\n');
        rawInventory.forEach(rawString => {
            let parsedItems = rawString.split('\r\n').map(item => parseInt(item));
            var elf = {
                name : `Elf ${elfs.length}`,
                items : parsedItems,
                totalCalories : parsedItems.reduce((a, b) => {return a+b})
            }
            elfs.push(elf)
        });
        res();
    });
});

pLoadData.then(() => {
    //sort the elves in order of total carried callories
    elfs.sort((a,b) => {return b.totalCalories - a.totalCalories});
    let topThreeElfs = elfs.slice(0,3);


    console.log('--Part 1--')
    console.log(elfs[0])

    console.log('--Part 2--')
    console.log(`Names: ${topThreeElfs.map(elf => elf.name)}`)
    console.log(`Total Calories: ${topThreeElfs.reduce((total, e) => {return total + e.totalCalories}, 0)}`)
})

