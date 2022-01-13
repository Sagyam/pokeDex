import { createPokemonCard, pokemons } from "./script.js";

const searchbox = document.getElementById("search-box");
const searchType = document.getElementById("search-type");

searchbox.addEventListener("keyup", (e) => {
	const searchString = e.target.value;

	//search by name
	if (searchType.value === "name") {
		const filteredPokemons = pokemons.filter((pokemon) => {
			return pokemon.name.toLowerCase().includes(searchString.toLowerCase());
		});
		clearAllPokemons();
		for (let i = 0; i < filteredPokemons.length; i++) {
			createPokemonCard(filteredPokemons[i]);
		}
	}

	//search by type
	else if (searchType.value === "type") {
		const filteredPokemons = pokemons.filter((pokemon) => {
			return pokemon.types.some((type) => {
				return type.type.name
					.toLowerCase()
					.includes(searchString.toLowerCase());
			});
		});
		clearAllPokemons();
		for (let i = 0; i < filteredPokemons.length; i++) {
			createPokemonCard(filteredPokemons[i]);
		}
	}
	//search by habitat
	else if (searchType.value === "habitat") {
		const filteredPokemons = pokemons.filter((pokemon) => {
			return pokemon.habitat.toLowerCase().includes(searchString.toLowerCase());
		});
		clearAllPokemons();
		for (let i = 0; i < filteredPokemons.length; i++) {
			createPokemonCard(filteredPokemons[i]);
		}
	}
});

function clearAllPokemons() {
	const pokemonCards = document.querySelectorAll(".pokemon");
	pokemonCards.forEach((pokemonCard) => {
		pokemonCard.remove();
	});
}
