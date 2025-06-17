/**
 * Dados de Exemplo para Demonstração
 * Script para popular o localStorage com necessidades de exemplo
 */

// Dados de exemplo de necessidades
const necessidadesExemplo = [
    {
        id: 'exemplo-001',
        nomeInstituicao: 'ONG Esperança',
        contato: 'contato@ongesperanca.org.br',
        telefone: '(11) 99999-1111',
        tipoAjuda: 'Educação',
        titulo: 'Aulas de reforço escolar para crianças',
        descricao: 'Precisamos de voluntários para dar aulas de reforço escolar para crianças de 7 a 12 anos em matemática e português. As aulas acontecem de segunda a sexta, das 14h às 16h. É necessário ter ensino médio completo e paciência para lidar com crianças.',
        cep: '01310-100',
        rua: 'Avenida Paulista',
        numero: '1578',
        bairro: 'Bela Vista',
        cidade: 'São Paulo',
        estado: 'SP',
        dataCadastro: '2025-06-15T10:30:00.000Z',
        status: 'ativo'
    },
    {
        id: 'exemplo-002',
        nomeInstituicao: 'Instituto Verde',
        contato: 'meio.ambiente@institutoverde.org',
        telefone: '(11) 98888-2222',
        tipoAjuda: 'Meio Ambiente',
        titulo: 'Plantio de árvores no parque municipal',
        descricao: 'Ação de reflorestamento no Parque Municipal da cidade. Vamos plantar mudas nativas da região aos sábados pela manhã, das 8h às 12h. Não é necessária experiência prévia, oferecemos orientação e todos os materiais necessários.',
        cep: '04038-001',
        rua: 'Rua Vergueiro',
        numero: '3185',
        bairro: 'Vila Mariana',
        cidade: 'São Paulo',
        estado: 'SP',
        dataCadastro: '2025-06-14T14:20:00.000Z',
        status: 'ativo'
    },
    {
        id: 'exemplo-003',
        nomeInstituicao: 'Ação Solidária',
        contato: 'voluntarios@acaosolidaria.com.br',
        telefone: '(11) 97777-3333',
        tipoAjuda: 'Doação de Alimentos',
        titulo: 'Distribuição de cestas básicas',
        descricao: 'Organizamos a distribuição mensal de cestas básicas para famílias em situação de vulnerabilidade. Precisamos de voluntários para ajudar na organização, separação e entrega das cestas. Atividade realizada no primeiro sábado de cada mês, das 7h às 13h.',
        cep: '03310-000',
        rua: 'Rua Conselheiro Carrão',
        numero: '2041',
        bairro: 'Vila Carrão',
        cidade: 'São Paulo',
        estado: 'SP',
        dataCadastro: '2025-06-13T09:15:00.000Z',
        status: 'ativo'
    },
    {
        id: 'exemplo-004',
        nomeInstituicao: 'Saúde para Todos',
        contato: 'saude@saudeparatodos.org.br',
        telefone: '(11) 96666-4444',
        tipoAjuda: 'Saúde',
        titulo: 'Apoio em campanhas de vacinação',
        descricao: 'Buscamos voluntários para auxiliar em campanhas de vacinação da comunidade. As atividades incluem organização de filas, orientação ao público e apoio geral à equipe médica. Preferencialmente pessoas com formação na área da saúde ou experiência em atendimento ao público.',
        cep: '05508-000',
        rua: 'Rua Butantã',
        numero: '123',
        bairro: 'Butantã',
        cidade: 'São Paulo',
        estado: 'SP',
        dataCadastro: '2025-06-12T16:45:00.000Z',
        status: 'ativo'
    },
    {
        id: 'exemplo-005',
        nomeInstituicao: 'Casa do Idoso',
        contato: 'voluntarios@casadoidoso.org.br',
        telefone: '(11) 95555-5555',
        tipoAjuda: 'Assistência Social',
        titulo: 'Companhia para idosos em casa de repouso',
        descricao: 'Procuramos pessoas carinhosas para fazer companhia aos nossos idosos. Atividades incluem conversar, jogar jogos de mesa, auxiliar em atividades recreativas e passeios internos. Disponibilidade de pelo menos 2 horas por semana, em qualquer período do dia.',
        cep: '02011-000',
        rua: 'Rua Voluntários da Pátria',
        numero: '1500',
        bairro: 'Santana',
        cidade: 'São Paulo',
        estado: 'SP',
        dataCadastro: '2025-06-11T11:30:00.000Z',
        status: 'ativo'
    },
    {
        id: 'exemplo-006',
        nomeInstituicao: 'Arte na Comunidade',
        contato: 'arte@artecomunidade.org',
        telefone: '(11) 94444-6666',
        tipoAjuda: 'Cultura e Arte',
        titulo: 'Oficinas de arte para crianças e adolescentes',
        descricao: 'Oferecemos oficinas gratuitas de pintura, desenho e artesanato para crianças e adolescentes da comunidade. Procuramos artistas e arte-educadores voluntários para ministrar as oficinas aos finais de semana. É uma oportunidade incrível de transformar vidas através da arte.',
        cep: '01310-100',
        rua: 'Avenida Paulista',
        numero: '900',
        bairro: 'Bela Vista',
        cidade: 'São Paulo',
        estado: 'SP',
        dataCadastro: '2025-06-10T08:20:00.000Z',
        status: 'ativo'
    }
];

/**
 * Função para popular o localStorage com dados de exemplo
 */
function popularDadosExemplo() {
    // Verifica se já existem dados
    const dadosExistentes = localStorage.getItem('necessidades');
    
    if (!dadosExistentes || JSON.parse(dadosExistentes).length === 0) {
        // Salva os dados de exemplo
        localStorage.setItem('necessidades', JSON.stringify(necessidadesExemplo));
        console.log('Dados de exemplo adicionados com sucesso!');
        console.log(`${necessidadesExemplo.length} necessidades de exemplo criadas`);
        
        // Recarrega a página se estivermos na página de necessidades
        if (window.location.pathname.includes('necessidades.html')) {
            window.location.reload();
        }
    } else {
        console.log('Já existem dados no localStorage');
    }
}

/**
 * Função para limpar todos os dados (útil para desenvolvimento)
 */
function limparTodosDados() {
    localStorage.removeItem('necessidades');
    console.log('Todos os dados foram removidos');
    
    // Recarrega a página
    window.location.reload();
}

/**
 * Função para listar todas as necessidades no console
 */
function listarNecessidades() {
    const necessidades = JSON.parse(localStorage.getItem('necessidades')) || [];
    console.log('Necessidades no localStorage:');
    console.table(necessidades);
    return necessidades;
}

// Adiciona funções ao objeto global para uso no console do navegador
window.popularDadosExemplo = popularDadosExemplo;
window.limparTodosDados = limparTodosDados;
window.listarNecessidades = listarNecessidades;

// Log de inicialização
console.log('Script de dados de exemplo carregado');
console.log('Funções disponíveis:');
console.log('- popularDadosExemplo(): Adiciona dados de exemplo');
console.log('- limparTodosDados(): Remove todos os dados');
console.log('- listarNecessidades(): Lista dados no console');
