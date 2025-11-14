let index = parseInt(prompt("Selecione o número de peças para o jogo\nObs: deve ser par e estar entre 4 e 14."));

while(index < 4 || index > 14 || index%2 !== 0){
    index = parseInt(prompt("Selecione o número de peças para o jogo\nObs: deve ser par e estar entre 4 e 14."));
}

const gif1 = {
    link: 'assets/explodyparrot.gif',
    nome: 'explody'
};

const gif2 = {
    link: 'assets/bobrossparrot.gif',
    nome: 'bobross'
};

const gif3 = {
    link: 'assets/fiestaparrot.gif',
    nome: 'fiesta'
};

const gif4 = {
    link: 'assets/metalparrot.gif',
    nome: 'metal'
};

const gif5 = {
    link: 'assets/revertitparrot.gif',
    nome: 'revertit'
};

const gif6 = {
    link: 'assets/tripletsparrot.gif',
    nome: 'triplets'
};

const gif7 = {
    link: 'assets/unicornparrot.gif',
    nome: 'unicorn'
};

let arr = [gif1, gif2, gif3, gif4, gif5, gif6, gif7];

function adicionarCarta(gif) {
    const container = document.querySelector('.container');

    if (!container) {
        console.error('Container não encontrado!');
        return;
    }

    const card = document.createElement('div');
    card.className = 'card';

    // Face frontal com o papagaio
    const frontFace = document.createElement('div');
    frontFace.className = 'front-face face';

    const frontImg = document.createElement('img');
    frontImg.src = 'assets/back.png';
    frontImg.alt = 'frente';
    frontImg.className = 'papagaionormal';

    // Face traseira com o GIF
    const backFace = document.createElement('div');
    backFace.className = 'back-face face';

    const backImg = document.createElement('img');
    backImg.src = gif.link;
    backImg.className = gif.nome;
    backImg.alt = 'verso';

    // Montando a estrutura
    frontFace.appendChild(frontImg);
    backFace.appendChild(backImg);
    card.appendChild(frontFace);
    card.appendChild(backFace);

    container.appendChild(card);
}

let novoArr = [];
for(let j = 0; j < index/2; j++){
    novoArr.push(arr[j]);
    novoArr.push(arr[j]);
}

novoArr.sort(() => Math.random() - 0.5);

document.addEventListener('DOMContentLoaded', () => {
    // Adiciona as cartas
    for(let i = 0; i < index; i++){
        adicionarCarta(novoArr[i]);
    }

    let primeiraCarta = null;
    let segundaCarta = null;
    let bloqueado = false;
    let tentativas = 0;
    let paresEncontrados = 0;

    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            // Não permite clicar em uma carta já virada ou quando o tabuleiro está bloqueado
            if (card.classList.contains('flipped') || bloqueado) return;

            // Incrementa o contador de tentativas
            tentativas++;

            // Vira a carta
            card.classList.add('flipped');

            // Se é a primeira carta do par
            if (!primeiraCarta) {
                primeiraCarta = card;
                return;
            }

            // Se é a segunda carta
            segundaCarta = card;

            // Verifica se as cartas são iguais
            const match = verificaMatch();

            if (match) {
                // Reseta as cartas selecionadas
                resetarCartas();
                paresEncontrados++;

                // Verifica se o jogo acabou
                if (paresEncontrados === index/2) {
                    setTimeout(() => {
                        alert(`Você ganhou em ${tentativas} jogadas!`);
                    }, 500);
                }
            } else {
                // Bloqueia o tabuleiro temporariamente
                bloqueado = true;

                // Aguarda um pouco e desvira as cartas
                setTimeout(() => {
                    primeiraCarta.classList.remove('flipped');
                    segundaCarta.classList.remove('flipped');
                    resetarCartas();
                }, 1000);
            }
        });
    });

    function verificaMatch() {
        // Pega os GIFs das duas cartas
        const gif1 = primeiraCarta.querySelector('.back-face img').className;
        const gif2 = segundaCarta.querySelector('.back-face img').className;
        return gif1 === gif2;
    }

    function resetarCartas() {
        primeiraCarta = null;
        segundaCarta = null;
        bloqueado = false;
    }
});


