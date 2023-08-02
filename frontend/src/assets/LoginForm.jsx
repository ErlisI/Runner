import { useState } from "react";
import { Form, redirect, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Forms from './SignupForm';
import SignUpModal from "./modal";

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
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Navigate to="/user" />;
  }

  const showModal = () => {
    setIsModalVisible(true);
  }

  const hideModal = () => {
    setIsModalVisible(false);
  }

  return (
    <div>
      <Form method="post" className=" flex flex-col gap-2 text-center ">
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
      <SignUpModal
        isVisible={isModalVisible}
        hideModal={hideModal}
      >
        <Forms hModal={hideModal} />
      </SignUpModal>

      <p className="mt-4 text-center"> Dont have an account yet? <button className="text-red-500" onClick={showModal}>Sign Up</button> </p>

    </div>
  )
}