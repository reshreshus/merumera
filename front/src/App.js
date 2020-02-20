import React, {useEffect} from 'react'
import './styles/main.scss'
import {Switch, Route} from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';

import Home from './pages/Home';
import Edit from './pages/Edit';
import ShowDeck from './pages/ShowDeck';


export default function App() {

  useEffect(() => {
    document.querySelectorAll('.resizer').forEach(e=>{
      // setting default widths
      e.previousElementSibling.style.width=
      // e.nextElementSibling.style.width=
      // e.parentNode.offsetWidth/3-e.offsetWidth/3+'px';
      '600px';
      e.style.height = e.previousElementSibling.style.height;

      e.onmousedown=()=>{
        console.log("resizer moving?")
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
  })
  
  
  return (
    <div className="app">
      {/* <div className={`${'hide'}`}></div> */}
      <Sidebar />
      <div className="resizer"/>
      <div className="right-sidebar">
        <Switch>
          <Route exact path="/edit/" component={() =>
            (<Edit card={{'deckTitle':'English', 'templateTitle': 'Basic'}}/>)}
            />
          <Route exact path="/show-deck/" component={ShowDeck} />
          <Route exact path="/" component={Home} />
        </Switch>
      </div>
    </div>
  )
}