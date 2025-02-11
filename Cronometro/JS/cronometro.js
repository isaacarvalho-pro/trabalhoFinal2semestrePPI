let inicio = null, intervalo = null, pausado = false, tempoPausado = 0, temposParados = [];

const temporizador = document.getElementById("tempo");
const listaTempos = document.getElementById("listaTempos");

function formataTempo(tempo) {
    const h = String(Math.floor(tempo / 3600)).padStart(2, "0");
    const m = String(Math.floor((tempo % 3600) / 60)).padStart(2, "0");
    const s = String(tempo % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
}

function atualizaCronometro() {
    const agora = Date.now();
    const diferenca = Math.floor((agora - inicio + tempoPausado) / 1000);
    temporizador.textContent = formataTempo(diferenca);
}

function alternarCronometro() {
    if (!pausado) {
        // Iniciar ou retomar
        if (!inicio) {
            inicio = Date.now();
        } else {
            inicio = Date.now();
        }
        intervalo = setInterval(atualizaCronometro, 1000);
    } else {
        // Pausar
        clearInterval(intervalo);
        const tempoAtual = Math.floor((Date.now() - inicio + tempoPausado) / 1000);
        temposParados.push(formataTempo(tempoAtual));
        listaTempos.innerHTML = temposParados.map(time => `<li>${time}</li>`).join('');
        tempoPausado += (Date.now() - inicio);
    }
    pausado = !pausado;
}

document.getElementById("botaoIniciar").onclick = alternarCronometro;

document.getElementById("botaoReiniciar").onclick = function () {
    clearInterval(intervalo);
    inicio = null;
    pausado = false;
    tempoPausado = 0;
    temposParados = [];
    temporizador.textContent = "00:00:00";
    listaTempos.innerHTML = '';
};

document.addEventListener("keydown", function(event) {
    if (event.code === "Space") {
        event.preventDefault(); // Evita rolagem da página
        alternarCronometro();
    }
});
