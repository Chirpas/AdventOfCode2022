class Node{
    parent = null;
    sibling = null;
    child = null;
    data = null;

    constructor(data){
        this.parent = null;
        this.sibling = null;
        this.child = null;
        this.data = data;
    }

    SetParent(_node){
        this.parent = _node;
    }
    SetSibling(_node){
        this.sibling = _node;
    }
    SetChild(_node){
        this.children = _node
    }
}


class Tree{
    root = null;
    currentNode = null;

    constructor(data=null){
        this.root = new Node(data);
        this.currentNode = this.root;
    };

    //traverse internal node reference
    traverse = {
        ToSibling : () => {
            this.currentNode = this.currentNode.sibling;
        },
        ToParent : () => {
            this.currentNode = this.currentNode.parent;
        },
        ToChild : (compFunc=null) => {
            
            if(compFunc == null){
                this.currentNode = this.currentNode.child;
            }
            else {
                let sibling = this.currentNode.child;
                while(sibling != null){
                    if(compFunc(sibling.data)){
                        this.currentNode = sibling;
                        sibling = null;
                    }
                    else {
                        sibling = sibling.sibling;
                    }
                }
            }
        },
        Reset : () => {
            this.currentNode = this.root;
        },
        SetCurrentNode : (_node) => {
            this.currentNode = _node;
        }
    }

    //add node to currently traversed node
    AddNode(data){
        let _node = new Node(data)
        if(this.currentNode == null){
            this.currentNode = root;
        }
        _node.parent = this.currentNode;

        if(this.currentNode.child == null){
            this.currentNode.child = _node;
        }
        else{
            let tmpNode = this.currentNode.child;
            while(tmpNode.sibling != null){
                tmpNode = tmpNode.sibling;
            }
            tmpNode.sibling = _node;
        }
    }

    //return an array of all the nodes
    NodeArray(cnode=this.root){
        let nodes = [cnode];
        if(cnode.child != null){
            nodes = [...nodes, ...this.NodeArray(cnode.child)];
        }
        if(cnode.sibling != null){
            nodes = [...nodes, ...this.NodeArray(cnode.sibling)];
        }
        return nodes;
    }

    //requires an element called n for name in the data object.
    PrintTree(cnode=this.root){
        console.log(`[${cnode.data.type == 0 ? "FOLDER" : "FILE"}] ${cnode.data.p} : ${cnode.data.size}`)
        //console.log(`${cnode.data.n}`)
        if(cnode.child != null){
            this.PrintTree(cnode.child)
        }
        if(cnode.sibling != null){
            this.PrintTree(cnode.sibling);
        }
    }
}

exports.Tree = Tree;
exports.Node = Node;