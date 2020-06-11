import React from "react";

import { fetchPokemon, suspensify } from "./api";

const initialPokemon = suspensify(fetchPokemon(1));

export default function PokemonDetail() {
  const [pokemonResource, pokemonResourceSet] = React.useState(initialPokemon);
  const [startTransition] = React.unstable_useTransition();
  const deferredPokemonResource = React.unstable_useDeferredValue(
    pokemonResource,
    { timeoutMs: 3000 },
  );
  const pokemon = deferredPokemonResource.read();
  const isPending = deferredPokemonResource !== pokemonResource;
  return (
    <div>
      <button
        type="button"
        disabled={isPending}
        onClick={() =>
          startTransition(() =>
            pokemonResourceSet(suspensify(fetchPokemon(pokemon.id + 1)))
          )}
      >
        Next
      </button>
      {" "}
      {pokemon.name}
      {isPending && <DelaySpinner />}
    </div>
  );
}

function DelaySpinner() {
  return (
    <span role="img" aria-label="spinner" className="DelaySpinner">
      <style>
        {`
        .DelaySpinner {
          animation: 0s linear 0.5s forwards makeVisible, rotation 1.5s infinite linear;
          display: inline-block;
          font-size: .7rem;
          visibility: hidden;
        }
        @keyframes makeVisible {
          to {
            visibility: visible;
          }
        }
        @keyframes rotation {
          from { transform: rotate(0deg) }
          to { transform: rotate(359deg) }
        }
      `}
      </style>
      🌀
    </span>
  );
}
