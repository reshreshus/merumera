import React, {useState} from 'react';
// import Navigation from "@atlaskit/navigation";
import Item from './Item';
import {CollectionConsumer} from '../../context/CollectionContext';

import Tree, {
    moveItemOnTree
  } from "@atlaskit/tree";


const renderItem = ({
    item: treeItem,
    onExpand,
    onCollapse,
    provided,
    snapshot
    }) => {
    return (
        <div>
            <Item treeItem={treeItem} onExpand={onExpand} onCollapse={onCollapse}
                provided={provided} snapshot={snapshot}/>
        </div>
    );
}



const Items = () => {
    const [_, updateSearchText] = useState(null);
    return (
        <CollectionConsumer>
        {
            ({tree, saveTreeContext, toggleExpanded, rootTreeItem}) => {

                const onExpand = (itemId) => {
                    toggleExpanded(itemId);
                };

                const onCollapse = (itemId) => {
                    // updateTree(mutateTree(tree, itemId, { isExpanded: false }));
                    toggleExpanded(itemId);
                };

                const onDragEnd = (
                    source,
                    destination
                    ) => {

                    if (!destination) {
                      return;
                    }
                    // source and destination contain only parent id
                    // and index in parent's children array
                    let parentOfDragged = tree.items[source.parentId];
                    let draggedId = parentOfDragged.children[source.index];
                    const newTree = moveItemOnTree(tree, source, destination);
                    newTree.items[draggedId].parentId = destination.parentId;
                    saveTreeContext(newTree);
                };

                if (tree) {
                    const sidebarTree = Object.assign({}, tree);
                    if (rootTreeItem) {
                        sidebarTree.rootId = rootTreeItem.id;
                    }
                    console.log("sidebarTree", sidebarTree);
                    return (
                        <div>
                            {/* <input className="sidebar__search" type="text" onChange={e => updateSearchText(e.target.value)}/> */}
                            <div className="tree">
                                <Tree
                                    tree={sidebarTree}
                                    renderItem={renderItem}
                                    onExpand={onExpand}
                                    onCollapse={onCollapse}
                                    onDragEnd={onDragEnd}
                                    isDragEnabled
                                    isNestingEnabled
                                />
                            </div>
                        </div>
                    )
                }
                return (
                    <div>No data</div>
                )
            }
        }
        </CollectionConsumer>
    )
}

export default Items;
