//import { useState } from 'react'

import Navbar from "./navbar";
import First from "./first";
// import Second from "./Secondpart";
import './App.css';

function App() {
  

  return (
    <>
    <Navbar />
    <div className="grid grid-cols-3 gap-4 p-4">
    <div className="border p-4 rounded"><First /></div>
    
    
    {/* <Second />
    <Third /> */}
    </div>
    </>
  )
}

export default App
