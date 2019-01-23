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
// function DrawPoint() 
// {
//   ctx.beginPath();
//   ctx.fillStyle = color1;
//   ctx.fillRect(x,y,largura,largura); 
//   ctx.fill();
//   ctx.closePath();
//   ctx.fillStyle = color1;

//   if (StGravar) {SaveStep("Ponto","","");}
//   ShowCursor();
// }


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
function DrawConcentricCircles(lMulticolor)
{
  var passo = largura*3;
  var g = 0;
  ctx.lineWidth=largura
  for (f = 1; f < Radius-passo; f=f+passo)
   { 
    g=g+passo;
    if (g>RadiusY) {g=RadiusY;}
    ctx.beginPath()
      if (lMulticolor) 
      {cores = '#'+ (Math.floor(Math.random()*0xFFFFFF)).toString(16);} 
      else {cores=color1;} 
    // Plota os Círculos Concêntricos
    ctx.strokeStyle = cores;
    ctx.ellipse(x, y, Radius-f, RadiusY-g, Math.PI * Rotate, 0, 2 * Math.PI);
    ctx.stroke();
   }
   if (StGravar) {SaveStep("Concentrico",lMulticolor,"");}
}



//
// DESENHA FORMA COMPLEXA
//
function DrawComplexForm(lMulticolor)
{
  DrawPreviewBox();
  var cores;
  var passo = largura*3;
  var g = RadiusY;
  ctx.lineWidth=largura
  for (f = 1; f < Radius-passo; f=f+passo)
   { 
    g=g-passo;
    if (g>0) {g=0;}
    ctx.beginPath()
    if (lMulticolor) 
    {cores = '#'+ (Math.floor(Math.random()*0xFFFFFF)).toString(16);} 
    else {cores=color1;} 
    // Plota os Círculos Concêntricos
    ctx.strokeStyle = cores;
    ctx.ellipse(x, y, Radius-f, RadiusY-g, Math.PI * Rotate, 0, 2 * Math.PI);
    ctx.stroke();
   }
   if (StGravar) {SaveStep("Forma-Complexa",lMulticolor,"");}
}




//
// TRAÇA UMA RETA USANDO OS DOIS ULTIMOS CLIQUES DO MOUSE
//
function DrawLine(lBehavior)
{
  if ((Xant==x) && (Yant==y)) {mensagem("Marque um segundo ponto com o mouse");}
  else 
  {
    ctx.beginPath()
    ctx.lineWidth=largura;
    ctx.strokeStyle = color1;
    ctx.moveTo(Xant,Yant); 
    ctx.lineTo(x,y)
    ctx.stroke();
    ctx.closePath();
    // Adiciona o Passo antes de igualar os Pontos
    if (StGravar) {SaveStep("Linha",lBehavior,"");}

    if (lBehavior == "traço") 
    {
      Xant = x;
      Yant = y;
    }
    ShowCursor();
  }
}


//
// FAZ UM RETANGULO USANDO OS DOIS ULTIMOS CLIQUES DO MOUSE
//
function DrawRectangle(lSolid)
{
  var newX = x;
  var newY = y;
  CalcRectangle();
  // FAZ O RETÂNGULO INICIAR NO PONTO CORRETO V2 
  // (A versão anterior era invertida)
  if (newX < Xant)  {newX = Xant;}  
  if (newY < Yant)  {newY = Yant}

  // Rotina de Rotação Parte 1 - Início
  ctx.save();                
  ctx.translate(newX-retL/2,newY-retA/2);
  ctx.rotate(((Rotate-1)*360)*(Math.PI/180));
  var rotateX = 1-retL/2;
  var rotateY = 1-retA/2;
 // Rotina de Rotação Parte 1 - Fim

  if ((Xant==x) && (Yant==y)) {mensagem("Marque um segundo ponto com o mouse");} 
  else {

     ctx.beginPath();
     ctx.lineWidth=largura;
     if (lSolid) 
      {
       ctx.fillStyle ='rgba('+ cor1 +  ' , ' + cor2 +  ' , ' + cor3 +  ' , ' + transp + ' )';
       ctx.fillRect(rotateX,rotateY,retL,retA);
       ctx.fill();
       // Faz o reset o RGBA para 1
       ctx.fillStyle ='rgba('+ cor1 +  ' , ' + cor2+  ' , ' + cor3+  ' , ' + 1 + ' )';
     } else
     {
      ctx.strokeStyle = color1;
      ctx.strokeRect(rotateX,rotateY,retL,retA);
      ctx.stroke(); 
     }
    }
    ctx.closePath();
    ctx.restore();

    if (StGravar) {SaveStep("Retangulo",lSolid,"");}
  }
  


//
// FAZ UM CÍRCULO NA POSIÇÃO ATUAL
//
function DrawCircle(lSolid)
{
  ctx.beginPath();
  ctx.lineWidth=largura;
  if (lSolid) 
  {
    ctx.fillStyle ='rgba('+ cor1 +  ' , ' + cor2 +  ' , ' + cor3 +  ' , ' + transp + ' )';
    //ctx.arc(x, y, Radius, 0, Math.PI*2, true);
    ctx.ellipse(x, y, Radius, RadiusY, Math.PI * Rotate, 0, 2 * Math.PI);
    ctx.fill();
    // Faz o reset o RGBA para 1
    ctx.fillStyle ='rgba('+ cor1 +  ' , ' + cor2+  ' , ' + cor3+  ' , ' + 1 + ' )';
  } else
  {
   ctx.strokeStyle = color1;
   //ctx.arc(x, y, Radius, 0, Math.PI*2, true);
   ctx.ellipse(x, y, Radius, RadiusY, Math.PI * Rotate, 0, 2 * Math.PI);
   ctx.stroke(); 
  }
  
  if (StGravar) {SaveStep("Circulo",lSolid,"");}
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
function DrawPoligon(lSolid)
{
  // Rotina de Rotação Parte 1 - Início
  ctx.save();                
  ctx.translate(x,y);
  ctx.rotate(((Rotate-1)*360)*(Math.PI/180));
  var rotateX = 1-Radius/180; 
  var rotateY = 1-Radius/180;
  // Rotina de Rotação Parte 1 - Fim
  
  
  var lSides = Sides;
  var lCalcAngle = lSides;
  ctx.beginPath();
  ctx.lineWidth=largura;
  if (lSolid) 
     {ctx.fillStyle ='rgba('+ cor1 +  ' , ' + cor2 +  ' , ' + cor3 +  ' , ' + transp + ' )';
     } else{ctx.strokeStyle = color1;} 
   
  var lLoop = lSides +2; // É preciso somar 2 para garantir o fechamento do polígono em modo Stroke
  while (lLoop--) 
  {
     var angle = (lLoop/(lCalcAngle)) * Math.PI * 2;
     var pt = point(angle, Radius);
     ctx.lineTo(pt.x + rotateX, pt.y + rotateY);
  }
  ctx.closePath();
  if (lSolid) {ctx.fill();} else {ctx.stroke();}
  
  ctx.restore();
  
  // Faz o reset o RGBA para 1
  ctx.fillStyle ='rgba('+ cor1 +  ' , ' + cor2+  ' , ' + cor3+  ' , ' + 1 + ' )';
  


if (StGravar) {SaveStep("Poligono",lSolid,"");}
}


function DrawStar(lSolid)
{
// Rotina de Rotação Parte 1 - Início
ctx.save();                
ctx.translate(x,y);
ctx.rotate(((Rotate-1)*360)*(Math.PI/180));
var rotateX = 1-Radius/180; 
var rotateY = 1-Radius/180;
// Rotina de Rotação Parte 1 - Fim

var lDistance = Radius;
var lTips = Sides*2;
var lCalcAngle = lTips;
ctx.beginPath();
if (lSolid) 
{ctx.fillStyle ='rgba('+ cor1 +  ' , ' + cor2 +  ' , ' + cor3 +  ' , ' + transp + ' )';
} else{ctx.strokeStyle = color1;} 

ctx.lineWidth=largura;

var lLoop = lTips;
while (lLoop--) 
{
   var angle = (lLoop/(lCalcAngle)) * Math.PI * 2;
   var lDistance = (lLoop % 2 === 0) ? (parseInt(RadiusY/2)) : Radius;
   var pt = point(angle, lDistance);
   ctx.lineTo(pt.x + rotateX, pt.y + rotateY); 
   
}
ctx.closePath();
if (lSolid) {ctx.fill();} else {ctx.stroke();}

ctx.restore();

if (StGravar) {SaveStep("Estrela",lSolid,"");}
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
function DrawReadImage(StPosition)
{
  var newX = x;
  var newY = y;
  CalcRectangle();
  // FAZ O RETÂNGULO INICIAR NO PONTO CORRETO V2 
  // (A versão anterior era invertida)
  if (newX < Xant)  {newX = Xant;}  
  if (newY < Yant)  {newY = Yant}

  // Rotina de Rotação Parte 1 - Início
  ctx.save();                
  ctx.translate(newX-retL/2,newY-retA/2);
  ctx.rotate(((Rotate-1)*360)*(Math.PI/180));
  var rotateX = 1-retL/2;
  var rotateY = 1-retA/2;
 // Rotina de Rotação Parte 1 - Fim

 console.log(rotateX + " rX   --- rY " + rotateY);
 console.log(newX + " nX   --- nY " + newY);
 console.log(x + " x   --- y " + y);


  if (temIMG == false) {mensagem("Não há foto para colar ou arquivo inválido."); return false;}   

  
  if (StPosition == "frente")
    { 
      if ((Xant==x) && (Yant==y))
      {mensagem("Marque dois pontos formando um retângulo.");
      return false;} 
      ctx.globalAlpha = transp;
      ctx.drawImage(usuarioIMG , rotateX, rotateY , retL , retA);
      ctx.globalAlpha = 1;
    }
  else if (StPosition == "fundo")
  { 
    ctxFu.globalAlpha = transp;
    ctxFu.drawImage(usuarioIMG , 0 , 0 , WIDTH , HEIGHT);
    ctxFu.globalAlpha = 1;
  }
  ctx.restore();

  if (StGravar) {SaveStep("Imagem",StPosition,"");}
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
  ctx.fillStyle = color1;
  ctx.fillText(texto,x,y);

  if (StGravar) {SaveStep("Texto","",texto);}
}


//
// COLA O TEXTO NO DESENHO
//
function DrawEmoji(lEmoji)
{
  ctx.moveTo(x,y);
  ctx.font=FontSize+"px Verdana";
  ctx.fillStyle = color1;
  ctx.fillText(lEmoji,x,y);

if (StGravar) {SaveStep("Emoji","",lEmoji);}

}


//
// CRIA UM FUNDO PSICODÉLICO
//
function MakeBgTilt(lBehavior)
{
  var lx;
  var ly;
  var cor1, cor2, cor3;

if (lBehavior=="circulos")
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
else if (lBehavior=="retangulos")
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
   ctxFu.fillStyle = color1;
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

  if (StGravar) {SaveStep("Fundo-Aleatorio",lBehavior,"");}
}


//
// FUNÇÃO FUNDO - MUDA O FUNDO DO DESENHO
//
function ChangeBgColor()
{
    ctxFu.beginPath();
    ctxFu.fillStyle = color2;
    ctxFu.fillRect(0,0,WIDTH,HEIGHT); 
    ctxFu.fill();

    if (StGravar) {SaveStep("Fundo","","");}    
}



//
// MOSTRA AS COORDENADAS DE DESENHO (DEBUG)
//
// function coordenadas() 
// {
//   alert("Coord: x= " + x + " y= " + y+ " Xant= " + Xant + " Yant= " + Yant);
// }