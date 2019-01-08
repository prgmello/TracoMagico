/*
====================================
== TRAÇO MÁGICO EM JS             ==
== (c) Paulo Mello - Teresópolis  ==
== Data 23/10/2018                ==
== CÓDIGO DESENHA                 ==
== FUNÇÕES DE DESENHO/FOTO/TEXTO  ==
====================================
*/


//
// FAZ O TRAÇO
//
function DrawPoint() 
{
  ctx.beginPath();
  ctx.fillStyle = cor;
  ctx.fillRect(x,y,largura,largura); 
  ctx.fill();
  ctx.closePath();
  ctx.fillStyle = cor;

  if (pGravar) {SaveStep("Ponto","","");}


  ShowCursor();
}


//
// CALCULA LARGURA E ALTURA DO RETÂNGULO
//
function CalcRectangle()
{
  retL = Math.abs(x - Xant)+1;
  retA = Math.abs(y - Yant)+1;
}




//
// DESENHA CÍRCULOS COLORIDOS CONCÊNTRICOS
//
function DrawConcentricCircles(vBehavior)
{
  var lCores;
  var passo = largura*3;
  ctx.lineWidth=largura
  for (f = 1; f < Radius; f=f+passo)
   { 
    ctx.beginPath()
    if (vBehavior=="uma-cor") {lCores=cor;} 
    else if (vBehavior=="varias-cores") 
      {lCores = '#'+ (Math.floor(Math.random()*0xFFFFFF)).toString(16);} 
    // Plota os Círculos Concêntricos
    ctx.strokeStyle = lCores;
    ctx.arc(x, y, f, 0, Math.PI*2, true);
    ctx.stroke();
   }

   if (pGravar) {SaveStep("Concentrico",vBehavior,"");}
}


//
// TRAÇA UMA RETA USANDO OS DOIS ULTIMOS CLIQUES DO MOUSE
//
function DrawLine()
{
  if ((Xant==x) && (Yant==y)) {mensagem("Marque um segundo ponto com o mouse");}
  else 
  {
    ctx.beginPath()
    ctx.lineWidth=largura;
    ctx.strokeStyle = cor;
    ctx.moveTo(Xant+1,Yant+1); 
    ctx.lineTo(x,y)
    ctx.stroke();
    ctx.closePath();
  
   if (pGravar) {SaveStep("Linha","","");}

  }

}


//
// FAZ UM RETANGULO USANDO OS DOIS ULTIMOS CLIQUES DO MOUSE
//
function DrawRectangle(vBehavior)
{
  var newX = x;
  var newY = y;
  var lcor1;
  var lcor2;
  var lcor3; 

  CalcRectangle();
  
  if ((Xant==x) && (Yant==y)) {mensagem("Marque um segundo ponto com o mouse");} 
  else {
     // FAZ O RETÂNGULO INICIAR NO PONTO CORRETO
     if (newX > Xant)  {newX = Xant;}  
     if (newY > Yant)  {newY = Yant}

     ctx.beginPath();
     ctx.lineWidth=largura;
     if (vBehavior=="preenchido") 
     {
      ctx.fillStyle = cor;
      if (transp!==1)
      {
        lcor1 = parseInt(cor.substring(1,3), 16);
        lcor2 = parseInt(cor.substring(3,5), 16);
        lcor3 = parseInt(cor.substring(5,7), 16);
        ctx.fillStyle ='rgba('+ lcor1 +  ' , ' + lcor2+  ' , ' + lcor3+  ' , ' + transp + ' )';
      }
      ctx.fillRect(newX,newY,retL,retA); 
      ctx.fill();
      // Faz o reset o RGBA para 1
      ctx.fillStyle ='rgba('+ lcor1 +  ' , ' + lcor2+  ' , ' + lcor3+  ' , ' + 1 + ' )';


     } else if (vBehavior=="vazio") 
     {
      ctx.strokeStyle = cor;
      ctx.strokeRect(newX,newY,retL,retA);
      ctx.stroke(); 
     }
    }
    ctx.closePath();

    if (pGravar) {SaveStep("Retangulo",vBehavior,"");}
  }
  


//
// FAZ UM CÍRCULO NA POSIÇÃO ATUAL
//
function DrawCircle(vBehavior)
{
  var lcor1;
  var lcor2;
  var lcor3; 
  ctx.beginPath();
  ctx.lineWidth=largura;
  if (vBehavior=="preenchido") 
  {
    ctx.fillStyle = cor;
    if (transp!==1)
    {
      lcor1 = parseInt(cor.substring(1,3), 16);
      lcor2 = parseInt(cor.substring(3,5), 16);
      lcor3 = parseInt(cor.substring(5,7), 16);
      ctx.fillStyle ='rgba('+ lcor1 +  ' , ' + lcor2+  ' , ' + lcor3+  ' , ' + transp + ' )';
    }
    ctx.arc(x, y, Radius, 0, Math.PI*2, true);
    ctx.fill();
    // Faz o reset o RGBA para 1
    ctx.fillStyle ='rgba('+ lcor1 +  ' , ' + lcor2+  ' , ' + lcor3+  ' , ' + 1 + ' )';
  } else if (vBehavior=="vazio") 
  {
   ctx.strokeStyle = cor;
   ctx.arc(x, y, Radius, 0, Math.PI*2, true);
   ctx.stroke(); 
  }
  
  if (pGravar) {SaveStep("Circulo",vBehavior,"");}
}


//
// ==========================================================================
//                 FUNÇÕES DE CARREGAMENTO DE FOTO
// ==========================================================================
//

// Imagem para teste
//var usuarioIMG = new Image();
//usuarioIMG.src = "usuario.jpg";

//
// COLA A IMAGEM NO CANVAS
//
function DrawReadImage(vBehavior)
{
  CalcRectangle();
  var newX = x;
  var newY = y;
  // Calcula o vértice superior esquerdo do "retangulo" formado pelos 2 últimos pontos
  // FAZ A COLAGEM ACONTECER NO VÉRTICE ESQUERDO SUPERIOR DO "RETANGULO" DEFINIDO
  if (newX > Xant)  {newX = Xant;}  
  if (newY > Yant)  {newY = Yant}

  if (temIMG == false)
  {mensagem("Não há foto para colar ou arquivo inválido.");
  return false;}   

  
  if (vBehavior == "frente")
    { 
      if ((Xant==x) && (Yant==y))
      {mensagem("Marque dois pontos formando um retângulo.");
      return false;} 
      ctx.drawImage(usuarioIMG , newX , newY , retL , retA);
    }
  else if (vBehavior == "fundo")
  { 
    ctxFu.globalAlpha = transp;
    ctxFu.drawImage(usuarioIMG , 0 , 0 , WIDTH , HEIGHT);
    ctxFu.globalAlpha = 1;

  }

  if (pGravar) {SaveStep("Imagem",vBehavior,"");}
}


//
// FUNCÇÕES DE TEXTO
//

// PERMITE QUE O USUÁRIO ESCREVA O TEXTO
function ReadText()
{
  var lTexto = texto;
  texto = prompt("Digite o texto até 150 caracteres", texto);
  if (texto == null) {
    texto = lTexto;
  } else if (texto.length > 150)
  {
  texto = texto.substring(0,150);
  mensagem("Texto cortado para 150 caracteres!")
  }  else if (texto.length == 0)
  {   
    texto = lTexto;
  }
}

//
// COLA O TEXTO NO DESENHO
//
function DrawText()
{
  ctx.moveTo(x,y);
  ctx.font=FontSize+"px Verdana";
  ctx.fillStyle = cor;
  ctx.fillText(texto,x,y);

  if (pGravar) {SaveStep("Texto","",texto);}
}


//
// COLA O TEXTO NO DESENHO
//
function DrawEmoji(lEmoji)
{
  ctx.moveTo(x,y);
  ctx.font=FontSize+"px Verdana";
  ctx.fillStyle = cor;
  ctx.fillText(lEmoji,x,y);

if (pGravar) {SaveStep("Emoji","",lEmoji);}

}


//
// CRIA UM FUNDO PSICODÉLICO
//
function MakeBgTilt(vBehavior)
{
  var lx;
  var ly;
  var lcor1, lcor2, lcor3;

if (vBehavior == "circulos")
{
  var lLineWidth;
  var lRadius;
  var lTransparency;
  for (f = 30; f > 10; f--)
  { 
     ctxFu.beginPath()
     lcor1 = Math.floor(Math.random()*255);
     lcor2 = Math.floor(Math.random()*255);
     lcor3 = Math.floor(Math.random()*255);
     lx    = Math.floor(Math.random()*(WIDTH));
     ly    = Math.floor(Math.random()*(HEIGHT));
     lRadius = Math.floor(Math.random()*(HEIGHT/2));
     lTransparency = transp;
     lLineWidth = Math.floor(Math.random()*dx);

     ctxFu.lineWidth=lLineWidth;
     ctxFu.fillStyle ='rgba('+ lcor1 +  ' , ' + lcor2+  ' , ' + lcor3+  ' , ' + lTransparency + ' )';
     ctxFu.arc(lx, ly, lRadius, 0, Math.PI*2, true);

     ctxFu.fill();
     ctxFu.closePath();
  }
  ctxFu.strokeStyle = 0;
  ctxFu.fillStyle = 0;
}
else if (vBehavior=="retangulos")
{

  var lRectWidth;
  var lRectHeight;

  for (f = 1; f < 25; f++)
  { 
   lx    = Math.floor(Math.random()*(WIDTH/1.3));
   ly    = Math.floor(Math.random()*(HEIGHT/1.5));
   lRectWidth = Math.floor(Math.random()*(WIDTH/20)*10);
   lRectHeight  = Math.floor(Math.random()*(HEIGHT/20)*10);


   ctxFu.beginPath();
   ctxFu.lineWidth=largura;
   ctxFu.fillStyle = cor;
   ctxFu.fill();
   lcor1 = Math.floor(Math.random()*255);
   lcor2 = Math.floor(Math.random()*255);
   lcor3 = Math.floor(Math.random()*255);
   ctxFu.fillStyle ='rgba('+ lcor1 +  ' , ' + lcor2+  ' , ' + lcor3+  ' , ' + transp + ' )';
   ctxFu.fillRect(lx, ly, lRectWidth, lRectHeight);
  
  }
  ctxFu.fillStyle ='rgba('+ lcor1 +  ' , ' + lcor2+  ' , ' + lcor3+  ' , ' + 1 + ' )';
  ctxFu.closePath();
  }

  if (pGravar) {SaveStep("Fundo-Aleatorio",vBehavior,"");}
}


//
// FUNÇÃO FUNDO - MUDA O FUNDO DO DESENHO
//
function ChangeBgColor()
{
    ctxFu.beginPath();
    ctxFu.fillStyle = cor;
    ctxFu.fillRect(0,0,WIDTH,HEIGHT); 
    ctxFu.fill();

    if (pGravar) {SaveStep("Fundo","","");}    
}



//
// MOSTRA AS COORDENADAS DE DESENHO (DEBUG)
//
function coordenadas() 
{
  alert("Coord: x= " + x + " y= " + y+ " Xant= " + Xant + " Yant= " + Yant);
}