import React, {useState} from 'react'
import { CollectionConsumer } from '../context/CollectionContext';
import {useLocation} from 'react-router-dom';

import Entry from '../components/Editor/Entry';

export default function Editor() {
    
    // const [getCardQuery, { loading, error, data }] = useLazyQuery(GET_CARD);
    

    let linkState = useLocation().state
    let block = linkState ? linkState.block : null
    if (!block || !block.id) {
        return (<div className="info">
                    <h1 className="title">( ･ิɷ･ิ)</h1>
                    <h2 className="subtitle"> You have chosen a dark path. <br />
                    No flashcard here..</h2>
                </div>)
    }
   
return (<CollectionConsumer >
    { ({updateCardEntries, addNewEntryContext, deleteEntryContext,
        chooseTypeC, getCard, card, isCardUpdating
    }) => {
    // const card = getCard(block.id);
    // updateCardId(block.id);
    console.log("getCard Editor", card);
    if(!card) {
        if (!isCardUpdating) {
            getCard(block.id)
        }
        return <div>loading</div>
    }
    
    // if (!card) {
    //     return <div>loading</div>
    // }
    // if (!cardId || loading) {
    //     return <div>loading</div>
    // } 
    // console.log("useQuery ", loading, data, error);
    // const { card } = data;
    
    // no block sent
    const {deck_title, template_title, entries} = card;
    const entries_editors = new Array(entries.length)
    
    const saveCardEntries = async () => { 
        // TODO: You can utilize smart way of changing stuff like github
        const newCardEntries = []
        entries_editors.map(async (editor) => {
            const savedData = await editor.save();
            newCardEntries.push([...savedData.blocks])
        })
        const changes = {
            "newCardEntries": newCardEntries
        }
        console.log("newCardEntries", newCardEntries);
        updateCardEntries(card.id, changes);
    }

    const addNewEntry = () => {
        console.log("adding new entry")
        addNewEntryContext(card.id)
    }

    const saveEditorInstance = (instance, idx) => {
        entries_editors[idx] = instance
    }

    const deleteEntry = (id) => {
        deleteEntryContext(card.id, id)
    }

    const chooseType = (entryId, type) => {
        chooseTypeC(card.id, entryId, type);
    }



    return (
        <div className="editor">
            <div className="editor__header">
                <div className="editor__header-left">
                    <div className="editor__subtitle text-blue-bright"> Deck </div>
                    <div className="editor__title text-dark">
                        {deck_title}
                    </div>
                </div>
                <div className="editor__header-right">
                    <div className="editor__subtitle text-blue-bright"> Template </div>
                    <div className="editor__title text-dark">
                        {template_title}
                    </div>
                </div>
            </div>
            <div className="editor__entries">
                {   entries ?
                    entries.map((e, i) => (
                        <Entry e={e} key={i} idx={i} 
                        saveEditorInstance={saveEditorInstance}
                        deleteEntry={deleteEntry}
                        chooseType={chooseType}
                        />
                    )) : "Hmm, a card is empty. Strange..."
                }
            </div>
            <div className="editor__actions">
                <div onClick={() => addNewEntry()}className="btn btn-circ btn-plus-minus">+</div>
                <div onClick={() => saveCardEntries()} className="btn btn-text">Save</div>
            </div>
        </div>
    )
    }
    }
</CollectionConsumer>)
}
