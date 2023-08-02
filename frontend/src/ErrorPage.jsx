import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Hey There!</h1>
      <p>I know you are looking for water, but this is a desert</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}