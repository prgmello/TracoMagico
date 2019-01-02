/*
====================================
== TRAÇO MÁGICO EM JS             ==
== (c) Paulo Mello - Teresópolis  ==
== Data 23/10/2018                ==
== CÓDIGO PRINCIPAL               ==
====================================
*/

// Variáveis de Utilização dos Canvas
var canvasFu;
var canvas;
var canvasFr;
var canvas1;
var canvas2;
var canvas3;
var canvas4;
var ctxFu;
var ctx;
var ctxFr;
var ctx1;
var ctx2;
var ctx3;
var ctx4;
// Variáveis de Utilização dos Canvas (FIM)

// Outras Variáveis
var cor = "#0000FF"; // Inicia com a cor Azul
var dx = 2; //Taxa de "velocidade" horizontal do desenho
var dy = 2; //Taxa de "velocidade" vertical do desenho
var WIDTH = 950; // Largura do Canvas
var HEIGHT = 500; // Altura do Canvas
var x = WIDTH / 2; //Posição horizontal do desenho
var y = HEIGHT / 2; //Posição vertical do desenho
var largura = 2; // largura do traço de 2 a 20
var Radius = 100; // Tamanho do raio para circulos
var Xant = x; // Coordenada anterior de x para traçar retângulos
var Yant = y; // Coordenada anterior de x para traçar retângulos
var transp = 1 // Define a transparência de objetos hachurados (1=opaco)
var retL = 0; // Largura do Retângulo
var retA = 0; // Altura do Retângulo
var LinhaManual = false; // 
var vResp = "N"; // Saída da função confirma

// VARIÁVEIS DAS FUNÇÕES LER FOTOS
var texto = "Escreva seu texto." // Armazena o texto digitado
var FontSize = 20; // Tamanho da Fonte em pixels
var usuarioIMG = new Image(); // Guarda a foto do usuário lida do computador
var temIMG = false; // Não tem foto na memória
var gravouIMG = false // Define se a imagem foi gravada em memória.
//
// VARIÁVEL DE GRAVAÇÃO 
//
var Passo = 0;
var PassoLimite = 4000;
var pGravar = true;
var pForma = new Array(PassoLimite);
var pBehavior = new Array(PassoLimite);
var pX = new Array(PassoLimite);
var pY = new Array(PassoLimite);
var pXant = new Array(PassoLimite);
var pYant = new Array(PassoLimite);
var pColor = new Array(PassoLimite);
var pThickness = new Array(PassoLimite);
var pTransparency = new Array(PassoLimite);
var pSpeed = new Array(PassoLimite);
var pRadius = new Array(PassoLimite);
var pFontSize = new Array(PassoLimite);
var pText = new Array(PassoLimite);
var pEmoji = new Array(PassoLimite);
var pUsuarioIMG = new Array(PassoLimite);
var pGravouIMG = new Array(PassoLimite);


//
// FIM DA DEFINIÇÃO DAS VARIÁVEIS GLOBAIS
//



//
// SELECIONA OS CANVAS DE TRABALHO
//

// CANVAS PRINCIPAL Layer de Fundo (background)
canvasFu = document.getElementById("tmcanvasFu");
ctxFu = tmcanvasFu.getContext("2d");

// CANVAS PRINCIPAL Layer Principal (Desenho)
canvas = document.getElementById("tmcanvas");
ctx = canvas.getContext("2d");

// CANVAS PRINCIPAL Layer de Frente (cursor)
canvasFr = document.getElementById("tmcanvasFr");
ctxFr = tmcanvasFr.getContext("2d");

//
// FAZ INICIALIZAÇÃO DAS VARIÁVEIS
//
function Start() {
  x = WIDTH / 2;
  y = HEIGHT / 2;
  Xant = x;
  Yant = y;
  retL = 0;
  retA = 0;
}


//
// FAZ INICIALIZAÇÃO DOS CONTROLES
//
function UpdateTools() 
{
  ShowColor();
  ShowThickness();
  ShowTransparency();
  ShowSpeed();
  ShowRadius();
  ShowSaveStatus();
  ShowCursor();
}



//
  // CRIA OS BOTÕES PARA A FERRAMENTA EMOTICONS
  //
  function CreateEmojiTab() 
  {
  // TODOS OS CARACTERES DESTA STRING VIRAM BOTÕES NA EMOJI-TAB
  var str1 = "✢✣✤✥✦✧✩✪✫✬✭✮✯✰✱✲✳✴✵✶✷✸✹✺✻✼✽✾✿❀❁❂❃❄❅❆❇❈❉❊❋♩♪♫♬♭♯★☆✝✞✟✠✡☢☣❥❤♡♥♠♦♣☃۞☼☽☾☁☹☺☙☘✊✋✌✍⌚☔☕";

  var QtdEMC = str1.length;
  var pEMC = new Array(QtdEMC);
  var element = document.getElementById("EmoTab"); // SELECIONA A DIV
  element.innerHTML = "";

  for (f = 0; f < QtdEMC; f++) 
   {
    pEMC[f] = str1.substring(f, f + 1);
    //console.log(pEMC[f]);
    element.innerHTML += '<a href="#" class="EMC" onclick=\'DrawEmoji("' + pEMC[f] + '") \' >' + pEMC[f] + '</a>';
   }
  }



//
// DEFINE A COR
//
function DefColor(inCor) {
  cor = inCor;
}

//
// MOSTRA A COR
//
function ShowColor() {
  document.getElementById('input-color').value = cor;
}


//
// SOBRE O TRAÇO MAGICO JS
//
function ajuda() {
  var width = 700;
  var height = 522;
  var left = 99;
  var top = 99;
  window.open('tm_ajuda.jpg', 'Ajuda', 'width=' + width + ', height=' + height + ', top=' + top + ', left=' + left + ', titlebar=no, scrollbars=yes, status=no, toolbar=no, location=no, directories=no, menubar=no, resizable=no, fullscreen=no');
}


function SalvaDesenho() {
  // USA TEMPORARIAMENTE O CANVAS FR PARA MERGEAR OS FUNDO COM O DESENHO 
  ctxFr.beginPath();
  ctxFr.clearRect(0, 0, WIDTH, HEIGHT);
  ctxFr.drawImage(canvasFu, 0, 0)
  ctxFr.drawImage(canvas, 0, 0)

  // DEFINE O CANVAS COMO A IMAGEM PARA DOWNLOAD
  var meucanvas = document.getElementById('tmcanvasFr');
  var arquivo = document.getElementById('arquivo');

  arquivo.href = meucanvas.toDataURL();
  mensagem('Imagem salva com o nome "TM-Imagem.png"')
  ShowCursor();
}



//
// SOBRE PAULO MELLO
//
function sobrePM() {
  mensagem('O "Traço Mágico JS" foi desenvolvido em 2018 \n por Paulo Mello para aprendizado de JavaScript. \n \n Contato: prgmello@gmail.com');
}



//
// FUNÇÃO PARA SUBSTITUIR O "ALERT" DO JS
//
function mensagem(textoMSG) {
  if (textoMSG == "") // OCULTA
  {
    ocultaMSG()
  } else {
    document.getElementById("mostraMSG").style.display = ""; // MOSTRA O BOTÃO
    var element = document.getElementById("textoMSG");
    element.innerHTML = textoMSG;
    // TEMPORIZANDO O FECHAMENTO DA LINHA DE MENSAGEM
    setTimeout(ocultaMSG, 5000)
  }
}

//
// FUNÇÃO PARA OCULTAR O CAMPO DE MENSAGEM DO PROGRAMA
//
function ocultaMSG() {
  document.getElementById("mostraMSG").style.display = "none"; // OCULTA O BOTÃO "block" ou "none" 
  clearTimeout(ocultaMSG);
}

//
// FUNÇÃO PARA OCULTAR O CAMPO DE CONFIRMAÇÃO DO PROGRAMA
//
function ocultaCONF(vResp) {
  document.getElementById("mostraCONF").style.display = "none"; // OCULTA O BOTÃO "block" ou "none"  
}



//
// FUNÇÃO PARA SUBSTITUIR O "CONFIRM" DO JS
//
// function confirma(text, confirmCallback, cancelCallback)
// {
//   console.log(text);
//   document.getElementById("mostraCONF").style.display = "block"; // MOSTRA O BOTÃO
//   document.getElementById("textoCONF").innerHTML = text;

//   var btConfirma = document.getElementById("btConfirma");
//   btConfirma.onclick = function () 
//   { 
//     ocultaCONF();
//     confirmCallback();
// };

// var btCancela = document.getElementById("btCancela");
//   btCancela.onclick = function()
//   { 
//     ocultaCONF();
//     cancelCallback();
//   };
// }



//
// FUNÇÃO MOSTRA A TABELA DE EMOJIS 
//
function ShowEmojiTab(modo) {
  if (modo == false) // OCULTA
  {
    document.getElementById("ContemEmoTab").style.display = "none"; // OCULTA A EMOJI TAB 
  } else {
    document.getElementById("ContemEmoTab").style.display = ""; // MOSTRA A EMOJI TAB 
    //var element = document.getElementById("textoMSG");
    //element.innerHTML = textoMSG;
  }
}


function limpaDeslocamento() {
  if (!document.getElementById("ligaX").checked) {
    document.getElementById("emoX").checked = false;
    document.getElementById("emoXR").checked = false;
    // Desativa para não set clicado
    document.getElementById("emoX").disabled = true;
    document.getElementById("emoXR").disabled = true;
  } else {
    document.getElementById("emoX").checked = true;
    // Desativa para não set clicado
    document.getElementById("emoX").disabled = false;
    document.getElementById("emoXR").disabled = false;
  }

  if (!document.getElementById("ligaY").checked) {
    document.getElementById("emoY").checked = false;
    document.getElementById("emoYR").checked = false;
    // Desativa para não set clicado
    document.getElementById("emoY").disabled = true;
    document.getElementById("emoYR").disabled = true;

  } else {
    document.getElementById("emoY").checked = true;
    // Desativa para não set clicado
    document.getElementById("emoY").disabled = false;
    document.getElementById("emoYR").disabled = false;
  }


}



//
// FUNÇÃO APAGAR - APAGA TODA A TELA
//
function apagar() {
  if (confirm("Confirma apagar todo o desenho?")) {
    ClearScreen();
  }
  Start();
  UpdateTools();
}


//
// LIMPA A TELA
//  
function ClearScreen() {
  // APAGA A TELA DE DESENHO
  ctx.beginPath();
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  ctx.fill();
  // APAGA A TELA DE FUNDO
  ctxFu.beginPath();
  ctxFu.fillStyle = "#FFFFFF";
  ctxFu.fillRect(0, 0, WIDTH, HEIGHT);
  ctxFu.fill();

}



//
// DEFINE LARGURA DA CANETA
//
function DefThickness(parametro) {
  largura = parseInt(parametro);
  ShowThickness();
}


//
// MOSTRA A LARGURA DA CANETA
//
 function ShowThickness()
{
  // AUALIZANDO O MOSTRADOR DA LARGURA
  var element = document.getElementById("numlargura");
  element.innerHTML = "[" + largura + "]";
}


//
// DEFINE A VELOCIDADE DA CANETA
//
function DefSpeed(parametro) 
{
  dx =  parseInt(parametro);
  dy =  dx;
  ShowSpeed();
}



//
// MOSTRA A VELOCIDADE DA CANETA
//
function ShowSpeed()
{
  // AUALIZANDO O MOSTRADOR DA VELOCIDADE
  var element = document.getElementById("numvelocidade");
  element.innerHTML = "[ " + dx + " ]";
}


//
// DEFINE RAIO DO CIRCULO
//
function DefRadius(parametro) {
  Radius = parseInt(parametro);
  ShowRadius();
}


//
// MOSTRA O RAIO DO CIRCULO
//
function ShowRadius()
{
  // Mostrando o valor do Raio
  var element = document.getElementById("numradius");
  element.innerHTML = "[" + Radius + "]";
}


//
// DEFINE A TRANSPARENCIA
//
function DefTransparency(value) 
{
  var lTransp = 1 - (value / 100);
  transp = parseFloat(lTransp.toFixed(2));
  ShowTransparency();
}


//
// MOSTRA A TRANSPARENCIA
//
function ShowTransparency() 
{
  var lTransp2Dig = (1-transp) * 100;
  lTransp2Dig = parseFloat(lTransp2Dig.toFixed(2));
  var element = document.getElementById("sttransp");
  element.innerHTML = "[ " + lTransp2Dig + " ]";
}


//
// DEFINE O TAMANHO DA FONTE DO TEXTO
//
function DefText(value) 
{
  // AUALIZANDO O MOSTRADOR DE TAMANHO DO TEXTO
  FontSize = parseInt(value);
  var element = document.getElementById("numtexto");
  element.innerHTML = "[ " + FontSize + " ]";
}


//
// MOSTRA O TEXTO PASSEI AQUI (PARA DEBUG)
//
function ola() {console.log('PASSEI AQUI');}


//
// POSICIONA O CURSOR NO CANVAS DA FRENTE
//
function ShowCursor() {
  ctxFr.beginPath();
  ctxFr.clearRect(0, 0, WIDTH, HEIGHT);
  ctxFr.font = "10px Verdana";
  ctxFr.fillStyle = "#696969";
  ctxFr.fillText("⊕", Xant - 4, Yant + 4);
  ctxFr.fillStyle = "#FFD700";

  var cursorText = "⊗";
  var halfCursorWidth = ctxFr.measureText(cursorText).width/2;
  ctxFr.fillText(cursorText, 
    x - halfCursorWidth, 
    y + halfCursorWidth - 2); // Isso foi setado à força!!

  // Marca o ponto no Canvas de desenho
  ctx.moveTo(x, y);

  if (pGravar) {SaveStep("Cursor","","");}

  // CALCULA LARGURA E ALTURA DO RETÂNGULO
  retL = Math.abs(x - Xant) + 1;
  retA = Math.abs(y - Yant) + 1;
}


//
// FUNÇÃO QUE LÊ AS TECLAS PRESSIONADAS
//
function KeyDown(evt) {
  switch (evt.keyCode) {
    case 38:
      /* seta para cima */
    case 87:
      /* 'W'  para cima */
      if (y - dy > 0) {
        y -= dy;
      }
      break;
    case 40:
      /* set para baixo*/
    case 83:
      /* 'S' para baixo  */
      if (y + dy < HEIGHT) {
        y += dy;
      }
      break;
    case 37:
      /*set  para esquerda*/
    case 65:
      /* 'A' para esquerda*/
      if (x - dx > 0) {
        x -= dx;
      }
      break;
    case 39:
      /*seta para direita*/
    case 68:
      /* 'D' para direita */
      if (x + dx < WIDTH) {
        x += dx;
      }
      break;
  }

  // // FLAG DE USO DE TECLADO
  if (LinhaManual == false) 
   {
     Xant = x;
     Yant = y;
   }

   DrawPoint();
   LinhaManual = true;

}



//
// MOVE O PONTO PARA O CLICK DO MOUSE
//
tmcanvasFr.onmousedown = function (evt) {
  Xant = x;
  Yant = y;
  ctxFr.moveTo(evt.clientY, evt.clientX);

  var rect = tmcanvasFr.getBoundingClientRect(); 
  x = evt.offsetX;
  y = evt.offsetY;
  ShowCursor();
}


window.addEventListener('keydown', KeyDown, true);



//Check File API support
if (window.File && window.FileList && window.FileReader) {
  var filesInput = document.getElementById("files");
  filesInput.addEventListener("change", function (event) {

    var files = event.target.files; //FileList object
    var file = files[0];

    // SOMENTE SE FOR TIPO 'IMAGEM'
    if (file.type.match('image')) {
      var picReader = new FileReader();
      picReader.addEventListener("load", function (event) {
        var picFile = event.target;
        usuarioIMG = new Image();
        gravouIMG = false;
        usuarioIMG.src = picFile.result;
      });
      //Read the image
      picReader.readAsDataURL(file);
      var vSize = files[0].size;

      if (vSize < 1048576) { //1MB         
        temIMG = true // Tamanho da imagem dentro do permitido
      } else {
        mensagem("Selecione uma imagem até 1Mb."); //Acima do limite
        picReader = ""; //Limpa o campo   
        temIMG = false;
      }
    } else {
      temIMG = false
    }

    // ATUALIZA O STATUS DA IMAGEM
    if (temIMG) {
      // BOTÃO HABILITADO
      document.getElementById("pegaimg").style.color="#ff8c00";
      document.getElementById("pegaimg").disabled = true; 
    } else {
      document.getElementById("pegaimg").style.color="#333333";
      document.getElementById("pegaimg").disabled = false;
    }
  });
} else {
  mensagem("Este navegador não suporta esta função.");
}


ocultaMSG();
CreateEmojiTab();
ShowEmojiTab(false);
ocultaCONF(vResp);
ClearScreen();
Start();
UpdateTools();