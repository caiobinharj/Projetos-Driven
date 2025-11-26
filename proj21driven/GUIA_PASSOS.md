# 🚀 Guia Passo a Passo - DrivenPass

## 📋 Passos para rodar o projeto

### 1️⃣ Configurar o Banco de Dados PostgreSQL

Você precisa ter um banco de dados PostgreSQL rodando. Você tem duas opções:

#### Opção A: PostgreSQL Local
- Instale o PostgreSQL no seu computador
- Crie um banco de dados chamado `drivenpass`
- Anote o usuário, senha e porta (geralmente 5432)

#### Opção B: PostgreSQL na Nuvem (Recomendado para deploy)
- Use serviços como **Render**, **Supabase**, **ElephantSQL**, ou **Railway**
- Crie um banco PostgreSQL e copie a URL de conexão

### 2️⃣ Criar arquivo .env

Crie um arquivo chamado `.env` na raiz do projeto com o seguinte conteúdo:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/drivenpass?schema=public"
JWT_SECRET="sua-chave-secreta-jwt-aqui-use-uma-string-longa-e-aleatoria"
CRYPTR_SECRET="sua-chave-secreta-cryptr-aqui-use-uma-string-longa-e-aleatoria"
PORT=5000
```

**Importante:**
- Substitua `usuario` e `senha` pelas credenciais do seu PostgreSQL
- Se estiver usando um banco na nuvem, use a URL completa fornecida pelo serviço
- Para `JWT_SECRET` e `CRYPTR_SECRET`, use strings longas e aleatórias (ex: gere com `openssl rand -base64 32`)

### 3️⃣ Gerar o cliente Prisma

```bash
npm run prisma:generate
```

### 4️⃣ Criar as tabelas no banco (Migrations)

```bash
npm run prisma:migrate
```

Quando perguntar o nome da migration, você pode dar qualquer nome, como: `init`

### 5️⃣ Popular o banco com dados iniciais (Seed)

```bash
npm run prisma:seed
```

Isso criará o usuário demo:
- Email: `demo@driven.com.br`
- Senha: `demo123`

### 6️⃣ Iniciar o servidor

#### Modo Desenvolvimento (com hot reload):
```bash
npm run dev
```

#### Modo Produção:
```bash
npm run build
npm start
```

O servidor estará rodando em `http://localhost:5000` (ou na porta que você configurou no .env)

---

## 🧪 Exemplos de Requisições para Testar

### 1. Health Check (Testar se está funcionando)
```bash
GET http://localhost:5000/health
```

**Resposta esperada:**
```
I'm OK!
```

---

### 2. Criar uma conta (Sign Up)
```bash
POST http://localhost:5000/sign-up
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "senha123"
}
```

**Resposta esperada:** Status `201 Created`

---

### 3. Fazer Login (Sign In)
```bash
POST http://localhost:5000/sign-in
Content-Type: application/json

{
  "email": "joao@email.com",
  "password": "senha123"
}
```

**Resposta esperada:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**⚠️ IMPORTANTE:** Copie esse token! Você vai precisar dele para as próximas requisições.

---

### 4. Criar uma Credencial
```bash
POST http://localhost:5000/credentials
Content-Type: application/json
Authorization: Bearer SEU_TOKEN_AQUI

{
  "title": "Facebook",
  "url": "https://www.facebook.com",
  "username": "joao.silva",
  "password": "minhasenha123"
}
```

**Resposta esperada:** Status `201 Created` com a credencial criada (senha descriptografada)

---

### 5. Listar todas as Credenciais
```bash
GET http://localhost:5000/credentials
Authorization: Bearer SEU_TOKEN_AQUI
```

**Resposta esperada:** Array com todas as credenciais do usuário

---

### 6. Buscar uma Credencial específica
```bash
GET http://localhost:5000/credentials/1
Authorization: Bearer SEU_TOKEN_AQUI
```

**Resposta esperada:** A credencial com ID 1 (senha descriptografada)

---

### 7. Atualizar uma Credencial
```bash
PUT http://localhost:5000/credentials/1
Content-Type: application/json
Authorization: Bearer SEU_TOKEN_AQUI

{
  "title": "Facebook Atualizado",
  "url": "https://www.facebook.com",
  "username": "joao.silva.novo",
  "password": "novasenha456"
}
```

**Resposta esperada:** Status `204 No Content`

---

### 8. Deletar uma Credencial
```bash
DELETE http://localhost:5000/credentials/1
Authorization: Bearer SEU_TOKEN_AQUI
```

**Resposta esperada:** Status `204 No Content`

---

### 9. Deletar Conta do Usuário
```bash
DELETE http://localhost:5000/erase
Authorization: Bearer SEU_TOKEN_AQUI
```

**Resposta esperada:** Status `204 No Content`

**⚠️ ATENÇÃO:** Isso deleta o usuário e TODAS as suas credenciais!

---

## 🛠️ Ferramentas para Testar

### Opção 1: Insomnia / Postman
- Importe as requisições acima
- Configure o token JWT no header `Authorization: Bearer <token>`

### Opção 2: cURL (Terminal)
```bash
# Exemplo de login
curl -X POST http://localhost:5000/sign-in \
  -H "Content-Type: application/json" \
  -d '{"email":"joao@email.com","password":"senha123"}'
```

### Opção 3: VS Code REST Client
Crie um arquivo `requests.http` e use a extensão REST Client

### Opção 4: Thunder Client (Extensão VS Code)
Interface gráfica para testar APIs diretamente no VS Code

---

## 🔍 Testando com o Usuário Demo

Você pode usar o usuário demo que foi criado no seed:

```bash
POST http://localhost:5000/sign-in
Content-Type: application/json

{
  "email": "demo@driven.com.br",
  "password": "demo123"
}
```

---

## ❌ Possíveis Erros e Soluções

### Erro: "Cannot find module '@prisma/client'"
**Solução:** Execute `npm run prisma:generate`

### Erro: "P1001: Can't reach database server"
**Solução:** Verifique se o PostgreSQL está rodando e se a URL no `.env` está correta

### Erro: "P1003: Database does not exist"
**Solução:** Crie o banco de dados `drivenpass` no PostgreSQL

### Erro: "JWT_SECRET not configured"
**Solução:** Adicione `JWT_SECRET` no arquivo `.env`

### Erro: "CRYPTR_SECRET not configured"
**Solução:** Adicione `CRYPTR_SECRET` no arquivo `.env`

---

## 📝 Próximos Passos

Após testar localmente, você pode fazer o deploy:
1. Configure um banco PostgreSQL na nuvem
2. Configure as variáveis de ambiente no serviço de deploy (Render, Railway, etc.)
3. Faça o deploy do código
4. Atualize o link no README.md




