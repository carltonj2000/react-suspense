import React from "react";
import ErrorBoundary from "./error-boundary";
// normal load
//const PokemonDetail = React.lazy(() => import("./pokemon-detail"));
// simulated failure
//const PokemonDetail = React.lazy(() => Promise.reject());
// simulated pending
// const PokemonDetail = React.lazy(
//   () => new Promise((resolve) => setTimeout(resolve, 1000))
// );
// simulated resolved with module that has a default export "render" function
const PokemonDetail = React.lazy(
  () =>
    new Promise((resolve) =>
      setTimeout(() => resolve({ default: () => "hi" }), 1000)
    )
);

export default function App() {
  return (
    <div>
      <h1>Pokedex</h1>
      <ErrorBoundary fallback="Loading pokemon failed!">
        {/* <ErrorBoundary> */}
        <React.Suspense fallback="Loading pokemon...">
          <PokemonDetail />
        </React.Suspense>
      </ErrorBoundary>
    </div>
  );
}
