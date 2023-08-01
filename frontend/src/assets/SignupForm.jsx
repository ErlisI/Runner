export default function SignupForm(){

    return(
        <div>
            <div className="text-center text-4xl">Welcome</div>
        <form className=" selection:bg-blue-200 flex flex-col gap-2 text-center ">
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
          <fieldset className="flex flex-col  ">
            <label htmlFor="title">Re-enter Password</label>
            <input
              type="password"
              id="Username"
              className="bg-white border-4 focus:outline-none p-2"
            />
          </fieldset>
          <button class="bg-gray-300 hover:bg-gray-400 text-white font-bold py-2 px-4 mt-4 rounded-full">
            Sign Up
          </button>
        </form>

        

        </div>
    )
}