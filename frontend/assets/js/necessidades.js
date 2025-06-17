/**
 * Visualização de Necessidades - JavaScript
 * Sistema para exibição, filtro e pesquisa de necessidades de voluntariado
 */

// Variáveis globais
let necessidadesOriginais = [];
let necessidadesFiltradas = [];
let ordenacaoAtual = 'data-desc'; // data-desc, data-asc, titulo-asc, titulo-desc

/**
 * Inicialização do sistema quando a página carrega
 */
document.addEventListener('DOMContentLoaded', function() {
    inicializarSistema();
});

/**
 * Configura todos os event listeners e carrega as necessidades
 */
function inicializarSistema() {
    console.log('Iniciando sistema de visualização de necessidades...');
    
    // Configura event listeners
    configurarEventListeners();
    
    // Carrega as necessidades
    carregarNecessidades();
    
    console.log('Sistema de visualização inicializado com sucesso');
}

/**
 * Configura todos os event listeners da página
 */
function configurarEventListeners() {
    // Pesquisa em tempo real
    const searchInput = document.getElementById('pesquisa');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(aplicarFiltros, 300));
    }
    
    // Filtro por tipo
    const filtroTipo = document.getElementById('filtroTipo');
    if (filtroTipo) {
        filtroTipo.addEventListener('change', aplicarFiltros);
    }
    
    // Botão limpar filtros
    const btnLimpar = document.querySelector('.btn.btn-secondary');
    if (btnLimpar) {
        btnLimpar.addEventListener('click', limparFiltros);
    }
}

/**
 * Carrega as necessidades do localStorage
 */
function carregarNecessidades() {
    try {
        // Exibe loading
        exibirLoading(true);
        
        // Carrega do localStorage
        const necessidadesString = localStorage.getItem('necessidades');
        necessidadesOriginais = necessidadesString ? JSON.parse(necessidadesString) : [];
        
        // Simula delay de carregamento para melhor UX
        setTimeout(() => {
            // Filtra apenas necessidades ativas
            necessidadesOriginais = necessidadesOriginais.filter(n => n.status === 'ativo');
            
            // Ordena por data (mais recentes primeiro)
            ordenarNecessidades('data-desc');
            
            // Aplica filtros iniciais
            aplicarFiltros();
            
            // Oculta loading
            exibirLoading(false);
            
            console.log(`${necessidadesOriginais.length} necessidades carregadas`);
        }, 500);
        
    } catch (error) {
        console.error('Erro ao carregar necessidades:', error);
        exibirErro('Erro ao carregar necessidades. Tente recarregar a página.');
        exibirLoading(false);
    }
}

/**
 * Aplica todos os filtros ativos
 */
function aplicarFiltros() {
    const termoPesquisa = document.getElementById('pesquisa')?.value.toLowerCase().trim() || '';
    const tipoSelecionado = document.getElementById('filtroTipo')?.value || '';
    
    // Filtra necessidades
    necessidadesFiltradas = necessidadesOriginais.filter(necessidade => {
        // Filtro de pesquisa (título e descrição)
        const matchPesquisa = !termoPesquisa || 
            necessidade.titulo.toLowerCase().includes(termoPesquisa) ||
            necessidade.descricao.toLowerCase().includes(termoPesquisa) ||
            necessidade.nomeInstituicao.toLowerCase().includes(termoPesquisa);
        
        // Filtro por tipo
        const matchTipo = !tipoSelecionado || necessidade.tipoAjuda === tipoSelecionado;
        
        return matchPesquisa && matchTipo;
    });
    
    // Atualiza a exibição
    renderizarNecessidades();
    atualizarContadorResultados();
}

/**
 * Renderiza as necessidades na tela
 */
function renderizarNecessidades() {
    const container = document.getElementById('necessidadesGrid');
    const noResults = document.getElementById('noResults');
    
    if (!container) return;
    
    // Limpa o container
    container.innerHTML = '';
    
    if (necessidadesFiltradas.length === 0) {
        // Exibe mensagem de "nenhum resultado"
        if (necessidadesOriginais.length === 0) {
            exibirEstadoVazio();
        } else {
            noResults.style.display = 'block';
        }
        return;
    }
    
    // Oculta mensagem de "nenhum resultado"
    noResults.style.display = 'none';
    
    // Renderiza cada necessidade
    necessidadesFiltradas.forEach(necessidade => {
        const card = criarCardNecessidade(necessidade);
        container.appendChild(card);
    });
}

/**
 * Cria um card para exibir uma necessidade
 */
function criarCardNecessidade(necessidade) {
    const card = document.createElement('div');
    card.className = 'necessidade-card';
    card.setAttribute('data-id', necessidade.id);
    
    // Formata a data
    const dataFormatada = formatarData(necessidade.dataCadastro);
    
    // Trunca a descrição se muito longa
    const descricaoTruncada = truncarTexto(necessidade.descricao, 150);
    
    // Determina a cor do badge baseada no tipo
    const corBadge = obterCorTipo(necessidade.tipoAjuda);
    
    card.innerHTML = `
        <div class="card-header">
            <div class="card-tipo">
                <span class="tipo-badge" style="background-color: ${corBadge}">${necessidade.tipoAjuda}</span>
            </div>
            <div class="card-data">${dataFormatada}</div>
        </div>
        
        <div class="card-content">
            <h3 class="card-titulo">${escapeHtml(necessidade.titulo)}</h3>
            <p class="card-instituicao">
                <i class="fas fa-building"></i>
                ${escapeHtml(necessidade.nomeInstituicao)}
            </p>
            <p class="card-descricao">${escapeHtml(descricaoTruncada)}</p>
            <div class="card-localizacao">
                <i class="fas fa-map-marker-alt"></i>
                ${necessidade.cidade ? `${necessidade.cidade}, ${necessidade.estado}` : 'Localização não informada'}
            </div>
        </div>
        
        <div class="card-actions">
            <button class="btn btn-outline" onclick="verDetalhes('${necessidade.id}')">
                <i class="fas fa-info-circle"></i>
                Ver Detalhes
            </button>
            <button class="btn btn-primary" onclick="entrarContato('${necessidade.id}')">
                <i class="fas fa-envelope"></i>
                Contato
            </button>
        </div>
    `;
    
    // Adiciona event listener para clique no card
    card.addEventListener('click', function(event) {
        // Não abre detalhes se clicou em um botão
        if (!event.target.closest('.btn')) {
            verDetalhes(necessidade.id);
        }
    });
    
    return card;
}

/**
 * Exibe detalhes de uma necessidade em modal
 */
function verDetalhes(necessidadeId) {
    const necessidade = necessidadesOriginais.find(n => n.id === necessidadeId);
    if (!necessidade) return;
    
    // Cria e exibe modal
    criarModalDetalhes(necessidade);
}

/**
 * Cria modal com detalhes da necessidade
 */
function criarModalDetalhes(necessidade) {
    // Remove modal anterior se existir
    const modalAnterior = document.getElementById('modalDetalhes');
    if (modalAnterior) {
        modalAnterior.remove();
    }
    
    // Cria novo modal
    const modal = document.createElement('div');
    modal.id = 'modalDetalhes';
    modal.className = 'modal';
    
    const endereco = `${necessidade.rua}${necessidade.numero ? ', ' + necessidade.numero : ''}, ${necessidade.bairro}, ${necessidade.cidade} - ${necessidade.estado}`;
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${escapeHtml(necessidade.titulo)}</h3>
                <button class="modal-close" onclick="fecharModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="modal-body">
                <div class="modal-info">
                    <div class="info-row">
                        <div class="info-item">
                            <strong><i class="fas fa-building"></i> Instituição:</strong>
                            <span>${escapeHtml(necessidade.nomeInstituicao)}</span>
                        </div>
                        <div class="info-item">
                            <strong><i class="fas fa-tag"></i> Tipo de Ajuda:</strong>
                            <span class="tipo-badge" style="background-color: ${obterCorTipo(necessidade.tipoAjuda)}">${necessidade.tipoAjuda}</span>
                        </div>
                    </div>
                    
                    <div class="info-item full-width">
                        <strong><i class="fas fa-map-marker-alt"></i> Localização:</strong>
                        <span>${endereco}</span>
                    </div>
                    
                    <div class="info-item full-width">
                        <strong><i class="fas fa-calendar"></i> Data de Cadastro:</strong>
                        <span>${formatarDataCompleta(necessidade.dataCadastro)}</span>
                    </div>
                    
                    <div class="info-item full-width">
                        <strong><i class="fas fa-align-left"></i> Descrição:</strong>
                        <p class="descricao-completa">${escapeHtml(necessidade.descricao)}</p>
                    </div>
                </div>
                
                <div class="modal-contato">
                    <h4><i class="fas fa-phone"></i> Informações de Contato</h4>
                    <div class="contato-info">
                        <div class="contato-item">
                            <i class="fas fa-envelope"></i>
                            <a href="mailto:${necessidade.contato}?subject=Interesse em: ${encodeURIComponent(necessidade.titulo)}&body=Olá, tenho interesse em ajudar com esta necessidade.">
                                ${necessidade.contato}
                            </a>
                        </div>
                        ${necessidade.telefone ? `
                            <div class="contato-item">
                                <i class="fas fa-phone"></i>
                                <a href="tel:${necessidade.telefone.replace(/\D/g, '')}">
                                    ${necessidade.telefone}
                                </a>
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
            
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="fecharModal()">Fechar</button>
                <button class="btn btn-primary" onclick="entrarContato('${necessidade.id}')">
                    <i class="fas fa-envelope"></i> Entrar em Contato
                </button>
            </div>
        </div>
    `;
    
    // Adiciona ao body
    document.body.appendChild(modal);
    
    // Exibe modal com animação
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    // Event listener para fechar com ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            fecharModal();
        }
    });
    
    // Event listener para fechar clicando fora
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            fecharModal();
        }
    });
}

/**
 * Fecha o modal de detalhes
 */
function fecharModal() {
    const modal = document.getElementById('modalDetalhes');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

/**
 * Abre o cliente de email para contato
 */
function entrarContato(necessidadeId) {
    const necessidade = necessidadesOriginais.find(n => n.id === necessidadeId);
    if (!necessidade) return;
    
    const assunto = `Interesse em: ${necessidade.titulo}`;
    const corpo = `Olá!

Tenho interesse em ajudar com a necessidade "${necessidade.titulo}" da ${necessidade.nomeInstituicao}.

Gostaria de saber mais detalhes sobre como posso contribuir.

Atenciosamente.`;
    
    const mailtoLink = `mailto:${necessidade.contato}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
    window.open(mailtoLink);
}

/**
 * Limpa todos os filtros
 */
function limparFiltros() {
    document.getElementById('pesquisa').value = '';
    document.getElementById('filtroTipo').value = '';
    aplicarFiltros();
}

/**
 * Ordena as necessidades
 */
function ordenarNecessidades(tipo) {
    ordenacaoAtual = tipo;
    
    necessidadesOriginais.sort((a, b) => {
        switch (tipo) {
            case 'data-desc':
                return new Date(b.dataCadastro) - new Date(a.dataCadastro);
            case 'data-asc':
                return new Date(a.dataCadastro) - new Date(b.dataCadastro);
            case 'titulo-asc':
                return a.titulo.localeCompare(b.titulo);
            case 'titulo-desc':
                return b.titulo.localeCompare(a.titulo);
            default:
                return 0;
        }
    });
}

/**
 * Atualiza o contador de resultados
 */
function atualizarContadorResultados() {
    const contador = document.getElementById('contadorResultados');
    if (!contador) return;
    
    const total = necessidadesFiltradas.length;
    const totalGeral = necessidadesOriginais.length;
    
    if (total === totalGeral) {
        contador.textContent = `${total} necessidade${total !== 1 ? 's' : ''} encontrada${total !== 1 ? 's' : ''}`;
    } else {
        contador.textContent = `${total} de ${totalGeral} necessidade${totalGeral !== 1 ? 's' : ''}`;
    }
}

/**
 * Exibe estado vazio (quando não há necessidades cadastradas)
 */
function exibirEstadoVazio() {
    const container = document.getElementById('necessidadesGrid');
    const noResults = document.getElementById('noResults');
    
    container.innerHTML = `
        <div class="empty-state">
            <div class="empty-icon">
                <i class="fas fa-heart"></i>
            </div>
            <h3>Ainda não há necessidades cadastradas</h3>
            <p>Seja o primeiro a cadastrar uma necessidade de voluntariado!</p>
            <a href="cadastro.html" class="btn btn-primary">
                <i class="fas fa-plus"></i> Cadastrar Primeira Necessidade
            </a>
        </div>
    `;
    
    noResults.style.display = 'none';
}

/**
 * Exibe/oculta loading
 */
function exibirLoading(exibir) {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.style.display = exibir ? 'block' : 'none';
    }
}

/**
 * Exibe mensagem de erro
 */
function exibirErro(mensagem) {
    console.error(mensagem);
    // Aqui você pode implementar um sistema de notificações de erro
}

// ============= FUNÇÕES UTILITÁRIAS =============

/**
 * Debounce para pesquisa
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Formata data para exibição
 */
function formatarData(dataString) {
    const data = new Date(dataString);
    const agora = new Date();
    const diffTime = agora - data;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
        return 'Hoje';
    } else if (diffDays === 1) {
        return 'Ontem';
    } else if (diffDays < 7) {
        return `${diffDays} dias atrás`;
    } else {
        return data.toLocaleDateString('pt-BR');
    }
}

/**
 * Formata data completa
 */
function formatarDataCompleta(dataString) {
    const data = new Date(dataString);
    return data.toLocaleString('pt-BR');
}

/**
 * Trunca texto
 */
function truncarTexto(texto, limite) {
    if (texto.length <= limite) return texto;
    return texto.substring(0, limite) + '...';
}

/**
 * Escapa HTML para segurança
 */
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

/**
 * Obtém cor para o tipo de ajuda
 */
function obterCorTipo(tipo) {
    const cores = {
        'Educação': '#3498db',
        'Saúde': '#e74c3c',
        'Meio Ambiente': '#27ae60',
        'Doação de Alimentos': '#f39c12',
        'Doação de Roupas': '#9b59b6',
        'Assistência Social': '#34495e',
        'Cultura e Arte': '#e67e22',
        'Esporte': '#1abc9c',
        'Outros': '#95a5a6'
    };
    return cores[tipo] || '#95a5a6';
}

// ============= INICIALIZAÇÃO =============

// Log de inicialização
console.log('Sistema de Visualização de Necessidades carregado');
