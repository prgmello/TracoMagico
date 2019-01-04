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
function testa(mouseState)
{
  ctxFr.moveTo(20,20);
  ctxFr.font = "12 px Verdana";
  ctxFr.fillStyle = "Red";
  ctxFr.fillText("ENTROU NA ROTINA TESTE",20,20);

  ctxFr.fillStyle = "Black";
  ctxFr.fillText("ENTROU NA  ROTINA TESTE",750,20);

  RodaRotina(mouseState);

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
function RodaRotina(mouseState)
{
  mensagem("Não há rotina para executar")


}


