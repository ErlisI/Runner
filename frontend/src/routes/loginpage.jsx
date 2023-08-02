import LoginForm from "../assets/LoginForm";

export default function Login() {
  return (
    <div className="flex flex-col items-center h-screen bg-[#f1f1f1]">
      <img
        className="mt-8"
        src="https://cdn.discordapp.com/attachments/669304891662925855/1133077409630007326/image.png"
        alt="Runner Logo"
      />
      <div className="mt-4 w-96">
        <LoginForm />
      </div>
    </div>
  );
}
