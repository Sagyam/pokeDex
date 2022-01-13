const mainContainer = document.getElementById("main-container");
const pokemonCount = 385;
export let pokemons = [];
export const habitats = [];

const colors = {
	fire: "#FDDFDF",
	grass: "#DEFDE0",
	electric: "#FCF7DE",
	water: "#DEF3FD",
	ground: "#f4e7da",
	rock: "#d5d5d4",
	fairy: "#fceaff",
	poison: "#98d7a5",
	bug: "#f8d5a3",
	dragon: "#97b3e6",
	psychic: "#eaeda1",
	flying: "#F5F5F5",
	fighting: "#E6E0D4",
	normal: "#F5F5F5",
};

export const fetchAllHabitats = async () => {
	for (let i = 1; i <= 9; i++) {
		const url = `https://pokeapi.co/api/v2/pokemon-habitat/${i}`;
		const res = await fetch(url);
		let habitat = await res.json();
		habitats.push(habitat);
	}
	return habitats;
};

//function takes pokemon name and returns it's habitat
const getHabitat = (name) => {
	for (let habitat of habitats) {
		for (let pokemon of habitat.pokemon_species) {
			if (pokemon.name == name) {
				return habitat.name;
			}
		}
	}
};

const getAllPokemons = async () => {
	for (let i = 1; i <= pokemonCount; i++) {
		let pokemon = await fetchPokemon(i);
		pokemon["habitat"] = getHabitat(pokemon.name);
		pokemons.push(pokemon);
		createPokemonCard(pokemon);
	}
};

const fetchPokemon = async (id) => {
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
	const res = await fetch(url);
	let pokemon = await res.json();
	return pokemon;
};

export const createPokemonCard = (pokemon) => {
	const pokemonCard = document.createElement("div");
	pokemonCard.classList.add("pokemon");

	const pokemonName = pokemon.name;
	const pokemonId = pokemon.id.toString().padStart(3, "0");
	const pokemonTypes = pokemon.types.map((type) => type.type.name);
	const mainType = pokemonTypes[0];
	const color = colors[mainType];

	const habitat = pokemon.habitat;

	pokemonCard.style.backgroundColor = color;

	pokemonCard.innerHTML = `
		 
		<div class="pokemon-card" id="pokemon-card-${pokemonId}" data-bs-toggle="modal" data-bs-target="#modal-${pokemonId}">
			<div class="img-container" >
				<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"" alt="${pokemonName}" loading="lazy">
			</div>
			<div class="info" >
				<span class="number">#${pokemonId}</span>
				<h3 class="name">${pokemonName}</h3>
				<div class="types"></div>
				<small class="habitat">Habitat: ${habitat}</small>
			</div>
		</div>

	
		
		`;
	const typesDiv = pokemonCard.querySelector(".types");
	pokemonTypes.forEach((type) => {
		const typeDiv = document.createElement("small");
		typeDiv.classList.add("type");
		typeDiv.innerText = `Type: ${type}`;
		typesDiv.appendChild(typeDiv);
	});

	mainContainer.appendChild(pokemonCard);
};

document.onload = await fetchAllHabitats();
document.onload = await getAllPokemons();
