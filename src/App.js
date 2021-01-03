import * as React from "react"
import { PokemonForm, fetchPokemon, PokemonInfoFallback, PokemonDataView } from "./pokemon"
import "./App.css"
function PokemonInfo({ pokemonName }) {
  const [{ status, pokemon, error }, setState] = React.useState({
    status: "idle",
    pokemon: null,
    errpr: null,
  })

  React.useEffect(() => {
    if (!pokemonName) {
      return
    }
    setState({ status: "pending" })
    fetchPokemon(pokemonName).then(
      (pokemonData) => {
        setState({ pokemon: pokemonData, status: "resolved" })
      },
      (error) => {
        setState({ error: error, status: "rejected" })
      }
    )
  }, [pokemonName])
  if (status === "idle") {
    return "Submit a pokemon"
  } else if (status === "pending") {
    return <PokemonInfoFallback name={pokemonName} />
  } else if (status === "rejected") {
    return (
      <div role="alert">
        There was an error: <pre style={{ whiteSpace: "normal" }}>{error.message}</pre>
      </div>
    )
  } else if (status === "resolved") {
    return <PokemonDataView pokemon={pokemon} />
  }
}

function App() {
  const [pokemonName, setPokemonName] = React.useState("")

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
