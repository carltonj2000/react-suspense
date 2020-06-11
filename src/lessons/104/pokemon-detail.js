import React from "react";

function suspensifySimple(promise) {
  // comment out state you don't want to see
  throw promise; // pending an unresolved promise
  throw Error; // rejected
  return { name: "Bulbasaur" }; // resolve
}
function suspensify(promise) {
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
      console.log(status);
      if (status === "pending") throw suspender; // pending && thrown so read fails
      if (status === "error") throw result; // rejected
      if (status === "success") return result; // resolve
    },
  };
}

// const pokemon = suspensifySimple(
const pokemon = suspensify(
  fetch(`https://pokeapi.co/api/v2/pokemon/1`).then((res) => res.json())
);

export default function PokemonDetail() {
  // return <div>{pokemon.name}</div>; // suspensifySimple
  return <div>{pokemon.read().name}</div>;
}
