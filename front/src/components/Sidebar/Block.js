import React, {useEffect, useState, useRef} from 'react'
import ContentEditable from 'react-contenteditable'
import {Link} from 'react-router-dom';
import ReactDOM from "react-dom";

export default function Block({block, selectedBlockId, updateSelectedBlockId}) {
    // TODO: rename on F2
    let contentEditable;
    const [name, updateName] = useState(block.name)
    const [expanded, updateExpanded] = useState(block.expanded ? block.expanded : false)
    
    let node = useRef(null);
    useEffect(() => {
        contentEditable = React.createRef();
    })

    const handleChange = e => {
        updateName(e.target.value);
    };

    const onKeyDown = e => {
        // Finish editing when ENTER is pressed
        // TODO: get back to the previous value if ESC is pressed
        if (e.keyCode == 13) {
            e.preventDefault();
            updateSelectedBlockId('');
        }
    }

    const onBlockClick = (e) => {
        updateSelectedBlockId(block.id)
    }

    const toggleCaret = () => {
        // node.current.querySelector(".caret").classList.toggle("caret-down");
        // node.current.querySelector(".block__children").classList.toggle("active");
        updateExpanded(!expanded);
    }

    return (
        <div className={`block`} ref={node}>  
            {
                block.children ? 
                <span  className={`caret ${expanded ? 'caret-down': ''}`} onClick={() => {toggleCaret()}}>
                    {/* &#9654; */}
                    <svg width="20" height="20" viewBox="0 0 20 20" class=" _4zcx4s"><path d="M13.75 9.56879C14.0833 9.76124 14.0833 10.2424 13.75 10.4348L8.5 13.4659C8.16667 13.6584 7.75 13.4178 7.75 13.0329L7.75 6.97072C7.75 6.58582 8.16667 6.34525 8.5 6.5377L13.75 9.56879Z" stroke="none" fill="currentColor"></path></svg>
                    </span>
                :
                ""
            }
            <span className="block__type">[{ block.type }]</span>
            <div className={`block__name ${block.id !== selectedBlockId ? '': 'block__name--active'}` }
            onClick={(e)  => onBlockClick(e)} >
                <Link className={`block__link`}
                    // to={`/show-deck/${block.id}`}
                    to={{pathname: `${block.type === 'D' ? `/show-deck/${block.id}` 
                            : `/edit/${block.id}`}`, 
                        state: {
                        block: block
                    }}}
                    >
                    <ContentEditable 
                        innerRef={contentEditable}
                        html={name}
                        disabled={ block.id !== selectedBlockId }
                        onChange={handleChange}
                        tagName='div'  // div by default but still
                        onKeyDown={onKeyDown}
                    />
                </Link>
            </div>
            {
                block.children ? 
                    <div className={`block__children ${expanded ? 'active': ''}`}>
                    {
                        block.children.map( (c, i) => (
                        <Block block={c} key={i} selectedBlockId={selectedBlockId}
                                 updateSelectedBlockId={updateSelectedBlockId}/>
                    ))
                    }
                    </div>
                    : ""
            }
        </div>
            
    )
}
