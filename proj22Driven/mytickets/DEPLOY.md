# Instruções para enviar o código para o GitHub

Execute os seguintes comandos no terminal, dentro da pasta `mytickets`:

```bash
# 1. Inicializar o repositório Git (se ainda não foi inicializado)
git init

# 2. Adicionar o remote do GitHub
git remote add origin https://github.com/caiobinharj/proj22driven.git

# 3. Adicionar todos os arquivos
git add .

# 4. Fazer o commit inicial
git commit -m "feat: implementação de testes de integração para API MyTickets"

# 5. Renomear a branch principal para main (se necessário)
git branch -M main

# 6. Enviar para o GitHub
git push -u origin main
```

Se o repositório já existir no GitHub e você quiser forçar o push:

```bash
git push -u origin main --force
```

## Estrutura do Projeto

O projeto inclui:
- ✅ Testes de integração completos para todas as rotas
- ✅ Factories usando Faker
- ✅ Setup de testes com limpeza automática do banco
- ✅ Configuração do Jest com cobertura de código
- ✅ Scripts npm para executar testes
- ✅ Documentação atualizada


