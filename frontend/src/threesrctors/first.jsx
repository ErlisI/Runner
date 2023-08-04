import { useLoaderData } from "react-router-dom";

import Table from "./Table";

export default function First() {
  const { tables } = useLoaderData();

  const rendernotes = tables.map((table) => (
    <Table table={table} key={table.id} />
  ));

  return (
    <div className="flex-no-wrap relative flex flex-col h-screen items-center justify-between py-15 shadow-md shadow-black/5">
      <div className="flex justify-start items-start flex-grow">
        <div className="mx-auto mb-auto">{rendernotes}</div>
      </div>
      <button className="bg-white hover:bg-red-600 hover:border-red-600 hover:text-white text-red-600 font-bold py-1 px-6 mb-4 rounded-full border border-red-600">
        Add table
      </button>
    </div>
  );
}
