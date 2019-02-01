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
var canvasPr; // Canvas de Preview de ferramentas
var ctxFu;
var ctx;
var ctxFr;
var ctxPr; // CTX de Preview de ferramentas
// Variáveis de Utilização dos Canvas (FIM)

// Outras Variáveis
var color1 = "#0000FF"; // Inicia com a cor Azul "#0000FF"
var color2 = "#FF0000"; // Inicia com a cor Branca "#FFFFFF"
var cor1 = "00"; // COMPONENTE DE COR RED=00
var cor2 = "00"; // COMPONENTE DE COR GREEN=00
var cor3 = "FF"; // COMPONENTE DE COR BLUE=FF
var dx = 10; //Taxa de "velocidade" horizontal do desenho
var dy = 10; //Taxa de "velocidade" vertical do desenho
var WIDTH = 950; // Largura do Canvas
var HEIGHT = 500; // Altura do Canvas
var x = WIDTH / 2; //Posição horizontal do desenho
var y = HEIGHT / 2; //Posição vertical do desenho
var StFill = false; // Define se formas serão sólidas ou vazias
var FillKind = "Vazio";  // Define tipo de preenchimento de formas "Solido" , "Linear" , "Radial"
var GradientSprainX = 0 // Deslocamento X do Preenchimento Radial
var GradientSprainY = 0 // Deslocamento X do Preenchimento Radial
var StMulticolor = false; // Define se algumas formas serão Multicores
var StSimetric = false; // Define se Elipse Será um círculo
var GradientX = 0; // Localização X do Gradiente em percentuaL. INICIAL= 0
var GradientY = 0; // Localização Y do Gradiente em percentual. INICIAL= 0
var largura = 2; // largura do traço de 2 a 20
var RadiusX = 50; // Tamanho do raio para circulos
var RadiusY = 50; // RadiusX do eixo Y para Elipses
var retX = 0; // X do vértice do retAngulo Retângulo
var retY = 0; // Y do vértice do retAngulo Retângulo
var retL = 0; // Largura do Retângulo (VAI SER DEFINIDA POR PERCENTSIZEX)
var retA = 0; // Altura do Retângulo  (VAI SER DEFINIDA POR PERCENTSIZEY)

var PercentSizeX = 30; // Tamanho Relativo dos objetos em relação a WIDTH
var PercentSizeY = 30; // Tamanho Relativo dos objetos em relação a HEIGHT

var Rotate = 1; // Rotação de Objetos
var Sides = 5 // Númro de Lados para Polígonos
var Xant = x; // Coordenada anterior de x para traçar retângulos
var Yant = y; // Coordenada anterior de x para traçar retângulos
var transp = 1 // Define a transparência de objetos hachurados (1=opaco)


var vResp = "N"; // Saída da função confirma
var Shape = ""; // Guarda a última forma utilizada pelo usuário.

//var StPreview = false;
var StPreview = true;

var vInterval;
var vTimer = 100; // TEMPO EM MILISSEGUNGOS
var Behavior; // Comportamento da rotina chamada 
var stShiftKey = false; // Mostra se a Tecla <Shift> está pressionada

// VARIÁVEIS DAS FUNÇÕES LER FOTOS
var texto = "Escreva seu texto." // Armazena o texto digitado
var FontSize = 40; // Tamanho da Fonte em pixels
var usuarioIMG = new Image(); // Guarda a foto do usuário lida do computador
var temIMG = false; // Não tem foto na memória
var gravouIMG = false // Define se a imagem foi gravada em memória.
//
// VARIÁVEL DE GRAVAÇÃO 
//
var StGravar = true;
var Passo = 0;
var PassoLimite = 2000;

var pBehavior = new Array(PassoLimite);
var pX = new Array(PassoLimite);
var pY = new Array(PassoLimite);
var pXant = new Array(PassoLimite);
var pYant = new Array(PassoLimite);
var pStMulticorlor = new Array(PassoLimite);
var pColor1 = new Array(PassoLimite);
var pColor2 = new Array(PassoLimite);
var pEmoji = new Array(PassoLimite);
var pShape = new Array(PassoLimite);
var pFillKind = new Array(PassoLimite);
var pGradientX = new Array(PassoLimite);
var pGradientY = new Array(PassoLimite);
var pGradientSprainX = new Array(PassoLimite);
var pGradientSprainY = new Array(PassoLimite);
var pSides  = new Array(PassoLimite);
var pThickness = new Array(PassoLimite);
var pTransparency = new Array(PassoLimite);
var pSpeed = new Array(PassoLimite);
var pRadiusX = new Array(PassoLimite);
var pRadiusY = new Array(PassoLimite);
var pRotate = new Array(PassoLimite);
var pFontSize = new Array(PassoLimite);
var pText = new Array(PassoLimite);
var pUsuarioIMG = new Array(PassoLimite);
var pGravouIMG = new Array(PassoLimite);


//var Iteration = 0; // Conta as iterações da rotina de pintura

//
// FIM DA DEFINIÇÃO DAS VARIÁVEIS GLOBAIS
//



//
// SELECIONA OS CANVAS DE TRABALHO
//

// CANVAS Layer de Fundo (background)
canvasFu = document.getElementById("tmcanvasFu");
ctxFu = tmcanvasFu.getContext("2d");

// CANVAS Layer Principal (Desenho)
canvas = document.getElementById("tmcanvas");
ctx = canvas.getContext("2d");

// CANVAS Layer de PREVIEW de Ferramentas
canvasPr = document.getElementById("tmcanvasPr");
ctxPr = tmcanvasPr.getContext("2d");


// CANVAS Layer de Frente (cursor)
canvasFr = document.getElementById("tmcanvasFr");
ctxFr = tmcanvasFr.getContext("2d");


//
// FAZ INICIALIZAÇÃO DAS VARIÁVEIS
//
function Start() 
{
  x = WIDTH / 2;
  y = HEIGHT / 2;
  Xant = x;
  Yant = y;
  // Posiciona os Sliders de tamanho
  DefSizeX(PercentSizeX);
  DefSizeY(PercentSizeY);
}


//
// FAZ INICIALIZAÇÃO DOS CONTROLES
//
function UpdateTools() 
{
  // Ferramentas
  ShowTextSize();
  ShowGradientX();
  ShowGradientY();
  ShowSides();
  ShowThickness();
  ShowStSimetric() 
  ShowSises();
  ShowRotate();
  ShowTransparency();
  ShowSpeed();
  ShowColors();
  ShowMulticolor() 
  ShowPreviewStatus();
  // Gravação e Posição do Cursor
  ShowSaveStatus();
  ShowCursor();
  CalcColorParts();
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
    element.innerHTML += '<a href="#" class="EMC" onclick=\'CallShape("Emoji","' + pEMC[f] + '") \' >' + pEMC[f] + '</a>';
   }
   document.getElementById("ContemEmoTab").style.top = "75px"
  }



//
// DEFINE COLOR1
//
function DefColor1(inCor) {
  color1 = inCor;
  CalcColorParts();
}

//
// DEFINE COLOR2
//
function DefColor2(inCor) {
  color2 = inCor;
  CalcColorParts();
}



// CALCULA OS COMPONENTES INDIVIDUAIS DE COLOR1
function CalcColorParts()
{
  // PARTS OF COLOR1
  cor1 = parseInt(color1.substring(1,3), 16);
  cor2 = parseInt(color1.substring(3,5), 16);
  cor3 = parseInt(color1.substring(5,7), 16);
  // PARTS OF COLOR2
  cor4 = parseInt(color2.substring(1,3), 16);
  cor5 = parseInt(color2.substring(3,5), 16);
  cor6 = parseInt(color2.substring(5,7), 16);
}


//
// MOSTRA AS CORES
//
function ShowColors() {
  document.getElementById('input-color1').value = color1;
  document.getElementById('input-color2').value = color2;
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
    //setTimeout(ocultaMSG, 5000)
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
// FUNÇÃO MOSTRA CONTROLES DE GRADIENTE
//
function ShowGradControls(modo) {
  if (!modo) // OCULTA
  {
    document.getElementById("GradControls").style.display = "none"; // OCULTA OS CONTROLES DE GRADIENTE
  } else {
    document.getElementById("GradControls").style.display = ""; // MOSTRA OS CONTROLES DE GRADIENTE
  }
}



//
// FUNÇÃO MOVE OS CONTROLES DE GRADIENTE
//
function MoveGradControls(parametro) 
{
  var lPosition = parseInt(document.getElementById("GradControls").style.top);
  if (parametro == "DOWN") // MOVE PRA CIMA
  {
    if (lPosition == 460) {lPosition = 680;}
    if (lPosition == 280) {lPosition = 460;}
    if (lPosition ==  75) {lPosition = 280;}
  } else if (parametro == "UP")
  {
    if (lPosition == 280) {lPosition =  75;}
    if (lPosition == 460) {lPosition = 280;}
    if (lPosition == 680) {lPosition = 460;}
  }
  document.getElementById("GradControls").style.top = lPosition+"px";
}






//
// FUNÇÃO MOSTRA A TABELA DE EMOJIS 
//
function ShowEmojiTab(modo) {
  if (!modo) // OCULTA
  {
    document.getElementById("ContemEmoTab").style.display = "none"; // OCULTA A EMOJI TAB 
  } else {
    document.getElementById("ContemEmoTab").style.display = ""; // MOSTRA A EMOJI TAB 
    //var element = document.getElementById("textoMSG");
    //element.innerHTML = textoMSG;
  }
}


//
// FUNÇÃO MOVE A TABELA DE EMOJIS 
//
function MoveEmoTab(parametro) 
{
  var lPosition = parseInt(document.getElementById("ContemEmoTab").style.top);
  if (parametro == "DOWN") // MOVE PRA CIMA
  {
    if (lPosition == 460) {lPosition = 680;}
    if (lPosition == 280) {lPosition = 460;}
    if (lPosition ==  75) {lPosition = 280;}
  } else if (parametro == "UP")
  {
    if (lPosition == 280) {lPosition =  75;}
    if (lPosition == 460) {lPosition = 280;}
    if (lPosition == 680) {lPosition = 460;}
  }
  document.getElementById("ContemEmoTab").style.top = lPosition+"px";
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
// FUNÇÃO RESET - REINICIA A PÁGINA
//
function reset() 
{
  if (confirm("Confirma reiniciar TUDO?!?!")) {window.location.reload();}
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
// DEFINE O TAMANHO DA FONTE DO TEXTO
//
function DefTextSize(value) 
{
  // AUALIZANDO O MOSTRADOR DE TAMANHO DO TEXTO
  FontSize = parseInt(value);
  ShowTextSize();
}

//
// MOSTRA O TAMANHO DA FONTE DO TEXTO
//
function ShowTextSize() 
{
  // AUALIZANDO O MOSTRADOR DE TAMANHO DO TEXTO
  var element = document.getElementById("numtexto");
  element.innerHTML = "[ " + FontSize + " ]";
  // setando o valor no Slider
  document.getElementById("SlTextSize").value = FontSize;
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
  // setando o valor no Slider
  document.getElementById("SlLargura").value = largura;
}

//
// DEFINE O NÚMERO DE LADOS DE UM POLÍGONO
//
function DefSides(parametro) {
  Sides = parseInt(parametro);
  ShowSides();
}

//
// MOSTRA O NÚMERO DE LADOS DE UM POLÍGONO
//
function ShowSides()
{
  // AUALIZANDO O MOSTRADOR DA LARGURA
  var element = document.getElementById("numSides");

  element.innerHTML = "[" + Sides + "]";
  // setando o valor no Slider
  document.getElementById("SlSides").value = Sides;
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
  // setando o valor no Slider
  document.getElementById("SlVelocidade").value = dx;

}


//
// DEFINE GRADIENTE DE X
//
function DefGradientX(parametro) {
  GradientX = parseInt(parametro);
  ShowGradientX();
}


//
// MOSTRA O GRADIENTE DE X
//
function ShowGradientX()
{
  // Mostrando o valor do Raio (Eixo X)
  var element = document.getElementById("numgradientx");
  element.innerHTML = "X= [" + GradientX + "]";
  // setando o valor no Slider
  document.getElementById("SlGradientX").value = GradientX;
}


//
// DEFINE GRADIENTE DE Y
//
function DefGradientY(parametro) {
  GradientY = parseInt(parametro);
  ShowGradientY();
}


//
// MOSTRA O GRADIENTE DE X
//
function ShowGradientY()
{
  // Mostrando o valor do Raio (Eixo X)
  var element = document.getElementById("numgradienty");
  element.innerHTML = "Y= [" + GradientY + "]";
  // setando o valor no Slider
  document.getElementById("SlGradientY").value = GradientY;
}


//
// DEFINE O DESLOCAMENTO DE GRADIENTE X
//
function DefGradientSprainX(parametro) {
  GradientSprainX = parseInt(parametro);
  ShowGradientSprainX();
}


//
// MOSTRA O DESLOCAMENTO DE GRADIENTE X
//
function ShowGradientSprainX()
{
  // Mostrando o valor do Raio (Eixo X)
  var element = document.getElementById("numGradientSprainX");
  element.innerHTML = "% DX= [" + GradientSprainX + "]";
  // setando o valor no Slider
  document.getElementById("SlGradientSprainX").value = GradientSprainX;
}




//
// DEFINE O DESLOCAMENTO DE GRADIENTE Y
//
function DefGradientSprainY(parametro) {
  GradientSprainY = parseInt(parametro);
  ShowGradientSprainY();
}


//
// MOSTRA O DESLOCAMENTO DE GRADIENTE Y
//
function ShowGradientSprainY()
{
  // Mostrando o valor do Raio (Eixo X)
  var element = document.getElementById("numGradientSprainY");
  element.innerHTML = "% DY= [" + GradientSprainY + "]";
  // setando o valor no Slider
  document.getElementById("SlGradientSprainY").value = GradientSprainY;
}



//
// MOSTRA O RAIO DO CIRCULO
//
function ShowSises()
{
  // Mostrando o valor do Raio (Eixo X)
  var element = document.getElementById("numsizeX");
 
  // setando o valor no Slider
  document.getElementById("SlSizeX").value = PercentSizeX;

  if(StSimetric)
  {
    // Mostrando o valor de L e A)
    element.innerHTML = "LxA= [" + retL + "]";

    RadiusY = RadiusX; // FAZ RadiusX = RadiusY
    retA = retL; // Define Largura = Altura
    document.getElementById("SlSizeY").style.display = "none";
    document.getElementById("numsizeY").style.display = "none";

  } else 
  {
    // Mostrando o valor de Radius X
    element.innerHTML = "L= [" + retL + "]";
    document.getElementById("SlSizeY").style.display = "";
    document.getElementById("numsizeY").style.display = "";
    // Mostrando o valor do Raio (Eixo Y)
    var element = document.getElementById("numsizeY");
    element.innerHTML = "A= [" + retA + "]";
    // setando o valor no Slider
    document.getElementById("SlSizeY").value = PercentSizeY;
  }
}

//
// DEFINE TAMANHO DE OBJETOS NO EIXO X
//
function DefSizeX(parametro) 
{
  PercentSizeX = parseInt(parametro);

  retL =  parseInt((WIDTH)*PercentSizeX/100);
  RadiusX = parseInt((WIDTH/2)*PercentSizeX/100);
  if (PercentSizeX == 0) {retL = 1; RadiusX = 1;}
  ShowSises();
}



//
// DEFINE TAMANHO DE OBJETOS NO EIXO Y
//
function DefSizeY(parametro)
{
  PercentSizeY = parseInt(parametro);
  retA =  parseInt((HEIGHT)*PercentSizeY/100);
  RadiusY = parseInt(HEIGHT/2*PercentSizeY/100);
  if (PercentSizeY == 0) {retA = 1; RadiusY = 1;}
  ShowSises();
}


//
// DEFINE A ROTAÇÃO
//
function DefRotate(parametro) 
{
  Rotate = parametro;
  ShowRotate();
}


//
// MOSTRA A ROTAÇÃO
//
function ShowRotate()
{
  // Mostrando o valor do Raio (Eixo X)
  var element = document.getElementById("numrotate");
  element.innerHTML = "[" + parseInt((Rotate-1)*360) + "]";
  // setando o valor no Slider
  document.getElementById("SlRotate").value = Rotate;
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
  // setando o valor no Slider
  document.getElementById("SlTransparency").value = (1-transp) * 100;
}



//
// DEFINE O TIPO DE PREENCHIMENTO "Solido" , "Linear" , "Radial"
//
function DefFillKind(Checked,Value) 
{
  StFill = Checked; // Boolean
  FillKind = Value; // "Solido" , "Linear" , "Radial" , "VAZIO"
  if (FillKind == "Linear" || FillKind == "Radial")
   {
       document.getElementById("GradientBox").style.backgroundColor = "#2F4F4F";
       ShowGradControls(true);
    }
  else 
  {
    document.getElementById("GradientBox").style.backgroundColor = "#000";
    ShowGradControls(false);
  } 
  if (FillKind == "Vazio") {StFill = false;} // Define a variável como false!!!

  ShowFillKind();
}




//
// MOSTRA STATUS DE DESENHO SÓLIDO
//
function ShowFillKind()
{
  document.getElementById("stVazio").checked = false;
  document.getElementById("stCorSolida").checked = false;
  document.getElementById("stGradientR").checked = false;
  document.getElementById("stGradientL").checked = false;
  
  if (FillKind == "Vazio")  {document.getElementById("stVazio").checked = true;}
  if (FillKind == "Solido") {document.getElementById("stCorSolida").checked = true;}
  if (FillKind == "Linear") {document.getElementById("stGradientL").checked = true;}
  if (FillKind == "Radial") {document.getElementById("stGradientR").checked = true;}
}



//
// DEFINE SE DESENHO MULTICOLOR
//
function DefMulticolor(value) 
{
  StMulticolor = value;
  ShowMulticolor();
}


//
// MOSTRA STATUS DE DESENHO MULTICOLOR
//
function ShowMulticolor() 
{
 document.getElementById("stMulticolor").checked = StMulticolor;
}

//
// DEFINE SE ELIPSE SERÁ UM CÍRCULO
//
function DefSimetric(value) 
{
  StSimetric = value;
  if (!StSimetric) {DefSizeY(PercentSizeY);}
  ShowStSimetric();
  ShowSises();
}

//
// MOSTRA STATUS SE ELIPSE SERÁ UM CÍRCULO
//
function ShowStSimetric() 
{
 document.getElementById("StSimetric").checked = StSimetric;
}



//
// LIGA OU DESLIGA O MODO PREVIEW DE AÇÕES
//
function TooglePreview()
{
  if (StPreview) {StPreview = false;} 
  else {
    StPreview = true;
    ClearPeviewCanvas();
  }
  ShowPreviewStatus();
}





//
// MOSTRA O STATUS DO PREVIEW DE AÇÕES
//
function ShowPreviewStatus()
{

  if (StPreview)
  {
    // MODO PREVIEW
    document.getElementById("StPreview").style.color = "#FF0000";
    document.getElementById("StModo").innerHTML = "DESLIGA";
    canvasPr.style.visibility="visible"; // MOSTRA CANVAS DE PREVIEW
    ShowPreviewCursor();
  }
  else                
  {

    // MODO IMEDIATO
    document.getElementById("StPreview").style.color = "#B1B1B1";
    document.getElementById("StModo").innerHTML = "LIGA";
    canvasPr.style.visibility="hidden";  // OCULTA CANVAS DE PREVIEW
    ClearInterval();
    ShowCursor();
  }
}

//
// MOSTRA O STATUS DO PREVIEW DE AÇÕES
//
function ClearInterval()
{
    clearInterval(vInterval);
    ctxPr.clearRect(0,0,WIDTH,HEIGHT);
}


// FORÇA UM DESENHO MESMO NO MODO PREVIEW (CHAMADA DO BOTÃO [✔]  DO HTML)
function ForceDrawShape()
{
  if (StPreview) {
    StPreview = false;
    CallDrawShape(Shape,Behavior);
    StPreview = true;
  } else {mensagem("Modo PREVISÂO está desativado")} 
}


// CHAMA A ROTINA DRAW SHAPE USANDO CLEARINTERVAL CASO O STPREVIEW ESTEJA LIGADO
function CallShape(vShape,vBehavior) 
{
  if (StPreview)
      {ClearInterval();
        CallDrawShape(vShape,vBehavior);}
  else
     {CallDrawShape(vShape,vBehavior);}
}



function CallDrawShape(vShape,vBehavior) // CHAMA AS FUNÇÕES DE FERRAMENTA (FORMAS, ETC)
{ 
  //console.log(vShape,vBehavior);
  Shape = vShape;
  Behavior = vBehavior
  switch (Shape)
  {
    case "Retangulo":
    case "Elipse":
    case "Poligono":
    case "Estrela":
    case "Forma-Complexa":
    case "Circulos-Concentricos":
       if (StPreview) {vInterval = setInterval(function(){ DrawPolygonShapes(ctxPr,Shape,FillKind);},vTimer); } else {DrawPolygonShapes(ctx,Shape,FillKind);}
       break;
    case "Linha":
       if (StPreview) {vInterval = setInterval(function(){ DrawLine(ctxPr,vBehavior);},vTimer); } else {DrawLine(ctx,vBehavior);}
       break;
    case "Texto":
       if (StPreview) {vInterval = setInterval(function(){ DrawText(ctxPr);},vTimer); } else {DrawText(ctx);} 
       break;
    case "Imagem":
       if (vBehavior == "fundo") 
          {DrawReadImage(ctxFu,vBehavior);}
       else 
       {if (StPreview) {vInterval = setInterval(function(){ DrawReadImage(ctxPr,vBehavior);},vTimer); } else {DrawReadImage(ctx,vBehavior);}}
       break;
    case "Emoji":
       if (StPreview) {vInterval = setInterval(function(){ DrawEmoji(ctxPr,vBehavior);},vTimer); } else {DrawEmoji(ctx,vBehavior);} 
       break;
    default:
       mensagem("Erro: Objeto não Definido!!!")
       break;
     
  }
}


//
// MOSTRA O TEXTO PASSEI AQUI (PARA DEBUG)
//
function ola() {console.log('PASSEI AQUI');}


// Function XY mostra X e Y na Console
function xy() {console.log("X: " + x + "  Y: " + y);}

//
// POSICIONA O CURSOR NO CANVAS DA FRENTE
//
function ShowCursor() {
  ctxFr.beginPath();
  ctxFr.clearRect(0, 0, WIDTH, HEIGHT);
  ctxFr.font = "10px Verdana";
  ctxFr.fillStyle = "#696969";
  ctxFr.fillText("⊕", Xant - 3, Yant + 3);
  ctxFr.fillStyle = "#FFD700";

  var cursorText = "⊗";
  var halfCursorWidth = ctxFr.measureText(cursorText).width/2;
  ctxFr.fillText(cursorText, 
    x - halfCursorWidth, 
    y + halfCursorWidth - 2); // Isso foi setado à força!!
  // Marca o ponto no Canvas de desenho
  ctx.moveTo(x, y);
}


//
// FUNÇÃO QUE LÊ AS TECLAS PRESSIONADAS
//
function KeyDown(evt)
{
  //console.log("D" + evt.keyCode);
  switch (evt.keyCode) {
    case 38:  // seta para cima
    case 87:  // 'W'  para cima
      if (y - dy > 0) {y -= dy;}
      break;
    case 40:  // seta para baixo
    case 83:  // 'S' para baixo
      if (y + dy < HEIGHT) {y += dy;}
      break;
    case 37:  // seta para esquerda
    case 65:  // 'A' para esquerda
      if (x - dx > 0) { x -= dx;}
      break;
    case 39:  // seta para direita
    case 68:  // 'D' para direita 
      if (x + dx < WIDTH) {x += dx;}
      break;
    default:
      break;
  }
  if (StPreview) {ShowPreviewCursor(); } else {ShowCursor();}
}


//
// FUNÇÃO QUE LÊ AS TECLAS LIBERADAS
//
function KeyUp(evt) {
  var lDrawPoint = true;
  //console.log("U" + evt.keyCode);
  switch (evt.keyCode) {
    case 16: // 'SHIFT' Alterna Modo Imediato/Previsão
      TooglePreview();
      lDrawPoint = false;
      break;
    case 82: // Letra R - Traça retA sem Mudar o Ponto Aterior
      CallShape("Linha","reta");
      break;
    case 84: // Letra T - Traça Linha e [T]razendo o Ponto Anterior para junto do Ponto Atual.
      CallShape("Linha","traço");
      break;
    default:
      lDrawPoint = false;
      break;
  }

  

  // SÓ CHAMA A ROTINA DO CURSOR SE FOR UMA TECLA DE TRAÇO (DRAW)
  if (lDrawPoint) 
    {
      if (StPreview) {ShowPreviewCursor(); } else {ShowCursor();}
    }
}



//
// MOVE O PONTO PARA O CLICK DO MOUSE NO MODO IMEDIATO
//
tmcanvasFr.onmousedown = function (evt) {
  Xant = x;
  Yant = y;

  ctxFr.moveTo(evt.clientY, evt.clientX);
  
  var rect = tmcanvasFr.getBoundingClientRect(); 
  x = evt.offsetX;
  y = evt.offsetY;

  if (StPreview) {ShowPreviewCursor();} else {ShowCursor();}
  
  
  
}


// //
// // MOVE O PONTO PARA O CLICK DO MOUSE NO MODO PREVIEW
// //
// tmcanvasCp.onmousedown = function (evt) {
//   Xant = x;
//   Yant = y;
//   ctxCp.moveTo(evt.clientY, evt.clientX);
  
//   var rect = tmcanvasCp.getBoundingClientRect(); 
//   x = evt.offsetX;
//   y = evt.offsetY;
//   ShowPreviewCursor();
// }



window.addEventListener('keydown', KeyDown, true);
window.addEventListener('keyup', KeyUp, true);



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

  });
} else {
  mensagem("Este navegador não suporta esta função.");
}


ocultaMSG();
// TEM QUE DEFINIR A POSIÇÃO INICIAL DA JANELA DE GRADIENT CONTROLS
document.getElementById("GradControls").style.top = "75px"
DefGradientSprainX(GradientSprainX);
DefGradientSprainY(GradientSprainY);
//ShowFillKind();
DefFillKind(true,FillKind);
//DefFillKind(false,"")
CreateEmojiTab();
ShowEmojiTab(false);
ocultaCONF(vResp);
ClearScreen();
Start();
UpdateTools();