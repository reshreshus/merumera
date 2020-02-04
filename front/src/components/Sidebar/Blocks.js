import React, {useState} from 'react';
import Block from './Block';
import  {CollectionConsumer} from '../../context/CollectionContext';

export default function Blocks() {
    return (
        <CollectionConsumer> 
        {
            ({blocks, addNewBlock}) => {
                return (
                    <div className="blocks">
                        {
                            console.log("blocks", blocks)
                        }
                        {
                            blocks ? blocks.map((d, i) => (
                                <Block block={d} key={i} block={d}/>
                            )) : "NO DECKS"
                        }
                        <div className="add-block btn-contrast--sm" onClick={() => {addNewBlock()}}>
                            + new deck
                        </div>
                    </div>
                )
            }
        }  
        </CollectionConsumer>)
}
