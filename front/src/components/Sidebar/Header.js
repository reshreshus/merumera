import React from 'react'
import {Link} from 'react-router-dom'
import { CollectionConsumer } from '../../context/CollectionContext';

export default function Header() {
    return (
        <CollectionConsumer>
        {
            ({updateContextTreeItem}) => {
                return (
                    <div className="header">
                        <Link to="/" className="link" onClick={() => updateContextTreeItem(null)}>
                            <h1>Tenjin Book<br/>
                            </h1>
                        </Link>
                    </div>
                )
            }
        }
        </CollectionConsumer>
        
    )
}
