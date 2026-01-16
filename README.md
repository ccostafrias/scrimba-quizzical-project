# 🧩 Quizzical (Scrimba) 🧩

Jogo de perguntas e respostas feito em React, baseado no projeto do curso Scrimba. Busca questões da Open Trivia DB, permite escolher a dificuldade e mostra sua pontuação ao final.

## Funcionalidades
- Seleção de dificuldade: easy, medium, hard
- 5 perguntas por rodada, respostas embaralhadas
- Decodificação de entidades HTML (`he`)
- Indicador de carregamento e tratamento simples de erros
- Checagem de respostas com destaque visual e pontuação

## Tecnologias
- React 18 (`react`, `react-dom`)
- `he` para decodificar textos
- Deploy via `gh-pages` (GitHub Pages)

## Como rodar
```bash
npm install
npm start
```
Aplicação disponível em http://localhost:3000.

## Build
```bash
npm run build
```
Os arquivos gerados ficam em `build/`.

## Deploy (GitHub Pages)
URL configurada: https://ccostafrias.github.io/scrimba-quizzical-project
```bash
npm run deploy
```

## Estrutura
- Componentes principais: `src/App.js`, `src/Question.js`
- Estilos: `src/App.css`
