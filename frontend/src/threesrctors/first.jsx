import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import Table from "./Table";

export default function First() {
  const { tables } = useLoaderData();
  const [tableData, setTableData] = useState({});
  const [sortedTables, setSortedTables] = useState([]);

  useEffect(() => {
    // Function to handle the POST request when the button is clicked
    const handleAddTable = () => {
      // Replace 'your_api_endpoint' with the actual API endpoint URL
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
          // Handle the response from the server (if needed)
          console.log('Response from server:', data);

          // Refresh the page after successful POST request
          window.location.reload();
        })
        .catch(error => {
          // Handle any errors that occurred during the request
          console.error('Error during the POST request:', error);
        });
    };

    // Attach the event listener to the button when the component is mounted
    const addButton = document.getElementById('addTableButton');
    addButton.addEventListener('click', handleAddTable);

    // Cleanup: remove the event listener when the component is unmounted
    return () => {
      addButton.removeEventListener('click', handleAddTable);
    };
  }, [tableData]); // Make sure to add any dependencies that should trigger re-running this effect

  useEffect(() => {
    // Sort the tables based on their tableNum in ascending order
    const sortedTables = [...tables].sort((a, b) => a.tableNum - b.tableNum);
    setSortedTables(sortedTables);
  }, [tables]);

  const renderTables = sortedTables.map((table) => (
    <Table table={table} key={table.id} />
  ));

  return (
    <div className="flex flex-col min-h-screen items-center justify-center py-15 shadow-md shadow-black/5">
  <div className="flex justify-center items-start flex-grow">
    <div className="mx-auto mb-auto overflow-y-auto">{renderTables}</div>
  </div>
  <button id="addTableButton" className="bg-white hover:bg-red-600 hover:border-red-600 hover:text-white text-red-600 font-bold py-1 px-6 mb-4 rounded-full border border-red-600">
    Add table
  </button>
</div>
  );
}
