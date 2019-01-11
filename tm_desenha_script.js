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
function DrawConcentricCircles(lBehavior)
{
  var cores;
  var passo = largura*3;
  ctx.lineWidth=largura
  for (f = 1; f < Radius; f=f+passo)
   { 
    ctx.beginPath()
    if (lBehavior=="uma-cor") {cores=cor;} 
    else if (lBehavior=="varias-cores") 
      {cores = '#'+ (Math.floor(Math.random()*0xFFFFFF)).toString(16);} 
    // Plota os Círculos Concêntricos
    ctx.strokeStyle = cores;
    ctx.arc(x, y, f, 0, Math.PI*2, true);
    ctx.stroke();
   }

   if (pGravar) {SaveStep("Concentrico",lBehavior,"");}
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
function DrawRectangle()
{
  var newX = x;
  var newY = y;
  CalcRectangle();
  
  if ((Xant==x) && (Yant==y)) {mensagem("Marque um segundo ponto com o mouse");} 
  else {
     // FAZ O RETÂNGULO INICIAR NO PONTO CORRETO
     if (newX > Xant)  {newX = Xant;}  
     if (newY > Yant)  {newY = Yant}

     ctx.beginPath();
     ctx.lineWidth=largura;
     if (StSolid) 
      {
       ctx.fillStyle ='rgba('+ cor1 +  ' , ' + cor2 +  ' , ' + cor3 +  ' , ' + transp + ' )';
       console.log('rgba('+ cor1 +  ' , ' + cor2 +  ' , ' + cor3 +  ' , ' + transp + ' )')
       ctx.fillRect(newX,newY,retL,retA);
       ctx.fill();
       // Faz o reset o RGBA para 1
       ctx.fillStyle ='rgba('+ cor1 +  ' , ' + cor2+  ' , ' + cor3+  ' , ' + 1 + ' )';
     } else
     {
      ctx.strokeStyle = cor;
      ctx.strokeRect(newX,newY,retL,retA);
      ctx.stroke(); 
     }
    }
    ctx.closePath();

    if (pGravar) {SaveStep("Retangulo","","");}
  }
  


//
// FAZ UM CÍRCULO NA POSIÇÃO ATUAL
//
function DrawCircle()
{
  ctx.beginPath();
  ctx.lineWidth=largura;
  if (StSolid) 
  {
    ctx.fillStyle ='rgba('+ cor1 +  ' , ' + cor2 +  ' , ' + cor3 +  ' , ' + transp + ' )';
       console.log('rgba('+ cor1 +  ' , ' + cor2 +  ' , ' + cor3 +  ' , ' + transp + ' )')
    ctx.arc(x, y, Radius, 0, Math.PI*2, true);
    ctx.fill();
    // Faz o reset o RGBA para 1
    ctx.fillStyle ='rgba('+ cor1 +  ' , ' + cor2+  ' , ' + cor3+  ' , ' + 1 + ' )';
  } else
  {
   ctx.strokeStyle = cor;
   ctx.arc(x, y, Radius, 0, Math.PI*2, true);
   ctx.stroke(); 
  }
  
  if (pGravar) {SaveStep("Circulo","","");}
}





//
// FUNÇÃO AUXILIAR DA ROTINA QUE TRAÇA POLÍGONOS e ESTRELAS
//
function point(angle, Radius) {
  return {
    x: Math.cos(angle) * Radius,
    y: Math.sin(angle) * Radius
  };

}

//
// TRAÇA POLÍGONOS DE N LADOS
//
function DrawPoligon()
{
var lSides = Sides;
var lCalcAngle = lSides;
ctx.beginPath();
ctx.lineWidth=largura;
if (StSolid) 
   {ctx.fillStyle ='rgba('+ cor1 +  ' , ' + cor2 +  ' , ' + cor3 +  ' , ' + transp + ' )';
   } else{ctx.strokeStyle = cor;} 
 
var lLoop = lSides +2; // É preciso somar 2 para garantir o fechamento do polígono em modo Stroke
while (lLoop--) 
{
   var angle = (lLoop/(lCalcAngle)) * Math.PI * 2;
   var pt = point(angle, Radius);
   ctx.lineTo(pt.x + x, pt.y + y);
}
ctx.closePath();
if (StSolid) {ctx.fill();} else {ctx.stroke();}


// Faz o reset o RGBA para 1
ctx.fillStyle ='rgba('+ cor1 +  ' , ' + cor2+  ' , ' + cor3+  ' , ' + 1 + ' )';


if (pGravar) {SaveStep("Poligono","","");}
}


function DrawStar()
{
var lDistance = Radius;
var lTips = Sides*2;
var lCalcAngle = lTips;
ctx.beginPath();
if (StSolid) 
   {ctx.fillStyle ='rgba('+ cor1 +  ' , ' + cor2 +  ' , ' + cor3 +  ' , ' + transp + ' )';
   } else{ctx.strokeStyle = cor;} 
 
var lLoop = lTips;
while (lLoop--) 
{
   var angle = (lLoop/(lCalcAngle)) * Math.PI * 2;
   var lDistance = (lLoop % 2 === 0) ? (parseInt(Radius/2)) : Radius;
   var pt = point(angle, lDistance);
   ctx.lineTo(pt.x + x, pt.y + y); 
   
}
ctx.closePath();
if (StSolid) {ctx.fill();} else {ctx.stroke();}


// Faz o reset o RGBA para 1
ctx.fillStyle ='rgba('+ cor1 +  ' , ' + cor2+  ' , ' + cor3+  ' , ' + 1 + ' )';
if (pGravar) {SaveStep("Estrela","","");}
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
function DrawReadImage(StSolid)
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

  
  if (StSolid == "frente")
    { 
      if ((Xant==x) && (Yant==y))
      {mensagem("Marque dois pontos formando um retângulo.");
      return false;} 
      ctx.drawImage(usuarioIMG , newX , newY , retL , retA);
    }
  else if (StSolid == "fundo")
  { 
    ctxFu.globalAlpha = transp;
    ctxFu.drawImage(usuarioIMG , 0 , 0 , WIDTH , HEIGHT);
    ctxFu.globalAlpha = 1;

  }

  if (pGravar) {SaveStep("Imagem",StSolid,"");}
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
function MakeBgTilt(StSolid)
{
  var lx;
  var ly;
  var cor1, cor2, cor3;

if (StSolid == "circulos")
{
  var lLineWidth;
  var lRadius;
  var lTransparency;
  for (f = 30; f > 10; f--)
  { 
     ctxFu.beginPath()
     cor1 = Math.floor(Math.random()*255);
     cor2 = Math.floor(Math.random()*255);
     cor3 = Math.floor(Math.random()*255);
     lx    = Math.floor(Math.random()*(WIDTH));
     ly    = Math.floor(Math.random()*(HEIGHT));
     lRadius = Math.floor(Math.random()*(HEIGHT/2));
     lTransparency = transp;
     lLineWidth = Math.floor(Math.random()*dx);

     ctxFu.lineWidth=lLineWidth;
     ctxFu.fillStyle ='rgba('+ cor1 +  ' , ' + cor2+  ' , ' + cor3+  ' , ' + lTransparency + ' )';
     ctxFu.arc(lx, ly, lRadius, 0, Math.PI*2, true);

     ctxFu.fill();
     ctxFu.closePath();
  }
  ctxFu.strokeStyle = 0;
  ctxFu.fillStyle = 0;
}
else if (StSolid=="retangulos")
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
   cor1 = Math.floor(Math.random()*255);
   cor2 = Math.floor(Math.random()*255);
   cor3 = Math.floor(Math.random()*255);
   ctxFu.fillStyle ='rgba('+ cor1 +  ' , ' + cor2+  ' , ' + cor3+  ' , ' + transp + ' )';
   ctxFu.fillRect(lx, ly, lRectWidth, lRectHeight);
  
  }
  ctxFu.fillStyle ='rgba('+ cor1 +  ' , ' + cor2+  ' , ' + cor3+  ' , ' + 1 + ' )';
  ctxFu.closePath();
  }

  if (pGravar) {SaveStep("Fundo-Aleatorio",StSolid,"");}
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