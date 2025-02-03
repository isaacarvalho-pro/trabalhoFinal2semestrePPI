let notas = JSON.parse(localStorage.getItem('notas')) || [];
let notaEmEdicao = null;

function listarNotas() {
    const notasDiv = document.getElementById('notas');
    notasDiv.innerHTML = '';

    notas.forEach((nota, index) => {
        const notaDiv = document.createElement('div');
        notaDiv.className = 'col-12 col-md-6';

        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-body">
                <p class="card-text">${nota.conteudo}</p>
                <button class="btn btn-sm btn-warning me-2" onclick="abrirNota(${index})">Editar</button>
                <button class="btn btn-sm btn-danger" onclick="excluirNota(${index})">Excluir</button>
            </div>
        `;

        notaDiv.appendChild(card);
        notasDiv.appendChild(notaDiv);
    });
}

function abrirNota(index) {
    const confirmacao = confirm("Deseja editar esta nota?");
    if (confirmacao) {
        notaEmEdicao = index;
        document.getElementById('conteudoNota').value = notas[index].conteudo;
    }
}

function salvarNota() {
    const conteudo = document.getElementById('conteudoNota').value;
    if (!conteudo.trim()) {
        alert('A nota não pode estar vazia!');
        return;
    }

    if (notaEmEdicao !== null) {
        notas[notaEmEdicao].conteudo = conteudo;
    } else {
        notas.push({ conteudo });
    }

    localStorage.setItem('notas', JSON.stringify(notas));
    cancelarEdicao();
    listarNotas();
}

function excluirNota(index) {
    const confirmacao = confirm("Tem certeza que deseja excluir esta nota?");
    if (confirmacao) {
        notas.splice(index, 1);
        localStorage.setItem('notas', JSON.stringify(notas));
        listarNotas();
    }
}

function cancelarEdicao() {
    notaEmEdicao = null;
    document.getElementById('conteudoNota').value = '';
}

listarNotas();