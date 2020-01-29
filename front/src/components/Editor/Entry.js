import React, {useState} from 'react'

import EditorJs from 'react-editor-js';
import { EDITOR_JS_TOOLS } from './editorJsTools' 

export default function Entry({e, saveEditorInstance, idx, deleteEntry, chooseType}) {
    const [isChoosingType, updateChoosingType] = useState(false);
    

    const openChoosingType = () => {
        console.log("openChoosingType")
        updateChoosingType(true)
        // $('.card-entry__choose-type').slideToggle()
        // $('.card-entry__qa').slideToggle()
    }

    const closeChoosingType = () => {
        console.log("closeChoosingType")
        updateChoosingType(false)
        // $('.card-entry__choose-type').slideToggle()
        // $('.card-entry__qa').slideToggle()
    }

    return (
        <div className="card-entry" >
            <div className="card-entry__header">
                {/* { */}
                   
                    <div className={`card-entry__choose-type ${isChoosingType ? "": "hide"}`}>
                        {
                            ['A', 'Q', 'C'].map((type, i) => (
                                <div key={i} 
                                    className={`btn ${type===e.entry_type ? 
                                        'btn-circ' : ''}`}
                                    onClick={()=> 
                                        {
                                            closeChoosingType();
                                            chooseType(e.id, type);
                                            
                                        }}
                                    >
                                    { type }
                                </div>
                        ))
                        }
                    </div>
                    
                    <div onClick={() => {
                        openChoosingType(e.id)
                    }}
                    className={`card-entry__qa btn-circ ${isChoosingType ? "hide": ""}`}> { e.entry_type }
                    </div>
                    {
                        
                    }
                {/* } */}
                
                <div className="card-entry__name">
                    {
                        e.name
                    }
                </div>
            </div>

            <div className="card-entry__field">
                <div className="card-entry__text-field" 
                    id={"editor-js-" + e.id}>
                    <EditorJs 
                        instanceRef={instance => saveEditorInstance(instance, idx)}
                        tools={EDITOR_JS_TOOLS}
                        holder={"editor-js-" + e.id}
                        data={e.content}
                    />
                </div>
                <div onClick={() => deleteEntry(e.id)} className="btn-circ btn-plus-minus">-</div>
            </div>
        </div>
    )
}
