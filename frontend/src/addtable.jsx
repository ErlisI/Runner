import { Form, redirect, useActionData,Link } from "react-router-dom";
export async function action({ request, }) {
  let formData = await request.formData();
  let jobData = Object.fromEntries(formData);
    const response = await fetch(`http://localhost:4000/api/restaurant/rTables`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jobData),
    });
    if (response.ok) {
      return redirect("/user");
    }
    const { errors } = await response.json();
    return errors;
  
} 

function AddJob() {
  const errors = useActionData();

  return (
    <Form method="post" className="selection:bg-blue-200 flex flex-col gap-2">
      {errors && <div className="text-red-300">{errors}</div>}
      <fieldset className="flex flex-col">
        <label htmlFor="tableNum">Table Number</label>
        <input
          type="number"
          name="tableNum"
          id="tableNum"
          className="border-4 focus:outline-none p-2"
        />
      </fieldset>
      
      <Link to="/user"><button className="bg-red-500 text-white transition mt-4 py-10 px-10  cursor-pointer">cancel</button></Link>
    <input
        className="bg-blue-500 hover:bg-blue-600 text-white transition mt-4 py-2 cursor-pointer "
        type="submit"
      ></input>
    </Form>
    
  );
}

export default AddJob;