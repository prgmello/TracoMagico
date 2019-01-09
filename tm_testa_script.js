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

  //RodaRotina("preenchido");
  RodaRotina("vazio");

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



function point(angle, Radius) {
  return {
    x: Math.cos(angle) * Radius,
    y: Math.sin(angle) * Radius
  };

}

//
// COLE AQUI A ROTINA QUE VC QUER TESTAR
//
function RodaRotina(vBehavior)
{

//mensagem("Não há rotina para executar")

var lcor1 = parseInt(cor.substring(1,3), 16);
var lcor2 = parseInt(cor.substring(3,5), 16);
var lcor3 = parseInt(cor.substring(5,7), 16);
//var Radius = Radius;
var lSides = Sides;
var lCalcAngle = lSides;
ctx.beginPath();
if (vBehavior=="preenchido") 
   {ctx.fillStyle ='rgba('+ lcor1 +  ' , ' + lcor2+  ' , ' + lcor3+  ' , ' + transp + ' )';
   } else{ctx.strokeStyle = cor;} 
 
var lLoop = lSides +1;
while (lLoop--) 
{
   var angle = (lLoop/(lCalcAngle)) * Math.PI * 2;
   var pt = point(angle, Radius);
   ctx.lineTo(pt.x + x, pt.y + y);
}
if (vBehavior=="preenchido") {ctx.fill();} else {ctx.stroke();}


// Faz o reset o RGBA para 1
ctx.fillStyle ='rgba('+ lcor1 +  ' , ' + lcor2+  ' , ' + lcor3+  ' , ' + 1 + ' )';



}


