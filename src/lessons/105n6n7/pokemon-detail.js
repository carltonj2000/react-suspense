import React from "react";

import { fetchPokemon, suspensify } from "./api";

const initialPokemon = suspensify(fetchPokemon(1));

export default function PokemonDetail() {
  const [pokemonResource, pokemonResourceSet] = React.useState(initialPokemon);
  const pokemon = pokemonResource.read();

  return (
    <div>
      {pokemon.name}{" "}
      <button
        type="button"
        onClick={() =>
          pokemonResourceSet(suspensify(fetchPokemon(pokemon.id + 1)))
        }
      >
        Next
      </button>
    </div>
  );
}
