// import React from 'react';
import { useEffect, useContext, useState } from "react";
import { useNavigation, useLoaderData, Form } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import First from "../threesrctors/first";
import Second from "../threesrctors/second";
import Third from "../threesrctors/third";

// eslint-disable-next-line no-unused-vars, react-refresh/only-export-components
export async function loader({ request }) {
  const response = await fetch("/api/auth/current_user");
  
  if (response.ok) {
    const { user } = await response.json();
    return { currentUser: user };
  }
  return { currentUser: null };
}

function Root() {
  const { currentUser } = useLoaderData();
  const { setCurrentUser } = useContext(AuthContext);
  const navigation = useNavigation();
  const [selectedTableId, setSelectedTableId] = useState(null);
  const [partyOrderId, setPartyOrderId] = useState(null);
  const [orderedFood, setOrderedFood] = useState(null);
  const [partyTotal, setPartyTotal] = useState(0);
  const [isOrderStarted, setIsOrderStarted] = useState(false);
  const [tableHasPartyOrder, setTableHasPartyOrder] = useState(false);


  const handleTableClick = (tableId) => {
    setSelectedTableId(tableId);
  };


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
      const response = await fetch(
        `/api/restaurant/partyOrders/${selectedTableId}`
      );

      if (!response.ok) {
        setTableHasPartyOrder(false);
        setIsOrderStarted(false);
        throw new Error("Network response was not ok");
      }

      const partyOrder = await response.json();
      console.log(partyOrder);
      if (partyOrder) {
        setPartyOrderId(partyOrder.id);
        setPartyTotal(partyOrder.Total);
        setIsOrderStarted(partyOrder.open);
        setOrderedFood(
          partyOrder.Food.map((food) => ({
            price: food.price,
            name: food.name,
            quantity: food.Order_Food.Quantity,
          }))
        );
        
        if(partyOrder.open){
          handleHasTablePartyOrder();
        }

      } else {
        console.log("No party order found for the specified table.");
        return null;
      }
    } catch (error) {
      console.error("Error fetching party orders:", error);
      return null;
    }
  };

  const handleStartOrder = () => {
    const apiEndpoint = `/api/restaurant/rTables/${selectedTableId}/partyOrders`;
  
    fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.open) {
          handleOrderToggleStart();
          handleHasTablePartyOrder();
        } else {
          console.log("Order is not open.");
        }
      })
      .catch((error) => {
        console.error("Error during the POST request:", error);
      });
  };  

  const handleCloseOrder = () => {

    const apiEndpoint = `/api/restaurant/rTables/${selectedTableId}/partyOrders/${partyOrderId}/close`;

    fetch(apiEndpoint, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        setIsOrderStarted(false);
        setTableHasPartyOrder(false);
      })
      .catch((error) => {
        console.error("Error during the PATCH request:", error);
      });
  };

  useEffect(() => {
    handleGetOrder();
  }, [selectedTableId]);


//to open and close party orders
  const handleOrderToggleStart = () => {
    setIsOrderStarted(true);
    handleStartOrder();
  };

  const handleOrderToggleClose = () => {
    setIsOrderStarted(false);
    handleCloseOrder();
  };

  //present the food on real time with the updated price and total price
  const handleFoodAdded = (newFoods) => {
    const updatedFood = orderedFood.map(existingFood => {
      const matchingNewFood = newFoods.find(newFood => newFood.name === existingFood.name);
      if (matchingNewFood) {
        return { ...existingFood, quantity: existingFood.quantity + matchingNewFood.quantity };
      }
      return existingFood;
    });
  
    newFoods.forEach(newFood => {
      const isExistingFood = orderedFood.some(existingFood => existingFood.name === newFood.name);
      if (!isExistingFood) {
        updatedFood.push({ ...newFood });
      }
    });
  
    setOrderedFood(updatedFood);
  
    const newPartyTotal = updatedFood.reduce((total, food) => total + (food.price * food.quantity), 0);
    setPartyTotal(newPartyTotal);
  };
  
  const handleHasTablePartyOrder = () => {
    setTableHasPartyOrder(true);
  }

  return (
    <div>
      <nav className="flex-no-wrap relative flex w-full items-center justify-between bg-[#f1f1f1] shadow-md shadow-black/5 ">
        <img className="h-40 mx-10" src="/logo.png" alt="Runner Logo"></img>
        <div>
          <h2 className="text-5xl text-red-600">{currentUser.name}</h2>
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
          <First
            onTableClick={handleTableClick}
          />
        </div>
        <div className="w-auto p-2 rounded col-span-4">
          <h1 className="text-2xl text-center mt-2">Food Categories</h1>
          <hr className="mt-4 mb-10 w-full border-solid border-t-2 border-gray-300" />
          <Second
            partyOrderId={partyOrderId}
            isOrderStarted={isOrderStarted}
            handleOrderToggle={handleOrderToggleStart}
            handleFoodAdded={handleFoodAdded}
            tableHasPartyOrder={tableHasPartyOrder}
          />
        </div>
        <div className="w-auto p-2 rounded col-span-1">
          <div className="grid grid-cols-3 mt-4">
            <h1 className="mx-auto col-span-1">Item</h1>
            <h1 className="mx-auto col-span-1">Quantity</h1>
            <h1 className="mx-auto col-span-1">Price</h1>
          </div>
          <hr className="mt-4 mb-10 w-full border-solid border-t-2 border-gray-300" />
          <Third
            orderedFood={orderedFood}
            partyTotal={partyTotal}
            isOrderStarted={isOrderStarted}
            handleOrderToggleClose={handleOrderToggleClose}
            tableHasPartyOrder={tableHasPartyOrder}
          />
        </div>
      </div>
    </div>
  );
}

export default Root;
