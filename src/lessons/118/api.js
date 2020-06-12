import sleep from "sleep-promise";

export function suspensify(promise) {
  let status = "pending";
  let result;
  let suspender = promise.then(
    (response) => {
      status = "success";
      result = response;
    },
    (error) => {
      status = "error";
      result = error;
    }
  );
  return {
    read() {
      if (status === "pending") throw suspender; // pending && thrown so read fails
      if (status === "error") throw result; // rejected
      if (status === "success") return result; // resolve
    },
  };
}

export function fetchPokemon(id) {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((res) => res.json())
    .then(sleep(1500));
}

export function fetchPokemonCollection() {
  return fetch(`https://pokeapi.co/api/v2/pokemon/`)
    .then((res) => res.json())
    .then(sleep(3000));
}
