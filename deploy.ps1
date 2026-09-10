#!/usr/bin/env pwsh
# Script de Deploy - MyTake para GitHub Pages
# Uso: .\deploy.ps1

param(
    [string]$Message = "feat: MyTake v1.0 - Release para GitHub Pages"
)

Write-Host "`n╔════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║           🚀 MyTake Deploy para GitHub Pages                  ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════════╝`n" -ForegroundColor Cyan

# Verificar se estamos em um repositório Git
if (-not (Test-Path .git)) {
    Write-Host "❌ Erro: Não está em um repositório Git!" -ForegroundColor Red
    Write-Host "   Execute este script na raiz do projeto MyTake" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Repositório Git detectado`n" -ForegroundColor Green

# Step 1: Verificar status
Write-Host "📋 Passo 1: Verificando status do repositório..." -ForegroundColor Yellow
git status

# Step 2: Adicionar arquivos
Write-Host "`n📦 Passo 2: Adicionando arquivos..." -ForegroundColor Yellow
git add .
Write-Host "   ✓ Arquivos adicionados" -ForegroundColor Green

# Step 3: Fazer commit
Write-Host "`n💬 Passo 3: Criando commit..." -ForegroundColor Yellow
Write-Host "   Mensagem: $Message" -ForegroundColor Gray
git commit -m $Message
if ($LASTEXITCODE -ne 0) {
    Write-Host "   ⚠️  Nada para commitar (repositório atualizado)" -ForegroundColor Yellow
} else {
    Write-Host "   ✓ Commit criado" -ForegroundColor Green
}

# Step 4: Push para GitHub
Write-Host "`n🌐 Passo 4: Fazendo push para GitHub..." -ForegroundColor Yellow
$branch = git rev-parse --abbrev-ref HEAD
Write-Host "   Branch: $branch" -ForegroundColor Gray

git push origin $branch
if ($LASTEXITCODE -eq 0) {
    Write-Host "   ✓ Push realizado com sucesso" -ForegroundColor Green
} else {
    Write-Host "   ❌ Erro ao fazer push. Verifique suas credenciais." -ForegroundColor Red
    exit 1
}

# Step 5: Informações de deploy
Write-Host "`n╔════════════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║                    ✅ DEPLOY INICIADO!                        ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════════════════════════════╝`n" -ForegroundColor Green

Write-Host "📝 Checklist final:" -ForegroundColor Cyan
Write-Host "   ✓ Arquivos enviados para GitHub" -ForegroundColor Green
Write-Host "   ⏳ GitHub Pages está construindo... (2-5 minutos)" -ForegroundColor Yellow
Write-Host "   📍 Verifique: https://github.com/seu-usuario/cineroll/settings/pages" -ForegroundColor Gray

Write-Host "`n🔗 URLs após deploy:" -ForegroundColor Cyan
Write-Host "   🌐 Live: https://seu-usuario.github.io/cineroll" -ForegroundColor Yellow
Write-Host "   📚 Repo: https://github.com/seu-usuario/cineroll" -ForegroundColor Yellow

Write-Host "`n💡 Dicas:" -ForegroundColor Cyan
Write-Host "   • Se vir erro 404, aguarde 5 minutos e recarregue" -ForegroundColor Gray
Write-Host "   • Limpe cache do navegador (Ctrl+Shift+Del)" -ForegroundColor Gray
Write-Host "   • Verifique 'Actions' no GitHub para ver build em tempo real" -ForegroundColor Gray

Write-Host "`n"
