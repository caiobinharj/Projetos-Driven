# 📤 Comandos para Enviar Código para o GitHub

Execute estes comandos no terminal (Git Bash, PowerShell ou CMD):

## 1️⃣ Inicializar o repositório Git
```bash
git init
```

## 2️⃣ Adicionar o remote do GitHub
```bash
git remote add origin https://github.com/caiobinharj/proj21driven.git
```

## 3️⃣ Adicionar todos os arquivos
```bash
git add .
```

## 4️⃣ Fazer o primeiro commit
```bash
git commit -m "Initial commit: DrivenPass - Gerenciador de senhas"
```

## 5️⃣ Renomear branch para main (se necessário)
```bash
git branch -M main
```

## 6️⃣ Enviar para o GitHub
```bash
git push -u origin main
```

---

## 🔄 Para commits futuros (após fazer alterações):

```bash
git add .
git commit -m "Descrição das alterações"
git push
```

---

## ⚠️ Se der erro de autenticação:

Se pedir usuário e senha, você precisará usar um **Personal Access Token** do GitHub:

1. Vá em: GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Crie um novo token com permissão `repo`
3. Use o token como senha quando pedir

Ou configure o Git com suas credenciais:
```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu-email@exemplo.com"
```



