/*
====================================
== TRAÇO MÁGICO EM JS             ==
== (c) Paulo Mello - Teresópolis  ==
== Data 23/10/2018                ==
== CÓDIGO TESTA                   ==
====================================
*/


//
// INICIO DA FUNÇÃO TESTA
//
function testa()
{


  ctxFr.moveTo(20,20);
  ctxFr.font = "12 px Verdana";
  ctxFr.fillStyle = "Red";
  ctxFr.fillText("ENTROU NA ROTINA TESTE",20,20);

  ctxFr.fillStyle = "Black";
  ctxFr.fillText("ENTROU NA  ROTINA TESTE",750,20);

// // Draw Retangulo com Rotação
// CalcRectangle();
// ctxPr.rotate(Math.PI * Rotate);
// ctxPr.strokeRect(x, y, retL, retA);
// ctxPr.stroke(); 



RodaRotina();

  ctxFr.moveTo(20,20);
  ctxFr.font = "12 px Verdana";
  ctxFr.fillStyle = "Black";
  ctxFr.fillText("SAIU DA ROTINA TESTE",20,490);

  ctxFr.fillStyle = "Red";
  ctxFr.fillText("SAIU DA ROTINA TESTE",750,490);

  


   //alert("X:" + x + " Y: " + y);

// =======================
} // = FIM DA FUNÇÃO TESTA =
// =======================





function drawSpirograph(ctx,R,r,O){
var x1 = R-O;
var y1 = 0;
var i  = 1;
var cores;
ctxPr.beginPath();
ctxPr.moveTo(x1,y1);
do {
  if (i>20000) break;
  var x2 = (R+r)*Math.cos(i*Math.PI/72) - 
           (r+O)*Math.cos(((R+r)/r)*(i*Math.PI/72))
  var y2 = (R+r)*Math.sin(i*Math.PI/72) - 
           (r+O)*Math.sin(((R+r)/r)*(i*Math.PI/72))
 
  if (StMulticolor)
  {cores = '#'+ (Math.floor(Math.random()*0xFFFFFF)).toString(16);} 
  else {cores=color1;}
  ctxPr.strokeStyle = cores;

  ctxPr.lineTo(x2,y2);
  
  x1 = x2;
  y1 = y2;
  i++;
} while (x2 != R-O && y2 != 0 );
ctxPr.stroke();
} 






//
// COLE AQUI A ROTINA QUE VC QUER TESTAR
//
function RodaRotina()
{
// mensagem("Não há rotina para executar")
drawSpirograph(ctxPr,Sides,RadiusY,RadiusX)
}


