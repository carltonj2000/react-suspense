import React from "react";
import ErrorBoundary from "./error-boundary";
import { fetchPokemon, fetchPokemonCollection, suspensify } from "./api";
const PokemonDetail = React.lazy(() => import("./pokemon-detail"));

const initialPokemon = suspensify(fetchPokemon(1));
const initialCollection = suspensify(fetchPokemonCollection());

export default function App() {
  const [pokemonResource, pokemonResourceSet] = React.useState(initialPokemon);
  const deferredPokemonResource = React.unstable_useDeferredValue(
    pokemonResource,
    { timeoutMs: 3000 }
  );
  const pokemonIsPending = deferredPokemonResource !== pokemonResource;
  const [startTransition] = React.unstable_useTransition();
  return (
    <div>
      <h1>Pokedex</h1>
      <React.unstable_SuspenseList revealOrder="forwards" tail="collapsed">
        <React.Suspense fallback={<div>Fetching Pokemon Stats ...</div>}>
          <ErrorBoundary fallback="Loading pokemon failed!">
            <PokemonDetail
              resource={deferredPokemonResource}
              isStale={pokemonIsPending}
            />
            <div>
              <button
                type="button"
                disabled={pokemonIsPending}
                onClick={() =>
                  startTransition(() =>
                    pokemonResourceSet(
                      suspensify(
                        fetchPokemon(deferredPokemonResource.read().id + 1)
                      )
                    )
                  )
                }
              >
                Next
              </button>
            </div>
          </ErrorBoundary>
        </React.Suspense>
        <React.Suspense fallback={<div>Fetching Pokemon Collection ...</div>}>
          <ErrorBoundary fallback="Loading pokemon failed!">
            <PokemonCollection
              onClick={(id) =>
                startTransition(() =>
                  pokemonResourceSet(suspensify(fetchPokemon(id)))
                )
              }
            />
          </ErrorBoundary>
        </React.Suspense>
      </React.unstable_SuspenseList>
    </div>
  );
}

function PokemonCollection({ onClick }) {
  return (
    <div>
      <ul>
        {initialCollection.read().results.map((pokemon) => (
          <li key={pokemon.name}>
            <button
              type="button"
              onClick={() => onClick(pokemon.url.split("/")[6])}
            >
              {pokemon.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
