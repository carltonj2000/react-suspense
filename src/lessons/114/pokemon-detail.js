import React from "react";

import { DelaySpinner } from "./ui";

export default function PokemonDetail({ resource, isStale }) {
  const pokemon = resource.read();
  return (
    <div>
      {pokemon.name}
      {isStale && <DelaySpinner />}
    </div>
  );
}
