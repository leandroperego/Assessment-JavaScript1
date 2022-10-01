let listaCasasBloqueadas = [];
let listaPosicoes = [];
const referenciaAviso = document.getElementById("aviso");
const referenciaLinhaJogadorVez = document.getElementById("linhaJogadorDaVez");
let referenciaJogadorAtual = document.getElementById("sJogadorDaVez");
let referenciaTempoDeJogo = document.getElementById("tempoDeJogoSegundos");
let jogoBloqueado = false;
let pontuacaoJogadorX = 0;
let pontuacaoJogadorO = 0;
let numeroDeJogadas = 0;
let inicioJogo = Date.now();
let fimJogo;
let melhorTempoJogadorX = "-";
let melhorTempoJogadorO = "-";

function marcarCasa(evento, numeroCasa) {
  // alert(`Você clicou na casa ${numeroCasa}`);
  let referenciaCasaSelecionada = evento.currentTarget;
  if (!jogoBloqueado) {
    referenciaAviso.innerText = "";
    if (casaBloqueada(numeroCasa)) {
      referenciaAviso.innerText = "Essa casa já foi selecionada. Escolha outra.";
      referenciaAviso.style.color = "red";
    } else {
      let jogadorAtual = referenciaJogadorAtual.innerText;
      if (jogadorAtual === "X") {
        referenciaCasaSelecionada.innerText = "X";
      } else {
        referenciaCasaSelecionada.innerText = "O";
      }
      referenciaJogadorAtual.innerText = trocarTurno(jogadorAtual);
      bloquearCasa(numeroCasa);
      atualizarJogadorDaCasa(numeroCasa, jogadorAtual);
      numeroDeJogadas++;
      if (verificarVencedor()) {
        referenciaAviso.style.color = "green";
        referenciaAviso.innerText = `O jogador ${jogadorAtual} venceu!!`;
        bloquearJogo();
        lancarMelhorTempoJogador(jogadorAtual, calcularTempoEmSegundos(inicioJogo, fimJogo));
        pontuarJogadorVencedor(jogadorAtual);
        exibirTempoDeJogo();
      }
      if (verificarSeTodasCasasPreenchidas() && !verificarVencedor()) {
        referenciaAviso.innerText = `Deu velha. Ninguém venceu!`;
        bloquearJogo();
        exibirTempoDeJogo();
      }
    }
  }
}

function trocarTurno(turnoAtual) {
  if (turnoAtual === "X") {
    return "O";
  } else {
    return "X";
  }
}

function bloquearCasa(numeroDaCasaClicada) {
  if (!casaBloqueada(numeroDaCasaClicada)) {
    listaCasasBloqueadas.push(numeroDaCasaClicada);
  }
}

function casaBloqueada(casa) {
  for (var i = 0; i <= listaCasasBloqueadas.length; i++) {
    if (listaCasasBloqueadas[i] === casa) {
      return true;
    }
  }
  return false;
}

function atualizarJogadorDaCasa(casa, jogador) {
  listaPosicoes[casa - 1] = jogador;
}

function verificarSeTodasCasasPreenchidas() {
  for (var i = 0; i < 9; i++) {
    if (listaCasasBloqueadas[i] === undefined) {
      return false;
    }
  }
  return true;
}

function bloquearJogo() {
  jogoBloqueado = true;
  fimJogo = Date.now();
}
function desbloquearJogo() {
  jogoBloqueado = false;
  inicioJogo = Date.now();
}

function calcularTempoEmSegundos(inicio, fim){
  return (fim - inicio) / 1000 ;
}

function reiniciarJogo() {
  listaCasasBloqueadas = [];
  listaPosicoes = [];
  referenciaAviso.innerText = "";
  limparCasas();
  desbloquearJogo();
  numeroDeJogadas = 0;
  referenciaTempoDeJogo.innerText = "";
  exibirMelhorTempo();
}

function limparCasas() {
  let lista = document.getElementsByClassName("tile");

  for (var i = 0; i < lista.length; i++) {
    lista[i].innerText = "";
  }
}

function pontuarJogadorVencedor(jogador){
  if (jogador === "X"){
    if (pontoExtra()){
      pontuacaoJogadorX += 2;
    } else{
      pontuacaoJogadorX++;
    }
  }else if(jogador === "O"){
    if (pontoExtra()){
      pontuacaoJogadorO += 2;
    } else{
      pontuacaoJogadorO++;
    }
  }
  exibirPontuacao();
}

function lancarMelhorTempoJogador(jogador, tempoDeJogo){

  if (jogador == "X" && tempoDeJogo < melhorTempoJogadorX || melhorTempoJogadorX === "-"){
    melhorTempoJogadorX = tempoDeJogo.toFixed(2);
  } else if(jogador == "O" && tempoDeJogo < melhorTempoJogadorO || melhorTempoJogadorO === "-"){
    melhorTempoJogadorO = tempoDeJogo.toFixed(2);
  }
}

function exibirPontuacao(){
  let jogadorX = document.getElementById("pontosJogadorX");
  let jogadorO = document.getElementById("pontosJogadorO");

  jogadorX.innerText = pontuacaoJogadorX;
  jogadorO.innerText = pontuacaoJogadorO;
}

function exibirMelhorTempo(){
  //conferir quem for o menor e deixar verde, maior vermelho
  let tempoX = document.getElementById("melhorTempoJogadorX");
  let tempoO = document.getElementById("melhorTempoJogadorO");

  tempoX.innerText = melhorTempoJogadorX;
  tempoO.innerText = melhorTempoJogadorO;

  if (!(melhorTempoJogadorX === "-" || melhorTempoJogadorO === "-")){
    if (melhorTempoJogadorX < melhorTempoJogadorO){
      tempoX.style.color = "green";
      tempoO.style.color = "red";
    } else{
      tempoX.style.color = "red";
      tempoO.style.color = "green";
    }
  }
}

function exibirTempoDeJogo(){
  referenciaTempoDeJogo.innerText = Math.floor(calcularTempoEmSegundos(inicioJogo, fimJogo)) + " segundos!";
}

function zerarPlacar(){
  pontuacaoJogadorX = 0;
  pontuacaoJogadorO = 0;
  melhorTempoJogadorX = "-";
  melhorTempoJogadorO = "-";
  exibirPontuacao();
  exibirMelhorTempo();
}

function pontoExtra(){
 return numeroDeJogadas <= 8;
}

function verificarVencedor() {
  return vencedorLinha() || vencedorColuna() || vencedorDiagonal();
}

function vencedorLinha() {
  let linha1 = listaPosicoes[0] === listaPosicoes[1] && listaPosicoes[0] === listaPosicoes[2] && listaPosicoes[0] != undefined;
  let linha2 = listaPosicoes[3] === listaPosicoes[4] && listaPosicoes[3] === listaPosicoes[5] && listaPosicoes[3] != undefined;
  let linha3 = listaPosicoes[6] === listaPosicoes[7] && listaPosicoes[6] === listaPosicoes[8] && listaPosicoes[6] != undefined;
  return linha1 || linha2 || linha3;
}

function vencedorColuna() {
  let coluna1 = listaPosicoes[0] === listaPosicoes[3] && listaPosicoes[0] === listaPosicoes[6] && listaPosicoes[0] != undefined;
  let coluna2 = listaPosicoes[1] === listaPosicoes[4] && listaPosicoes[1] === listaPosicoes[7] && listaPosicoes[1] != undefined;
  let coluna3 = listaPosicoes[2] === listaPosicoes[5] && listaPosicoes[2] === listaPosicoes[8] && listaPosicoes[2] != undefined;
  return coluna1 || coluna2 || coluna3;
}

function vencedorDiagonal() {
  let diagonal1 = listaPosicoes[0] === listaPosicoes[4] && listaPosicoes[0] === listaPosicoes[8] && listaPosicoes[0] != undefined;
  let diagonal2 = listaPosicoes[2] === listaPosicoes[4] && listaPosicoes[2] === listaPosicoes[6] && listaPosicoes[2] != undefined;
  return diagonal1 || diagonal2;
}