# MyTake

PWA pessoal de diário e biblioteca de filmes. Para abrir localmente sem instalar nada além do Node.js, dê duplo clique em `Iniciar MyTake.cmd`. Ele abre `http://localhost:4173` no navegador. Mantenha a janela preta aberta enquanto usa o app; feche-a para encerrar o servidor. Os dados são persistidos no `localStorage` do navegador.

As buscas no TMDB passam pelo proxy local em `server.mjs`. Configure o token somente no ambiente do servidor antes de iniciar:

```powershell
$env:TMDB_TOKEN = 'seu_read_access_token'
node server.mjs
```

O token não é enviado ao navegador nem salvo no `localStorage`.

### Modo sem servidor

O app também permite informar um Read Access Token do TMDB no login ou registro. Nesse modo, o token fica somente no `localStorage` daquele navegador e as chamadas vão direto para a API do TMDB. Isso elimina a necessidade de Worker/servidor para uso pessoal, mas o token deixa de ser secreto para o próprio usuário. Para um site público com uma chave compartilhada, mantenha o proxy no Worker.

Para o modo pessoal, o Cloudflare e o `worker.js` não são necessários. Publique apenas o frontend no GitHub Pages e cada usuário informa seu próprio token uma vez no login ou registro.

Para testar uma instalação totalmente limpa em um celular ou tablet, abra o endereço publicado com `?new=1`. Esse modo remove somente os dados locais daquele navegador e volta para a tela de boas-vindas; depois o endereço é normalizado automaticamente.

### Acesso sem configuração para o usuário

Para o visitante apenas abrir o site e usar a busca, o token TMDB deve ficar em um backend sob seu controle. O fluxo recomendado é: GitHub Pages serve o frontend; uma função serverless ou pequeno serviço Node executa o proxy `/api/tmdb` com `TMDB_TOKEN` configurado nas variáveis secretas; o frontend chama esse endereço público sem pedir token ao usuário. O visitante não precisa criar conta TMDB, colar chave ou alterar qualquer configuração.

O GitHub Pages sozinho não consegue proteger esse segredo nem executar `server.mjs`. Não coloque `TMDB_TOKEN` em `app.js`, `tmdb.js`, `manifest.webmanifest` ou qualquer arquivo publicado.

## Roteiro gratuito completo

1. Crie um projeto gratuito no Cloudflare Pages e publique a pasta inteira. A função `functions/api/tmdb/[[path]].js` será detectada automaticamente.
2. No projeto Pages, abra **Settings > Environment variables** e crie o segredo `TMDB_TOKEN` no ambiente **Production**. Cole seu Read Access Token do TMDB e marque como secreto.
3. Faça um novo deploy. A rota `https://mytake-api.pages.dev/api/tmdb/...` deverá retornar JSON, não `index.html`.
4. O `index.html` já aponta para `https://mytake-api.pages.dev/api/tmdb`. Essa é uma configuração do dono do site, não do usuário.
5. Crie um repositório no GitHub, envie os arquivos e ative **Settings > Pages > Deploy from a branch**, usando a branch principal e `/ (root)`.
6. Abra a URL do GitHub Pages. O visitante poderá buscar, importar e receber recomendações sem configurar API.

O arquivo `worker.js` já está preparado para o passo 2. O limite gratuito do Cloudflare Workers é suficiente para começar, mas deve ser acompanhado antes de uma escala grande.

### Publicar `worker.js` com Wrangler

O uploader do Pages não suporta esse Worker. No PowerShell, dentro da pasta do projeto, execute:

```powershell
npx wrangler login
npx wrangler deploy worker.js
npx wrangler secret put TMDB_TOKEN
```

Quando o último comando pedir o valor, cole o Read Access Token do TMDB diretamente no terminal. O Wrangler mostrará a URL pública do Worker, normalmente parecida com `https://mytake-api.<sua-conta>.workers.dev`. Use essa URL no `globalThis.MYTAKE_API_BASE` do `index.html`, acrescentando `/api/tmdb`.

## Publicar no GitHub Pages

O app é uma PWA estática e pode ser publicado no GitHub Pages. No repositório, ative **Settings > Pages > Deploy from a branch**, selecione a branch principal e a pasta `/ (root)`.

Antes do primeiro lançamento, falta escolher um domínio público para os assets e testar o fluxo publicado. O recurso de busca, importação e recomendações do TMDB depende hoje do proxy `server.mjs`; ele funciona localmente, mas não roda no GitHub Pages. Para produção, hospede esse proxy em um serviço Node separado ou troque o acesso por uma função serverless. Nunca coloque o token TMDB no código do frontend.

Para testar em celular ou tablet na mesma rede Wi-Fi, inicie o servidor local e acesse no dispositivo `http://IP-DO-COMPUTADOR:4173`. O servidor atual escuta apenas em `127.0.0.1`; para esse teste, altere o bind para `0.0.0.0` e permita a porta 4173 no firewall. No GitHub Pages, teste HTTPS, instalação como PWA, layout responsivo, navegação, persistência local e busca quando o backend estiver publicado.
