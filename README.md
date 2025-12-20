# 📚 Express Book Reviews API

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)
![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg?style=for-the-badge)

**Uma API RESTful moderna para gerenciamento de livros e revisões, construída com Express.js**

[Funcionalidades](#-funcionalidades) • [Instalação](#-instalação) • [Uso](#-como-usar) • [Documentação da API](#-documentação-da-api)

</div>

---

## 📋 Sobre o Projeto

O **Express Book Reviews** é uma API REST completa que permite gerenciar um catálogo de livros e suas revisões. Desenvolvida com Node.js e Express.js, oferece funcionalidades de autenticação segura usando JWT (JSON Web Tokens), permitindo que usuários registrados adicionem e gerenciem revisões de livros.

### ✨ Funcionalidades

- 🔐 **Autenticação de Usuários**: Sistema de registro e login com JWT
- 📖 **Catálogo de Livros**: Listagem completa de livros disponíveis
- 🔍 **Busca Avançada**: Pesquisa por ISBN, autor ou título
- ⭐ **Sistema de Revisões**: Usuários autenticados podem adicionar e excluir revisões
- 🔒 **Proteção de Rotas**: Middleware de autenticação para rotas protegidas
- 📝 **Sessões**: Gerenciamento de sessões com express-session

---

## 🛠️ Tecnologias Utilizadas

- **Node.js** - Ambiente de execução JavaScript
- **Express.js** - Framework web para Node.js
- **JSON Web Token (JWT)** - Autenticação baseada em tokens
- **express-session** - Gerenciamento de sessões
- **nodemon** - Desenvolvimento com hot-reload

---

## 📦 Instalação

### Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

### Passos para Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/expressBookReviews.git
cd expressBookReviews
```

2. **Navegue até o diretório do projeto**
```bash
cd final_project
```

3. **Instale as dependências**
```bash
npm install
```

4. **Inicie o servidor**
```bash
npm start
```

O servidor estará rodando em `http://localhost:5000`

---

## 🚀 Como Usar

### 1. Registrar um Novo Usuário

```bash
POST http://localhost:5000/register
Content-Type: application/json

{
  "username": "usuario123",
  "password": "senha123"
}
```

**Resposta de sucesso:**
```json
{
  "message": "User successfully registered. Now you can login"
}
```

### 2. Fazer Login

```bash
POST http://localhost:5000/customer/login
Content-Type: application/json

{
  "username": "usuario123",
  "password": "senha123"
}
```

**Resposta de sucesso:**
```
Welcome back usuario123
```

### 3. Listar Todos os Livros

```bash
GET http://localhost:5000/
```

### 4. Buscar Livro por ISBN

```bash
GET http://localhost:5000/isbn/1
```

### 5. Buscar Livros por Autor

```bash
GET http://localhost:5000/author/Chinua%20Achebe
```

### 6. Buscar Livro por Título

```bash
GET http://localhost:5000/title/Things%20Fall%20Apart
```

### 7. Ver Revisões de um Livro

```bash
GET http://localhost:5000/review/1
```

### 8. Adicionar Revisão (Autenticado)

```bash
PUT http://localhost:5000/customer/auth/review/1?review=Excelente livro!
```

### 9. Deletar Revisão (Autenticado)

```bash
DELETE http://localhost:5000/customer/auth/review/1
```

---

## 📖 Documentação da API

### Endpoints Públicos

#### `POST /register`
Registra um novo usuário no sistema.

**Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Respostas:**
- `200` - Usuário registrado com sucesso
- `404` - Usuário já existe ou dados inválidos

---

#### `GET /`
Retorna a lista completa de todos os livros disponíveis.

**Resposta:**
```json
{
  "1": {
    "author": "Chinua Achebe",
    "title": "Things Fall Apart",
    "reviews": {}
  },
  ...
}
```

---

#### `GET /isbn/:isbn`
Retorna os detalhes de um livro específico pelo ISBN.

**Parâmetros:**
- `isbn` (path) - ISBN do livro

**Resposta:**
```json
{
  "author": "Chinua Achebe",
  "title": "Things Fall Apart",
  "reviews": {}
}
```

---

#### `GET /author/:author`
Retorna todos os livros de um autor específico.

**Parâmetros:**
- `author` (path) - Nome do autor

**Resposta:**
```json
[
  {
    "author": "Chinua Achebe",
    "title": "Things Fall Apart",
    "reviews": {}
  }
]
```

---

#### `GET /title/:title`
Retorna um livro específico pelo título.

**Parâmetros:**
- `title` (path) - Título do livro

**Resposta:**
```json
{
  "author": "Chinua Achebe",
  "title": "Things Fall Apart",
  "reviews": {}
}
```

---

#### `GET /review/:isbn`
Retorna todas as revisões de um livro específico.

**Parâmetros:**
- `isbn` (path) - ISBN do livro

**Resposta:**
```json
{
  "usuario123": "Excelente livro!",
  "outroUsuario": "Muito bom!"
}
```

---

### Endpoints Autenticados

> ⚠️ **Nota:** Todos os endpoints abaixo requerem autenticação. Faça login primeiro para obter o token de acesso.

#### `POST /customer/login`
Autentica um usuário e cria uma sessão.

**Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Respostas:**
- `200` - Login bem-sucedido
- `401` - Credenciais inválidas

---

#### `PUT /customer/auth/review/:isbn`
Adiciona ou atualiza uma revisão para um livro específico.

**Parâmetros:**
- `isbn` (path) - ISBN do livro
- `review` (query) - Texto da revisão

**Respostas:**
- `200` - Revisão adicionada com sucesso
- `400` - Revisão não fornecida
- `401` - Usuário não autenticado
- `404` - Livro não encontrado

**Exemplo:**
```
PUT /customer/auth/review/1?review=Adorei este livro!
```

---

#### `DELETE /customer/auth/review/:isbn`
Remove a revisão do usuário autenticado de um livro específico.

**Parâmetros:**
- `isbn` (path) - ISBN do livro

**Respostas:**
- `200` - Revisão deletada com sucesso
- `401` - Usuário não autenticado
- `404` - Revisão não encontrada

---

## 📁 Estrutura do Projeto

```
expressBookReviews/
│
├── final_project/
│   ├── index.js              # Arquivo principal do servidor
│   ├── package.json          # Dependências do projeto
│   │
│   └── router/
│       ├── auth_users.js     # Rotas de autenticação e revisões
│       ├── booksdb.js        # Base de dados de livros
│       └── general.js        # Rotas públicas
│
├── LICENSE                   # Licença Apache 2.0
└── README.md                 # Este arquivo
```

---

## 🔐 Autenticação

O sistema utiliza **JWT (JSON Web Tokens)** para autenticação. Após fazer login, um token de acesso é armazenado na sessão do usuário e é válido por 60 segundos.

**Fluxo de Autenticação:**
1. Usuário faz login em `/customer/login`
2. Um token JWT é gerado e armazenado na sessão
3. O token é automaticamente verificado em rotas protegidas (`/customer/auth/*`)
4. Se o token for inválido ou expirado, o acesso é negado

---

## 📝 Exemplos de Uso com cURL

### Registrar Usuário
```bash
curl -X POST http://localhost:5000/register \
  -H "Content-Type: application/json" \
  -d '{"username":"novoUsuario","password":"senha123"}'
```

### Fazer Login
```bash
curl -X POST http://localhost:5000/customer/login \
  -H "Content-Type: application/json" \
  -d '{"username":"novoUsuario","password":"senha123"}' \
  -c cookies.txt
```

### Adicionar Revisão (com cookies de sessão)
```bash
curl -X PUT "http://localhost:5000/customer/auth/review/1?review=Ótimo livro!" \
  -b cookies.txt
```

---

## 🧪 Testando a API

Você pode testar a API usando:

- **cURL** - Linha de comando
- **Postman** - Interface gráfica
- **Thunder Client** - Extensão do VS Code
- **Insomnia** - Cliente REST
- **httpie** - Cliente HTTP moderno

---

## ⚙️ Configuração

### Variáveis de Ambiente

Para produção, considere mover as seguintes configurações para variáveis de ambiente:

- `PORT` - Porta do servidor (padrão: 5000)
- `JWT_SECRET` - Chave secreta para JWT (atualmente: "access")
- `SESSION_SECRET` - Chave secreta para sessões (atualmente: "fingerprint_customer")

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer um Fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abrir um Pull Request

---

## 📄 Licença

Este projeto está licenciado sob a Licença Apache 2.0 - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

## 👨‍💻 Autor

Desenvolvido com ❤️ para gerenciamento de revisões de livros.

---

## 🎯 Roadmap

Funcionalidades futuras planejadas:

- [ ] Integração com banco de dados (MongoDB/PostgreSQL)
- [ ] Sistema de avaliação por estrelas
- [ ] Paginação nas listagens
- [ ] Filtros avançados de busca
- [ ] Upload de capas de livros
- [ ] API de recomendações
- [ ] Rate limiting
- [ ] Documentação Swagger/OpenAPI

---

<div align="center">

**⭐ Se este projeto foi útil para você, considere dar uma estrela! ⭐**

Feito com Express.js e muito ☕

</div>
