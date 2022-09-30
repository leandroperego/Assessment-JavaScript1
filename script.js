let listaCasasBloqueadas = [];
let listaPosicoes = [];
const referenciaAviso = document.getElementById("aviso");
const referenciaLinhaJogadorVez = document.getElementById("linhaJogadorDaVez");
let referenciaJogadorAtual = document.getElementById("sJogadorDaVez");
let jogoBloqueado = false;

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
      if (verificarVencedor()) {
        referenciaAviso.style.color = "green";
        referenciaAviso.innerText = `O jogador ${jogadorAtual} venceu!!`;
        bloquearJogo();
        // referenciaLinhaJogadorVez.innerText = "O jogo acabou!";
      }
      if (verificarSeTodasCasasPreenchidas()) {
        referenciaAviso.innerText = `Deu velha. Ninguém venceu!`;
        bloquearJogo();
        // referenciaLinhaJogadorVez.innerText = "O jogo acabou!";
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
}
function desbloquearJogo() {
  jogoBloqueado = false;
}

function reiniciarJogo() {
  listaCasasBloqueadas = [];
  listaPosicoes = [];
  referenciaAviso.innerText = "";

  limparCasas();
  desbloquearJogo();
}

function limparCasas() {
  let lista = document.getElementsByClassName("tile");

  for (var i = 0; i < lista.length; i++) {
    lista[i].innerText = "";
  }
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