import React from 'react'
import Entry from './Entry';

export default function EditorEntries({entries, entriesEditors, treeItemId, 
    saveEditorInstance, deleteEntryEditor, 
    chooseType, updateEditorChanged, editorChanged}) {
    return (
        <div className="editor__entries">
                {   entries && entriesEditors ?
                    entries.map(e => (
                        <Entry e={e} key={`${treeItemId}${e.id}`}
                        treeItemId={treeItemId}
                        saveEditorInstance={saveEditorInstance}
                        deleteEntryEditor={deleteEntryEditor}
                        chooseType={chooseType}
                        editorChanged={editorChanged}
                        updateEditorChanged={updateEditorChanged}
                        />
                    )) : "Hmm, a card is empty. Strange..."
                }
            </div>
    )
}
