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
// DESENHA CÍRCULOS COLORIDOS CONCÊNTRICOS
//
function PreviewConcentricCircles(lMulticolor)
{
  DrawPreviewBox();
  var cores;
  var passo = largura*3;
  var g = 0;
  ctxPr.lineWidth=largura
  for (f = 1; f < Radius-passo; f=f+passo)
   { 
    g=g+passo;
    if (g>RadiusY) {g=RadiusY;}
    ctxPr.beginPath()
      if (lMulticolor) 
      {cores = '#'+ (Math.floor(Math.random()*0xFFFFFF)).toString(16);} 
      else {cores=color1;} 
      
    // Plota os Círculos Concêntricos
    ctxPr.strokeStyle = cores;
    ctxPr.ellipse(x, y, Radius-f, RadiusY-g, Math.PI * Rotate, 0, 2 * Math.PI);
    ctxPr.stroke();
   }
}


//
// DESENHA FORMA COMPLEXA
//
function PreviewComplexForm(lMulticolor)
{
  DrawPreviewBox();
  var cores;
  var passo = largura*3;
  var g = RadiusY;
  ctxPr.lineWidth=largura
  for (f = 1; f < Radius-passo; f=f+passo)
   { 
    g=g-passo;
    if (g>0) {g=0;}
    ctxPr.beginPath()
    if (lMulticolor) 
    {cores = '#'+ (Math.floor(Math.random()*0xFFFFFF)).toString(16);} 
    else {cores=color1;} 
    // Plota os Círculos Concêntricos
    ctxPr.strokeStyle = cores;
    ctxPr.ellipse(x, y, Radius-f, RadiusY-g, Math.PI * Rotate, 0, 2 * Math.PI);
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
    ctxPr.strokeStyle = color1;
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
function PreviewRectangle(lFillKind)
{
  DrawPreviewBox();
  var newX = x;
  var newY = y;
  CalcRectangle();
  // FAZ O RETÂNGULO INICIAR NO PONTO CORRETO V2 
  // (A versão anterior era invertida)
  if (newX < Xant)  {newX = Xant;}  
  if (newY < Yant)  {newY = Yant}

  // Rotina de Rotação Parte 1 - Início
  ctxPr.save();                
  ctxPr.translate(newX-retL/2,newY-retA/2);
  ctxPr.rotate(((Rotate-1)*360)*(Math.PI/180));
  var rotateX = 1-retL/2;
  var rotateY = 1-retA/2;

 // Rotina de Rotação Parte 1 - Fim

  if ((Xant==x) && (Yant==y)) { mensagem("Marque um segundo ponto com o mouse");}
  else 
 {
     ctxPr.beginPath();
     ctxPr.lineWidth=largura;

     switch (lFillKind)
     {
       case "Linear":
          // Create gradient
          var lX1 = rotateX;
          var lY1 = rotateY;
          var lX2 = rotateX + retL;
          var lY2 = rotateY + retA;
          var lShiftX = retL*GradientX/100;
          var lShiftY = retA*GradientY/100;
          var grd = ctxPr.createLinearGradient(lX1+lShiftX,lY1+lShiftY,  lX2-lShiftX,lY2-lShiftY);
          grd.addColorStop(0,color1);
          grd.addColorStop(1,color2);
          // Fill with gradient
          ctxPr.fillStyle = grd;
          break;

       case "Radial":
          // INSERIR A ROTINA AQUI
          break;

       case "Solido":
          ctxPr.fillStyle ='rgba('+ cor1 +  ' , ' + cor2 +  ' , ' + cor3 +  ' , ' + transp + ' )';
          break;

       case "Vazio":
          ctxPr.strokeStyle = color1;
          ctxPr.strokeRect(rotateX,rotateY,retL,retA);
          ctxPr.stroke(); 
          break;

       default:
          mensagem("Erro em: DrawPreviewBox!!!")
          break;
        } 
   
   
     if (StFill) 
     {
        ctxPr.fillRect(rotateX,rotateY,retL,retA);
        ctxPr.fill();
        // Faz o reset o RGBA para 1
        ctxPr.fillStyle ='rgba('+ cor1 +  ' , ' + cor2+  ' , ' + cor3+  ' , ' + 1 + ' )';
     }
    ctxPr.closePath()
    ctxPr.restore();
  }
}
  


//
// FAZ UM CÍRCULO NA POSIÇÃO ATUAL
//
function PreviewCircle(lFillKind)
{
  DrawPreviewBox();
  ctxPr.beginPath();
  ctxPr.lineWidth=largura;
  if (lFillKind) 
  {
    ctxPr.fillStyle ='rgba('+ cor1 +  ' , ' + cor2 +  ' , ' + cor3 +  ' , ' + transp + ' )';
    //ctxPr.arc(x, y, Radius, 0, Math.PI*2, true);
    ctxPr.ellipse(x, y, Radius, RadiusY, Math.PI * Rotate, 0, 2 * Math.PI);
    ctxPr.fill();
    // Faz o reset o RGBA para 1
    ctxPr.fillStyle ='rgba('+ cor1 +  ' , ' + cor2+  ' , ' + cor3+  ' , ' + 1 + ' )';
  } else
  {
   ctxPr.strokeStyle = color1;
   //ctxPr.arc(x, y, Radius, 0, Math.PI*2, true);
   ctxPr.ellipse(x, y, Radius, RadiusY, Math.PI * Rotate, 0, 2 * Math.PI);
   ctxPr.stroke(); 
  }
  
}



//
// TRAÇA POLÍGONOS DE N LADOS
//
function PreviewPoligon(lFillKind)
{
DrawPreviewBox();
// Rotina de Rotação Parte 1 - Início
ctxPr.save();                
ctxPr.translate(x,y);
ctxPr.rotate(((Rotate-1)*360)*(Math.PI/180));
var rotateX = 1-Radius/180; 
var rotateY = 1-Radius/180;
// Rotina de Rotação Parte 1 - Fim


var lSides = Sides;
var lCalcAngle = lSides;
ctxPr.beginPath();
ctxPr.lineWidth=largura;
if (lFillKind) 
   {ctxPr.fillStyle ='rgba('+ cor1 +  ' , ' + cor2 +  ' , ' + cor3 +  ' , ' + transp + ' )';
   } else{ctxPr.strokeStyle = color1;} 
 
var lLoop = lSides +2; // É preciso somar 2 para garantir o fechamento do polígono em modo Stroke
while (lLoop--) 
{
   var angle = (lLoop/(lCalcAngle)) * Math.PI * 2;
   var pt = point(angle, Radius);
   ctxPr.lineTo(pt.x + rotateX, pt.y + rotateY);
}
ctxPr.closePath();
if (lFillKind) {ctxPr.fill();} else {ctxPr.stroke();}

ctxPr.restore();

// Faz o reset o RGBA para 1
ctxPr.fillStyle ='rgba('+ cor1 +  ' , ' + cor2+  ' , ' + cor3+  ' , ' + 1 + ' )';

}


function PreviewStar(lFillKind)
{
DrawPreviewBox();
// Rotina de Rotação Parte 1 - Início
ctxPr.save();                
ctxPr.translate(x,y);
ctxPr.rotate(((Rotate-1)*360)*(Math.PI/180));
var rotateX = 1-Radius/180; 
var rotateY = 1-Radius/180;
// Rotina de Rotação Parte 1 - Fim

var lDistance = Radius;
var lTips = Sides*2;
var lCalcAngle = lTips;
ctxPr.beginPath();
if (lFillKind) 
{ctxPr.fillStyle ='rgba('+ cor1 +  ' , ' + cor2 +  ' , ' + cor3 +  ' , ' + transp + ' )';
} else{ctxPr.strokeStyle = color1;} 

ctxPr.lineWidth=largura;

var lLoop = lTips;
while (lLoop--) 
{
   var angle = (lLoop/(lCalcAngle)) * Math.PI * 2;
   var lDistance = (lLoop % 2 === 0) ? (parseInt(RadiusY/2)) : Radius;
   var pt = point(angle, lDistance);
   ctxPr.lineTo(pt.x + rotateX, pt.y + rotateY); 
   
}
ctxPr.closePath();
if (lFillKind) {ctxPr.fill();} else {ctxPr.stroke();}

ctxPr.restore();

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
function PreviewReadImage(StPosition)
{
  DrawPreviewBox();
  var newX = x;
  var newY = y;
  CalcRectangle();
  // FAZ O RETÂNGULO INICIAR NO PONTO CORRETO V2 
  // (A versão anterior era invertida)
  if (newX < Xant)  {newX = Xant;}  
  if (newY < Yant)  {newY = Yant}

  // Rotina de Rotação Parte 1 - Início
  ctxPr.save();                
  ctxPr.translate(newX-retL/2,newY-retA/2);
  ctxPr.rotate(((Rotate-1)*360)*(Math.PI/180));
  var rotateX = 1-retL/2;
  var rotateY = 1-retA/2;

 // Rotina de Rotação Parte 1 - Fim

  if (temIMG == false)
  {mensagem("Não há foto para colar ou arquivo inválido.");
  return false;}   

  
  if (StPosition == "frente")
    { 
      if ((Xant==x) && (Yant==y))
      {mensagem("Marque dois pontos formando um retângulo.");
      return false;} 
      ctxPr.drawImage(usuarioIMG , rotateX, rotateY , retL , retA);
    }
  else if (StPosition == "fundo")
  { 
    ctxFu.globalAlpha = transp;
    ctxFu.drawImage(usuarioIMG , 0 , 0 , WIDTH , HEIGHT);
    ctxFu.globalAlpha = 1;

  }
  ctxPr.restore();
}



//
// Preview TEXTO NO DESENHO
//
function PreviewText()
{
  DrawPreviewBox();
  ctxPr.moveTo(x,y);
  ctxPr.font=FontSize+"px Verdana";
  ctxPr.fillStyle = color1;
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
  ctxPr.fillStyle = color1;
  ctxPr.fillText(lEmoji,x,y);

}





//
// MOSTRA AS COORDENADAS DE DESENHO (DEBUG)
//
function coordenadas() 
{
  alert("Coord: x= " + x + " y= " + y+ " Xant= " + Xant + " Yant= " + Yant);
}

