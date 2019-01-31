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
// LIMPA O CANVAS DE PREVIEW
//
function ClearPeviewCanvas()
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
  ClearPeviewCanvas();
  var cores;
  var passo = largura*3;
  var g = 0;
  ctxPr.lineWidth=largura
  for (f = 1; f < RadiusX-passo; f=f+passo)
   { 
    g=g+passo;
    if (g>RadiusY) {g=RadiusY;}
    ctxPr.beginPath()
      if (lMulticolor) 
      {cores = '#'+ (Math.floor(Math.random()*0xFFFFFF)).toString(16);} 
      else {cores=color1;} 
      
    // Plota os Círculos Concêntricos
    ctxPr.strokeStyle = cores;
    ctxPr.ellipse(x, y, RadiusX-f, RadiusY-g, Math.PI * Rotate, 0, 2 * Math.PI);
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
    ClearPeviewCanvas();
    ctxPr.beginPath()
    ctxPr.lineWidth=largura;
    ctxPr.strokeStyle = color1;
    ctxPr.moveTo(Xant+1,Yant+1); 
    ctxPr.lineTo(x,y)
    ctxPr.stroke();
    ctxPr.closePath();
    if (lBehavior == "traço") 
    {Xant = x;  Yant = y; } 
  }
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
// PREVIEWDE IMAGEM NO CANVAS EM X,Y 
//
function PreviewReadImage(StPosition,lFillKind)
{
  ClearPeviewCanvas();
  CalcRectangle();
  // Rotina de Rotação Parte 1 - Início
  ctxPr.save();
  ctxPr.translate(x,y);
  ctxPr.rotate(((Rotate-1)*360)*(Math.PI/180));
  var rotateX = retX-x;
  var rotateY = retY-y;
  // Rotina de Rotação Parte 1 - Fim
  ctxPr.beginPath();
  if (StPosition == "frente")
  {
     ctxPr.globalAlpha = transp;
     ctxPr.drawImage(usuarioIMG , rotateX, rotateY , retL , retA);
     ctxPr.globalAlpha = 1;
  }
  ctxPr.closePath()
  ctxPr.restore();
}








//
// Preview TEXTO NO DESENHO
//
function PreviewText()
{
  ClearPeviewCanvas();
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
  ClearPeviewCanvas();
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


//
// ROTINAS DE CÁLCULO DE FORMAS
//


function CalcRectanglePreview(rotateX,rotateY)
{
  CalcRectangle();
  var rotateX = retX-x;
  var rotateY = retY-y;
  if (StFill) {ctxPr.fillRect(rotateX,rotateY,retL,retA);} else {ctxPr.strokeRect(rotateX,rotateY,retL,retA);}
}

//
// CALCULA POLÍGONOS DE 'N' PONTAS
//
function CalcPolygonPreview(rotateX,rotateY)
{
  // ROTINA DA FORMA
  var lSides = Sides;
  var lCalcAngle = lSides;
  var lLoop = lSides +2; // É preciso somar 2 para garantir o fechamento do polígono em modo Stroke
  while (lLoop--) 
  {
    var angle = (lLoop/(lCalcAngle)) * Math.PI * 2;
    var pt = point(angle, RadiusX);
    ctxPr.lineTo(pt.x + rotateX, pt.y + rotateY);
  }
}

//
// CALCULA ESTRELAS DE 'N' PONTAS
//
function CalcStarsPreview(rotateX,rotateY)
{
  var lDistance = RadiusX;
  var lTips = Sides*2;
  var lCalcAngle = lTips;
  var lLoop = lTips;
  while (lLoop--) 
  {
   var angle = (lLoop/(lCalcAngle)) * Math.PI * 2;
   var lDistance = (lLoop % 2 === 0) ? (parseInt(RadiusY/2)) : RadiusX;
   var pt = point(angle, lDistance);
   ctxPr.lineTo(pt.x + rotateX, pt.y + rotateY); 
  }
  // O COMANDO CLOSE PATH É NECESSÁRIO PARA FECHAR A FIGURA!
  ctxPr.closePath();
}


function CalcConcentricCirclesPreview(rotateX,rotateY)
{
  var cores;
  var passo = largura*3;
  var g = 0;
  ctxPr.lineWidth=largura
  for (f = 1; f < RadiusX-passo; f=f+passo)
   { 
    g=g+passo;
    if (g>RadiusY) {g=RadiusY;}
    ctxPr.beginPath()
      if (StMulticolor) 
      {cores = '#'+ (Math.floor(Math.random()*0xFFFFFF)).toString(16);} 
      else {cores=color1;} 
      
    // Plota os Círculos Concêntricos
    ctxPr.strokeStyle = cores;
    ctxPr.ellipse(rotateX,rotateY, RadiusX-f, RadiusY-g, Math.PI * Rotate, 0, 2 * Math.PI);
    if (StFill) {ctxPr.fill();} else {ctxPr.stroke();}
    ctxPr.closePath();
   }
}




//
// CALCULA UMA FORMA COMPLEXA
//
function CalcComplexFormPreview(rotateX,rotateY)
{
  var cores;
  var passo = largura*3;
  var g = RadiusY;
  ctxPr.lineWidth=largura
  for (f = 1; f < RadiusX-passo; f=f+passo)
   { 
    g=g-passo;
    if (g>0) {g=0;}
    // O COMANDO CLOSE PATH É NECESSÁRIO PARA EVITAR UMA RETA INDESEJADA NO MEIO DA FIGURA!
    ctxPr.beginPath();
    if (StMulticolor)
    {cores = '#'+ (Math.floor(Math.random()*0xFFFFFF)).toString(16);} 
    else {cores=color1;}
    ctxPr.strokeStyle = cores;
    // Plota os Círculos Concêntricos
    ctxPr.ellipse(rotateX, rotateY, RadiusX-f, RadiusY-g, 0, 0, 2 * Math.PI);
    if (StFill) {ctxPr.fill();} else {ctxPr.stroke();}
    ctxPr.closePath();
   }
}





//
// TRAÇA TODOS OS POLÍGONOS BASEADOS EM CIRCULOS QUE PODEM SER PREENCHIDOS
// NOVA ROTINA COM GRADIENTE
//
function PreviewCircularPolygons(lPolygon,lFillKind)
{
  ClearPeviewCanvas();
  ctxPr.save();
  ctxPr.translate(x,y);
  ctxPr.rotate(((Rotate-1)*360)*(Math.PI/180));
  var rotateX = RadiusX*(Math.PI/180);
  var rotateY = RadiusY*(Math.PI/180);
  //console.log(rotateX + "   -   " + rotateY)
  ctxPr.beginPath();
  
 
  switch (lFillKind)
  {
    case "Linear":
       // Create Linear Gradient
       var lX1 = rotateX - RadiusX/2;
       var lY1 = rotateX - RadiusY/2;
       var lX2 = rotateX + RadiusX/2;
       var lY2 = rotateX + RadiusY/2;
       var lShiftX = RadiusX*GradientX/100;
       var lShiftY = RadiusY*GradientY/100;
       var lColorStop1 = (GradientSprainX+50)/100
       var lColorStop2 = (GradientSprainY+50)/100
       var grd = ctxPr.createLinearGradient(lX1+lShiftX,lY1+lShiftY, lX2-lShiftX,lY2-lShiftY);
       //console.log((GradientSprainX+50)/100 + "   -   " + (GradientSprainY+50)/100)
       grd.addColorStop(lColorStop1,color1);
       grd.addColorStop(lColorStop2,color2);
       ctxPr.fillStyle = grd;
       break;

    case "Radial":
      // Create Radial Gradient do retangulo
      var lX1 = rotateX;
      var lY1 = rotateY;
      var lX2 = rotateX;
      var lY2 = rotateY;
      var lRadiusX = retL+retL*GradientX/100;
      var lRadiusY = RadiusY+5+retA*GradientY/100;
      var lGradSprainX = retL*GradientSprainX/100
      var lGradSprainY = retA*GradientSprainY/100
      var grd = ctxPr.createRadialGradient(lX1, lY1, lRadiusX, lX2+lGradSprainX,lY2-lGradSprainY, lRadiusY);
      grd.addColorStop(0,color1);
      grd.addColorStop(1,color2);
      // Fill with gradient
      ctxPr.fillStyle = grd;
      break;
 
    case "Solido":
    ctxPr.fillStyle ='rgba('+ cor1 +  ' , ' + cor2 +  ' , ' + cor3 +  ' , ' + transp + ' )';
    break;
    
    case "Vazio":
      ctxPr.lineWidth=largura;
      ctxPr.strokeStyle = color1;
      break;
 
    default:
       mensagem("Erro em: DrawPreviewPolygon!!!")
       break;
     } 


     // SELECIONA A ROTINAS DE CÁLCULO DAS FORMA ADEQUADA
     switch (lPolygon)
     {
       case "Poligono":
          CalcPolygonPreview(rotateX,rotateY);
       break;

       case "Elipse":
         ctxPr.ellipsePreview(rotateX, rotateY, RadiusX, RadiusY, 0, 0, 2 * Math.PI);
       break;

       case "Estrela":
         CalcStars(rotateX,rotateY);
       break;

       case "Forma-Complexa":
         CalcComplexFormPreview(rotateX,rotateY);
       break;

       case "ConcentricCircles":
         CalcConcentricCirclesPreview(rotateX,rotateY);
       break;

       case "Retangulo":
          CalcRectanglePreview(rotateX,rotateY);
       break;
     }
     
     
   
  if (StFill) {ctxPr.fill();} else {ctxPr.stroke();}
  ctxPr.closePath();
  ctxPr.restore();
  // Faz o reset o RGBA para 1
  ctxPr.fillStyle ='rgba('+ cor1 +  ' , ' + cor2+  ' , ' + cor3+  ' , ' + 1 + ' )';
  
}