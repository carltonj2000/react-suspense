import React from "react";

import { fetchPokemon, suspensify } from "./api";

const initialPokemon = suspensify(fetchPokemon(1));

export default function PokemonDetail() {
  const [pokemonResource, pokemonResourceSet] = React.useState(initialPokemon);
  const pokemon = pokemonResource.read();
  const [startTransition, isPending] = React.unstable_useTransition({
    timeoutMs: 2000,
  });
  return (
    <div>
      <button
        type="button"
        disabled={isPending}
        onClick={() =>
          startTransition(() =>
            pokemonResourceSet(suspensify(fetchPokemon(pokemon.id + 1)))
          )
        }
      >
        Next
      </button>{" "}
      {pokemon.name} {isPending && <DelaySpinner />}
    </div>
  );
}

function DelaySpinner() {
  return (
    <span role="img" aria-label="spinner" className="DelaySpinner">
      <style>{`
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
      `}</style>
      🌀
    </span>
  );
}
