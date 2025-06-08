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

        if (usuarios.lenght === 0) {
            lista.innerHTML = '<li>Nenhum usuário encontrado. </li>'
            return;
        }

        usuarios.forEach(usuario => {
            const item = document.createElement('li')
            item.innerHTML = `<strong>Nome:</strong> ${usuario.nome}<br>
                            <strong>Sexo:</strong> ${usuario.sexo}<br>
                            <strong>Idade:</strong> ${usuario.idade}<br>
                            <strong>Altura:</strong> ${usuario.altura}<br>
                            <strong>Peso:</strong> ${usuario.peso}<br>
                            <strong>Posicao:</strong> ${usuario.posicao}<br>
                            <strong>Numero:</strong> ${usuario.numero}`
                            
            lista.appendChild(item)
        })
    })
    .catch( erro => {
        document.getElementById('listaUsuarios').innerHTML = 
        '<li>Erro ao carregar usuários.</li>'
    })
}