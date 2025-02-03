document.addEventListener("DOMContentLoaded", function () {
    carregarFilmesAleatorios();
});

document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault(); 
    buscarFilmes();
});

const apiKey = "3aa94adb7852fb0e67f92959df98b9d4";

async function carregarFilmesAleatorios() {
    const filmesAleatorios = ["Batman", "Matrix", "Avengers", "Titanic", "Inception", "Joker", "Interstellar", "Gladiator"];
    const filmesEscolhidos = filmesAleatorios.sort(() => Math.random() - 0.5).slice(0, 8); // Escolhe 8 aleatórios
    const filmesPromises = filmesEscolhidos.map(titulo => buscarFilmePorTitulo(titulo));

    const filmes = await Promise.all(filmesPromises);
    mostrarFilmes(filmes);
}

async function buscarFilmePorTitulo(titulo) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(titulo)}&language=pt-BR`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.results[0]; 
    } catch (error) {
        console.error("Erro ao buscar filme:", error);
        return null;
    }
}

async function buscarFilmes() {
    const query = document.getElementById("nomePesquisa").value;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}&language=pt-BR`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
            mostrarFilmes(data.results);
        } else {
            document.querySelector(".filmes").innerHTML = "<p class='text-white'>Nenhum filme encontrado.</p>";
        }
    } catch (error) {
        console.error("Erro ao buscar filmes:", error);
    }
}

function mostrarFilmes(filmes) {
    const container = document.querySelector(".filmes");
    container.innerHTML = "";

    filmes.forEach(filme => {
        if (!filme) return;

        const filmeHTML = `
            <div class="cardFilmes">
                <div class="nomeFilme">
                    <h3>${filme.title}</h3>
                </div>
                <div class="imagem">
                    <img src="https://image.tmdb.org/t/p/w300${filme.poster_path || '/zKZrCBZDi7ZmB5nGFt7wa5KMgdp.jpg'}" alt="${filme.title}" width="300" height="200">
                </div>
                <div class="descricao">
                    <p>${filme.overview ? filme.overview : "Descrição não disponível."}</p>
                </div>
                <div class="nota">
                    <p>Nota: ${filme.vote_average ? filme.vote_average : "Sem avaliação"}</p>
                </div>
            </div>
        `;
        container.innerHTML += filmeHTML;
    });
}

































