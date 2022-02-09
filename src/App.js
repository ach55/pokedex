import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [pokemon, setPokemon] = useState("pikachu");
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonType, setPokemonType] = useState("");

  const getPokemon = async () => {
    const toArray = [];
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
      const res = await axios.get(url);
      console.log(res);
      toArray.push(res.data);
      setPokemonType(res.data.types[0].type.name);
      setPokemonData(toArray);
    } catch (e) {
      console.log(e);
      window.alert("No pokemon found, try again :(");
    }
  };

  const handleChange = (e) => {
    setPokemon(e.target.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getPokemon();
  };

  return (
    <div>
      <div className="nav-bar">
        <p className="title">Pokedex</p>
      </div>
      <div className="search">
        <div className="search-box">
          <form onSubmit={handleSubmit}>
            <label>
              <input
                type="text"
                className="search-bar"
                placeholder="Search for a pokemon here!"
                onChange={handleChange}
              ></input>
            </label>
          </form>
        </div>
      </div>
      <div className="card">
        {pokemonData.map((data) => {
          return (
            <div className="container">
              <div className="img-container">
                <img src={data.sprites["front_default"]} />
              </div>
              <div className="table"></div>
              <div className="table-body">
                <div className="table-row">
                  <div className="table-cell">Type: {pokemonType}</div>
                </div>
                <div className="table-row">
                  <div className="table-cell">
                    Height: {Math.round(data.height * 3.9)}"
                  </div>
                </div>
                <div className="table-row">
                  <div className="table-cell">
                    Weight: {Math.round(data.weight / 4.3)}lbs
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
