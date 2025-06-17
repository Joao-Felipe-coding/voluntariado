/**
 * Cadastro de Necessidades - JavaScript
 * Sistema para cadastramento de necessidades de voluntariado com integração ViaCEP
 */

// Array para armazenar as necessidades cadastradas (simulando banco de dados)
let necessidadesCadastradas = JSON.parse(localStorage.getItem('necessidades')) || [];

// Elementos do DOM
const form = document.getElementById('cadastroForm');
const cepInput = document.getElementById('cep');
const ruaInput = document.getElementById('rua');
const bairroInput = document.getElementById('bairro');
const cidadeInput = document.getElementById('cidade');
const estadoInput = document.getElementById('estado');

/**
 * Inicialização do sistema quando a página carrega
 */
document.addEventListener('DOMContentLoaded', function() {
    inicializarSistema();
});

/**
 * Configura todos os event listeners e máscaras do formulário
 */
function inicializarSistema() {
    // Event listener para o formulário
    form.addEventListener('submit', processarCadastro);
    
    // Event listener para o CEP (busca automática)
    cepInput.addEventListener('blur', buscarEnderecoPorCEP);
    cepInput.addEventListener('input', aplicarMascaraCEP);
    
    // Event listener para telefone (máscara)
    const telefoneInput = document.getElementById('telefone');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', aplicarMascaraTelefone);
    }
    
    // Event listener para botão limpar
    const btnLimpar = document.getElementById('limparForm');
    if (btnLimpar) {
        btnLimpar.addEventListener('click', limparFormulario);
    }
    
    // Validação em tempo real dos campos
    configurarValidacaoTempo();
    
    console.log('Sistema de cadastro inicializado com sucesso');
}

/**
 * Processa o envio do formulário de cadastro
 */
function processarCadastro(event) {
    event.preventDefault();
    
    // Limpa mensagens de erro anteriores
    limparMensagensErro();
    
    // Coleta todos os dados do formulário
    const dadosFormulario = coletarDadosFormulario();
    
    // Valida os dados
    if (!validarFormulario(dadosFormulario)) {
        exibirNotificacao('Por favor, corrija os erros destacados.', 'error');
        return;
    }
    
    // Adiciona timestamp e ID único
    const necessidade = {
        id: gerarIdUnico(),
        ...dadosFormulario,
        dataCadastro: new Date().toISOString(),
        status: 'ativo'
    };
    
    // Salva a necessidade
    salvarNecessidade(necessidade);
    
    // Exibe mensagem de sucesso
    exibirMensagemSucesso();
    
    // Limpa o formulário
    setTimeout(() => {
        limparFormulario();
    }, 2000);
}

/**
 * Coleta todos os dados do formulário
 */
function coletarDadosFormulario() {
    return {
        nomeInstituicao: document.getElementById('nomeInstituicao').value.trim(),
        contato: document.getElementById('contato').value.trim(),
        telefone: document.getElementById('telefone').value.trim(),
        tipoAjuda: document.getElementById('tipoAjuda').value,
        titulo: document.getElementById('titulo').value.trim(),
        descricao: document.getElementById('descricao').value.trim(),
        cep: document.getElementById('cep').value.trim(),
        rua: document.getElementById('rua').value.trim(),
        numero: document.getElementById('numero').value.trim(),
        bairro: document.getElementById('bairro').value.trim(),
        cidade: document.getElementById('cidade').value.trim(),
        estado: document.getElementById('estado').value.trim()
    };
}

/**
 * Valida todos os campos do formulário
 */
function validarFormulario(dados) {
    let formularioValido = true;
    
    // Validação Nome da Instituição
    if (!dados.nomeInstituicao || dados.nomeInstituicao.length < 2) {
        exibirErro('nomeInstituicao', 'Nome da instituição deve ter pelo menos 2 caracteres');
        formularioValido = false;
    }
    
    // Validação E-mail
    if (!dados.contato || !validarEmail(dados.contato)) {
        exibirErro('contato', 'Por favor, insira um e-mail válido');
        formularioValido = false;
    }
    
    // Validação Telefone (se preenchido)
    if (dados.telefone && !validarTelefone(dados.telefone)) {
        exibirErro('telefone', 'Formato de telefone inválido');
        formularioValido = false;
    }
    
    // Validação Tipo de Ajuda
    if (!dados.tipoAjuda) {
        exibirErro('tipoAjuda', 'Selecione um tipo de ajuda');
        formularioValido = false;
    }
    
    // Validação Título
    if (!dados.titulo || dados.titulo.length < 5) {
        exibirErro('titulo', 'Título deve ter pelo menos 5 caracteres');
        formularioValido = false;
    }
    
    // Validação Descrição
    if (!dados.descricao || dados.descricao.length < 20) {
        exibirErro('descricao', 'Descrição deve ter pelo menos 20 caracteres');
        formularioValido = false;
    }
    
    // Validação CEP
    if (!dados.cep || !validarCEP(dados.cep)) {
        exibirErro('cep', 'CEP deve ter 8 dígitos');
        formularioValido = false;
    }
    
    // Validação campos de endereço
    if (!dados.rua) {
        exibirErro('rua', 'Endereço é obrigatório');
        formularioValido = false;
    }
    
    if (!dados.bairro) {
        exibirErro('bairro', 'Bairro é obrigatório');
        formularioValido = false;
    }
    
    if (!dados.cidade) {
        exibirErro('cidade', 'Cidade é obrigatória');
        formularioValido = false;
    }
    
    if (!dados.estado) {
        exibirErro('estado', 'Estado é obrigatório');
        formularioValido = false;
    }
    
    return formularioValido;
}

/**
 * Busca endereço automaticamente via API ViaCEP
 */
async function buscarEnderecoPorCEP() {
    const cep = cepInput.value.replace(/\D/g, '');
    
    // Verifica se o CEP tem 8 dígitos
    if (cep.length !== 8) {
        return;
    }
    
    // Exibe loading
    exibirLoadingCEP(true);
    
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const dadosEndereco = await response.json();
        
        if (dadosEndereco.erro) {
            throw new Error('CEP não encontrado');
        }
        
        // Preenche os campos automaticamente
        preencherCamposEndereco(dadosEndereco);
        
        // Remove readonly temporariamente se necessário editar
        removerReadonlyEndereco();
        
        exibirNotificacao('Endereço encontrado com sucesso!', 'success');
        
    } catch (error) {
        console.error('Erro ao buscar CEP:', error);
        exibirErro('cep', 'CEP não encontrado. Verifique e tente novamente.');
        limparCamposEndereco();
    } finally {
        exibirLoadingCEP(false);
    }
}

/**
 * Preenche os campos de endereço com dados da API
 */
function preencherCamposEndereco(dados) {
    ruaInput.value = dados.logradouro || '';
    bairroInput.value = dados.bairro || '';
    cidadeInput.value = dados.localidade || '';
    estadoInput.value = dados.uf || '';
}

/**
 * Limpa os campos de endereço
 */
function limparCamposEndereco() {
    ruaInput.value = '';
    bairroInput.value = '';
    cidadeInput.value = '';
    estadoInput.value = '';
}

/**
 * Remove readonly dos campos de endereço para permitir edição
 */
function removerReadonlyEndereco() {
    ruaInput.removeAttribute('readonly');
    bairroInput.removeAttribute('readonly');
    cidadeInput.removeAttribute('readonly');
    estadoInput.removeAttribute('readonly');
}

/**
 * Salva a necessidade no localStorage
 */
function salvarNecessidade(necessidade) {
    necessidadesCadastradas.push(necessidade);
    localStorage.setItem('necessidades', JSON.stringify(necessidadesCadastradas));
    console.log('Necessidade salva:', necessidade);
}

/**
 * Gera um ID único para a necessidade
 */
function gerarIdUnico() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Limpa todo o formulário
 */
function limparFormulario() {
    form.reset();
    limparMensagensErro();
    
    // Adiciona readonly novamente aos campos de endereço
    ruaInput.setAttribute('readonly', 'readonly');
    bairroInput.setAttribute('readonly', 'readonly');
    cidadeInput.setAttribute('readonly', 'readonly');
    estadoInput.setAttribute('readonly', 'readonly');
    
    // Foca no primeiro campo
    document.getElementById('nomeInstituicao').focus();
}

/**
 * Configura validação em tempo real
 */
function configurarValidacaoTempo() {
    const campos = ['nomeInstituicao', 'contato', 'titulo', 'descricao'];
    
    campos.forEach(campo => {
        const elemento = document.getElementById(campo);
        if (elemento) {
            elemento.addEventListener('blur', function() {
                const errorId = `error-${campo}`;
                const errorElement = document.getElementById(errorId);
                if (errorElement && errorElement.textContent) {
                    // Revalida o campo se havia erro
                    const dados = { [campo]: this.value.trim() };
                    validarCampoEspecifico(campo, dados);
                }
            });
        }
    });
}

/**
 * Valida um campo específico
 */
function validarCampoEspecifico(campo, dados) {
    limparErro(campo);
    
    switch (campo) {
        case 'nomeInstituicao':
            if (!dados[campo] || dados[campo].length < 2) {
                exibirErro(campo, 'Nome da instituição deve ter pelo menos 2 caracteres');
            }
            break;
        case 'contato':
            if (!dados[campo] || !validarEmail(dados[campo])) {
                exibirErro(campo, 'Por favor, insira um e-mail válido');
            }
            break;
        case 'titulo':
            if (!dados[campo] || dados[campo].length < 5) {
                exibirErro(campo, 'Título deve ter pelo menos 5 caracteres');
            }
            break;
        case 'descricao':
            if (!dados[campo] || dados[campo].length < 20) {
                exibirErro(campo, 'Descrição deve ter pelo menos 20 caracteres');
            }
            break;
    }
}

// ============= FUNÇÕES UTILITÁRIAS =============

/**
 * Valida formato de e-mail
 */
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/**
 * Valida formato de telefone
 */
function validarTelefone(telefone) {
    const regex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
    return regex.test(telefone);
}

/**
 * Valida CEP
 */
function validarCEP(cep) {
    const regex = /^\d{5}-?\d{3}$/;
    return regex.test(cep);
}

/**
 * Aplica máscara ao CEP
 */
function aplicarMascaraCEP(event) {
    let valor = event.target.value.replace(/\D/g, '');
    if (valor.length > 5) {
        valor = valor.replace(/^(\d{5})(\d)/, '$1-$2');
    }
    event.target.value = valor;
}

/**
 * Aplica máscara ao telefone
 */
function aplicarMascaraTelefone(event) {
    let valor = event.target.value.replace(/\D/g, '');
    
    if (valor.length > 0) {
        if (valor.length <= 2) {
            valor = `(${valor}`;
        } else if (valor.length <= 6) {
            valor = valor.replace(/^(\d{2})(\d)/, '($1) $2');
        } else if (valor.length <= 10) {
            valor = valor.replace(/^(\d{2})(\d{4})(\d)/, '($1) $2-$3');
        } else {
            valor = valor.replace(/^(\d{2})(\d{5})(\d)/, '($1) $2-$3');
        }
    }
    
    event.target.value = valor;
}

/**
 * Exibe mensagem de erro para um campo específico
 */
function exibirErro(campo, mensagem) {
    const errorElement = document.getElementById(`error-${campo}`);
    if (errorElement) {
        errorElement.textContent = mensagem;
        errorElement.style.display = 'block';
    }
    
    // Adiciona classe de erro ao campo
    const inputElement = document.getElementById(campo);
    if (inputElement) {
        inputElement.classList.add('error');
    }
}

/**
 * Limpa mensagem de erro de um campo específico
 */
function limparErro(campo) {
    const errorElement = document.getElementById(`error-${campo}`);
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
    
    // Remove classe de erro do campo
    const inputElement = document.getElementById(campo);
    if (inputElement) {
        inputElement.classList.remove('error');
    }
}

/**
 * Limpa todas as mensagens de erro
 */
function limparMensagensErro() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => {
        error.textContent = '';
        error.style.display = 'none';
    });
    
    // Remove classes de erro dos campos
    const inputsWithError = document.querySelectorAll('.form-control.error');
    inputsWithError.forEach(input => {
        input.classList.remove('error');
    });
}

/**
 * Exibe/oculta loading do CEP
 */
function exibirLoadingCEP(exibir) {
    const loadingElement = document.getElementById('loadingCep');
    if (loadingElement) {
        loadingElement.style.display = exibir ? 'block' : 'none';
    }
}

/**
 * Exibe mensagem de sucesso
 */
function exibirMensagemSucesso() {
    exibirNotificacao('Necessidade cadastrada com sucesso! Redirecionando...', 'success');
    
    // Redireciona para a página de necessidades após 3 segundos
    setTimeout(() => {
        window.location.href = 'necessidades.html';
    }, 3000);
}

/**
 * Sistema de notificações toast
 */
function exibirNotificacao(mensagem, tipo = 'info') {
    // Remove notificação anterior se existir
    const notificacaoAnterior = document.querySelector('.toast-notification');
    if (notificacaoAnterior) {
        notificacaoAnterior.remove();
    }
    
    // Cria nova notificação
    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${tipo}`;
    toast.innerHTML = `
        <i class="fas ${tipo === 'success' ? 'fa-check-circle' : tipo === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
        <span>${mensagem}</span>
        <button type="button" class="toast-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Adiciona ao body
    document.body.appendChild(toast);
    
    // Remove automaticamente após 5 segundos
    setTimeout(() => {
        if (toast.parentElement) {
            toast.remove();
        }
    }, 5000);
    
    // Animação de entrada
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
}

// ============= INICIALIZAÇÃO =============

// Log de inicialização
console.log('Sistema de Cadastro de Necessidades carregado');
console.log(`Necessidades já cadastradas: ${necessidadesCadastradas.length}`);
