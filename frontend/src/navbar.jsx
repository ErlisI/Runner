import { useState, useEffect } from 'react';
export default function Navbar() {
  const [realTime, setRealTime] = useState(Date.now());
  function getRealTime() {
    const currentTime = Date.now();
    return (Math.floor(currentTime / 1000) + 1) * 1000 - currentTime;
  }

  (async function () {
    let reduceTime = 0;
    // eslint-disable-next-line no-constant-condition
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
      // eslint-disable-next-line no-constant-condition
      while (true) {
        reduceTime = getRealTime();
        setRealTime(new Date());
        await sleep(reduceTime);
      }
    })();
  }, []);

  return (
    <nav className="flex-no-wrap relative flex w-full items-center justify-between bg-[#f1f1f1] py-15 shadow-md shadow-black/5 "
    >
      <img className="h-40 mx-10" src="https://cdn.discordapp.com/attachments/669304891662925855/1133077409630007326/image.png" alt="Runner Logo"
      ></img>

      <div className="flex flex-col items-center justify-center mx-10 text-lg">
        <button className="bg-white hover:bg-red-600 hover:border-red-600 hover:text-white text-red-600 font-bold py-1 px-6 mt-4 rounded-full border border-red-600">
          Login
        </button>

        <div className="mt-4">
          {realTime.toLocaleString()}
        </div>
      </div>
    </nav>
  )
}