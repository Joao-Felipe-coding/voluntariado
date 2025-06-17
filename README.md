# 🤝 Plataforma de Conexão Voluntária Local

Uma plataforma web moderna e intuitiva que conecta ONGs e instituições sociais com voluntários dispostos a ajudar. Desenvolvida com foco na simplicidade, acessibilidade e impacto social.

## 🌟 Sobre o Projeto

A Plataforma de Conexão Voluntária Local foi criada para resolver um problema real: a dificuldade que ONGs enfrentam para encontrar e organizar voluntários. Nossa solução oferece uma interface simples onde instituições podem cadastrar suas necessidades e voluntários podem encontrar oportunidades que combinem com seu perfil.

### 🎯 Objetivo

Otimizar o processo de captação de voluntários, tornando-o mais eficiente e transparente, ampliando assim o impacto social das instituições.

## ✨ Funcionalidades

### 🏠 Página Inicial
- **Apresentação clara** da plataforma e seu propósito
- **Design atrativo** com hero section e estatísticas
- **Navegação intuitiva** para todas as seções

### 📝 Sistema de Cadastro
- **Formulário completo** para cadastro de necessidades
- **Validação robusta** de todos os campos obrigatórios
- **Integração ViaCEP** para preenchimento automático de endereço
- **Armazenamento local** em JavaScript (localStorage)

### 🔍 Visualização de Necessidades
- **Exibição em cards** com design moderno e responsivo
- **Sistema de filtros** por tipo de ajuda e localização
- **Pesquisa em tempo real** por título ou descrição
- **Modal detalhado** com todas as informações
- **Contato direto** via email com templates pré-configurados

### 📱 Design Responsivo
- **Adaptação completa** para desktop, tablet e smartphone
- **Experiência consistente** em todos os dispositivos
- **Menu hamburger** para dispositivos móveis

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura semântica e acessível
- **CSS3** - Estilização moderna com Flexbox e Grid
- **JavaScript ES6+** - Funcionalidades interativas e dinâmicas
- **API ViaCEP** - Preenchimento automático de endereços
- **LocalStorage** - Persistência de dados no navegador
- **Font Awesome** - Ícones modernos e vetoriziais

## 📁 Estrutura do Projeto

```
voluntariado/
├── 📄 index.html              # Página inicial
├── 📄 cadastro.html           # Formulário de cadastro
├── 📄 necessidades.html       # Listagem de necessidades
├── 📄 README.md               # Documentação
├── 📄 LICENSE                 # Licença MIT
└── frontend/
    └── assets/
        ├── css/
        │   ├── 🎨 style.css           # Estilos principais
        │   └── 📱 responsive.css      # Responsividade
        └── js/
            ├── ⚡ main.js              # Funcionalidades gerais
            ├── 📝 cadastro.js          # Sistema de cadastro
            ├── 👁️ necessidades.js      # Visualização de necessidades
            └── 🗃️ dados-exemplo.js     # Dados para demonstração
```

## 🚀 Como Usar

### 1. Preparação
```bash
# Clone o repositório
git clone https://github.com/seu-usuario/voluntariado.git

# Entre no diretório
cd voluntariado
```

### 2. Executar o Projeto
Abra o arquivo `index.html` em seu navegador ou use um servidor local:

```bash
# Com Python 3
python -m http.server 8000

# Com Node.js (http-server)
npx http-server

# Com Live Server (VS Code)
# Clique com botão direito no index.html > "Open with Live Server"
```

### 3. Navegar pela Plataforma
1. **Página Inicial**: Conheça a plataforma
2. **Cadastro**: Registre uma nova necessidade
3. **Necessidades**: Explore oportunidades disponíveis

### 4. Dados de Exemplo
Para facilitar os testes, abra o console do navegador (F12) e execute:
```javascript
// Adicionar dados de exemplo
popularDadosExemplo();

// Listar necessidades cadastradas
listarNecessidades();

// Limpar todos os dados (se necessário)
limparTodosDados();
```

## 🎨 Recursos de Design

### Paleta de Cores
- **Primária**: `#4a6da7` (Azul institucional)
- **Secundária**: `#304e80` (Azul escuro)
- **Destaque**: `#f39c12` (Laranja)
- **Sucesso**: `#2ecc71` (Verde)
- **Erro**: `#e74c3c` (Vermelho)

### Tipografia
- **Fonte principal**: Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- **Hierarquia clara** com diferentes pesos e tamanhos
- **Legibilidade otimizada** para todos os dispositivos

## 🔧 Funcionalidades Técnicas

### Sistema de Validação
- ✅ Validação de campos obrigatórios
- ✅ Verificação de formato de email
- ✅ Validação de CEP
- ✅ Máscaras para telefone e CEP
- ✅ Feedback visual em tempo real

### Integração ViaCEP
- 🔍 Busca automática por CEP
- 📍 Preenchimento de endereço completo
- ⚡ Validação e tratamento de erros
- 🔄 Loading states durante requisições

### Sistema de Filtros
- 🔍 Pesquisa textual em tempo real
- 🏷️ Filtro por tipo de ajuda
- 🏢 Filtro por cidade (dinâmico)
- 🧹 Limpeza de filtros

### Armazenamento de Dados
- 💾 LocalStorage para persistência
- 🔄 Sincronização automática
- 🗃️ Estrutura JSON organizada
- 🔒 Validação de dados

## 📱 Compatibilidade

### Navegadores Suportados
- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

### Dispositivos
- 💻 **Desktop**: 1200px+
- 📱 **Tablet**: 768px - 1199px
- 📱 **Mobile**: 320px - 767px

## 🤝 Como Contribuir

1. **Fork** este repositório
2. **Clone** seu fork localmente
3. **Crie** uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
4. **Commit** suas mudanças (`git commit -m 'feat: Add some AmazingFeature'`)
5. **Push** para a branch (`git push origin feature/AmazingFeature`)
6. **Abra** um Pull Request

### Padrão de Commits
Seguimos a convenção de commits semânticos:
- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `style:` Mudanças de estilo/CSS
- `refactor:` Refatoração de código
- `docs:` Documentação
- `test:` Testes

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Desenvolvedores

- **Desenvolvimento**: Plataforma criada com foco em boas práticas e experiência do usuário
- **Design**: Interface moderna e acessível
- **Responsividade**: Compatível com todos os dispositivos

## 🌟 Demonstração

### Screenshots

#### 🏠 Página Inicial
- Hero section atrativo com call-to-actions
- Seção "Como Funciona" explicativa
- Estatísticas de impacto social

#### 📝 Cadastro de Necessidades
- Formulário organizado em seções
- Validação em tempo real
- Integração com ViaCEP

#### 👁️ Visualização de Necessidades
- Cards informativos e interativos
- Sistema de filtros avançado
- Modal com detalhes completos

## 🚀 Próximas Funcionalidades

- [ ] Sistema de notificações
- [ ] Integração com redes sociais
- [ ] Sistema de avaliações
- [ ] Chat entre voluntários e ONGs
- [ ] Mapa de localização
- [ ] Dashboard administrativo

## 📞 Suporte

Para dúvidas, sugestões ou reportar problemas:
- 📧 Email: contato@voluntariado.com
- 🐛 Issues: [GitHub Issues](https://github.com/seu-usuario/voluntariado/issues)

---

**🤝 Juntos podemos transformar nossa comunidade através do voluntariado!**
