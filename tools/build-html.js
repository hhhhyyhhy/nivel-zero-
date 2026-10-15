// Gera app/index.html a partir do jogo do navegador (src/game.html), trocando os CDNs por arquivos locais.
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
let html = fs.readFileSync(path.join(root, "src/game.html"), "utf8");

const swaps = [
  [/<link rel="preconnect"[^>]*>\s*/, ""],
  [/<link rel="stylesheet" href="https:\/\/fonts\.googleapis\.com[^>]*>/, '<link rel="stylesheet" href="fonts.css">'],
  [/<script src="https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/three\.js\/r128\/three\.min\.js"><\/script>/, '<script src="three.min.js"></script>'],
];
for (const [from, to] of swaps) {
  if (!from.test(html)) throw new Error("Trecho não encontrado em game.html: " + from);
  html = html.replace(from, to);
}

// O jogo foi escrito como artifact (sem <html>/<head>); aqui montamos a página completa.
const page = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'">
<style>[hidden]{display:none!important} body{margin:0}</style>
${html}
</html>
`;
fs.writeFileSync(path.join(root, "app/index.html"), page);
console.log("app/index.html gerado");
