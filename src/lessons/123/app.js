import React from "react";
import ErrorBoundary from "./error-boundary";
import { fetchPokemon, fetchPokemonCollection, suspensify } from "./api";
import { List, DelaySpinner } from "./ui";
import { PokemonContext } from "./pokemon";

const PokemonDetail = React.lazy(() => import("./pokemon-detail"));

const initialPokemon = suspensify(fetchPokemon(1));
const initialCollection = suspensify(fetchPokemonCollection());

export default function App() {
  const [pokemonResource, pokemonResourceSet] = React.useState(initialPokemon);
  const [collectionResource, collectionResourceSet] = React.useState(
    initialCollection,
  );
  //const [pokemonState, pokemonStateSet] = React.useState();
  const deferredPokemonResource = React.unstable_useDeferredValue(
    pokemonResource,
    { timeoutMs: 3000 },
  );
  const pokemonIsPending = deferredPokemonResource !== pokemonResource;
  const [startTransition, isPending] = React.unstable_useTransition(
    { timeoutMs: 3000 },
  );

  const pokemonState = {
    resource: deferredPokemonResource,
    isStale: pokemonIsPending,
    setPokemon: (id) =>
      startTransition(() =>
        pokemonResourceSet(
          suspensify(fetchPokemon(id)),
        )
      ),
  };
  return (
    <div>
      <h1>Pokedex</h1>
      <PokemonContext.Provider value={pokemonState}>
        <React.unstable_SuspenseList revealOrder="forwards" tail="collapsed">
          <React.Suspense fallback={<div>Fetching Pokemon Stats ...</div>}>
            <ErrorBoundary fallback="Loading pokemon failed!">
              <PokemonDetail />
            </ErrorBoundary>
          </React.Suspense>
          <React.Suspense fallback={<div>Fetching Pokemon Collection ...</div>}>
            <ErrorBoundary fallback="Loading pokemon failed!">
              <div>
                <button
                  type="button"
                  disabled={pokemonIsPending}
                  onClick={() =>
                    startTransition(() =>
                      collectionResourceSet(
                        suspensify(
                          fetchPokemonCollection(collectionResource.read()),
                        ),
                      )
                    )}
                >
                  Next
                </button>
                {" "}
                {isPending && <DelaySpinner />}
              </div>
              <PokemonContext.Consumer>
                {({ setPokemon }) =>
                  <PokemonCollection
                    resource={collectionResource}
                    as="ul"
                    renderItem={(pokemon) => (
                      <li key={pokemon.name}>
                        <button
                          type="button"
                          disabled={isPending}
                          onClick={() => setPokemon(pokemon.id)}
                        >
                          {pokemon.name}
                        </button>
                      </li>
                    )}
                  />}
              </PokemonContext.Consumer>
            </ErrorBoundary>
          </React.Suspense>
        </React.unstable_SuspenseList>
      </PokemonContext.Provider>
    </div>
  );
}

function PokemonCollection(props) {
  return <List items={props.resource.read().results} {...props} />;
}
