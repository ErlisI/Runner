import {useLoaderData,Link } from "react-router-dom";
//import {Addtable} from "./addtable";
//import {MdOutlineTableBar} from "react-icons/md";
import Table from "./Table";

export async function loader(){
const tablesrespond= await fetch(`http://localhost:4000/api/restaurant/rTables`);
const tables=await tablesrespond.json();
return {tables};
}

export default function First() {
    const {tables} = useLoaderData()
    // eslint-disable-next-line react/jsx-key
    const rendernotes= tables.map((table)=> <Table table= {table} key={table.id}/>)
return (
<div>
    <nav className="flex-no-wrap relative flex w-full items-center justify-between  py-15 shadow-md shadow-black/5 ">
        <div className=" h-screen flex justify-start items-start">
           <ul> 
           <li>{rendernotes}</li>           
           </ul> 
        </div>
        <div className=" h-screen flex justify-end items-end">
        <div className="bg-blue-500" >
        <Link to="/User/addtable" className="btn btn-primary"> <button className="bg-red-400">
        Add table
        </button></Link>
        </div>
        </div>
    </nav>
</div>
    )
  }