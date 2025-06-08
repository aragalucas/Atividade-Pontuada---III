function cadastrarUsuario() {
    const nome = document.getElementById('nome').value;
    const descricao = document.getElementById('descricao').value;
    const preco = document.getElementById('preco').value;
    const categoria = document.getElementById('categoria').value;
    const disponibilidade = document.getElementById('disponibilidade').value;
    const url = document.getElementById('url').value

    fetch('http://localhost:8080/usuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, sexo, idade, altura, peso, posicao})
    })
    .then(response => response.json().then(data => ({ status: response.status, body: data })))
    .then(({ status, body }) => {
        if (status >= 400) {
            let erroMsg = body.mensagem;
            if (body.erros) {
                erroMsg += ' ' + Object.values(body.erros).join(', ');
            }
            mensagem.textContent = erroMsg;
            mensagem.classList.remove('sucesso');
            mensagem.classList.add('erro', 'visivel');
        } else {
            mensagem.textContent = body.mensagem || 'Usuário cadastrado com sucesso!';
            mensagem.classList.remove('erro');
            mensagem.classList.add('sucesso', 'visivel');

            // Limpar os campos após sucesso
            document.getElementById('cadastroForm').reset();
        }
        exibirMensagem();
    })
    .catch(() => {
        mensagem.textContent = 'Erro ao conectar com o servidor.';
        mensagem.classList.remove('sucesso');
        mensagem.classList.add('erro', 'visivel');
        exibirMensagem();
    });
}

function exibirMensagem() {
    const mensagem = document.getElementById('mensagem');
    mensagem.classList.remove('oculto');
    setTimeout(() => fecharMensagem(), 5000);
}

function fecharMensagem() {
    const mensagem = document.getElementById('mensagem');
    mensagem.classList.remove('visivel');
    setTimeout(() => mensagem.classList.add('oculto'), 5000);
}
