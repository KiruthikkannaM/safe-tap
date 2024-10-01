import React from "react";
import {useNavigate} from "react-router-dom";
import './styles/buttons.css'


function MainButtons(){
    const navi=useNavigate();
  
    const tolost=()=>{
      navi('/lost');
    }
    const toemergency=()=>{
      navi('/emergency');
    }
    return(
      <div>
        <button class="button_style" onClick={tolost}>Lost</button>
        <button class="button_style" onClick={toemergency}>Emergency</button>
      </div>
    )
  
}

export default MainButtons;