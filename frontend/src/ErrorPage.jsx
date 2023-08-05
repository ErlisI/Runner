import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="h-screen bg-cover bg-no-repeat bg-[url('/src/assets/desert.jpg')] text-center" id="error-page">
      <h1 className="text-5xl">I Know You Are Looking For Water, But This Is A Desert</h1>
      <p>(404 This Is Not Somewhere You Should Be...)</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}