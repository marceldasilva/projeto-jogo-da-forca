/* Elemento HTML referente a categoria */
const categoria = document.querySelector("#category");
/* Elemento HTML referente a lista das letras erradas*/
const letrasErradas = document.querySelector(".wrongLetters");
/* Elemento HTML referente a palavra oculta
   Utilizaremos esse mesmo elemento para exibir as mensagens do jogo*/
const palavraInterface = document.querySelector(".dashes");
/* Array com elementos HTML referentes aos olhos do personagem */
const olhos = Array.from(document.querySelectorAll(".eyes"));
/* Array com elementos HTML referentes as partes do corpo */
let partesBoneco = Array.from(document.querySelectorAll("#person div"));
partesBoneco = partesBoneco.slice(2, partesBoneco.length);
/* Palavra corrente */
let palavraProposta;
/* Lista das letras erradas */
let letrasErradasArray = [];
/* Index da parte do corpo corrente */
let indiceBoneco;
/* Numero de chances do jogador */
const numTentativas = 7;
/* Valor para opacidade dos olhos */
const opacidadeOlhos = 0.3;

/*
Categorias do jogo selecionadas aleatóriamente e exibidas na interface
*/
const categorias = {
    filmes: ['transformers', 'carros', 'lassie', 'rambo'],
    profissoes: ['administrador', 'programador', 'engenheiro', 'editor'],
    animais: ['gato', 'cachorro', 'leao', 'orca', 'beluga'],
    cores: ['amarelo', 'roxo', 'azul', 'vermelho', 'preto', 'branco']
}

function retornaCategoria() {
    return Object.keys(categorias);
}

function retornaCategoriaAleatoria() {
    const retornaCategorias = retornaCategoria();
    const retornaIndiceAleatorioCategorias = retornaNumAleatorio(retornaCategorias.length);
    return retornaCategorias[retornaIndiceAleatorioCategorias];
}

function exibeCategoria() {
    return categoria.innerHTML = retornaCategoriaAleatoria();
}

/*
Retorna indice aleatório
*/
function retornaNumAleatorio(max) {
    return Math.floor(Math.random() * max);
}

/*
Palavras selecionadas aleatóriamente, ocultadas e exibidas na interface 
*/
function retornaPalavra() {
    const palavraCategoria = categorias[categoria.innerHTML];
    let indicePalavraCategoria = retornaNumAleatorio(palavraCategoria.length);
    palavraProposta = palavraCategoria[indicePalavraCategoria];
    ocultaPalavra();
}

function ocultaPalavra() {
    let palavraOcultada = '';
    for(let c = 0; c < palavraProposta.length; c++) {
        palavraOcultada += '-';
    }
    exibePalavraInterface(palavraOcultada);
}

function exibePalavraInterface(palavra) {
    palavraInterface.innerHTML = palavra;
    letrasErradas.innerHTML = `Letras erradas: ${letrasErradasArray}`
}

/*
Verifica se as tentativas estão corretas ou não
*/
function tentativa(letra) {
    if(palavraProposta.includes(letra)) {
        atualilzaPalavraInterface(letra);
    } else {
        letrasErradasArray.push(letra)
        atualilzaPalavraInterface(letra)
        if(partesBoneco.length > indiceBoneco) {
            desenhaBoneco()
        }
    }
    verificaFimDeJogo()
}

function atualilzaPalavraInterface(letra) {
    let palavraAux = '';
    for(let c = 0; c < palavraProposta.length; c++) {
        if(palavraProposta[c] === letra) {
            palavraAux += letra;
        } else if(palavraInterface.innerHTML[c] != '-') {
            palavraAux += palavraInterface.innerHTML[c];
        } else {
            palavraAux += '-';
        }
        
    }
    exibePalavraInterface(palavraAux);
}

/*
Verifica se o jogo terminou e se o player venceu ou não
*/
function verificaFimDeJogo() {
    if(!palavraInterface.innerHTML.includes('-')) {
        exibePalavraInterface('Você Venceu!')
        window.removeEventListener('keypress', retornaLetra)
    } else if(letrasErradasArray.length >= numTentativas) {
        desenhaOlhos()
        exibePalavraInterface('Você Perdeu!')
        window.removeEventListener('keypress', retornaLetra)
    }
}

/*
Recebe o evento do teclado e passa apenas o valor da letra para a função tentativa
*/
function retornaLetra(e) {
    tentativa(e.key);
}

/*
Desenha a parte do corpo corrente
*/
function desenhaBoneco() {
    partesBoneco[indiceBoneco].classList.remove("hide");
    indiceBoneco++; 
}

/* 
Desenha os olhos do personagem
*/
function desenhaOlhos() {
    olhos.forEach((olho => {
        olho.style.opacity = 1;
        olho.style.zIndex = 10;
    }));
}

/*
Oculta as partes do corpo do personagem
*/
function ocultaBoneco() {
    olhos.forEach((olho => {
        olho.style.opacity = opacidadeOlhos; 
    }));
    partesBoneco.forEach(parteBoneco => {
        parteBoneco.classList.add("hide");
    });
}

/*
Inicia as configurações do jogo
*/
function iniciaJogo() {
    indiceBoneco = 0;
    letrasErradasArray = [];
    ocultaBoneco();
    exibeCategoria();
    retornaPalavra();
    window.addEventListener("keypress", retornaLetra);
}

window.addEventListener("load", iniciaJogo);