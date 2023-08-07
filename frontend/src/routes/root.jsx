// import React from 'react';
import { useEffect, useContext, useState } from "react";
import {
  useNavigation,
  useLoaderData,
  Form,
} from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import First from "../threesrctors/first";
import Second from "../threesrctors/second";
import Third from "../threesrctors/third";

// eslint-disable-next-line no-unused-vars, react-refresh/only-export-components
export async function loader({ request }) {
  const response = await fetch("/api/auth/current_user");
  const tablesrespond = await fetch("/api/restaurant/rTables");
  const foodCategoriesRespond = await fetch("/api/restaurant/foodCategories");


  const fCategories = await foodCategoriesRespond.json();
  const tables = await tablesrespond.json();
  if (response.ok) {
    const { user } = await response.json();
    return { currentUser: user, tables, fCategories };
  }
  return { currentUser: null };
}


function Root() {
  const { currentUser } = useLoaderData();
  const { setCurrentUser } = useContext(AuthContext);
  const navigation = useNavigation();
  ///////////////////////////////////////////////////////
  const [selectedTableId, setSelectedTableId] = useState(null);
  const [partyOrderId, setPartyOrderId] = useState(null);
  const [partyOrders, setPartyOrders] = useState(null);
  const [partyTotal, setPartyTotal] = useState(0);
  
  



  const handleTableClick = (tableId) => {
    setSelectedTableId(tableId);
  };

  /////////////////////////////////////////////////////

  useEffect(() => {
    setCurrentUser(currentUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const handleLogout = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/auth/logout", {
      method: "DELETE",
    });
    if (response.ok) {
      setCurrentUser(null);
      navigation.navigate("/login");
    }
  };
  /////////////////////////////////////////////// Nav bar stuff/////////////////

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
  })();

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
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

  
  const handleGetOrder = async () => {
    try {
      const response = await fetch(`/api/restaurant/partyOrders/${selectedTableId}`);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const partyOrder = await response.json();
      if (partyOrder && partyOrder.length > 0) {
        setPartyOrderId(partyOrder[0].id);
        setPartyTotal(partyOrder[0].Total);
        
        setPartyOrders(partyOrder[0].Food.map(food => ({
          price: food.price,
          name: food.name,
          quantity: food.Order_Food.Quantity,
        })))
        
      } else {
        console.log("No party order found for the specified table.");
        return null;
      }
    } catch (error) {
      console.error("Error fetching party orders:", error);
      return null;
    }
  };

 

  return (
    <div>
       <nav className="flex-no-wrap relative flex w-full items-center justify-between bg-[#f1f1f1] shadow-md shadow-black/5 ">
        <img
          className="h-40 mx-10"
          src="/logo.png"
          alt="Runner Logo"
        ></img>
        <div>
          <h2 className="text-5xl">{currentUser.name}</h2> 
        </div>

        <div className="flex flex-col items-center justify-center mx-10 text-lg">
          
          <Form onSubmit={handleLogout}>
            <button className="bg-white hover:bg-red-600 hover:border-red-600 hover:text-white text-red-600 font-bold py-1 px-6 mt-4 rounded-full border border-red-600">
              Logout
            </button>
          </Form>
          <div className="mt-4">{realTime.toLocaleString()}</div>
        </div>
      </nav>

      <div className="grid grid-cols-6 gap-4 m-4 ">
        <div className="w-auto p-2 rounded col-span-1">
          <h1 className="text-2xl text-center mt-2">Tables</h1>
          <hr className="mt-4 mb-10 w-full border-solid border-t-2 border-gray-300" />
          <First handleGetOrder={handleGetOrder} onTableClick={handleTableClick}/>
        </div>
        <div className="w-auto p-2 rounded col-span-4">
          <h1 className="text-2xl text-center mt-2">Food Categories</h1>
          <hr className="mt-4 mb-10 w-full border-solid border-t-2 border-gray-300" />
          <Second selectedTableId={selectedTableId} partyOrderId={partyOrderId} />
        </div>
        <div className="w-auto p-2 rounded col-span-1">
          <div className="grid grid-cols-3 mt-4">
            <h1 className="mx-auto col-span-1">Item</h1>
            <h1 className="mx-auto col-span-1">Quantity</h1>
            <h1 className="mx-auto col-span-1">Price</h1>
          </div>
          <hr className="mt-4 mb-10 w-full border-solid border-t-2 border-gray-300" />
          <Third partyOrders={partyOrders} partyTotal={partyTotal}/>
        </div>
      </div>
    </div>
  );
}

export default Root;
