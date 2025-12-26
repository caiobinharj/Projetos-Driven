# Script corrigido para enviar código para o GitHub
# Execute este script na pasta mytickets

Write-Host "=== Configuração e Deploy para GitHub ===" -ForegroundColor Cyan
Write-Host ""

# 1. Configurar identidade do Git (se ainda não estiver configurada)
Write-Host "1. Configurando identidade do Git..." -ForegroundColor Green
$gitName = git config --global user.name 2>$null
$gitEmail = git config --global user.email 2>$null

if (-not $gitName) {
    Write-Host "   Configurando user.name..." -ForegroundColor Yellow
    git config --global user.name "caiobinharj"
    Write-Host "   ✓ Nome configurado" -ForegroundColor Green
} else {
    Write-Host "   ✓ Nome já configurado: $gitName" -ForegroundColor Green
}

if (-not $gitEmail) {
    Write-Host "   Configurando user.email..." -ForegroundColor Yellow
    git config --global user.email "caiobinharj@users.noreply.github.com"
    Write-Host "   ✓ Email configurado" -ForegroundColor Green
} else {
    Write-Host "   ✓ Email já configurado: $gitEmail" -ForegroundColor Green
}

Write-Host ""

# 2. Verificar se estamos no diretório correto
$currentDir = Get-Location
Write-Host "2. Diretório atual: $currentDir" -ForegroundColor Cyan

if (-not (Test-Path "package.json")) {
    Write-Host "   ERRO: package.json não encontrado. Execute este script na pasta mytickets!" -ForegroundColor Red
    exit 1
}

Write-Host "   ✓ Diretório correto" -ForegroundColor Green
Write-Host ""

# 3. Remover repositório Git da pasta pai se existir
$parentGit = Join-Path (Split-Path $currentDir -Parent) ".git"
if (Test-Path $parentGit) {
    Write-Host "3. Removendo repositório Git da pasta pai..." -ForegroundColor Yellow
    Remove-Item -Path $parentGit -Recurse -Force
    Write-Host "   ✓ Repositório da pasta pai removido" -ForegroundColor Green
    Write-Host ""
}

# 4. Inicializar repositório Git (se necessário)
Write-Host "4. Inicializando repositório Git..." -ForegroundColor Green
if (Test-Path ".git") {
    Write-Host "   Repositório Git já existe." -ForegroundColor Yellow
} else {
    git init
    Write-Host "   ✓ Repositório Git inicializado" -ForegroundColor Green
}
Write-Host ""

# 5. Configurar remote
Write-Host "5. Configurando remote do GitHub..." -ForegroundColor Green
$remoteExists = git remote get-url origin 2>$null
if ($remoteExists) {
    git remote set-url origin https://github.com/caiobinharj/proj22driven.git
    Write-Host "   ✓ Remote atualizado" -ForegroundColor Green
} else {
    git remote add origin https://github.com/caiobinharj/proj22driven.git
    Write-Host "   ✓ Remote adicionado" -ForegroundColor Green
}
Write-Host ""

# 6. Adicionar arquivos
Write-Host "6. Adicionando arquivos ao staging..." -ForegroundColor Green
git add .
$stagedFiles = (git diff --cached --name-only).Count
Write-Host "   ✓ $stagedFiles arquivo(s) adicionado(s)" -ForegroundColor Green
Write-Host ""

# 7. Verificar se há algo para commitar
Write-Host "7. Verificando alterações..." -ForegroundColor Green
$status = git status --porcelain
if ($status) {
    # Fazer commit
    Write-Host "   Fazendo commit..." -ForegroundColor Yellow
    git commit -m "feat: implementação de testes de integração para API MyTickets"
    if ($LASTEXITCODE -eq 0) {
        Write-Host "   ✓ Commit realizado com sucesso" -ForegroundColor Green
    } else {
        Write-Host "   ✗ Erro ao fazer commit" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "   Nenhuma alteração para commitar" -ForegroundColor Yellow
}
Write-Host ""

# 8. Verificar/criar branch main
Write-Host "8. Configurando branch main..." -ForegroundColor Green
$currentBranch = git branch --show-current 2>$null
if (-not $currentBranch) {
    Write-Host "   Criando branch main..." -ForegroundColor Yellow
    git checkout -b main 2>$null
    if ($LASTEXITCODE -ne 0) {
        git branch -M main
    }
    Write-Host "   ✓ Branch main criada" -ForegroundColor Green
} elseif ($currentBranch -ne "main") {
    Write-Host "   Renomeando branch de '$currentBranch' para 'main'..." -ForegroundColor Yellow
    git branch -M main
    Write-Host "   ✓ Branch renomeada para main" -ForegroundColor Green
} else {
    Write-Host "   ✓ Já está na branch main" -ForegroundColor Green
}
Write-Host ""

# 9. Push para GitHub
Write-Host "9. Enviando para o GitHub..." -ForegroundColor Green
Write-Host "   (Isso pode pedir suas credenciais do GitHub)" -ForegroundColor Yellow
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "=== ✓ CONCLUÍDO! ===" -ForegroundColor Green
    Write-Host "Código enviado para: https://github.com/caiobinharj/proj22driven" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "=== ✗ ERRO ====" -ForegroundColor Red
    Write-Host "Falha ao enviar para o GitHub. Verifique:" -ForegroundColor Yellow
    Write-Host "  - Suas credenciais do GitHub" -ForegroundColor Yellow
    Write-Host "  - Se o repositório existe no GitHub" -ForegroundColor Yellow
    Write-Host "  - Se você tem permissão para fazer push" -ForegroundColor Yellow
    exit 1
}

