# 🚀 Guia de Deploy - MyTake para GitHub Pages

## ✅ Pré-Requisitos

- [x] Repositório Git criado
- [x] GitHub Desktop ou Git CLI instalado
- [x] Conta GitHub ativa
- [x] Projeto MyTake clonado/criado localmente

---

## 📋 OPÇÃO 1: Deploy com Script PowerShell (Windows)

### Passo 1: Executar o Script

```powershell
# Abrir PowerShell na pasta do projeto
cd "c:\Users\osval\Documents\Codex\2026-09-10\criar\outputs\cineroll"

# Executar script (pode ser necessário Set-ExecutionPolicy)
.\deploy.ps1
```

Se receber erro de política de execução:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
.\deploy.ps1
```

O script fará automaticamente:
- ✅ Adicionar arquivos (`git add .`)
- ✅ Criar commit (`git commit -m ...`)
- ✅ Push para GitHub (`git push`)

---

## 📋 OPÇÃO 2: Deploy Manual com Git

### Passo 1: Adicionar Arquivos
```bash
git add .
```

### Passo 2: Criar Commit
```bash
git commit -m "feat: MyTake v1.0 - Release para GitHub Pages"
```

Mensagens de commit sugeridas:
- `feat: MyTake v1.0 - Diário pessoal de cinema`
- `feat: Adicionar suporte a temas e paginação`
- `fix: Corrigir validação de localStorage`

### Passo 3: Push para GitHub
```bash
git push origin main
# ou
git push origin master
```

---

## 📋 OPÇÃO 3: Deploy com GitHub Desktop

1. **Abrir GitHub Desktop**
2. **Clicar em "Add Local Repository"**
3. Selecionar a pasta do projeto
4. **Ver mudanças** na aba "Changes"
5. **Escrever mensagem de commit** (ex: "MyTake v1.0")
6. **Clicar "Commit to main"**
7. **Clicar "Push origin"** no topo

---

## ⚙️ Configurar GitHub Pages Após Push

### Passo 1: Ir às Configurações

1. Abrir repositório no GitHub
2. Clicar em **Settings** (engrenagem)
3. No menu esquerdo, clicar em **Pages**

### Passo 2: Configurar Source

Na seção "Build and deployment":
- Source: **Deploy from a branch**
- Branch: **main** (ou `master`)
- Folder: **/root**
- Clicar **Save**

### Passo 3: Aguardar Deploy

- ⏳ Aguarde 2-5 minutos
- 📍 GitHub iniciará build automático
- ✅ Quando pronto, verá a URL

---

## 🔍 Verificar Deploy

### Ver Status em Tempo Real

1. No repositório GitHub
2. Clicar em **Actions** (abas no topo)
3. Ver workflow "pages build and deployment"
4. Aguardar status ✅ (verde)

### Acessar Site Live

Após aprovação, a URL será:
```
https://seu-usuario.github.io/cineroll
```

Substitua `seu-usuario` pelo seu usuário GitHub.

---

## 🧪 Testes Pós-Deploy

### Verificar se tudo funciona

- [ ] Site carrega sem erros
- [ ] Pode adicionar filme
- [ ] Editar/deletar funiona
- [ ] Backup/restore funciona
- [ ] Temas alternam (Cinema, Paper, Ocean)
- [ ] Offline funciona (desativar internet)
- [ ] Responsivo em mobile
- [ ] Service Worker instalado (DevTools > Application)

### Verificar Performance

No navegador:
```javascript
// Abrir DevTools (F12)
// Aba: Network
// Recarregar página
// Ver requisições e tempo de carga
```

---

## ❌ Troubleshooting

### Erro: "Permission denied"

**Solução:**
```bash
ssh -T git@github.com
# Se pedir senha, gere uma nova chave SSH
```

### Erro: "fatal: not a git repository"

**Solução:**
```bash
cd "c:\Users\osval\Documents\Codex\2026-09-10\criar\outputs\cineroll"
git status  # Deve mostrar branch atual
```

### Site mostra 404

**Solução:**
1. Aguarde 5 minutos após push
2. Limpe cache (Ctrl+Shift+Del)
3. Verifique Settings > Pages está ativo
4. Confirme arquivo `.nojekyll` está presente

### GitHub Pages não ativa

**Solução:**
1. Ir em Settings > Pages
2. Selecionar branch: `main`
3. Selecionar folder: `/root`
4. Clicar Save
5. Aguardar build

---

## 📊 Checklist Final Antes de Push

Abra o arquivo `DEPLOY_CHECKLIST.md` e confirme:

- [x] Todos arquivos críticos presentes
- [x] Sem erros de JavaScript
- [x] Sem erros de CSS
- [x] `.nojekyll` existe
- [x] `manifest.webmanifest` preenchido
- [x] Service Worker registrado
- [x] Nenhum console.log em produção

---

## 🎯 Resultado Esperado

Após ~5 minutos, você verá:

```
✅ Site live em: https://seu-usuario.github.io/cineroll
✅ Funcionalidades completas: Adicionar, editar, deletar filmes
✅ Temas funcionando: Cinema, Paper, Ocean
✅ Backup/Restore disponível
✅ Offline totalmente funcional
✅ Performance otimizada (Lighthouse 90+)
```

---

## 📚 Referências

- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [Jekyll Configuration](https://jekyllrb.com/docs/configuration/)
- [PWA Manifest](https://web.dev/add-manifest/)
- [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)

---

## 🎉 Pronto!

Seu projeto **MyTake** está ao vivo! 🚀

**Compartilhe com seus amigos:**
```
🎬 MyTake - Seu Cinema, Do Seu Jeito
https://seu-usuario.github.io/cineroll
```

---

**Última atualização:** 2026-09-10  
**Status:** ✅ Pronto para Produção
