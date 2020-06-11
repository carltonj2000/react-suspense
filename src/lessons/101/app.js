import React from "react";
//import PokemonDetail from "./pokemon-detail";
const PokemonDetail = React.lazy(() => import("./pokemon-detail"));

export default function App() {
  return (
    <div>
      <React.Suspense fallback="Loading pokemon...">
        <PokemonDetail />
      </React.Suspense>
    </div>
  );
}
