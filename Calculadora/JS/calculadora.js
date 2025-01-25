let expressao = "";

function adicionarNumero(numero) {
    expressao += numero;
    atualizarResultado();
}

function adicionarOperador(operador) {
    if (/[+\-*/]$/.test(expressao)) {
        expressao = expressao.slice(0, -1);
    }
    expressao += operador;
    atualizarResultado();
}

function limpar() {
    expressao = "";
    atualizarResultado();
}

function removerUltimo() {
    expressao = expressao.slice(0, -1);
    atualizarResultado();
}

function calcular() {
    try {
        expressao = eval(expressao).toString();
    } catch {
        expressao = "Erro";
    }
    atualizarResultado();
}

function atualizarResultado() {
    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.textContent = expressao || "0";
}