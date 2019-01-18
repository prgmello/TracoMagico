/*
====================================
== TRAÇO MÁGICO EM JS             ==
== (c) Paulo Mello - Teresópolis  ==
== Data 23/10/2018                ==
== CÓDIGO DESENHA                 ==
== FUNÇÕES PREVIEW DE FERRAMENTAS ==
====================================
*/



//
// FAZ UM RETANGULO USANDO OS DOIS ULTIMOS CLIQUES DO MOUSE
//
function DrawPreviewBox()
{
  ctxPr.clearRect(0,0,WIDTH,HEIGHT);
  ShowPreviewCursor();
}



//
// POSICIONA O CURSOR NO CANVAS CURSOR DE PREVIEW
//
function ShowPreviewCursor() {
  ctxFr.beginPath();
  ctxFr.clearRect(0, 0, WIDTH, HEIGHT);
  ctxFr.font = "10px Verdana";
  ctxFr.fillStyle = "#8A2BE2";
  ctxFr.fillText("⊕", Xant - 3, Yant + 3);
  ctxFr.fillStyle = "#FF0000";

  var cursorText = "⊗";
  var halfCursorWidth = ctxFr.measureText(cursorText).width/2;
  ctxFr.fillText(cursorText, 
    x - halfCursorWidth, 
    y + halfCursorWidth - 2); // Isso foi setado à força!!
  // Marca o ponto no Canvas de desenho
  ctxFr.closePath();
  ctx.moveTo(x, y);

}





//
// PREVIEW DE PONTO (NÃO FUNCIONA)
//
// function PreviewPoint() 
// {
//   DrawPreviewBox();
//   ctxPr.beginPath();
//   ctxPr.fillStyle = cor;
//   ctxPr.fillRect(x,y,largura,largura); 
//   ctxPr.fill();
//   ctxPr.closePath();
//   ctxPr.fillStyle = cor;
// }


//
// DESENHA CÍRCULOS COLORIDOS CONCÊNTRICOS
//
function PreviewConcentricCircles(lBehavior)
{
  DrawPreviewBox();
  var cores;
  var passo = largura*3;
  ctxPr.lineWidth=largura
  for (f = 1; f < Radius; f=f+passo)
   { 
    ctxPr.beginPath()
    if (lBehavior=="uma-cor") {cores=cor;} 
    else if (lBehavior=="varias-cores") 
      {cores = '#'+ (Math.floor(Math.random()*0xFFFFFF)).toString(16);} 
    // Plota os Círculos Concêntricos
    ctxPr.strokeStyle = cores;
    ctxPr.arc(x, y, f, 0, Math.PI*2, true);
    ctxPr.stroke();
   }
}


//
// TRAÇA UMA RETA USANDO OS DOIS ULTIMOS CLIQUES DO MOUSE
//
function PreviewLine(lBehavior)
{

  if ((Xant==x) && (Yant==y)) {mensagem("Marque um segundo ponto com o mouse");}
  else 
  {
    DrawPreviewBox();
    ctxPr.beginPath()
    ctxPr.lineWidth=largura;
    ctxPr.strokeStyle = cor;
    ctxPr.moveTo(Xant+1,Yant+1); 
    ctxPr.lineTo(x,y)
    ctxPr.stroke();
    ctxPr.closePath();
    if (lBehavior == "traço") 
    {
      Xant = x;
      Yant = y;
    } 
  }
}


//
// FAZ UM RETANGULO USANDO OS DOIS ULTIMOS CLIQUES DO MOUSE
//
function PreviewRectangle()
{
  DrawPreviewBox();
  var newX = x;
  var newY = y;
  CalcRectangle();
  
  if ((Xant==x) && (Yant==y)) {mensagem("Marque um segundo ponto com o mouse");} 
  else {
     // FAZ O RETÂNGULO INICIAR NO PONTO CORRETO
     if (newX > Xant)  {newX = Xant;}  
     if (newY > Yant)  {newY = Yant}

     ctxPr.beginPath();
     ctxPr.lineWidth=largura;
     if (StSolid) 
      {
       ctxPr.fillStyle ='rgba('+ cor1 +  ' , ' + cor2 +  ' , ' + cor3 +  ' , ' + transp + ' )';
       ctxPr.fillRect(newX,newY,retL,retA);
       ctxPr.fill();
       // Faz o reset o RGBA para 1
       ctxPr.fillStyle ='rgba('+ cor1 +  ' , ' + cor2+  ' , ' + cor3+  ' , ' + 1 + ' )';
     } else
     {
      ctxPr.strokeStyle = cor;
      ctxPr.strokeRect(newX,newY,retL,retA);
      ctxPr.stroke(); 
     }
    }
    ctxPr.closePath();

  }
  


//
// FAZ UM CÍRCULO NA POSIÇÃO ATUAL
//
function PreviewCircle()
{
  DrawPreviewBox();
  ctxPr.beginPath();
  ctxPr.lineWidth=largura;
  if (StSolid) 
  {
    ctxPr.fillStyle ='rgba('+ cor1 +  ' , ' + cor2 +  ' , ' + cor3 +  ' , ' + transp + ' )';
    //ctxPr.arc(x, y, Radius, 0, Math.PI*2, true);
    ctxPr.ellipse(x, y, Radius, RadiusY, Math.PI * Rotate, 0, 2 * Math.PI);
    ctxPr.fill();
    // Faz o reset o RGBA para 1
    ctxPr.fillStyle ='rgba('+ cor1 +  ' , ' + cor2+  ' , ' + cor3+  ' , ' + 1 + ' )';
  } else
  {
   ctxPr.strokeStyle = cor;
   //ctxPr.arc(x, y, Radius, 0, Math.PI*2, true);
   ctxPr.ellipse(x, y, Radius, RadiusY, Math.PI * Rotate, 0, 2 * Math.PI);
   ctxPr.stroke(); 
  }
  
}



//
// TRAÇA POLÍGONOS DE N LADOS
//
function PreviewPoligon()
{
DrawPreviewBox();
var lSides = Sides;
var lCalcAngle = lSides;
ctxPr.beginPath();
ctxPr.lineWidth=largura;
if (StSolid) 
   {ctxPr.fillStyle ='rgba('+ cor1 +  ' , ' + cor2 +  ' , ' + cor3 +  ' , ' + transp + ' )';
   } else{ctxPr.strokeStyle = cor;} 
 
var lLoop = lSides +2; // É preciso somar 2 para garantir o fechamento do polígono em modo Stroke
while (lLoop--) 
{
   var angle = (lLoop/(lCalcAngle)) * Math.PI * 2;
   var pt = point(angle, Radius);
   ctxPr.lineTo(pt.x + x, pt.y + y);
}
ctxPr.closePath();
if (StSolid) {ctxPr.fill();} else {ctxPr.stroke();}


// Faz o reset o RGBA para 1
ctxPr.fillStyle ='rgba('+ cor1 +  ' , ' + cor2+  ' , ' + cor3+  ' , ' + 1 + ' )';


}


function PreviewStar()
{
DrawPreviewBox();
var lDistance = Radius;
var lTips = Sides*2;
var lCalcAngle = lTips;
ctxPr.beginPath();
if (StSolid) 
{ctxPr.fillStyle ='rgba('+ cor1 +  ' , ' + cor2 +  ' , ' + cor3 +  ' , ' + transp + ' )';
} else{ctxPr.strokeStyle = cor;} 

ctxPr.lineWidth=largura;

var lLoop = lTips;
while (lLoop--) 
{
   var angle = (lLoop/(lCalcAngle)) * Math.PI * 2;
   var lDistance = (lLoop % 2 === 0) ? (parseInt(Radius/2)) : Radius;
   var pt = point(angle, lDistance);
   ctxPr.lineTo(pt.x + x, pt.y + y); 
   
}
ctxPr.closePath();
if (StSolid) {ctxPr.fill();} else {ctxPr.stroke();}


// Faz o reset o RGBA para 1
ctxPr.fillStyle ='rgba('+ cor1 +  ' , ' + cor2+  ' , ' + cor3+  ' , ' + 1 + ' )';
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
function PreviewReadImage(StSolid)
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
      ctxPr.drawImage(usuarioIMG , newX , newY , retL , retA);
    }
  else if (StSolid == "fundo")
  { 
    ctxFu.globalAlpha = transp;
    ctxFu.drawImage(usuarioIMG , 0 , 0 , WIDTH , HEIGHT);
    ctxFu.globalAlpha = 1;

  }

}



//
// Preview TEXTO NO DESENHO
//
function PreviewText()
{
  DrawPreviewBox();
  ctxPr.moveTo(x,y);
  ctxPr.font=FontSize+"px Verdana";
  ctxPr.fillStyle = cor;
  ctxPr.fillText(texto,x,y);
}


//
// COLA O TEXTO NO DESENHO
//
function PreviewEmoji(lEmoji)
{
  DrawPreviewBox();
  ctxPr.moveTo(x,y);
  ctxPr.font=FontSize+"px Verdana";
  ctxPr.fillStyle = cor;
  ctxPr.fillText(lEmoji,x,y);

}





//
// MOSTRA AS COORDENADAS DE DESENHO (DEBUG)
//
function coordenadas() 
{
  alert("Coord: x= " + x + " y= " + y+ " Xant= " + Xant + " Yant= " + Yant);
}

