import { useState,useEffect } from "react";
import Form from './SignupForm';
import SignUpModal from "./modal";

export default function LoginForm(){
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
      }
    
      const hideModal = () => {
        setIsModalVisible(false);
      }
    return(
        <div>
        <form className=" flex flex-col gap-2 text-center ">
            <fieldset className="flex flex-col  ">
            <label htmlFor="title">Username</label>
            <input
              id="Username"
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
          <button class="bg-gray-300 hover:bg-gray-400 text-white font-bold py-2 px-4 mt-4 rounded-full">
            Login
          </button>
        </form>
        <SignUpModal
        isVisible={isModalVisible}
        hideModal={hideModal}
      >
        <Form hModal={hideModal}  />
      </SignUpModal>

        <p className="mt-4 text-center"> Dont have an account yet? <button className="text-red-500" onClick={showModal}>Sign Up</button> </p> 

        </div>
    )
}