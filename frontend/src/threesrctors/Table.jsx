export default function Table({ table }) {
  return (
    <div className="flex justify-center items-center">
      <button className="bg-gray-300 hover:bg-gray-400 py-2 my-1 px-10 rounded ">
        Table Nr {table.tableNum}
      </button>
    </div>
  );
}
