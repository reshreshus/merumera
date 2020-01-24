import React, {useEffect} from 'react'
import './styles/main.scss'
import {Switch, Route} from 'react-router-dom';

import Editor from './pages/Editor';
import ShowDeck from './pages/ShowDeck';
import RepeatCard from './pages/RepeatCard';
import Sidebar from './components/Sidebar/Sidebar';


export default function App() {

  useEffect(() => {
    document.querySelectorAll('.resizer').forEach(e=>{
      // setting default widths
      // e.previousElementSibling.style.width=
      // e.nextElementSibling.style.width=
      // e.parentNode.offsetWidth/2-e.offsetWidth/2+'px';

      e.onmousedown=()=>{
        e.parentNode.onmousemove=ev=>{
          e.previousElementSibling.style.width=
          ev.clientX-e.offsetWidth/2+'px';
          e.nextElementSibling.style.width=
          e.parentNode.offsetWidth-ev.clientX-e.offsetWidth/2+'px';
        };
      };
      e.parentNode.onmouseup=
      ()=>{e.parentNode.onmousemove=undefined};
    });
  }, [])

  
  return (
    <div className="app">
      <Sidebar />
      <div className="resizer"/>
        <Switch>
          <Route exact path="/" component={() =>
            (<Editor card={{'deckTitle':'English', 'templateTitle': 'Basic'}}/>)}
            />
          <Route exact path="/repeat" component={RepeatCard}/>
          <Route exact path="/show-deck" component={ShowDeck} />
        </Switch>
    </div>
  )
}