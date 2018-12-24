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
  MostraStatusGrava();
}


//
// FUNÇÃO MOSTRA O STATUS DA GRAVAÇÃO (S/N)
//
function MostraStatusGrava() 
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
      MostraStatusGrava();
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
    if (pForma[lPasso]=="Texto")
    {
      texto      = pTexto[lPasso];
      tamtexto   = pTamtexto[lPasso];
    }
    gravouIMG  = pGravouIMG[lPasso];
     
    //alert("lPasso=" + lPasso + " x= " + x + " y= " + y + " Xant= " + Xant + " Yant= " + Yant + " raio= " + raio + " cor= " + cor + " largura= " + largura)


    switch (pForma[lPasso])
    {
      case "Cursor":         // REFAZ O POSICIONAMENTO DO CURSOR
           cursor();
           break;
      case "Ponto":         // REFAZ PONTO
           ponto();
           break;
      case "Reta":          // REFAZ RETA
           reta();
           break;
      case "Retangulo":     // REFAZ RETANGULO
           retangulo(lTipo);
           break;
      case "Circulo":       // REFAZ CIRCULO
           circulo(lTipo);
           break;
      case "Concentrico":   // REFAZ CONCENTRICO
           concentrico(lTipo);
           break;
      case "Texto":         // REFAZ TEXTO
           colatexto();
           break;
      case "Fundo":         // REFAZ O FUNDO
           fundo();
           break;
      case "Imagem":        // REFAZ COLA IMAGEM
            if (gravouIMG == "N") 
            {
             // DELETAR A PROXIMA LINHA CASO NÃO FUNCIONE
             usuarioIMG = new Image();
             usuarioIMG = pUsuarioIMG[lPasso];
            }
            colaimg(lTipo);
            break;
      case "Tilt":   // REFAZ Apagar
           tilt(lTipo);
           break;
 
    }
  }
   // DEVOLVE OS VALORES ORIGINAIS PARA AS VARIÁVEIS GLOBAIS
  mostracor();
  MostraStatusGrava();
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
       pTamtexto[lPasso]   = null;
       pGravouIMG[Passo]   = null;
       limpatela(0);
       Passo -- // Subtrai um do Passo de gravação
       redesenha("S");
    }
  } else {mensagem("Não há Passos de desenho gravados!!!")}
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
        pTamtexto[lPasso]    = null;
        pUsuarioIMG[lPasso]  = null;
        pGravouIMG[lPasso]   = null;
      }
      Passo     = 0;   // Zera o Passo de gravação
      gravouIMG = "N"; // Define a imagem como não Gravada
      MostraStatusGrava();
      iniciar1();
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
     pTexto[Passo]    = texto;
     pTamtexto[Passo] = tamtexto;
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
  MostraStatusGrava();
 }







