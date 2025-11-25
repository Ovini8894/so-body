# SÓ BODY - E-commerce

Sistema completo de e-commerce para moda feminina com backend Node.js e frontend vanilla JavaScript.

## 🚀 Tecnologias

### Backend
- Node.js + Express
- Prisma ORM
- PostgreSQL
- JWT para autenticação
- bcryptjs para hash de senhas

### Frontend
- HTML5, CSS3, JavaScript (Vanilla)
- Design responsivo
- Integração com API REST

## 📋 Pré-requisitos

- Node.js (v14 ou superior)
- PostgreSQL (v12 ou superior)
- npm ou yarn

## 🔧 Instalação

### 1. Clone o repositório
```bash
git clone <seu-repositorio>
cd sobody
```

### 2. Configure o Backend

```bash
cd server
npm install
```

### 3. Configure o Banco de Dados

Crie um arquivo `.env` na pasta `server` com as seguintes variáveis:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/sobody"
JWT_SECRET="seu_secret_key_aqui"
PORT=3000
```

### 4. Execute as Migrações

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 5. Popule o Banco (Opcional)

```bash
npm run seed
```

## ▶️ Executando o Projeto

### Backend

```bash
cd server
npm start
# ou para desenvolvimento com auto-reload:
npm run dev
```

O servidor estará rodando em `http://localhost:3000`

### Frontend

Abra o arquivo `front-end/index.html` em um navegador ou use um servidor local:

```bash
cd front-end
# Com Python 3:
python -m http.server 8000

# Com Node.js (http-server):
npx http-server -p 8000
```

Acesse `http://localhost:8000`

## 📁 Estrutura do Projeto

```
sobody/
├── server/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.js
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   ├── category.controller.js
│   │   │   ├── product.controller.js
│   │   │   └── order.controller.js
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── category.routes.js
│   │   │   ├── product.routes.js
│   │   │   └── order.routes.js
│   │   ├── app.js
│   │   └── server.js
│   ├── .env
│   └── package.json
├── front-end/
│   ├── api.js
│   ├── global.js
│   ├── index.html
│   ├── catalog.html
│   ├── catalog.js
│   ├── login.html
│   ├── checkout.html
│   ├── checkout.js
│   ├── cart.html
│   ├── admin.html
│   └── styles.css
└── README.md
```

## 🔐 API Endpoints

### Autenticação
- `POST /api/auth/register` - Registrar novo usuário
- `POST /api/auth/login` - Login

### Produtos
- `GET /api/products` - Listar produtos
- `GET /api/products/:id` - Detalhes do produto
- `POST /api/products` - Criar produto (Admin)
- `PUT /api/products/:id` - Atualizar produto (Admin)
- `DELETE /api/products/:id` - Deletar produto (Admin)

### Categorias
- `GET /api/categories` - Listar categorias
- `POST /api/categories` - Criar categoria (Admin)
- `PUT /api/categories/:id` - Atualizar categoria (Admin)
- `DELETE /api/categories/:id` - Deletar categoria (Admin)

### Pedidos
- `POST /api/orders` - Criar pedido
- `GET /api/orders` - Listar pedidos
- `GET /api/orders/:id` - Detalhes do pedido

## 👤 Usuários

Após executar o seed, você terá:
- **Admin**: email configurado no seed
- **Cliente**: pode se registrar pela interface

## 🎨 Funcionalidades

### Cliente
- Navegação por catálogo de produtos
- Filtros por categoria e preço
- Carrinho de compras
- Checkout completo
- Histórico de pedidos

### Admin
- Gerenciamento de produtos
- Gerenciamento de categorias
- Visualização de pedidos

## 🐛 Troubleshooting

### Erro de conexão com banco de dados
Verifique se o PostgreSQL está rodando e se as credenciais no `.env` estão corretas.

### Erro de CORS
Certifique-se de que o backend está configurado para aceitar requisições do frontend. O CORS já está configurado no `app.js`.

### Produtos não aparecem
1. Verifique se o backend está rodando
2. Abra o console do navegador (F12) para ver erros
3. Verifique se a URL da API em `api.js` está correta

## 📝 Licença

Este projeto é privado e de uso interno.

## 👥 Contribuindo

Para contribuir com o projeto, entre em contato com a equipe de desenvolvimento.
