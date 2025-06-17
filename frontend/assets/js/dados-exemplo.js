/**
 * Dados de Exemplo para Demonstração
 * Script para popular o localStorage com necessidades de exemplo
 */

// Dados de exemplo de necessidades
const necessidadesExemplo = [
    {
        id: 'exemplo-001',
        nomeInstituicao: 'ONG Esperança',
        tipoAjuda: 'Educação',
        titulo: 'Aulas de reforço escolar para crianças',
        descricao: 'Precisamos de voluntários para dar aulas de reforço escolar para crianças de 7 a 12 anos em matemática e português. As aulas acontecem de segunda a sexta, das 14h às 16h. É necessário ter ensino médio completo e paciência para lidar com crianças.',
        endereco: {
            cep: '01310-100',
            rua: 'Avenida Paulista',
            numero: '1578',
            bairro: 'Bela Vista',
            cidade: 'São Paulo',
            estado: 'SP'
        },
        contato: {
            email: 'contato@ongesperanca.org.br',
            telefone: '(11) 99999-1111'
        },
        dataCadastro: '06/15/2025'
    },
    {
        id: 'exemplo-002',
        nomeInstituicao: 'Instituto Verde',
        tipoAjuda: 'Meio Ambiente',
        titulo: 'Reflorestamento no Parque Municipal',
        descricao: 'Ação de reflorestamento no Parque Municipal da cidade. Vamos plantar mudas nativas da região aos sábados pela manhã, das 8h às 12h. Não é necessária experiência prévia, oferecemos orientação e todos os materiais necessários.',
        endereco: {
            cep: '04038-001',
            rua: 'Rua Vergueiro',
            numero: '3185',
            bairro: 'Vila Mariana',
            cidade: 'São Paulo',
            estado: 'SP'
        },
        contato: {
            email: 'meio.ambiente@institutoverde.org',
            telefone: '(11) 98888-2222'
        },
        dataCadastro: '06/14/2025'
    },
    {
        id: 'exemplo-003',
        nomeInstituicao: 'Ação Solidária',
        tipoAjuda: 'Doação de Alimentos',
        titulo: 'Distribuição de cestas básicas',
        descricao: 'Organizamos a distribuição mensal de cestas básicas para famílias em situação de vulnerabilidade. Precisamos de voluntários para ajudar na organização, separação e entrega das cestas. Atividade realizada no primeiro sábado de cada mês, das 7h às 13h.',
        endereco: {
            cep: '03310-000',
            rua: 'Rua Conselheiro Carrão',
            numero: '2041',
            bairro: 'Vila Carrão',
            cidade: 'São Paulo',
            estado: 'SP'
        },
        contato: {
            email: 'voluntarios@acaosolidaria.com.br',
            telefone: '(11) 97777-3333'
        },
        dataCadastro: '06/13/2025'
    },
    {
        id: 'exemplo-004',
        nomeInstituicao: 'Saúde para Todos',
        tipoAjuda: 'Saúde',
        titulo: 'Campanha de vacinação comunitária',
        descricao: 'Apoio em campanha de vacinação para a comunidade local. Buscamos voluntários para auxiliar no cadastro, organização de filas e orientação aos visitantes. Ação acontece durante todo o mês, de segunda a sexta, das 8h às 17h.',
        endereco: {
            cep: '05402-000',
            rua: 'Rua Cardeal Arcoverde',
            numero: '1234',
            bairro: 'Pinheiros',
            cidade: 'São Paulo',
            estado: 'SP'
        },
        contato: {
            email: 'saude@saudeparatodos.org.br',
            telefone: '(11) 96666-4444'
        },
        dataCadastro: '06/12/2025'
    },
    {
        id: 'exemplo-005',
        nomeInstituicao: 'Casa do Idoso',
        tipoAjuda: 'Assistência Social',
        titulo: 'Companhia para idosos',
        descricao: 'Procuramos voluntários para fazer companhia aos nossos idosos residentes. Atividades incluem conversas, jogos, leitura e passeios. É uma oportunidade de trocar experiências e alegrar o dia de quem tanto tem para ensinar.',
        endereco: {
            cep: '02011-000',
            rua: 'Rua Voluntários da Pátria',
            numero: '567',
            bairro: 'Santana',
            cidade: 'São Paulo',
            estado: 'SP'
        },
        contato: {
            email: 'voluntarios@casadoidoso.org.br',
            telefone: '(11) 95555-5555'
        },
        dataCadastro: '06/11/2025'
    },
    {
        id: 'exemplo-006',
        nomeInstituicao: 'Arte e Cultura Popular',
        tipoAjuda: 'Cultura e Arte',
        titulo: 'Oficinas de arte para jovens',
        descricao: 'Oferecemos oficinas gratuitas de arte (pintura, música, teatro) para jovens da comunidade. Buscamos voluntários com conhecimento em qualquer área artística para compartilhar seus talentos e inspirar a nova geração.',
        endereco: {
            cep: '04567-000',
            rua: 'Rua Augusta',
            numero: '2468',
            bairro: 'Consolação',
            cidade: 'São Paulo',
            estado: 'SP'
        },
        contato: {
            email: 'oficinas@arteeculturapopular.org',
            telefone: '(11) 94444-6666'
        },
        dataCadastro: '06/10/2025'
    }
];

/**
 * Função para popular o localStorage com dados de exemplo
 */
function popularDadosExemplo() {
    try {
        // Verifica se já existem dados no localStorage
        const necessidadesExistentes = localStorage.getItem('necessidades');
        
        if (!necessidadesExistentes || JSON.parse(necessidadesExistentes).length === 0) {
            // Salva os dados de exemplo
            localStorage.setItem('necessidades', JSON.stringify(necessidadesExemplo));
            console.log('✅ Dados de exemplo carregados com sucesso!');
            console.log(`📋 ${necessidadesExemplo.length} necessidades de exemplo adicionadas`);
            return true;
        } else {
            console.log('ℹ️ Dados já existem no localStorage');
            return false;
        }
    } catch (error) {
        console.error('❌ Erro ao carregar dados de exemplo:', error);
        return false;
    }
}

/**
 * Função para limpar todos os dados
 */
function limparDados() {
    localStorage.removeItem('necessidades');
    console.log('🗑️ Dados limpos do localStorage');
}

/**
 * Função para recarregar dados de exemplo (substitui os existentes)
 */
function recarregarDadosExemplo() {
    localStorage.setItem('necessidades', JSON.stringify(necessidadesExemplo));
    console.log('🔄 Dados de exemplo recarregados!');
    console.log(`📋 ${necessidadesExemplo.length} necessidades de exemplo carregadas`);
}

// Auto-execução ao carregar a página (apenas se estiver na página inicial)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
            popularDadosExemplo();
        }
    });
} else {
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        popularDadosExemplo();
    }
}

// Expor funções globalmente para uso no console
window.popularDadosExemplo = popularDadosExemplo;
window.limparDados = limparDados;
window.recarregarDadosExemplo = recarregarDadosExemplo;
