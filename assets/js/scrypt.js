document.addEventListener('DOMContentLoaded', () => {
    const btnCadastro = document.getElementById('btnCadastro');
    const btnConsulta = document.getElementById('btnConsulta');
    const sectionCadastro = document.getElementById('cadastro');
    const sectionConsulta = document.getElementById('consulta');
    const formCadastro = document.getElementById('formCadastro');
    const resultados = document.getElementById('resultados');
    const busca = document.getElementById('busca');

    btnCadastro.addEventListener('click', () => {
        sectionCadastro.classList.add('active');
        sectionConsulta.classList.remove('active');
    });

    btnConsulta.addEventListener('click', () => {
        sectionConsulta.classList.add('active');
        sectionCadastro.classList.remove('active');
        mostrarViagens();
    });

    formCadastro.addEventListener('submit', (e) => {
        e.preventDefault();
        const viagem = {
            id: new Date().getTime(),
            nome: formCadastro.nome.value,
            local: formCadastro.local.value,
            data: formCadastro.data.value,
            descricao: formCadastro.descricao.value
        };
        salvarViagem(viagem);
        formCadastro.reset();
    });

    busca.addEventListener('input', (e) => {
        const termo = e.target.value.toLowerCase();
        filtrarViagens(termo);
    });

    function salvarViagem(viagem) {
        let viagens = JSON.parse(localStorage.getItem('viagens')) || [];
        viagens.push(viagem);
        localStorage.setItem('viagens', JSON.stringify(viagens));
    }

    function mostrarViagens() {
        resultados.innerHTML = '';
        const viagens = JSON.parse(localStorage.getItem('viagens')) || [];
        viagens.forEach(viagem => {
            const div = document.createElement('div');
            div.classList.add('viagem');
            div.innerHTML = `
                <h3>${viagem.nome}</h3>
                <p><strong>Local:</strong> ${viagem.local}</p>
                <p><strong>Data:</strong> ${viagem.data}</p>
                <p><strong>Descrição:</strong> ${viagem.descricao}</p>
                <button onclick="removerViagem(${viagem.id})">Remover</button>
            `;
            resultados.appendChild(div);
        });
    }

    window.removerViagem = function(id) {
        let viagens = JSON.parse(localStorage.getItem('viagens')) || [];
        viagens = viagens.filter(viagem => viagem.id !== id);
        localStorage.setItem('viagens', JSON.stringify(viagens));
        mostrarViagens();
    }

    function filtrarViagens(termo) {
        const viagens = JSON.parse(localStorage.getItem('viagens')) || [];
        const viagensFiltradas = viagens.filter(viagem => 
            viagem.nome.toLowerCase().includes(termo) ||
            viagem.local.toLowerCase().includes(termo) ||
            viagem.data.toLowerCase().includes(termo) ||
            viagem.descricao.toLowerCase().includes(termo)
        );
        resultados.innerHTML = '';
        viagensFiltradas.forEach(viagem => {
            const div = document.createElement('div');
            div.classList.add('viagem');
            div.innerHTML = `
                <h3>${viagem.nome}</h3>
                <p><strong>Local:</strong> ${viagem.local}</p>
                <p><strong>Data:</strong> ${viagem.data}</p>
                <p><strong>Descrição:</strong> ${viagem.descricao}</p>
                <button onclick="removerViagem(${viagem.id})">Remover</button>
            `;
            resultados.appendChild(div);
        });
    }
});
