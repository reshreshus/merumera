import React, {useState} from 'react';
import Hotkeys from 'react-hot-keys';
import {CollectionConsumer} from '../context/CollectionContext';
import {hideContextMenu} from '../helpers/domHelpers';

const HotkeyApp = () => {
    const [sidebarLength, updateSidebarLength] = useState(null)

    return (
        <CollectionConsumer> 
        {
            
            ({menuItems, showSidebars, updateShowSidebars}) => {
                const toggleLeftSidebar = () => {
                    let sidebar = document.querySelector('.sidebar');
                    // both sidebars are on
                    // switch left sidebar off
                    if (showSidebars[0] === true && showSidebars[1] == true) {
                        sidebar.style.display = 'none';
                        updateShowSidebars([false, true])
                    // left sidebar is off
                    // switch it on
                    } else if (showSidebars[0] === false && showSidebars[1] === true) {
                        // sidebar.style.width = sidebarLength;
                        sidebar.style.display = 'inline';
                        updateShowSidebars([true, true])
                    } else {
                        // don't react
                    }
                }

                const openSidebarHalfFullWidth = () => {
                    let sidebar = document.querySelector('.sidebar');
                    const windowWidth = document.body.offsetWidth;
                    console.log({windowWidth})                    
                    sidebar.style.width = `${windowWidth}px`
                }
            
                const toggleRightSidebar = () => {
                    let sidebar = document.querySelector('.sidebar');
                    let rightSidebar = document.querySelector('.right-sidebar');
                    // both sidebars are on
                    // switch right sidebar off
                    if (showSidebars[0] === true && showSidebars[1] == true) {
                        updateSidebarLength(sidebar.clientWidth)
                        rightSidebar.style.display = 'none';
                        updateShowSidebars([true, false])
                        sidebar.style.width = '100%';
                    // right sidebar is off
                    // switch it on
                    } else if (showSidebars[0] === true && showSidebars[1] === false) {
                        console.log("sidebarLength", sidebarLength);
                        sidebar.style.width = `${sidebarLength}px`;
                        rightSidebar.style.display = 'inline';
                        updateShowSidebars([true, true]);
                    } else {
                        // don't react
                    }
                }

                let hotkeys = menuItems.map(({hotkeyJs}) => hotkeyJs)
                hotkeys = [...hotkeys, 'alt+v', 'ctrl+b', 'ctrl+alt+h', 'esc']
                hotkeys = hotkeys.join(',')
                
                const onKeyDown = (keyName, e, handle) => {
                    // TODO: add toggle on alt+c and alt+v
                    // TODO and esc to close context menu
                    switch(keyName) {
                        case 'alt+v':
                            toggleRightSidebar();
                            e.preventDefault();
                            break;
                        case 'ctrl+b': 
                            toggleLeftSidebar();
                            e.preventDefault();
                            break;
                        case 'ctrl+alt+h':
                            openSidebarHalfFullWidth();
                            break;
                        case 'esc':
                            hideContextMenu();
                            e.preventDefault();
                            break;
                        default:
                            menuItems.map(it => {
                                if (keyName === it.hotkeyJs) {
                                    e.preventDefault();
                                    it.func();
                                }
                            })
                    }
                    
                }

                
                return (
                    <Hotkeys 
                        keyName={hotkeys}
                        onKeyDown={(keyName, e, handle) => onKeyDown(keyName, e, handle)}
                    >
                    </Hotkeys>
                )
            }
        
        }
         </CollectionConsumer> 
    );
}

export default HotkeyApp;
