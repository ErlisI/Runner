import { Form, redirect, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request }) {
  const formData = await request.formData();
  const response = await fetch("http://localhost:4000/api/auth/signup", {
    method: "POST",
    body: JSON.stringify(formData),
  });
  if (!response.ok) {
    // invalid submission, remain on signup page
    return null;
  }
  return redirect("/user");
}


export default function SignupForm() {

    const { currentUser } = useContext(AuthContext);
    if (currentUser) {
      return <Navigate to="/user" />;
    }
  

  return (
    <div className="flex flex-col items-center h-screen bg-[#f1f1f1]">
      <img
        className="mt-8"
        src="https://cdn.discordapp.com/attachments/669304891662925855/1133077409630007326/image.png"
        alt="Runner Logo"
      />
      <div className="mt-4 w-96"></div>
    <div>
    <Form method="post" className=" selection:bg-blue-200 w-96 flex flex-col gap-2 text-center ">
        <fieldset className="flex flex-col ">
          <label htmlFor="username">Username</label>
          <input
            id="Username"
            className="bg-white border-4 focus:outline-none p-2"
          />
        </fieldset>
        <fieldset className="flex flex-col  ">
          <label htmlFor="rname">Restauran Name</label>
          <input
            id="Rname"
            className="bg-white border-4 focus:outline-none p-2"
          />
        </fieldset>
        <fieldset className="flex flex-col  ">
          <label htmlFor="email">Email</label>
          <input
            id="Rname"
            className="bg-white border-4 focus:outline-none p-2"
          />
        </fieldset>
        <fieldset className="flex flex-col  ">
          <label htmlFor="title">Password</label>
          <input
            type="password"
            id="Username"
            className="bg-white border-4 focus:outline-none p-2"
          />
        </fieldset>
        {/* <fieldset className="flex flex-col  ">
          <label htmlFor="title">Re-enter Password</label>
          <input
            type="password"
            id="Username"
            className="bg-white border-4 focus:outline-none p-2"
          />
        </fieldset> */}
        <button className="bg-gray-300 hover:bg-gray-400 text-white font-bold py-2 px-4 mt-4 rounded-full">
          Sign Up
        </button>
      </Form>
    </div>
    </div>
  )
}