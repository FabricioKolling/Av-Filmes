# Cinema Crítico (Av-Filmes)

## 🎬 Descrição Geral do Projeto

O **Cinema Crítico (Av-Filmes)** é uma aplicação web Full Stack desenvolvida para permitir que os usuários naveguem por uma lista de filmes em destaque, visualizem suas sinopses e registrem suas próprias avaliações e comentários. O projeto utiliza uma arquitetura baseada em API para gerenciar filmes e persistir as avaliações dos usuários em um banco de dados relacional.

## ✨ Funcionalidades Principais

* **Listagem de Filmes em Destaque:** Exibe uma lista de filmes em um carrossel interativo.
* **Detalhes e Sinopse:** Apresenta o título e a sinopse de cada filme no carrossel.
* **Avaliação de Filmes (CRUD):**
    * **Registro de Nota:** Permite ao usuário selecionar uma nota (de 1 a 5 estrelas).
    * **Comentários:** Permite adicionar um comentário textual à avaliação.
    * **Persistência:** Envia a avaliação (nota e comentário) para o backend, que a armazena na tabela `avaliacoes` do banco de dados.
* **Cálculo da Média de Avaliações:** O backend possui uma rota dedicada para calcular a média de notas de um filme específico, usando os dados armazenados na tabela `avaliacoes`.

## 🛠️ Tecnologias Utilizadas

O projeto é construído com as seguintes tecnologias:

### Frontend (Aplicação Cliente)

| Tecnologia | Descrição |
| :--- | :--- |
| **HTML5** | Estrutura da página (`main.html`), incluindo a navegação, o carrossel de filmes e o modal de avaliação. |
| **CSS3** | Estilização responsiva, layout do carrossel e tema de fundo roxo/futurista. |
| **JavaScript (JS)** | Lógica de interação, manipulação do DOM, controle do carrossel e comunicação com o backend (rotas `/filmes` e `/avaliar`). |

### Backend (Servidor API)

| Tecnologia | Descrição |
| :--- | :--- |
| **Node.js** | Ambiente de execução para o servidor. |
| **Express** | Framework web utilizado para criar as rotas da API (`/filmes`, `/filmes/:id/media`, `/avaliar`). |
| **CORS** | Middleware para permitir requisições do frontend (domínio diferente) para o backend. |

### Banco de Dados (Persistência)

| Tecnologia | Descrição |
| :--- | :--- |
| **PostgreSQL** | Sistema de Gerenciamento de Banco de Dados Relacional (SGBD) utilizado para persistir os dados do projeto. |
| **`pg` (Node-Postgres)** | Módulo de conexão entre o servidor Node.js/Express e o banco de dados PostgreSQL. |
| **Estrutura de Dados** | O banco contém as tabelas `filmes` (para dados do filme) e `avaliacoes` (para as notas e comentários dos usuários). |