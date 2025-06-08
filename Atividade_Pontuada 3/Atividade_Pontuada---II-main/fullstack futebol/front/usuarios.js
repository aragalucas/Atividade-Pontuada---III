document.addEventListener('DOMContentLoaded', carregarUsuarios)

function carregarUsuarios() {
    fetch('http://localhost:8080/usuarios')
    .then(response => {
        if (!response.ok) {
            throw new Error("Erro ao buscar usuários");
        }
        return response.json()
    })
    .then(usuarios => {
        const lista = document.getElementById('listaUsuarios')
        lista.innerHTML = ''

        if (usuarios.length === 0) {
            lista.innerHTML = '<li>Nenhum usuário encontrado.</li>'
            return;
        }

        usuarios.forEach(usuario => {
            const item = document.createElement('li')
            item.innerHTML = `<strong>Nome:</strong> ${usuario.nome}<br>
                            <strong>Email:</strong> ${usuario.email || ''}<br>
                            <strong>OutroCampo:</strong> ${usuario.outroCampo || ''}`
            lista.appendChild(item)
        })
    })
    .catch( erro => {
        document.getElementById('listaUsuarios').innerHTML = 
        '<li>Erro ao carregar usuários.</li>'
    })
}