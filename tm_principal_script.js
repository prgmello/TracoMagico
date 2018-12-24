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
var WIDTH = 950;  // Largura do Canvas
var HEIGHT = 500; // Altura do Canvas
var x = WIDTH/2;  //Posição horizontal do desenho
var y = HEIGHT/2; //Posição vertical do desenho
var largura = 2;     // largura do traço de 2 a 20
var sentido = 0;     // Definição de sentido de alteração: [menos = -1] [mais = 1]
var raio=105;        // Tamanho do raio para circulos
var Xant = x;        // Coordenada anterior de x para traçar retângulos
var Yant = y;        // Coordenada anterior de x para traçar retângulos
var transp = 1       // Define a transparência de objetos hachurados (1=opaco)
var retL = 0;        // Largura do Retângulo
var retA = 0;        // Altura do Retângulo
var LinhaManual = 0; // 
var vResp = "N";     // Saída da função confirma

// VARIÁVEIS DAS FUNÇÕES LER FOTOS
var texto = "Escreva seu texto." // Armazena o texto digitado
var tamtexto = 20;                // Tamanho do texto em pixels
var usuarioIMG = new Image();    // Guarda a foto do usuário lida do computador
var temIMG = 0;                  // Não tem foto na memória
var gravouIMG = "N"              // Define se a imagem foi gravada em memória.
//
// VARIÁVEL DE GRAVAÇÃO 
//
var Passo       = 0;
var PassoLimite = 4000;
var pGravar      = "S";
var pForma       = new Array(PassoLimite);
var pTipo        = new Array(PassoLimite);
var pX           = new Array(PassoLimite);
var pY           = new Array(PassoLimite);
var pXant        = new Array(PassoLimite);
var pYant        = new Array(PassoLimite);
var pRaio        = new Array(PassoLimite);
var pCor         = new Array(PassoLimite);
var pLargura     = new Array(PassoLimite);
var pVelocidade  = new Array(PassoLimite);
var pTransp      = new Array(PassoLimite);
var pTexto       = new Array(PassoLimite);
var pTamtexto    = new Array(PassoLimite);
var pUsuarioIMG  = new Array(PassoLimite);
var pGravouIMG   = new Array(PassoLimite);

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

// CANVAS DE largura
canvas2 = document.getElementById("espcanvas");
ctx2 = canvas2.getContext("2d");

// CANVAS DE RAIO
canvas4 = document.getElementById("circanvas");
ctx4 = canvas4.getContext("2d");


//
// FAZ INICIALIZAÇÃO DAS VARIÁVEIS
//
function iniciar1()
{
  x = WIDTH/2;  
  y = HEIGHT/2; 
  Xant = x;
  Yant = y;
  retL = 0;
  retA = 0;
  cor = "#0000FF";
}


//
// FAZ INICIALIZAÇÃO DOS CONTROLES
//
function iniciar2()
{
  deflargura(0);
  defvelocidade(0);
  defraio(0);
  MostraStatusGrava();
  cursor();
}





//
// SOBRE O TRAÇO MAGICO JS
//
function ajuda()
{
  var width = 700;   
  var height = 522;   
  var left = 99;   
  var top = 99;
  window.open('tm_ajuda.jpg','Ajuda', 'width='+width+', height='+height+', top='+top+', left='+left+', titlebar=no, scrollbars=yes, status=no, toolbar=no, location=no, directories=no, menubar=no, resizable=no, fullscreen=no');
}


function SalvaDesenho()
{ 
  // USA TEMPORARIAMENTE O CANVAS FR PARA MERGEAR OS FUNDO COM O DESENHO 
  ctxFr.beginPath();
  ctxFr.clearRect(0,0,WIDTH,HEIGHT); 
  ctxFr.drawImage(canvasFu,0,0)
  ctxFr.drawImage(canvas  ,0,0)
  
  // DEFINE O CANVAS COMO A IMAGEM PARA DOWNLOAD
  var meucanvas = document.getElementById('tmcanvasFr');
  var arquivo = document.getElementById('arquivo');
  
  arquivo.href = meucanvas.toDataURL();
  mensagem('Imagem salva com o nome "TM-Imagem.png"')
  cursor();
}



//
// SOBRE PAULO MELLO
//
function sobrePM()
{
mensagem('O "Traço Mágico JS" foi desenvolvido em 2018 \n por Paulo Mello para aprendizado de JavaScript. \n \n Contato: prgmello@gmail.com');
}



//
// FUNÇÃO PARA SUBSTITUIR O "ALERT" DO JS
//
function mensagem(textoMSG)
{
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
function ocultaMSG()
{
   document.getElementById("mostraMSG").style.display = "none"; // OCULTA O BOTÃO "block" ou "none" 
   clearTimeout(ocultaMSG);
}




//
// FUNÇÃO PARA SUBSTITUIR O "CONFIRM" DO JS
// É PRECISO REESCREVER ESTA FUNÇÃO COM 'POO'
//
//function confirma(textoMSG,vResp)
//{
//  if (textoMSG == "") // OCULTA
//  {
//    ocultacONF();
//  } else {
//    document.getElementById("mostraCONF").style.display = ""; // MOSTRA O BOTÃO
//  var element = document.getElementById("textoCONF");
//  element.innerHTML = textoMSG;
//  }
//}

//
// FUNÇÃO PARA OCULTAR O CAMPO DE CONFIRMAÇÃO DO PROGRAMA
//
function ocultacONF(vResp)
{
  document.getElementById("mostraCONF").style.display = "none"; // OCULTA O BOTÃO "block" ou "none"  
}






//
// FUNÇÃO APAGAR - APAGA TODA A TELA
//
function apagar()
{
  if (confirm("Confirma apagar todo o desenho?"))
  {
    limpatela();
  }
 iniciar1(); 
 iniciar2(); 
}


//
// LIMPA A TELA
//  
function limpatela() 
{
    // APAGA A TELA DE DESENHO
  ctx.beginPath();
  ctx.clearRect(0,0,WIDTH,HEIGHT); 
  ctx.fill();
  // APAGA A TELA DE FUNDO
  ctxFu.beginPath();
  ctxFu.fillStyle ="#FFFFFF";
  ctxFu.fillRect(0,0,WIDTH,HEIGHT); 
  ctxFu.fill();
 
}



//
// DEFINE LARGURA DA CANETA
//
function deflargura(sentido) 
{
  largura=largura+sentido 
  if (largura < 2) { largura=2 }
  if (largura > 20) { largura=20 }  
  if (sentido == 'MIN') { largura=2 }
  if (sentido == "MAX") { largura=20 }
  ctx2.lineWidth=1;
  ctx2.clearRect (0, 0, 20, 20);
  
  ctx2.beginPath();
  ctx2.fillStyle = "Yellow";
  ctx2.arc(10,10, largura/2, 0, Math.PI*2, true);
  ctx2.fill();

   // AUALIZANDO O MOSTRADOR DA LARGURA
   var element = document.getElementById("numlargura");
   element.innerHTML = "LARGURA: " + largura;
}


//
// DEFINE A VELOCIDADE DA CANETA
//
function defvelocidade(sentido)
{
  var vel;
  dx=dx+sentido 
  if (dx < 2) { dx=2 }
  if (dx > 10) { dx=10 }  
  if (sentido == 'MIN') { dx=2 }
  if (sentido == "MAX") { dx=10 }
  dy=dx
  vel=dx-2
  // AUALIZANDO O MOSTRADOR DA VELOCIDADE
  var element = document.getElementById("numvelocidade");
  element.innerHTML = "[ " + dx + " ]";
}


//
// DEFINE RAIO DO CIRCULO
//
function defraio(sentido)
{
  raio=raio+sentido*2 
  if (raio < 5) { raio=5 }
  if (raio > 200) { raio=200 }  
  if (sentido == 'MIN') { raio=5   }
  if (sentido == "MAX") { raio=205 }
  if (sentido == "MEIO" )  { raio=105 }

  // Desenha o Círculo no Canvas de Raio
  ctx4.lineWidth=1;
  ctx4.beginPath();
  ctx4.clearRect (0, 0, 40, 20);
  ctx4.strokeStyle = "Yellow";
  ctx4.arc(10,10, (raio)/22, 0, Math.PI*2, true);
  ctx4.stroke();
 
  // Mostrando o valor do Raio
  var element = document.getElementById("numraio");
  element.innerHTML = "RAIO: " + (raio-5);
}


//
// DEFINE A TRANSPARENCIA
//
function transparencia(sentido)
{
  var lTransp;
  lTransp=transp+sentido/100;
  transp = parseFloat(lTransp.toFixed(2));
  
  if (transp < 0.2) { transp=0.2 }
  if (transp > 1) { transp=1 }  
  if (sentido == 'MIN') { transp=1 }
  if (sentido == "MAX") { transp=0.2 }
  if (sentido == "MEIO" )  { transp=0.5 }

  // ATUALIZANDO O MOSTRADOR DA TRANSPARENCIA
  var lTransp2Dig;
  lTransp2Dig = (1-transp)*100;
  lTransp2Dig = parseFloat(lTransp2Dig.toFixed(2));
  var element = document.getElementById("sttransp");
  element.innerHTML = "[ " + lTransp2Dig + " ]";
}


//
// DEFINEO TAMANHO DO TEXTO
//
function deftexto(sentido)
{
  tamtexto=tamtexto+sentido 
  if (tamtexto < 10) { tamtexto=10 }
  if (tamtexto > 30) { tamtexto=30 }  
  if (sentido == 'MEIO') { tamtexto=20 }

  // AUALIZANDO O MOSTRADOR DE TAMANHO DO TEXTO
  var element = document.getElementById("numtexto");
  element.innerHTML = "[ " + tamtexto + " ]";
}




//
// MOSTRA O TEXTO PASSEI AQUI  (DEBUG)
//
function ola() 
{
  alert('PASSEI AQUI');
}




//
// POSICIONA O CURSOR NO CANVAS DA FRENTE
//
function cursor() 
{
  ctxFr.beginPath();
  ctxFr.clearRect(0,0,WIDTH,HEIGHT); 
  ctxFr.font="10px Verdana";
  ctxFr.fillStyle = "#696969";
  ctxFr.fillText("⊕",Xant-4,Yant+4);
  ctxFr.fillStyle = "#FFD700";
  ctxFr.fillText("⊗",x-4,y+4);

  // Marca o ponto no Canvas de desenho
  ctx.moveTo(x,y);

  if (pGravar=="S")
  {
    addpasso("Cursor",0); 
  }
  // CALCULA LARGURA E ALTURA DO RETÂNGULO
  retL = Math.abs(x - Xant)+1;
  retA = Math.abs(y - Yant)+1;
}


//
// FUNÇÃO QUE LÊ AS TECLAS PRESSIONADAS
//
function KeyDown(evt)
{
  switch (evt.keyCode)
   {
      case 38:  /* seta para cima */
      case 87:  /* 'W'  para cima */
          if (y - dy > 0){ y -= dy; }
          break;
      case 40:  /* set para baixo*/
      case 83:  /* 'S' para baixo  */
      if (y + dy < HEIGHT){ y += dy; }
          break;
      case 37:  /*set  para esquerda*/
      case 65:  /* 'A' para esquerda*/
      if (x - dx > 0){ x -= dx; }
          break;
      case 39:  /*seta para direita*/
      case 68:  /* 'D' para direita */
      if (x + dx < WIDTH){ x += dx; }
          break;
    }
    
    if (LinhaManual == 0)
    {
    Xant = x;
    Yant = y;
    }

    ponto();
    LinhaManual=1

  }



//
// MOVE O PONTO PARA O CLICK DO MOUSE
//
tmcanvasFr.onmousedown = function(evt) 
{
  Xant = x;
  Yant = y;
  ctxFr.moveTo(evt.clientY, evt.clientX);
  x = evt.clientX - this.offsetLeft -12; 
  y = evt.clientY - this.offsetTop -74; // Nolmalmente o valor é (-74)
  cursor();
}


window.addEventListener('keydown', KeyDown, true);



 //Check File API support
 if(window.File && window.FileList && window.FileReader)
 {
    var filesInput = document.getElementById("files");
    filesInput.addEventListener("change", function(event){
         
       var files = event.target.files; //FileList object
       var file = files[0];
            
          // SOMENTE SE FOR TIPO 'IMAGEM'
          if(file.type.match('image'))
          {
            var picReader = new FileReader();
            picReader.addEventListener("load",function(event){
            var picFile = event.target;
            usuarioIMG = new Image();
            gravouIMG = "N";
            usuarioIMG.src = picFile.result;
            });
            //Read the image
            picReader.readAsDataURL(file);
            var vSize = files[0].size;

            if(vSize < 1048576) 
             { //1MB         
             temIMG = 1 // Tamanho da imagem dentro do permitido
             } else 
             { 
             mensagem("Selecione uma imagem até 1Mb."); //Acima do limite
             picReader = ""; //Limpa o campo   
             temIMG = 0;
             }
          } else {temIMG = 0}

      // ATUALIZA O STATUS DA IMAGEM
      var vImg;
      if (temIMG == "1") {vImg = "[ ✔ ]";}
      else               {vImg = "[ ✘ ]";}
      var element = document.getElementById("pegaimg");
      element.innerHTML = vImg
      });
    }
    else
    {
     mensagem("Este navegador não suporta esta função.");
    }  


ocultaMSG();
ocultacONF(vResp);
limpatela();
iniciar1();
iniciar2();


