import React from "react";

import { fetchPokemon, suspensify } from "./api";

const initialPokemon = suspensify(fetchPokemon(1));

export default function PokemonDetail() {
  const [pokemonResource, pokemonResourceSet] = React.useState(initialPokemon);
  const pokemon = pokemonResource.read();
  const [startTransition] = React.unstable_useTransition({ timeoutMs: 1000 });
  return (
    <div>
      <button
        type="button"
        onClick={() =>
          startTransition(() =>
            pokemonResourceSet(suspensify(fetchPokemon(pokemon.id + 1)))
          )
        }
      >
        Next
      </button>{" "}
      {pokemon.name}
    </div>
  );
}
