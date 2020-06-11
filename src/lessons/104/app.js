import React from "react";
import ErrorBoundary from "./error-boundary";
const PokemonDetail = React.lazy(() => import("./pokemon-detail"));

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
