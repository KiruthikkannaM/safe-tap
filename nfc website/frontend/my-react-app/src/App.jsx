import {BrowserRouter,Route,Routes,Link,useNavigate} from "react-router-dom";
import { useState,useEffect } from 'react'
import './styles/App.css'
import './Footer'
import Footer from './Footer'
import Emergency from "./emergency";
import Lost from "./lost";
import MainButtons from "./mainButtons";
function App() {
  return(
    <BrowserRouter> 
      <div className="mainPage">
        <MainButtons/>
        <Routes>
          <Route path="/lost" element={<Lost/>}/>
          <Route path="/emergency" element={<Emergency/>}/>
        </Routes>
        <Footer/>
      </div>    
    </BrowserRouter>

  )
}




export default App;
