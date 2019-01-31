//
// FAZ UM CÍRCULO NA POSIÇÃO ATUAL
// NOVA ROTINA COM GRADINENTES
//
function PreviewCircle(lFillKind)
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
       mensagem("Erro em: DrawPreviewCircle!!!")
       break;
     } 


     // ROTINA DA FORMA
     ctxPr.ellipse(rotateX, rotateY, RadiusX, RadiusY, 0, 0, 2 * Math.PI);
 
     if (StFill) {ctxPr.fill();} else {ctxPr.stroke();}
     ctxPr.closePath()
     ctxPr.restore();
     // Faz o reset o RGBA para 1
    ctxPr.fillStyle ='rgba('+ cor1 +  ' , ' + cor2+  ' , ' + cor3+  ' , ' + 1 + ' )';
}


    //  //
    //  // teste da rotina radial
    //  //
    //  ctxPr.beginPath();
    //  ctxPr.strokeStyle = color1;
    //  ctxPr.arc(lX1, lY1, lRadiusX, 0, 2 * Math.PI);
    //  ctxPr.closePath()
    //  ctxPr.beginPath();
    //  ctxPr.strokeStyle = color2;
    //  ctxPr.arc(lX2+lGradSprainX,lY2-lGradSprainY, lRadiusY, 0, 2 * Math.PI);
    //  ctxPr.stroke(); 
    //  ctxPr.closePath()



