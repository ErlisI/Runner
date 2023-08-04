import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import Table from "./Table";

export default function First() {
  const { tables } = useLoaderData();
  // eslint-disable-next-line no-unused-vars
  const [tableData, setTableData] = useState({});
  const [sortedTables, setSortedTables] = useState([]);
  useEffect(() => {
    
    const handleAddTable = () => {
      const apiEndpoint = '/api/restaurant/rTables';
    
      fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tableData),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log('Response from server:', data);
    
          setSortedTables(prevTables => [...prevTables, data]);
    
          setTableData({});
        })
        .catch(error => {
          console.error('Error during the POST request:', error);
        });
    };
    

    const addButton = document.getElementById('addTableButton');
    addButton.addEventListener('click', handleAddTable);

    return () => {
      addButton.removeEventListener('click', handleAddTable);
    };
  }, [tableData]);


  useEffect(() => {
    // Sort the tables based on their tableNum in ascending order
    const sortedTables = [...tables].sort((a, b) => a.tableNum - b.tableNum);
    setSortedTables(sortedTables);
  }, [tables]);


  const handleDeleteTable = (tableId) => {
    const apiEndpoint = `/api/restaurant/rTables/${tableId}`;
  
    fetch(apiEndpoint, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        setSortedTables(prevTables => prevTables.filter(table => table.id !== tableId));
      })
      .catch(error => {
        console.error('Error during the DELETE request:', error);
      });
  };
  

  const renderTables = sortedTables.map((table) => (
    <Table table={table} key={table.id} onDelete={handleDeleteTable} />
  ));

  return (
    <div className="flex flex-col h-[80vh] items-center justify-center py-15 shadow-md shadow-black/5">
      <div className="flex justify-center items-start flex-grow">
        <div className="mx-auto mb-auto overflow-y-auto">{renderTables}</div>
      </div>
      <button id="addTableButton" className="bg-white hover:bg-red-600 hover:border-red-600 hover:text-white text-red-600 font-bold py-1 px-6 mb-4 rounded-full border border-red-600">
        Add table
      </button>
    </div>
  );
}
