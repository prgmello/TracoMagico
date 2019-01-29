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
  ctxPr.lineWidth=largura;
 
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
       // Create Linear Gradient
      var lX1 = rotateX;
      var lY1 = rotateY ;
      var lX2 = rotateX + retL;
      var lY2 = rotateY + retA;
      var lShiftX = retL*GradientX/100;
      var lShiftY = retA*GradientY/100;
      var lColorStop1 = (GradientSprainX+50)/100
      var lColorStop2 = (GradientSprainY+50)/100
      var grd = ctxPr.createLinearGradient(lX1+lShiftX,lY1+lShiftY, lX2-lShiftX,lY2-lShiftY);
      grd.addColorStop(lColorStop1,color1);
      grd.addColorStop(lColorStop2,color2);
      ctxPr.fillStyle = grd;
      break;
    case "Radial":
       // Create Radial Gradient
       var lHalfRetL = retL/2;
       var lHalfRetA = retA/2;
       var lX1 = rotateX + lHalfRetL;
       var lY1 = rotateY + lHalfRetA;
       var lX2 = rotateX + lHalfRetL;
       var lY2 = rotateY + lHalfRetA;
       var lRadiusX = retL+retL*GradientX/100;
       var lRadiusY = lHalfRetA+5+retA*GradientY/100;
       var lGradSprainX = retL*GradientSprainX/100
       var lGradSprainY = retA*GradientSprainY/100
 
       var grd = ctxPr.createRadialGradient(rotateX, rotateY, lRadiusX,lX2+lGradSprainX,lY2-lGradSprainY, lRadiusY);
       grd.addColorStop(0,color1);
       grd.addColorStop(1,color2);
       // Fill with gradient
       ctxPr.fillStyle = grd;
       break;
 
    case "Solido":
      ctxPr.fillStyle ='rgba('+ cor1 +  ' , ' + cor2 +  ' , ' + cor3 +  ' , ' + transp + ' )';
      break;
 
    case "Vazio":
      ctxPr.strokeStyle = color1;
      ctxPr.ellipse(rotateX, rotateY, RadiusX, RadiusY, 0, 0, 2 * Math.PI);
      ctxPr.stroke(); 
      break;
 
    default:
       mensagem("Erro em: DrawPreviewBox!!!")
       break;
     } 
 
     if (StFill) 
     {
        ctxPr.ellipse(rotateX, rotateY, RadiusX, RadiusY, 0, 0, 2 * Math.PI);
        ctxPr.fill();
        // Faz o reset o RGBA para 1
        ctxPr.fillStyle ='rgba('+ cor1 +  ' , ' + cor2+  ' , ' + cor3+  ' , ' + 1 + ' )';
     }
 ctxPr.closePath()
 ctxPr.restore();
}
