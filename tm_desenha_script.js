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
// TRAÇA UMA RETA USANDO OS DOIS ULTIMOS CLIQUES DO MOUSE
//
function DrawLine(Screen,lBehavior)
{
  if ((Xant==x) && (Yant==y) && (!StPreview))
    {mensagem("Marque um segundo ponto com o mouse");}
  else 
  {
    ClearPeviewCanvas();
    Screen.beginPath()
    Screen.lineWidth = largura;
    Screen.strokeStyle = color1;
    Screen.moveTo(Xant+1,Yant+1); 
    Screen.lineTo(x,y)
    Screen.stroke();
    Screen.closePath();


    if ((!StPreview) && (StGravar)) {SaveStep("Linha",lBehavior,"");}
    // ESTA LINHA TEM!! QUE ESTAR DEPOIS DA LINHA DE GRAVAÇÃO
    // NO MODO PREVISÃO O COMANDO 'TRAÇA CAMINHO' FUNCIONA COMO A FERRAMENTA 'CRIA RETA' 
    if  ((lBehavior == "traço") && (!StPreview)) {Xant = x; Yant = y;}
    ShowCursor();
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
function DrawReadImage(Screen,StPosition)
{
  if (StPosition == "frente")
  {
    ClearPeviewCanvas();
    // X do vértice do Retangulo Retângulo
    retX = Math.trunc(x - retL/2);
    // Y do vértice do Retangulo Retângulo
    retY = Math.trunc(y - retA/2);
    // Rotina de Rotação Parte 1 - Início
    Screen.save();
    Screen.translate(x,y);
    Screen.rotate(((Rotate-1)*360)*(Math.PI/180));
    var rotateX = retX-x;
    var rotateY = retY-y;
    // Rotina de Rotação Parte 1 - Fim
    Screen.beginPath();
    Screen.globalAlpha = Alpha;
    Screen.drawImage(usuarioIMG , rotateX, rotateY , retL , retA);
    Screen.globalAlpha = 1;
    Screen.closePath()
    Screen.restore();
    if (!StPreview && StGravar) {SaveStep("Imagem",StPosition,"");}
    // FIM DA ROTINA DE COLA IMAGEM NO PRIMEIRO PLANO
  } else if (StPosition == "fundo")
  { 
    ctxFu.beginPath();
    ctxFu.globalAlpha = Alpha;
    ctxFu.drawImage(usuarioIMG , 0 , 0 , WIDTH , HEIGHT);
    ctxFu.globalAlpha = 1;
    // SEMPRE GRAVA, NÃO TEM PREVIEW
    if (StGravar) {SaveStep("Imagem",StPosition,"");}
  } 
}



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
// Draw TEXTO NO DESENHO
//
function DrawText(Screen)
{
  ClearPeviewCanvas();
  Screen.moveTo(x,y);
  Screen.font=FontSize+"px Verdana";
  Screen.fillStyle = color1;
  Screen.fillText(texto,x,y);

  if (!StPreview && StGravar) {SaveStep("Texto","",texto);}
}


//
// COLA O TEXTO NO DESENHO
//
function DrawEmoji(Screen,lEmoji)
{
  ClearPeviewCanvas();
  Screen.moveTo(x,y);
  Screen.font=FontSize+"px Verdana";
  Screen.fillStyle = color1;
  Screen.fillText(lEmoji,x,y);
  if (!StPreview && StGravar) {SaveStep("Emoji","",lEmoji);}
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


// DESENHA UM RETÂNGULO
function DrawRectangle(Screen,rotateX,rotateY)
{
  // X do vértice do Retangulo Retângulo
  retX = Math.trunc(x - retL/2);
  // Y do vértice do Retangulo Retângulo
  retY = Math.trunc(y - retA/2);
  var rotateX = retX-x;
  var rotateY = retY-y;
  if (StFill) {Screen.fillRect(rotateX,rotateY,retL,retA);} else {Screen.strokeRect(rotateX,rotateY,retL,retA);}
}


//
// FUNÇÃO AUXILIAR DA ROTINA QUE TRAÇA POLÍGONOS e ESTRELAS
//
function point(angle, Radius) 
{
  return { x: Math.cos(angle) * Radius, y: Math.sin(angle) * Radius };
}



//
// CALCULA POLÍGONOS DE 'N' PONTAS
//
function DrawPolygon(Screen,rotateX,rotateY)
{
  // ROTINA DA FORMA
  var lSides = Sides;
  var lCalcAngle = lSides;
  var lLoop = lSides +2; // É preciso somar 2 para garantir o fechamento do polígono em modo Stroke
  while (lLoop--) 
  {
    var angle = (lLoop/(lCalcAngle)) * Math.PI * 2;
    var pt = point(angle, RadiusX);
    Screen.lineTo(pt.x + rotateX, pt.y + rotateY);
  }
}

//
// CALCULA ESTRELAS DE 'N' PONTAS
//
function DrawStar(Screen,rotateX,rotateY)
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
   Screen.lineTo(pt.x + rotateX, pt.y + rotateY); 
  }
  // O COMANDO CLOSE PATH É NECESSÁRIO PARA FECHAR A FIGURA!
  Screen.closePath();
}


//
// DESENHA CÍRCULOS COLORIDOS CONCÊNTRICOS
//
function DrawConcentricCircles(Screen,rotateX,rotateY)
{
  var cores;
  var passo = largura*3;
  var g = 0;
  Screen.lineWidth=largura
  for (f = 1; f < RadiusX-passo; f=f+passo)
   { 
    g=g+passo;
    if (g>RadiusY) {g=RadiusY;}
    Screen.beginPath()
      if (StMulticolor) 
      {cores = '#'+ (Math.floor(Math.random()*0xFFFFFF)).toString(16);} 
      else {cores=color1;} 
      
    // Plota os Círculos Concêntricos
    Screen.strokeStyle = cores;
    Screen.ellipse(rotateX,rotateY, RadiusX-f, RadiusY-g, Math.PI * Rotate, 0, 2 * Math.PI);
    if (StFill) {Screen.fill();} else {Screen.stroke();}
    Screen.closePath();
   }
}



// //
// // CALCULA UMA FORMA COMPLEXA V1
// //
// function CalcComplexForm2(Screen,rotateX,rotateY)
// {
//   var cores;
//   var passo = largura*3;
//   var g = RadiusY;
//   Screen.lineWidth=largura
//   for (f = 1; f < RadiusX-passo; f=f+passo)
//    { 
//     g=g-passo;
//     if (g>0) {g=0;}
//     // O COMANDO CLOSE PATH É NECESSÁRIO PARA EVITAR UMA RETA INDESEJADA NO MEIO DA FIGURA!
//     Screen.beginPath();
//     if (StMulticolor)
//     {cores = '#'+ (Math.floor(Math.random()*0xFFFFFF)).toString(16);} 
//     else {cores=color1;}
//     Screen.strokeStyle = cores;
//     // Plota os Círculos Concêntricos
//     Screen.ellipse(rotateX, rotateY, RadiusX-f, RadiusY-g, 0, 0, 2 * Math.PI);
//     if (StFill) {Screen.fill();} else {Screen.stroke();}
//     Screen.closePath();
//    }
// }




//
// CALCULA UMA FORMA COMPLEXA V3
//
function DrawComplexForm(Screen,rotateX,rotateY)
{
  var cx = rotateX; 
  var cy = rotateY; 

  var radius1 = RadiusX/2;
  var radius2 = RadiusY/2;
  var ratio = Sides; 
  var lx, ly, loop;
  
  Screen.moveTo(rotateX,rotateY);
  Screen.beginPath();
  
  for (loop = -1; loop <= Math.PI * 2; loop += 0.01) {
    lx = cx + radius1 * Math.cos(loop) + radius2 * Math.cos(loop * ratio);
    ly = cy + radius1 * Math.sin(loop) + radius2 * Math.sin(loop * ratio);
    Screen.lineTo(lx, ly);
  }
  
  Screen.stroke();
}

 




//
// TRAÇA TODOS OS POLÍGONOS BASEADOS QUE PODEM SER PREENCHIDOS
// NOVA ROTINA COM GRADIENTE
//
function DrawPolygonShapes(Screen,lPolygon,lFillKind)
{
  ClearPeviewCanvas();
  Screen.save();
  Screen.translate(x,y);
  Screen.rotate(((Rotate-1)*360)*(Math.PI/180));
  var rotateX = RadiusX*(Math.PI/180);
  var rotateY = RadiusY*(Math.PI/180);
  //console.log(rotateX + "   -   " + rotateY)
  Screen.beginPath();
  
 
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
       var grd = Screen.createLinearGradient(lX1+lShiftX,lY1+lShiftY, lX2-lShiftX,lY2-lShiftY);
       //console.log((GradientSprainX+50)/100 + "   -   " + (GradientSprainY+50)/100)
       grd.addColorStop(lColorStop1,color1);
       grd.addColorStop(lColorStop2,color2);
       Screen.fillStyle = grd;
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
      var grd = Screen.createRadialGradient(lX1, lY1, lRadiusX, lX2+lGradSprainX,lY2-lGradSprainY, lRadiusY);
      grd.addColorStop(0,color1);
      grd.addColorStop(1,color2);
      // Fill with gradient
      Screen.fillStyle = grd;
      break;
 
    case "Solido":
    Screen.fillStyle ='rgba('+ cor1 +  ' , ' + cor2 +  ' , ' + cor3 +  ' , ' + Alpha + ' )';
    break;
    
    case "Vazio":
      Screen.lineWidth=largura;
      Screen.strokeStyle = color1;
      break;
 
    default:
       mensagem("Erro em: DrawPolygonShapes!!!")
       //console.log(lFillKind);
       break;
     } 


     // SELECIONA A ROTINAS DE CÁLCULO DAS FORMA ADEQUADA
     switch (lPolygon)
     {
       case "Retangulo":
         DrawRectangle(Screen,rotateX,rotateY);
         if (!StPreview && StGravar) {SaveStep(lPolygon,FillKind,"");}
         break;

       case "Elipse":
         Screen.ellipse(rotateX, rotateY, RadiusX, RadiusY, 0, 0, 2 * Math.PI);
         if (!StPreview && StGravar) {SaveStep(lPolygon,FillKind,"");}
         break;

       case "Poligono":
         DrawPolygon(Screen,rotateX,rotateY);
         if (!StPreview && StGravar) {SaveStep(lPolygon,FillKind,"");}
         break;

       case "Estrela":
         DrawStar(Screen,rotateX,rotateY);
         if (!StPreview && StGravar) {SaveStep(lPolygon,FillKind,"");}
         break;

       case "Forma-Complexa":
         DrawComplexForm(Screen,rotateX,rotateY);
         if (!StPreview && StGravar) {SaveStep(lPolygon,FillKind,"");}
       break;

    case "Circulos-Concentricos":
         DrawConcentricCircles(Screen,rotateX,rotateY);
         if (!StPreview && StGravar) {SaveStep(lPolygon,FillKind,"");}
       break;

     }
     
  if (StFill) {Screen.fill();} else {Screen.stroke();}
  Screen.closePath();
  Screen.restore();
  // Faz o reset o RGBA para 1
  Screen.fillStyle ='rgba('+ cor1 +  ' , ' + cor2+  ' , ' + cor3+  ' , ' + 1 + ' )';
  
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
  var lAlpha;
  for (f = 30; f > 10; f--)
  { 
     ctxFu.beginPath()
     cor1 = Math.floor(Math.random()*255);
     cor2 = Math.floor(Math.random()*255);
     cor3 = Math.floor(Math.random()*255);
     lx    = Math.floor(Math.random()*(WIDTH));
     ly    = Math.floor(Math.random()*(HEIGHT));
     lRadius = Math.floor(Math.random()*(HEIGHT/2));
     lAlpha = Alpha;
     lLineWidth = Math.floor(Math.random()*dx);

     ctxFu.lineWidth=lLineWidth;
     ctxFu.fillStyle ='rgba('+ cor1 +  ' , ' + cor2+  ' , ' + cor3+  ' , ' + lAlpha + ' )';
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
   ctxFu.fillStyle ='rgba('+ cor1 +  ' , ' + cor2+  ' , ' + cor3+  ' , ' + Alpha + ' )';
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