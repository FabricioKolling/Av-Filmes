//---------------------------------------
//  MOCK DE FILMES (COM 10 FILMES)
//---------------------------------------

const filmesMock = [
    {
        id: 1,
        titulo: "Avatar",
        sinopse: "Um fuzileiro naval paraplégico é enviado para a lua Pandora, onde se apaixona por uma nativa e é forçado a escolher um lado na guerra por recursos.",
        poster_url: "https://img.elo7.com.br/product/zoom/46B9275/big-poster-filme-avatar-tamanho-90x60-cm-lo003-presente-geek.jpg"
    },
    {
        id: 2,
        titulo: "Vingadores: Ultimato",
        sinopse: "Os Vingadores sobreviventes se reúnem para reverter o estalar de dedos de Thanos e restaurar a ordem no universo.",
        poster_url: "https://img.elo7.com.br/product/zoom/266036C/big-poster-filme-vingadores-ultimato-lo47-tamanho-90x60-cm-vingadores.jpg"
    },
    {
        id: 3,
        titulo: "Titanic",
        sinopse: "Uma jovem de alta sociedade se apaixona por um artista pobre a bordo do fatídico transatlântico RMS Titanic.",
        poster_url: "https://uauposters.com.br/media/catalog/product/1/9/198920140605-198920140605-uau-posters-filmes-titanic--titanic-2.jpg"
    },
    {
        id: 4,
        titulo: "Star Wars: O Despertar da Força",
        sinopse: "Trinta anos após a queda do Império, novos heróis devem se unir para deter a Primeira Ordem e o General Hux.",
        poster_url: "https://img.elo7.com.br/product/zoom/2C25D05/big-poster-filme-star-wars-o-despertar-da-forca-tam-90x60-cm-poster-star-wars.jpg"
    },
    {
        id: 5,
        titulo: "Vingadores: Guerra Infinita",
        sinopse: "Os Vingadores e seus aliados devem sacrificar tudo para tentar derrotar o poderoso Thanos antes que ele acabe com metade do universo.",
        poster_url: "https://img.elo7.com.br/product/zoom/1E30435/big-poster-vingadores-guerra-infinita-tamanho-90x-0-cm-lo032-poster.jpg"
    },
    {
        id: 6,
        titulo: "O Rei Leão (2019)",
        sinopse: "Um jovem leão, após a morte de seu pai, o Rei Mufasa, deve aceitar seu destino e retomar o trono que lhe foi roubado.",
        poster_url: "https://img.elo7.com.br/product/zoom/26925A6/big-poster-filme-rei-leao-2019-lo02-tamanho-90x60-cm-rei-leao-2019.jpg"
    },
    {
        id: 7,
        titulo: "Jurassic World",
        sinopse: "Um novo parque temático de dinossauros é inaugurado, mas o caos se instala quando uma nova atração geneticamente modificada escapa.",
        poster_url: "https://br.web.img3.acsta.net/pictures/15/04/22/16/28/291371.jpg"
    },
    {
        id: 8,
        titulo: "Velozes e Furiosos 7",
        sinopse: "Uma equipe de corredores de rua se envolve em uma nova missão enquanto um assassino busca vingança pela morte de seu irmão.",
        poster_url: "https://br.web.img3.acsta.net/pictures/15/03/30/21/19/054397.jpg"
    },
    {
        id: 9,
        titulo: "Frozen II",
        sinopse: "Elsa, Anna, Kristoff e Olaf embarcam em uma jornada na floresta para descobrir a verdade sobre um antigo mistério de Arendelle.",
        poster_url: "https://imusic.b-cdn.net/images/item/original/772/8717418561772.jpg?frozen-ii-2020-frozen-2-dvd&class=scaled&v=1585232957"
    },
    {
        id: 10,
        titulo: "A Bela e a Fera (2017)",
        sinopse: "Uma jovem mulher se torna prisioneira em um castelo de uma fera e aprende a ver além de sua aparência.",
        poster_url: "https://br.web.img3.acsta.net/pictures/17/01/09/12/22/442219.jpg"
    }
];


//---------------------------------------
// CARREGAR FILMES NO CARROSSEL
//---------------------------------------

async function carregarFilmes() {
    const container = document.getElementById('carousel');
    container.innerHTML = "";

    filmesMock.forEach(filme => {
        const card = document.createElement("div");
        card.className = "box-cartaz";

        card.innerHTML = `
            <h2>${filme.titulo}</h2>
            <img src="${filme.poster_url}" 
                 alt="${filme.titulo}" 
                 class="poster"
                 data-id="${filme.id}"
                 data-titulo="${filme.titulo}">
            <h3>${filme.sinopse}</h3>
        `;

        container.appendChild(card);
    });

    ativarEventoPosters();
}

carregarFilmes();


//---------------------------------------
// LOCALSTORAGE PARA ARMAZENAR AVALIAÇÕES
//---------------------------------------

function salvarAvaliacaoLocal(filme_id, nota, comentario) {
    const avaliacoes = JSON.parse(localStorage.getItem("avaliacoes") || "{}");

    if (!avaliacoes[filme_id]) {
        avaliacoes[filme_id] = [];
    }

    avaliacoes[filme_id].push({
        nota,
        comentario,
        data: new Date().toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })
    });

    localStorage.setItem("avaliacoes", JSON.stringify(avaliacoes));
}

// (NOVO) Carrega avaliações anteriores do LocalStorage
function carregarAvaliacoesAnteriores(filme_id) {
    const container = document.getElementById("listaAvaliacoesAnteriores");
    container.innerHTML = ""; // Limpa a lista

    const avaliacoes = JSON.parse(localStorage.getItem("avaliacoes") || "{}");
    const listaFilme = avaliacoes[filme_id] || [];

    // Itera do mais novo para o mais antigo
    for (let i = listaFilme.length - 1; i >= 0; i--) {
        const avaliacao = listaFilme[i];
        
        const div = document.createElement("div");
        div.className = "avaliacao-anterior";
        
        div.innerHTML = `
            <div class="info">
                <span class="estrelas-display">${gerarEstrelasHTML(avaliacao.nota)}</span>
                <span class="data">${avaliacao.data}</span>
            </div>
            <p class="comentario-texto">${avaliacao.comentario || "<i>Sem comentário.</i>"}</p>
        `;
        container.appendChild(div);
    }
}

// (NOVO) Helper para gerar HTML das estrelas (para avaliações anteriores)
function gerarEstrelasHTML(nota) {
    let html = "";
    const notaNum = Number(nota);
    for (let i = 1; i <= 5; i++) {
        if (i <= notaNum) {
            html += `<span>★</span>`;
        } else {
            html += `<span class="off">☆</span>`;
        }
    }
    return html;
}


//---------------------------------------
//   MODAL DE AVALIAÇÃO
//---------------------------------------

const modal = document.getElementById("modalAvaliacao");
const closeModal = document.querySelector(".close-modal");
let filmeSelecionado = null;
let notaSelecionada = 0; // (NOVO) Armazena a nota da estrela

function ativarEventoPosters() {
    const posters = document.querySelectorAll(".poster");

    posters.forEach(poster => {
        poster.addEventListener("click", () => {
            filmeSelecionado = poster.dataset.id;
            document.getElementById("modalTitulo").innerText =
                `Avaliar: ${poster.dataset.titulo}`;

            // (NOVO) Limpa o estado do modal antes de abrir
            document.getElementById("comentario").value = "";
            notaSelecionada = 0;
            resetarEstrelas();
            
            // (NOVO) Carrega as críticas anteriores
            carregarAvaliacoesAnteriores(filmeSelecionado);

            modal.style.display = "flex";
        });
    });
}

// (NOVO) Lógica do Sistema de Estrelas
function setupStarRating() {
    const stars = document.querySelectorAll(".star-rating .star");

    stars.forEach(star => {
        star.addEventListener("click", () => {
            notaSelecionada = star.dataset.value;
            resetarEstrelas(); // Atualiza a seleção visual
        });
    });
}

// (NOVO) Atualiza o visual das estrelas com base na 'notaSelecionada'
function resetarEstrelas() {
    const stars = document.querySelectorAll(".star-rating .star");
    stars.forEach(star => {
        if (star.dataset.value <= notaSelecionada) {
            star.classList.add("selected");
        } else {
            star.classList.remove("selected");
        }
    });
}

// Inicializa as estrelas quando a página carregar
setupStarRating();


// Lógica para fechar o modal
closeModal.onclick = () => modal.style.display = "none";
window.onclick = (e) => { if (e.target === modal) modal.style.display = "none"; };


//---------------------------------------
// ENVIAR AVALIAÇÃO (LOCAL)
//---------------------------------------

document.getElementById("btnEnviarAvaliacao").addEventListener("click", async () => {

    // (MODIFICADO) Pega a nota das estrelas
    const nota = notaSelecionada; 
    const comentario = document.getElementById("comentario").value;

    if (nota === 0) { // (MODIFICADO) Verifica a nota da estrela
        alert("Por favor, selecione uma nota (de 1 a 5 estrelas)!");
        return;
    }
    
    if (!comentario.trim()) {
        alert("Por favor, escreva um comentário!");
        return;
    }

    salvarAvaliacaoLocal(filmeSelecionado, nota, comentario);

    alert("Avaliação salva localmente!");
    modal.style.display = "none";
});


//---------------------------------------
//   CARROSSEL (AJUSTADO PARA ROLAR 5)
//---------------------------------------

const carousel = document.getElementById('carousel');
const btnLeft = document.querySelector('.carousel-btn.left');
const btnRight = document.querySelector('.carousel-btn.right');

if (carousel && btnLeft && btnRight) {

    const getScrollAmount = () => {
        const firstCard = carousel.querySelector('.box-cartaz');
        if (firstCard) {
            const cardWidth = firstCard.offsetWidth;
            const cardGap = parseInt(window.getComputedStyle(carousel).gap, 10) || 18;
            // Alterado de * 3 para * 5
            return (cardWidth + cardGap) * 5;
        }
        // Fallback
        return Math.round(carousel.clientWidth * 0.9);
    };

    const updateArrowState = () => {
        const scrollLeft = carousel.scrollLeft;
        const maxScroll = carousel.scrollWidth - carousel.clientWidth;
        const buffer = 1;

        btnLeft.classList.toggle('hidden', scrollLeft <= buffer);
        btnRight.classList.toggle('hidden', scrollLeft >= maxScroll - buffer);
    };

    btnLeft.addEventListener('click', () => {
        carousel.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
    });

    btnRight.addEventListener('click', () => {
        carousel.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
    });

    carousel.addEventListener('scroll', updateArrowState);
    window.addEventListener('resize', updateArrowState);

    // Um pequeno atraso para garantir que as imagens sejam carregadas
    setTimeout(updateArrowState, 300);
}


//---------------------------------------
//   MENU MOBILE
//---------------------------------------

const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");

toggle.addEventListener("click", () => {
    links.classList.toggle("open");
});