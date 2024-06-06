document.addEventListener('DOMContentLoaded', () => {
    // Seleciona os elementos da página
    const btnCadastro = document.getElementById('btnCadastro');
    const btnConsulta = document.getElementById('btnConsulta');
    const sectionCadastro = document.getElementById('cadastro');
    const sectionConsulta = document.getElementById('consulta');
    const formCadastro = document.getElementById('formCadastro');
    const resultados = document.getElementById('resultados');
    const busca = document.getElementById('busca');

    // Adiciona evento de clique no botão de cadastro
    btnCadastro.addEventListener('click', () => {
        toggleSections(sectionCadastro, sectionConsulta);
    });

    // Adiciona evento de clique no botão de consulta
    btnConsulta.addEventListener('click', () => {
        toggleSections(sectionConsulta, sectionCadastro);
        mostrarViagens();
    });

    // Adiciona evento de submissão no formulário de cadastro
    formCadastro.addEventListener('submit', (e) => {
        e.preventDefault();
        const viagem = criarViagem(formCadastro);
        salvarViagem(viagem);
        formCadastro.reset();
    });

    // Adiciona evento de input no campo de busca
    busca.addEventListener('input', (e) => {
        const termo = e.target.value.toLowerCase();
        filtrarViagens(termo);
    });

    // Alterna as seções ativas
    function toggleSections(showSection, hideSection) {
        showSection.classList.add('active');
        hideSection.classList.remove('active');
    }

    // Cria um objeto viagem a partir dos dados do formulário
    function criarViagem(form) {
        return {
            id: new Date().getTime(),
            nome: form.nome.value,
            local: form.local.value,
            data: form.data.value,
            descricao: form.descricao.value
        };
    }

    // Salva uma viagem no localStorage
    function salvarViagem(viagem) {
        const viagens = JSON.parse(localStorage.getItem('viagens')) || [];
        viagens.push(viagem);
        localStorage.setItem('viagens', JSON.stringify(viagens));
    }

    // Mostra as viagens salvas no localStorage
    function mostrarViagens() {
        resultados.innerHTML = '';
        const viagens = JSON.parse(localStorage.getItem('viagens')) || [];
        viagens.forEach(viagem => {
            const div = criarElementoViagem(viagem);
            resultados.appendChild(div);
        });
    }

    // Cria o elemento HTML de uma viagem
    function criarElementoViagem(viagem) {
        const div = document.createElement('div');
        div.classList.add('viagem');
        div.innerHTML = `
            <h3>${viagem.nome}</h3>
            <p><strong>Local:</strong> ${viagem.local}</p>
            <p><strong>Data:</strong> ${viagem.data}</p>
            <p><strong>Descrição:</strong> ${viagem.descricao}</p>
            <button onclick="removerViagem(${viagem.id})">Remover</button>
        `;
        return div;
    }

    // Remove uma viagem do localStorage e atualiza a lista
    window.removerViagem = function(id) {
        let viagens = JSON.parse(localStorage.getItem('viagens')) || [];
        viagens = viagens.filter(viagem => viagem.id !== id);
        localStorage.setItem('viagens', JSON.stringify(viagens));
        mostrarViagens();
    }

    // Filtra as viagens com base no termo de busca
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
            const div = criarElementoViagem(viagem);
            resultados.appendChild(div);
        });
    }
});

