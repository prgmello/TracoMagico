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
// ctx.stroke(); 



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





function drawRandomlyColoredRectangle() {  

  ctxPr.clearRect(0,0, WIDTH, HEIGHT);
  ctxPr.lineWidth = largura;
  CalcRectangle();
  ctxPr.save();                
  ctxPr.translate(x-retL/2,y-retA/2);
  ctxPr.rotate(((Rotate-1)*360)*(Math.PI/180));
  
  ctxPr.strokeStyle = cor;
  var newX = 1-retL/2;
  var newY = 1-retA/2;
  ctxPr.strokeRect(newX, newY, retL, retA); 
  ctxPr.restore();
  //ctxPr.rotate(convertToRadians(angle));

  //console.log(angle + " " + ((Rotate-1)*360));
  // set the fill style
  //ctxPr.fillStyle = '#'+Math.floor(Math.random()*16777215).toString(16);
  //ctxPr.strokeRect(-25,-25,50,50);
  // ctxPr.strokeStyle = cor;
  // var newX = 1-retL/2;
  // var newY = 1-retA/2;
  // ctxPr.strokeRect(newX, newY, retL, retA);   
  //ctxPr.strokeStyle = "#ff0000";
  //ctxPr.strokeRect(-25,-25,50,70); 

  
}





//
// COLE AQUI A ROTINA QUE VC QUER TESTAR
//
function RodaRotina()
{
  clearInterval();
  CalcRectangle();
  //drawRandomlyColoredRectangle()
  setInterval(drawRandomlyColoredRectangle, 20);
  //DrawRect2();

// //mensagem("Não há rotina para executar")
// console.log(Math.PI * Rotate);
// CalcRectangle();
// ctxPr.save();
// ctxPr.rotate(Math.PI * Rotate);
// // draw your object
// ctxPr.strokeStyle = cor;
// ctxPr.strokeRect(x, y, retL, retA);
// ctxPr.stroke();
// // draw your object
// ctxPr.restore();

}


