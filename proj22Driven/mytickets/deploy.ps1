# Script para enviar código para o GitHub
# Execute este script na pasta mytickets

Write-Host "Configurando Git..." -ForegroundColor Green

# Configurar identidade do Git (se ainda não estiver configurada)
$gitName = git config --global user.name
$gitEmail = git config --global user.email

if (-not $gitName) {
    Write-Host "Configurando nome do Git..." -ForegroundColor Yellow
    git config --global user.name "caiobinharj"
}

if (-not $gitEmail) {
    Write-Host "Configurando email do Git..." -ForegroundColor Yellow
    git config --global user.email "caiobinharj@users.noreply.github.com"
}

Write-Host "Inicializando repositório Git..." -ForegroundColor Green

# Verificar se já existe .git
if (Test-Path .git) {
    Write-Host "Repositório Git já inicializado." -ForegroundColor Yellow
} else {
    git init
    Write-Host "Repositório Git inicializado." -ForegroundColor Green
}

# Configurar remote
Write-Host "Configurando remote do GitHub..." -ForegroundColor Green
$remoteExists = git remote get-url origin 2>$null
if ($remoteExists) {
    git remote set-url origin https://github.com/caiobinharj/proj22driven.git
    Write-Host "Remote atualizado." -ForegroundColor Yellow
} else {
    git remote add origin https://github.com/caiobinharj/proj22driven.git
    Write-Host "Remote adicionado." -ForegroundColor Green
}

# Adicionar arquivos
Write-Host "Adicionando arquivos..." -ForegroundColor Green
git add .

# Verificar se há algo para commitar
$status = git status --porcelain
if ($status) {
    # Fazer commit
    Write-Host "Fazendo commit..." -ForegroundColor Green
    git commit -m "feat: implementação de testes de integração para API MyTickets"
    Write-Host "Commit realizado com sucesso." -ForegroundColor Green
} else {
    Write-Host "Nenhuma alteração para commitar." -ForegroundColor Yellow
}

# Verificar branch atual e criar/renomear para main se necessário
$currentBranch = git branch --show-current 2>$null
if (-not $currentBranch) {
    Write-Host "Criando branch main..." -ForegroundColor Green
    git checkout -b main
} elseif ($currentBranch -ne "main") {
    Write-Host "Renomeando branch para main..." -ForegroundColor Green
    git branch -M main
}

# Push para GitHub
Write-Host "Enviando para o GitHub..." -ForegroundColor Green
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`nConcluído! Código enviado para o GitHub com sucesso!" -ForegroundColor Green
} else {
    Write-Host "`nErro ao enviar para o GitHub. Verifique as mensagens acima." -ForegroundColor Red
}


