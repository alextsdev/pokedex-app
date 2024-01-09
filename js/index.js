const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");

//go top button
window.onscroll = function () {
  if (document.documentElement.scrollTop > 400) {
    document.querySelector('.go-top-container')
      .classList.add('show');
  } else {
    document.querySelector('.go-top-container')
      .classList.remove('show');
  }
}
document.querySelector('.go-top-container')
  .addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

//URL-API
let URL = "https://pokeapi.co/api/v2/pokemon/";

/**
 * Primera generacion: 151
 * Segunda generacion: 251
 * Tercera generacion: 386
 */

for (let i = 1; i <= 386; i++) {
  fetch(URL + i)
    .then((response) => response.json())
    .then(data => mostrarPokemon(data))
}

function mostrarPokemon(poke) {

  let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
  tipos = tipos.join('');

  let pokeId = poke.id.toString();
  if (pokeId.length === 1) {
    pokeId = "00" + pokeId;
  } else if (pokeId.length === 2) {
    pokeId = "0" + pokeId;
  }

  let pokeHeight = poke.height.toString();
  pokeHeight = pokeHeight / 10;

  let pokeWeight = poke.weight.toString();
  pokeWeight = pokeWeight / 10;

  const div = document.createElement("div");
  div.classList.add("pokemon");
  div.innerHTML = `
  <p class="pokemon-id-back">#${pokeId}</p>
  <div class="pokemon-imagen">
    <img
      src="${poke.sprites.other["official-artwork"].front_default}"
      alt="${poke.name}">
  </div>
  <div class="pokemon-info">
    <div class="nombre-contenedor">
      <p class="pokemon-id">#${pokeId}</p>
      <h2 class="pokemon-nombre">${poke.name}</h2>
    </div>
    <div class="pokemon-tipos">
     ${tipos}
    </div>
    <div class="pokemon-stats">
      <p class="stat">${pokeHeight} M</p>
      <p class="stat">${pokeWeight} KG</p>
    </div>
  </div>
`
  listaPokemon.append(div);
}

botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
  const botonId = event.currentTarget.id;

  listaPokemon.innerHTML = "";

  for (let i = 1; i <= 386; i++) {
    fetch(URL + i)
      .then((response) => response.json())
      .then(data => {
        if (botonId === "ver-todos") {
          mostrarPokemon(data);
        } else {
          const tipos = data.types.map(type => type.type.name);
          if (tipos.some(tipo => tipo.includes(botonId))) {
            mostrarPokemon(data);
          }
        }
      })
  }
}));
