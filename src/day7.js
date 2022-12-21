const {Tree} = require('./modules/tree.js')
const commands = require('fs').readFileSync('inputs/day7.dat', {encoding : 'utf-8'}).split('$').map(r=>r.trim().split('\r\n'));

let addressStack = [];
const TYPE = {
    FOLDER : 0,
    FILE : 1
}

let t = new Tree({n:'/', p:'/', type:TYPE.FOLDER, size:0});

//create file system tree
commands.forEach(command => {
    let output = command.slice(1);
    command = command[0].split(' ');
    if(command[0] == ''){
        return;
    }

    switch(command[0]){
        case 'cd':
            switch(command[1]){
                case '..':
                    addressStack.pop();
                    t.traverse.ToParent();
                    break;
                case '/':
                    addressStack = [];
                    t.traverse.Reset();
                    break;
                default:
                    addressStack.push(command[1])
                    t.traverse.ToChild((data) => {
                        //console.log(`${data.n} == ${command[1]} : [${data.n == command[1] ? "TRUE" : "FALSE"}]`)
                        return data.n == command[1]
                    });
            }
            break;
        case 'ls':
            output.forEach(e => {
                let record = e.split(' ');
                if(record[0] == 'dir'){
                    t.AddNode({n : record[1], p: `/${addressStack.join('/')}/${record[1]}`, type : TYPE.FOLDER, size : 0})
                }else{
                    t.AddNode({n : record[1], p : `/${addressStack.join('/')}/${record[1]}`, type : TYPE.FILE, size : parseInt(record[0])})
                }
            })
            break;
        default:
            console.log(`Unkown command! [${command[0]}]`)
    }
})

//Calculate the folder size of each folder, starting with children first since folders are included in the size calc.
CalcFolderSizes = () =>{
    const CalcFolderSize = (_node)=>{
        let sibling = _node.child
        while(sibling != null){
            if(sibling.child != null){
                CalcFolderSize(sibling);
            }
            _node.data.size += sibling.data.size;
            sibling = sibling.sibling;
        }
    }
    CalcFolderSize(t.root)
}
CalcFolderSizes();


console.log("-- part 1 --");
//get all folders with a size <= 100000. Yes I know I could do this within the Calc Folder Sizes but the point of this is to seperate it out into individual steps for understanding.
//believe it or not, this i smy first time creating and using a non-binary tree structure from scratch
(() => {
    let folders = [];
    const v = (_node)=>{
        let sibling = _node.child
        while(sibling != null){
            if(sibling.child != null){
                v(sibling);
            }
            if(sibling.data.type == TYPE.FOLDER && sibling.data.size <= 100000){
                folders.push({'p' : sibling.data.p, 's' : sibling.data.size})
            }
            sibling = sibling.sibling;
        }
    }
    v(t.root)
    let totalSize = folders.reduce((total, folder) => {return total + folder.s}, 0);
    console.log(folders);
    console.log(`Total size: ${totalSize}`);
})();

console.log("-- part 2 --");
console.log("root size: " + t.root.data.size);
(() => {
    let folders = [];
    const v = (_node)=>{
        let sibling = _node.child
        while(sibling != null){
            if(sibling.child != null){
                v(sibling);
            }
            if(sibling.data.type == TYPE.FOLDER && (70000000 - 30000000 - t.root.data.size + sibling.data.size) >= 0){
                folders.push({'p' : sibling.data.p, 's' : sibling.data.size})
            }
            sibling = sibling.sibling;
        }
    }
    v(t.root);
    folders = folders.sort((a,b) => {return a.s-b.s});
    console.log('delete the following folder')
    console.log(folders[0]);
})();
