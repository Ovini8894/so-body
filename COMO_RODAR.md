# 🚀 GUIA COMPLETO - Como Rodar o Projeto SÓ BODY

## ⚠️ ANTES DE COMEÇAR

Você precisa ter instalado no seu computador:
1. **Node.js** (versão 14 ou superior)
2. **PostgreSQL** (banco de dados)

Se não tiver, siga os links:
- Node.js: https://nodejs.org/ (baixe a versão LTS)
- PostgreSQL: https://www.postgresql.org/download/

---

## 📋 PASSO A PASSO COMPLETO

### ETAPA 1: Configurar o Banco de Dados PostgreSQL

#### 1.1 - Abrir o PostgreSQL
1. Procure por "pgAdmin" no menu Iniciar do Windows
2. Abra o pgAdmin (é o programa para gerenciar o PostgreSQL)
3. Ele vai pedir uma senha - use a senha que você criou quando instalou o PostgreSQL

#### 1.2 - Criar o Banco de Dados
1. No pgAdmin, clique com botão direito em "Databases" (lado esquerdo)
2. Clique em "Create" → "Database..."
3. No campo "Database", digite: `sobody`
4. Clique em "Save"

**Pronto! Banco de dados criado!** ✅

---

### ETAPA 2: Configurar o Arquivo .env

#### 2.1 - Abrir a pasta do servidor
1. Abra o Explorador de Arquivos
2. Navegue até: `C:\Users\W10\Desktop\sobody\server`

#### 2.2 - Verificar se o arquivo .env existe
1. Procure um arquivo chamado `.env` (pode estar oculto)
2. Se NÃO existir, crie um arquivo novo:
   - Clique com botão direito na pasta
   - "Novo" → "Documento de Texto"
   - Renomeie para `.env` (apague o .txt)

#### 2.3 - Editar o arquivo .env
1. Abra o arquivo `.env` com o Bloco de Notas
2. Cole este conteúdo (ATENÇÃO: substitua os valores):

```env
DATABASE_URL="postgresql://postgres:SUA_SENHA_AQUI@localhost:5432/sobody"
JWT_SECRET="meu_segredo_super_secreto_123"
PORT=3000
```

**IMPORTANTE:** 
- Onde está `SUA_SENHA_AQUI`, coloque a senha do PostgreSQL que você criou
- Exemplo: se sua senha é "123456", fica assim:
  `DATABASE_URL="postgresql://postgres:123456@localhost:5432/sobody"`

3. Salve o arquivo (Ctrl + S)

**Pronto! Configuração feita!** ✅

---

### ETAPA 3: Instalar Dependências do Servidor

#### 3.1 - Abrir o Terminal (Prompt de Comando)
1. Pressione `Windows + R`
2. Digite `cmd` e aperte Enter
3. Uma janela preta vai abrir (é o terminal)

#### 3.2 - Navegar até a pasta do servidor
No terminal, digite (um comando por vez, apertando Enter após cada):

```bash
cd C:\Users\W10\Desktop\sobody\server
```

#### 3.3 - Instalar as dependências
Digite:

```bash
npm install
```

**Aguarde...** Isso pode demorar 1-2 minutos. Vai aparecer várias coisas na tela.

**Pronto! Dependências instaladas!** ✅

---

### ETAPA 4: Criar as Tabelas no Banco de Dados

Ainda no terminal (na pasta `server`), digite:

```bash
npx prisma migrate dev --name init
```

Aperte Enter e aguarde. Isso vai criar todas as tabelas no banco de dados.

**Depois, digite:**

```bash
npx prisma generate
```

**Pronto! Tabelas criadas!** ✅

---

### ETAPA 5: Adicionar Produtos de Exemplo (Seed)

Ainda no terminal, digite:

```bash
npm run seed
```

Isso vai adicionar:
- 4 categorias (Bodies, Bolsas, Vestidos, Acessórios)
- 8 produtos de exemplo

**Pronto! Produtos adicionados!** ✅

---

### ETAPA 6: Iniciar o Servidor (Backend)

No terminal, digite:

```bash
npm start
```

**IMPORTANTE:** 
- Você deve ver a mensagem: `Server is running on port 3000`
- **NÃO FECHE** esta janela do terminal!
- O servidor precisa ficar rodando

**Pronto! Servidor rodando!** ✅

---

### ETAPA 7: Abrir o Site (Frontend)

#### 7.1 - Abrir OUTRO terminal (deixe o primeiro aberto!)
1. Pressione `Windows + R` novamente
2. Digite `cmd` e aperte Enter
3. Uma NOVA janela preta vai abrir

#### 7.2 - Navegar até a pasta do frontend
No NOVO terminal, digite:

```bash
cd C:\Users\W10\Desktop\sobody\front-end
```

#### 7.3 - Iniciar um servidor local
Digite:

```bash
python -m http.server 8000
```

**OU**, se não funcionar, tente:

```bash
npx http-server -p 8000
```

**Pronto! Site rodando!** ✅

---

### ETAPA 8: Abrir no Navegador

1. Abra seu navegador (Chrome, Edge, Firefox, etc.)
2. Digite na barra de endereço:

```
http://localhost:8000
```

3. Aperte Enter

**PRONTO! O site deve abrir!** 🎉

---

## 🎯 TESTANDO O SITE

### Criar uma Conta
1. Clique em "Login" (ícone de usuário no canto superior)
2. Clique em "Cadastre-se agora"
3. Preencha:
   - Nome: Seu nome
   - Email: seu@email.com
   - Telefone: (34) 99999-9999
   - Senha: 123456
4. Clique em "Criar Conta"

### Fazer Login
1. Use o email e senha que você criou
2. Clique em "Entrar"

### Comprar um Produto
1. Clique em "PRODUTOS" no menu
2. Escolha um produto
3. Clique em "Adicionar ao Carrinho"
4. Clique no ícone do carrinho (canto superior direito)
5. Clique em "Finalizar Compra"
6. Preencha os dados
7. Escolha "PIX" como forma de pagamento
8. Clique em "Finalizar Pedido"
9. **Você verá o QR Code PIX!**

### Ver Seus Pedidos
1. Vá para: `http://localhost:8000/my-orders.html`
2. Você verá todos os seus pedidos

---

## ❌ PROBLEMAS COMUNS

### "Erro ao conectar no banco de dados"
- Verifique se o PostgreSQL está rodando
- Verifique se a senha no arquivo `.env` está correta
- Verifique se o banco `sobody` foi criado

### "npm não é reconhecido"
- Você precisa instalar o Node.js
- Baixe em: https://nodejs.org/

### "python não é reconhecido"
- Use o comando alternativo: `npx http-server -p 8000`

### "Porta 3000 já está em uso"
- Feche outros programas que possam estar usando a porta 3000
- Ou mude a porta no arquivo `.env` (PORT=3001)

### Site não carrega produtos
- Verifique se o servidor (backend) está rodando
- Abra o console do navegador (F12) e veja se há erros
- Verifique se rodou o comando `npm run seed`

---

## 📝 RESUMO DOS COMANDOS

**Terminal 1 (Backend):**
```bash
cd C:\Users\W10\Desktop\sobody\server
npm install
npx prisma migrate dev --name init
npx prisma generate
npm run seed
npm start
```

**Terminal 2 (Frontend):**
```bash
cd C:\Users\W10\Desktop\sobody\front-end
python -m http.server 8000
```

**Navegador:**
```
http://localhost:8000
```

---

## 🎉 PRONTO!

Agora você tem:
- ✅ Banco de dados configurado
- ✅ Servidor rodando
- ✅ Site funcionando
- ✅ Produtos de exemplo
- ✅ Sistema de login
- ✅ Carrinho de compras
- ✅ Pagamento PIX com QR Code
- ✅ Área de pedidos

**Qualquer dúvida, me avise!** 😊
