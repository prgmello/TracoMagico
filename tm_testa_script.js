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

// Draw the ellipse
ctx.beginPath();
ctx.strokeStyle = cor;
ctx.ellipse(x, y, Radius, RadiusY, Math.PI / largura, 0, 2 * Math.PI);
ctx.stroke();
//ctx.closePath();
//ctx.stroke();

//  RodaRotina();

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





//
// COLE AQUI A ROTINA QUE VC QUER TESTAR
//
function RodaRotina()
{
 
//mensagem("Não há rotina para executar")

ctx.save();
ctx.rotate(0.15);
// var LocalRadius = (100-Radius)/100
// console.log(LocalRadius);
// ctx.rotate(LocalRadius);
// draw your object
ctx.strokeStyle = "#FF0000";
ctx.strokeRect(x,y,200,100);
ctx.stroke();
// draw your object
ctx.restore();

}


