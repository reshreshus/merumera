import React, { useState } from 'react'
import { CollectionConsumer } from '../context/CollectionContext';
import { Link, Redirect } from 'react-router-dom';

export default function ShowDeck() {
  const [uploadValue, updateUploadValue] = useState();

  return (
    <CollectionConsumer>
    {
      ({contextTreeItem, updateEditingMode, updateCurrentlyUsedDeck,
        setCardToRepeat, updateHeaderDeck,
        uploadImageDeckContext, deleteImageDeckContext}) => {

        const onFileSelected = (e) => {
          const file = e.target.files[0]
          uploadImageDeckContext(contextTreeItem.id, file);
        }
        if (contextTreeItem) {
          if (contextTreeItem.data && contextTreeItem.data.type !== 'D') {
            return (
              <Redirect to='/edit'/>
            );
          } else if (contextTreeItem.data.name) {
            return (
              <div className="deck-info">
                {
                  contextTreeItem.data.img ?
                  <div>
                    <img src={contextTreeItem.data.img}
                    className="deck-info__img"
                    alt="deck's header image" />
                    <br />
                    <div onClick={() => deleteImageDeckContext()}
                    className="btn-contrast"> Delete image</div>
                  </div>
                  :
                  <h1 className="title">( ･ิɷ･ิ)</h1>
                }
                <input className="hide" id="img-upload" type="file" accept="image/*"
                onChange={(e) => onFileSelected(e)} />
                <div className="deck-info__img-upload">
                  <label htmlFor="img-upload" id="file-drag">
                    { uploadValue ? <div> { uploadValue }% </div> : ""}
                    <div id="start">
                      <i className="fa fa-upload" aria-hidden="true"></i>
                      <div> Select image for the deck </div>
                    </div>
                  </label>
                </div>
                <div>
                <h2 className="subtitle">This is a chosen deck. "{contextTreeItem.data.name}"<br />
                What will you do with it?</h2>
                <Link to='/edit' onClick={() => {
                  // TODO: refactor
                  updateCurrentlyUsedDeck(contextTreeItem);
                  setCardToRepeat(contextTreeItem);
                  updateEditingMode({
                    isStudying: true,
                    isEditing: false
                  })
                }} className="btn-contrast" style={{marginRight: "1rem"}}>
                  study
                </Link>
                <div className="btn-contrast" onClick={() => updateHeaderDeck(contextTreeItem)}>
                  Pick for Addition
                </div>
                </div>
              </div>
            )
          }
        }
        return (
          <div>
            <h1 className="title">( ･ิɷ･ิ)</h1>
            <h2 className="subtitle">Grunt Grunt <br/>
              You need to choose a deck to study
            </h2>
          </div>
        )
      }
    }
    </CollectionConsumer>
    )
}
