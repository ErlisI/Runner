//import { useState } from 'react'
import Navbar from "./navbar";
import First from "./first";
// import Second from "./Secondpart";
import './App.css';

function App() {


  return (
    <>
      <Navbar />
      <div className="grid grid-cols-5 gap-4 m-4 h-screen">
        <div className="border p-2 rounded col-span-1"><First /></div>
        <div className="border p-4 rounded col-span-3"></div>
        <div className="border p-2 rounded col-span-1"></div>


      {/* <Second />
            <Third /> 
        */}
    </div >
    </>
  )
}

export default App
