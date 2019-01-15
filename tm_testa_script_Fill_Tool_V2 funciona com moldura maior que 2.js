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
  ctxFr.fillText("ENTROU NA ROTINA TESTE" ,20,20);

  ctxFr.fillStyle = "Black";
  ctxFr.fillText("ENTROU NA  ROTINA TESTE",750,20);
  
  // // // CHEAT
  // var lRadius = Radius;
  // var llargura = largura;
  // Radius = 10;
  // largura = 3;
  // DrawCircle("vazio");
  // Radius = lRadius;
  // largura = llargura;
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




function DoFill(lX,lY) // Prenchimento 8 Conected
{
  lNewX = lX;
  lNewY = lY;
  var lNextPoint;

  var MyStartStamp = ctx.getImageData(x, y, 1, 1); // Versão 1 (mantém sempre o mesmo ponto original)
  //var MyStartStamp = ctx.getImageData(lX, lY, 1, 1); // Versão 2 (o ponto é sempre o último "pintado")
  // AMBAS AS VERSÕES TEM O MESMO RESULTADO... 339 ITERACÇÕES.
  
  var lCorStartPoint = new Array(3);
  lCorStartPoint[0] = MyStartStamp.data[0];
  lCorStartPoint[1] = MyStartStamp.data[1];
  lCorStartPoint[2] = MyStartStamp.data[2];
  lCorStartPoint[3] = MyStartStamp.data[3];
  var lCorPoint = new Array(3);
   
  // var lSeed = Math.floor((Math.random()*10))
  // var lLoop = Date.now() + lSeed; // Tempo RANDÔMICO
  // while (lLoop < Date.now()) 
  // {
  //   //do nothing
  // }


  Iteration++
  //console.log(Iteration);


  // Primeira variação
  lNewX = lX;
  lNewY = lY-1;

  // PREENCHE UM PONTO E CHAMA A ROTINA NOVAMENTE
  lNextPoint = ctx.getImageData(lNewX, lNewY, 1, 1);
  lCorPoint[0] = lNextPoint.data[0];
  lCorPoint[1] = lNextPoint.data[1];
  lCorPoint[2] = lNextPoint.data[2];
  lCorPoint[3] = lNextPoint.data[3];
  if  (!((lCorPoint[0] == lCorStartPoint[0]) && (lCorPoint[1] == lCorStartPoint[1]) && (lCorPoint[2] == lCorStartPoint[2]) && (lCorPoint[3] == lCorStartPoint[3])))
     {
      ctx.putImageData(MyStartStamp, lNewX, lNewY);
      lNewX = lX +1;
      lNewY = lY;
      DoFill(lNewX,lNewY);
      lNewX = lX -1;
      lNewY = lY;
      DoFill(lNewX,lNewY);
      lNewX = lX;
      lNewY = lY+1;
      DoFill(lNewX,lNewY);
      lNewX = lX -1;
      lNewY = lY -1;
      DoFill(lNewX,lNewY);
      lNewX = lX +1;
      lNewY = lY +1;
      DoFill(lNewX,lNewY);   
      lNewX = lX +1;
      lNewY = lY -1;
      DoFill(lNewX,lNewY);  
      lNewX = lX -1;
      lNewY = lY +1;
      DoFill(lNewX,lNewY);  
    }
    // Mostra na Console os numeros de RGBA da rotina
    //for (w = 0 ; w < 4 ; w++)  {console.log( lCorPoint[w] + "  -  " + w + "  -  " + lCorStartPoint[w] )}
// FIM DA FUNÇÃO   
}




//
// PREENCHE A IMAGEM ATUAL COM A COR SELECIONADA
//
function FillImage()
{

//
// ESTA ROTINA APRESENTA UM BUG QUE SÓ PREENCHE CORRETAMENTE FORMAS COM TRAÇO MAIOR QUE 2 PIXELS
//
// A QUANTIDADE DE ITERAÇÕES EXIGIDAS ULTRAPASSA O LIMITE DO JAVASCRIPT
//


  // SEPARANDO A VARIÁVEL COR EM RGB
  var lRed = parseInt(cor.substring(1,3), 16);
  var lGreen = parseInt(cor.substring(3,5), 16);
  var lBlue = parseInt(cor.substring(5,7), 16);
  var lAlpha = 255;
  //console.log("lRed:" + lRed + "  lGreen:" + lGreen + "  lBlue:" + lBlue + "  lAlpha:" + lAlpha);
    
  var MyStartStamp = ctx.getImageData(x, y, 1, 1);
  
  MyStartStamp.data[0]=lRed;
  MyStartStamp.data[1]=lGreen;
  MyStartStamp.data[2]=lBlue;
  MyStartStamp.data[3]=lAlpha;

  // SETOU O PRIMEIRO PONTO COM A COR DESEJADA
  ctx.putImageData(MyStartStamp, x, y);

  // CHAMA A ROTINA RECURSIVA PRA PINTAR TODO RESTO
  DoFill(x,y);

}




//
// COLE AQUI A ROTINA QUE VC QUER TESTAR
//
function RodaRotina()
{
  //mensagem("Não há rotina para executar")


Iteration = 0;
FillImage();
console.log("Final = Iteration: " + Iteration)


}
