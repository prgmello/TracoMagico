/*
====================================
== TRAÇO MÁGICO EM JS             ==
== (c) Paulo Mello - Teresópolis  ==
== Data 23/11/2018                ==
== CÓDIGO DE GRAVAÇÃO DE PASSOS   ==
====================================
*/


//
// FUNÇÃO LIGA A GRAVAÇÃO (S/N) [TOGLE]
//
function grava() 
{
  if (pGravar == "S") {pGravar = "N";} 
  else if (pGravar == "N") {pGravar = "S";}
  ShowSaveStatus();
}


//
// FUNÇÃO MOSTRA O STATUS DA GRAVAÇÃO
//
function ShowSaveStatus() 
{
  if (pGravar == "S") 
  {
    // Botão
    document.getElementById("btgrava").innerHTML  = "❚❚";
    document.getElementById('btgrava').setAttribute('title', 'Pausar gravação');
    // Título
    document.getElementById('REC').style.color = "red";
  }
  else                
  {
    // Botão
    document.getElementById("btgrava").innerHTML  = "●";
    document.getElementById('btgrava').setAttribute('title', 'Ligar gravação');
    // Título
    document.getElementById('REC').style.color = "#B1B1B1";
  }
  // Mostrando o PASSO da Gravação
  var element = document.getElementById("stgrava");
  element.innerHTML = "Passo [" + Passo + "]";
}




//
//  CONFIRMAÇÃO O PARA REFAZER O DESENHO
//
function toca()
{
  if (Passo > 0)
  {
    
    if (confirm("Confirma Redesenhar?"))
    {
      pGravar = "N";
      ShowSaveStatus();
      redesenha("N");
      mensagem("ATENÇÃO: A Gravação desligada!")
    }
  } else {mensagem("Não há desenho gravado!!!")}
}


//
//  REFAZ O DESENHO GRAVADO
//
function redesenha(stGravar)
{
  var lPassoFim = Passo;
  var lPasso;
  var lTipo;
  pGravar = stGravar;
  
  for (lPasso = 0; lPasso < lPassoFim; lPasso++) 
  { 
    lTipo      = pTipo[lPasso];
    x          = pX[lPasso];
    y          = pY[lPasso];
    Xant       = pXant[lPasso];
    Yant       = pYant[lPasso];
    raio       = pRaio[lPasso];
    cor        = pCor[lPasso];
    largura    = pLargura[lPasso];
    dx         = pVelocidade[lPasso];
    dy         = pVelocidade[lPasso];
    transp     = pTransp[lPasso];

    // SE TEXTO
    if (pForma[lPasso]=="Texto") 
    {
      texto      = pTexto[lPasso];
      FontSize   = pFontSize[lPasso];
    }

    // SE EMOTICON
    if (pForma[lPasso]=="Emoticon")
    {
      gEmogi   = pEmoji[lPasso];
      FontSize = pFontSize[lPasso];
    }
    gravouIMG  = pGravouIMG[lPasso];
     


    // var o = new Object;
    // o.forma = pForma[lPasso];
    // o.x = x;
    // o.y = y;
    // o.tipo = lTipo;
    // o.FontSize = FontSize;
    // console.log(o);
 


    //console.log("lPasso=" + lPasso + " x= " + x + " y= " + y + " Xant= " + Xant + " Yant= " + Yant + " raio= " + raio + " cor= " + cor + " largura= " + largura)


    switch (pForma[lPasso])
    {
      case "Cursor":         // REFAZ O POSICIONAMENTO DO CURSOR
           ShowCursor();
           break;
      case "Ponto":         // REFAZ PONTO
           ponto();       // Sugestão: DrawPoint
           break;
      case "Reta":          // REFAZ RETA
           reta();     // Sugestão: DrawLine
           break;
      case "Retangulo":     // REFAZ RETANGULO
           retangulo(lTipo);  // Sugestão: DrawRectangle
           break;
      case "Circulo":       // REFAZ CIRCULO
           DrawCircle(lTipo);
           break;
      case "Concentrico":   // REFAZ CONCENTRICO
           concentrico(lTipo); // Sugestão: DrawConcentricCircles
           break;
      case "Texto":         // REFAZ TEXTO
           colatexto(); // Sugestão: DrawText
           break;
      case "Emoticon":      // REFAZ EMOTICON
           ColaEmoji(gEmoji); // Sugestão: DrawEmoji
           break;
      case "Fundo":         // REFAZ O FUNDO
           fundo();      // Sugestão: SetBackgoundColor
           break;
      case "Imagem":        // REFAZ COLA IMAGEM
            if (gravouIMG == "N")  
            {
             usuarioIMG = new Image();
             usuarioIMG = pUsuarioIMG[lPasso];
            }
            colaimg(lTipo); // Sugestão: DrawImage
            break;
      case "Tilt":   // REFAZ Tilt
           tilt(lTipo);    // Sugestão: BackgroudTilt
           break;
 
    }
  }
   // DEVOLVE OS VALORES ORIGINAIS PARA AS VARIÁVEIS GLOBAIS
  UpdateTools();
}
 


//
//  APAGA O ÚLTIMO PASSO GRAVADO
//
function corta()
{
  if (Passo > 1)
  {
    var lPasso = Passo-1;
    if (confirm("Confirma Apagar Último Passo Gravado? (" + pForma[lPasso] +")")) 
    {
       // SE FOR UMA IMAGEM
       if ( (pForma[lPasso]== "Imagem") && (pTipo[lPasso] == "N") )
       {
         gravouIMG = "N"
       }
       pForma[lPasso]      = "";
       pTipo[lPasso]       = null;
       pX[lPasso]          = null;
       pY[lPasso]          = null;
       pXant[lPasso]       = null;
       pYant[lPasso]       = null;
       pRaio[lPasso]       = null;
       pCor[lPasso]        = null;
       pLargura[lPasso]    = null;
       pVelocidade[lPasso] = null;
       pTransp[lPasso]     = null;
       pUsuarioIMG[Passo]  = null;
       pTexto[lPasso]      = null;
       pFontSize[lPasso]   = null;
       pGravouIMG[Passo]   = null;
       limpatela(0);
       Passo -- // Subtrai um do Passo de gravação
       redesenha("S");
    }
  } else {mensagem("Não há Passos de desenho gravados!!!")}
  UpdateTools();
}



//
//  CONFIRMAÇÃO O PARA CANCELAR A GRAVAÇÃO
//
function cancela()
{
  var lPasso = 0
  if (Passo > 0)
    {
      if (confirm("Confirma Apagar Toda a Gravação? (" + Passo + " passos) ?")) 
    {
      for (lPasso = 0; lPasso <= Passo; lPasso++) 
      {
        pForma[lPasso]       = "";
        pTipo[lPasso]        = null;
        pX[lPasso]           = null;
        pY[lPasso]           = null;
        pXant[lPasso]        = null;
        pYant[lPasso]        = null;
        pRaio[lPasso]        = null;
        pCor[lPasso]         = null;
        pLargura[lPasso]     = null;
        pVelocidade[lPasso]  = null;
        pTransp[lPasso]      = null;
        pTexto[lPasso]       = null;
        pFontSize[lPasso]    = null;
        pUsuarioIMG[lPasso]  = null;
        pGravouIMG[lPasso]   = null;
      }
      Passo     = 0;   // Zera o Passo de gravação
      gravouIMG = "N"; // Define a imagem como não Gravada
      UpdateTools();
    }
  } else {mensagem("Não há desenho gravado!!!")}
}





//
// ADICIONA CADA PASSO À GRAVAÇÃO
//
function addpasso(forma,tipo)
{
 if (Passo < PassoLimite)  
 {  
   pForma[Passo]       = forma;
   pTipo[Passo]        = tipo;
   pX[Passo]           = x;
   pY[Passo]           = y;
   pXant[Passo]        = Xant;
   pYant[Passo]        = Yant;
   pRaio[Passo]        = raio;
   pCor[Passo]         = cor;
   pLargura[Passo]     = largura;
   pVelocidade[Passo]  = dx;
   pTransp[Passo]      = transp;


   // Grava o Texto se o tipo == "Texto"
   if (forma=="Texto") 
   {
     pTexto[Passo]    = tipo;
     pFontSize[Passo] = FontSize;
    }

       // Grava o Texto se o tipo == "Emoticon"
   if (forma=="Emoticon") 
    {
     pEmoji[Passo]    = gEmoji;
     pFontSize[Passo] = FontSize;
    }
    
   pGravouIMG[Passo]   = gravouIMG;
   if ((forma=="Imagem") && (gravouIMG=="N"))
   {
    pUsuarioIMG[Passo] = usuarioIMG;
    gravouIMG = "S";
   }
   Passo++ ;
  }
  else
  {
    mensagem("Você chegou ao limite de passos gravados: " + PassoLimite + " passos" );
    pGravar="N";
  }
  ShowSaveStatus();
 }







