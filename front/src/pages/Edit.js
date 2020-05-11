import React from 'react'
import Editor from '../components/Editor/Editor';
import { CollectionConsumer } from '../context/CollectionContext'

export default function Edit() {
  return (<CollectionConsumer >
    { ({contextTreeItem}) => {
        if (!contextTreeItem || !contextTreeItem.id) {
          return (<div className="info">
                <h1 className="title">( ･ิɷ･ิ)</h1>
                <h2 className="subtitle"> Something is wrong...</h2>
              </div>)
        }

        return (
          <Editor key={contextTreeItem.id} treeItem={contextTreeItem} />
        )
      }
    }
    </CollectionConsumer>)
}
