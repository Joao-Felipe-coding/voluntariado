document.addEventListener('DOMContentLoaded', function() {
    // Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('show');
        });
    }
    
    // Fechando o menu ao clicar em um link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('show');
        });
    });

    // Inicializar funcionalidades do formulário se estivermos na página de cadastro
    if (window.location.pathname.includes('cadastro.html')) {
        initCadastroForm();
    }

    // Inicializar funcionalidades da página de necessidades se estivermos nela
    if (window.location.pathname.includes('necessidades.html')) {
        initNecessidadesPage();
    }
});

/**
 * Inicializa as funcionalidades do formulário de cadastro
 */
function initCadastroForm() {
    const form = document.getElementById('cadastroForm');
    const cepInput = document.getElementById('cep');
    const telefoneInput = document.getElementById('telefone');

    if (!form) return;

    // Máscara para CEP
    cepInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length <= 8) {
            value = value.replace(/(\d{5})(\d)/, '$1-$2');
            e.target.value = value;
        }
    });

    // Máscara para telefone
    telefoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length <= 11) {
            if (value.length <= 10) {
                value = value.replace(/(\d{2})(\d{4})(\d)/, '($1) $2-$3');
            } else {
                value = value.replace(/(\d{2})(\d{5})(\d)/, '($1) $2-$3');
            }
            e.target.value = value;
        }
    });

    // Busca automática de endereço por CEP
    cepInput.addEventListener('blur', buscarEnderecoPorCEP);

    // Validação e envio do formulário
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validarFormulario()) {
            salvarNecessidade();
        }
    });
}

/**
 * Busca endereço automaticamente via API ViaCEP
 */
async function buscarEnderecoPorCEP() {
    const cepInput = document.getElementById('cep');
    const loadingElement = document.getElementById('loadingCep');
    const errorElement = document.getElementById('errorCep');
    
    const cep = cepInput.value.replace(/\D/g, '');
    
    // Validar CEP
    if (cep.length !== 8) {
        mostrarErro('errorCep', 'CEP deve conter 8 dígitos');
        limparCamposEndereco();
        return;
    }

    try {
        // Mostrar loading
        loadingElement.style.display = 'block';
        errorElement.style.display = 'none';
        limparCamposEndereco();

        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        loadingElement.style.display = 'none';

        if (data.erro) {
            mostrarErro('errorCep', 'CEP não encontrado');
            return;
        }

        // Preencher campos automaticamente
        document.getElementById('rua').value = data.logradouro || '';
        document.getElementById('bairro').value = data.bairro || '';
        document.getElementById('cidade').value = data.localidade || '';
        document.getElementById('estado').value = data.uf || '';

        // Remover erro se houver
        removerErro('errorCep');

    } catch (error) {
        console.error('Erro ao buscar CEP:', error);
        loadingElement.style.display = 'none';
        mostrarErro('errorCep', 'Erro ao buscar CEP. Verifique sua conexão');
    }
}

/**
 * Limpa os campos de endereço
 */
function limparCamposEndereco() {
    document.getElementById('rua').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
}

/**
 * Valida todos os campos do formulário
 */
function validarFormulario() {
    let isValid = true;

    // Limpar erros anteriores
    document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));

    // Validar nome da instituição
    const nomeInstituicao = document.getElementById('nomeInstituicao');
    if (!nomeInstituicao.value.trim()) {
        mostrarErro('errorNomeInstituicao', 'Nome da instituição é obrigatório');
        nomeInstituicao.classList.add('error');
        isValid = false;
    }

    // Validar tipo de ajuda
    const tipoAjuda = document.getElementById('tipoAjuda');
    if (!tipoAjuda.value) {
        mostrarErro('errorTipoAjuda', 'Selecione o tipo de ajuda');
        tipoAjuda.classList.add('error');
        isValid = false;
    }

    // Validar título
    const titulo = document.getElementById('titulo');
    if (!titulo.value.trim()) {
        mostrarErro('errorTitulo', 'Título é obrigatório');
        titulo.classList.add('error');
        isValid = false;
    }

    // Validar descrição
    const descricao = document.getElementById('descricao');
    if (!descricao.value.trim()) {
        mostrarErro('errorDescricao', 'Descrição é obrigatória');
        descricao.classList.add('error');
        isValid = false;
    }

    // Validar CEP
    const cep = document.getElementById('cep');
    const cepLimpo = cep.value.replace(/\D/g, '');
    if (cepLimpo.length !== 8) {
        mostrarErro('errorCep', 'CEP deve conter 8 dígitos');
        cep.classList.add('error');
        isValid = false;
    }

    // Validar email
    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailRegex.test(email.value)) {
        mostrarErro('errorEmail', 'E-mail inválido');
        email.classList.add('error');
        isValid = false;
    }

    // Validar telefone (opcional, mas se preenchido deve estar correto)
    const telefone = document.getElementById('telefone');
    if (telefone.value.trim()) {
        const telefoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
        if (!telefoneRegex.test(telefone.value)) {
            mostrarErro('errorTelefone', 'Formato de telefone inválido');
            telefone.classList.add('error');
            isValid = false;
        }
    }

    return isValid;
}

/**
 * Salva a necessidade no localStorage
 */
function salvarNecessidade() {
    const form = document.getElementById('cadastroForm');
    const formData = new FormData(form);
    
    // Criar objeto da necessidade
    const necessidade = {
        id: Date.now(), // ID único baseado no timestamp
        nomeInstituicao: formData.get('nomeInstituicao'),
        tipoAjuda: formData.get('tipoAjuda'),
        titulo: formData.get('titulo'),
        descricao: formData.get('descricao'),
        endereco: {
            cep: formData.get('cep'),
            rua: formData.get('rua'),
            bairro: formData.get('bairro'),
            cidade: formData.get('cidade'),
            estado: formData.get('estado')
        },
        contato: {
            email: formData.get('email'),
            telefone: formData.get('telefone')
        },
        dataCadastro: new Date().toLocaleDateString('pt-BR')
    };

    // Recuperar necessidades existentes ou criar array vazio
    let necessidades = JSON.parse(localStorage.getItem('necessidades')) || [];
    
    // Adicionar nova necessidade
    necessidades.push(necessidade);
    
    // Salvar no localStorage
    localStorage.setItem('necessidades', JSON.stringify(necessidades));

    // Mostrar mensagem de sucesso
    mostrarSucesso();
    
    // Limpar formulário após 2 segundos
    setTimeout(() => {
        limparFormulario();
        document.getElementById('successMessage').style.display = 'none';
    }, 3000);
}

/**
 * Mostra mensagem de erro
 */
function mostrarErro(elementId, mensagem) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = mensagem;
    errorElement.style.display = 'block';
}

/**
 * Remove mensagem de erro
 */
function removerErro(elementId) {
    const errorElement = document.getElementById(elementId);
    errorElement.style.display = 'none';
}

/**
 * Mostra mensagem de sucesso
 */
function mostrarSucesso() {
    const successElement = document.getElementById('successMessage');
    successElement.style.display = 'flex';
    
    // Scroll para a mensagem
    successElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/**
 * Limpa todos os campos do formulário
 */
function limparFormulario() {
    const form = document.getElementById('cadastroForm');
    if (form) {
        form.reset();
        limparCamposEndereco();
        
        // Limpar erros
        document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');
        document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
    }
}