import React from "react";
import { PokemonContext } from "./pokemon";
import { DelaySpinner } from "./ui";

export default function PokemonDetail() {
  const { resource, isStale } = React.useContext(PokemonContext);
  const pokemon = resource.read();
  return (
    <div>
      {pokemon.name}
      {isStale && <DelaySpinner />}
    </div>
  );
}
