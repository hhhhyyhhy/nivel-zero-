# Nível Zero

Jogo de terror dos Backrooms em 3D. Labirinto novo a cada partida, uma criatura que persegue você e níveis cada vez mais escuros.

## Baixar (Windows)
Na página **Releases**:
- `NivelZero-arm64.exe`: Windows em processador ARM (Galaxy Book Go, Surface Pro X, Snapdragon X).
- `NivelZero-x64.exe`: PCs com Intel ou AMD.

São portáteis: é só abrir, sem instalar. Na primeira vez o Windows pode mostrar
"O Windows protegeu o computador": clique em **Mais informações → Executar assim mesmo**.

## Controles
| Tecla | Ação |
| --- | --- |
| W A S D / setas | andar |
| Mouse | olhar (clique na tela para capturar) |
| Shift | correr |
| F | lanterna |
| P | mostrar FPS |
| F11 | tela cheia |
| Esc | soltar o mouse |

Qualidade gráfica na tela inicial: **Auto** ajusta sozinha pelo FPS; **Baixa** é a indicada para notebooks com GPU fraca.

## Gerar o executável
```bash
npm install
npm run dist        # dist/NivelZero-arm64.exe e dist/NivelZero-x64.exe
npm start           # roda no computador atual
```
O jogo fica em `src/game.html` (é a mesma versão do navegador); `tools/build-html.js` gera `app/index.html` com Three.js e fontes locais, para funcionar offline.

Licenças de terceiros: Three.js (MIT) em `app/THREE-LICENSE.txt`; fontes VT323 e Courier Prime (OFL) em `app/fonts/`.
