import React, { useState, useEffect } from 'react';
export default function Navbar() {
    const [realTime, setRealTime] = useState(Date.now());
    function getRealTime() {
        const currentTime = Date.now();
        //console.log(new Date(Math.round(currentTime / 1000) * 1000), currentTime);
        return (Math.floor(currentTime / 1000) + 1) * 1000 - currentTime;
      }
      
      (async function () {
        let reduceTime = 0;
        while (true) {
          reduceTime = getRealTime();
          await sleep(reduceTime);
        }
      })()
      
      function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      useEffect(() => {
        (async function () {
          let reduceTime = 0;
          while (true) {
            reduceTime = getRealTime();
            setRealTime(new Date()); // Update state with the real-time value
            await sleep(reduceTime);
          }
        })();
      }, []);

    return (
    <nav className="flex-no-wrap relative flex w-full items-center justify-between bg-[#f1f1f1] py-15 shadow-md shadow-black/5 "
    >
        <img className="h-40 mx-10" src="https://cdn.discordapp.com/attachments/669304891662925855/1133077409630007326/image.png" alt="Runner Logo"
        ></img>

    <div className="mx-10 text-lg">
        {realTime.toLocaleString()} 
    </div>
    </nav>
    )
  }