import { Form, useNavigate,redirect, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request }) {
  const formData = await request.formData();

  console.log(Object.fromEntries(formData));
  const response = await fetch("http://localhost:4000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Object.fromEntries(formData)),
  });

  if (!response.ok) {
    // invalid credentials, remain on login page
    return null;
  }

  return redirect("/user");
}



export default function LoginForm() {
  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Navigate to="/user" />;
  }

  const handleClick = (e) => {
    navigate("/signup");
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
      <Form method="post" className=" flex flex-col gap-2 w-96 text-center ">
        <fieldset className="flex flex-col  ">
          <label htmlFor="title">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="bg-white border-4 focus:outline-none p-2"
          />
        </fieldset>

        <fieldset className="flex flex-col  ">
          <label htmlFor="title">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="bg-white border-4 focus:outline-none p-2"
          />
        </fieldset>
        <button className="bg-gray-300 hover:bg-gray-400 text-white font-bold py-2 px-4 mt-4 rounded-full">
          Login
        </button>
      </Form>
      <p className="mt-4 text-center"> Dont have an account yet?   <button className="text-red-500" onClick={handleClick}>Sign Up</button> </p>
    </div>
    </div>

  )
}