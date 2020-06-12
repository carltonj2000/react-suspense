import React from "react";
import ErrorBoundary from "./error-boundary";
import { fetchPokemon, suspensify } from "./api";
const PokemonDetail = React.lazy(() => import("./pokemon-detail"));

const initialPokemon = suspensify(fetchPokemon(1));

export default function App() {
  const [pokemonResource, pokemonResourceSet] = React.useState(initialPokemon);
  const deferredPokemonResource = React.unstable_useDeferredValue(
    pokemonResource,
    { timeoutMs: 3000 },
  );
  const pokemonIsPending = deferredPokemonResource !== pokemonResource;
  const [startTransition] = React.unstable_useTransition();
  return (
    <div>
      <h1>Pokedex</h1>
      <ErrorBoundary fallback="Loading pokemon failed!">
        <React.Suspense fallback="Loading pokemon...">
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
                      fetchPokemon(deferredPokemonResource.read().id + 1),
                    ),
                  )
                )}
            >
              Next
            </button>
          </div>
        </React.Suspense>
      </ErrorBoundary>
    </div>
  );
}
