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
function RecordProject()
{
  if (StGravar) {StGravar = false;} else {StGravar = true;}
  ShowSaveStatus();
}


//
// FUNÇÃO MOSTRA O STATUS DA GRAVAÇÃO
//
function ShowSaveStatus() 
{
  if (StGravar) 
  {
    // Botão
    document.getElementById("btgrava").innerHTML  = "❚❚";
    document.getElementById('btgrava').setAttribute('title', 'Pausar gravação');
    // Título
    document.getElementById('REC').style.color = "#FF0000";
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
function RestoreProject()
{
  if (Passo > 0)
  {
    if (confirm("Confirma Redesenhar?"))
    {
      CallRedrawProject();
    }
  } else {mensagem("Não há Passos gravados!!!")}
}

//
//  SETA A VARIÁVEL DE GRAVAÇÃO COMO FALSE PARA REDESENHAR SEM DUPLICAR O PROJETO
//
function CallRedrawProject()
{
  var lGravar = StGravar; // Guarda a Situação de Gravação Atual
  StGravar = false;
  RedrawProject();
  StGravar = lGravar; // Restaura a Situação de Gravação antes da rotina executar
  ShowSaveStatus();
}




//
//  REFAZ O DESENHO GRAVADO
//
function RedrawProject()
{
  // OBRIGATORIAMENTE REDESENHA COM StGravar DESLIGADO!!!
  
  var lPassoFim = Passo;
  var lPasso;
  var lBehavior;
  var lEmoji;
  
  for (lPasso = 0; lPasso < lPassoFim; lPasso++) 
  { 
    lBehavior = pBehavior[lPasso];
    x         = pX[lPasso];
    y         = pY[lPasso];
    Xant      = pXant[lPasso];
    Yant      = pYant[lPasso];
    Radius    = pRadius[lPasso];
    RadiusY   = pRadiusY[lPasso];
    Rotate    = pRotate[lPasso];
    color1    = pColor1[lPasso];
    color2    = pColor2[lPasso];
    Sides     = pSides[lPasso];
    largura   = pThickness[lPasso];
    dx        = pSpeed[lPasso];
    dy        = pSpeed[lPasso];
    transp    = pTransparency[lPasso];
    FontSize  = pFontSize[lPasso];
    lEmoji    = pEmoji[lPasso]

    CalcColorParts();

    if (pForma[lPasso]=="Texto") {texto  = pText[lPasso];}
    
    gravouIMG  = pGravouIMG[lPasso];
        
   //console.log("lPasso=" + lPasso + " x= " + x + " y= " + y + " Xant= " + Xant + " Yant= " + Yant + " Raio= " + Radius + " cor= " + cor + " largura= " + largura)
   //console.log("Passo: " + lPasso + " - "  +pForma[lPasso] + " - "  + lBehavior);

   //if (lPasso == 0) {DrawPoint();} // Necessário para calcular retL e retA
   

    switch (pForma[lPasso])
    {
      // SONHEI QUE NÃO ERA PRECISO GRAVAR O CURSOR... 
      // DEPOIS DE UM PEQUENO AJUSTE NÃO ERA PRECISO MESMO!!!
      // case "Cursor":
      //      ShowCursor();
      //      break;
      case "Ponto":         
           DrawPoint();
           break;
      case "Linha":
           DrawLine(lBehavior);     
           break;
      case "Retangulo":
           DrawRectangle(lBehavior);  
           break;
      case "Poligono":
           DrawPoligon(lBehavior);  
           break;
      case "Estrela":
           DrawStar(lBehavior);
           break;
      case "Circulo":
           DrawCircle(lBehavior);
           break;
      case "Concentrico":
           DrawConcentricCircles(lBehavior);
           break;
      case "Forma-Complexa":
           DrawComplexForm(lBehavior);
           break;
     case "Texto":   
           DrawText(); 
           break;
      case "Emoji":  
           DrawEmoji(lEmoji); 
           break;
      case "Fundo": 
           ChangeBgColor();
           break;
      case "Imagem": 
            if (!gravouIMG)
            {
             usuarioIMG = new Image();
             usuarioIMG = pUsuarioIMG[lPasso];
            }
            DrawReadImage(lBehavior);
            break;
      case "Fundo-Aleatorio":
           MakeBgTilt(lBehavior);
           break;
 
    }
  }
   // DEVOLVE OS VALORES ORIGINAIS PARA AS VARIÁVEIS GLOBAIS
  UpdateTools();
}
 


    // var o = new Object;
    // o.forma = pForma[lPasso];
    // o.x = x;
    // o.y = y;
    // o.tipo = lBehavior;
    // o.FontSize = FontSize;
    // console.log(o);



//
//  APAGA O ÚLTIMO PASSO GRAVADO
//
function CutProjetStep()
{
  if (Passo > 0)
  {
    var lPasso = Passo-1;
    if (confirm("Confirma Apagar Último Passo Gravado? ( " + pForma[lPasso] + " " + pBehavior[lPasso] + " )")) 
    {
       // SE FOR UMA IMAGEM
       if ( (pForma[lPasso]== "Imagem") && (pBehavior[lPasso] == "N") ) // VERIFICAR ISSO AQUI QUE DEVE SER O BUG DE APAGAR PASSO IMAGEM!!!
       {
         gravouIMG = false
       }
       pForma[lPasso]     = "";
       pBehavior[lPasso]  = null;
       pX[lPasso]         = null;
       pY[lPasso]         = null;
       pXant[lPasso]      = null;
       pYant[lPasso]      = null;
       pColor1[lPasso]    = null;
       pColor2[lPasso]    = null;
       pSides[lPasso]     = null;
       pThickness[lPasso] = null;
       pTransparency[lPasso]  = null;
       pSpeed[lPasso]     = null;
       pRadius[lPasso]    = null;
       pRadiusY[lPasso]   = null;
       pRotate[lPasso]    = null;
       pUsuarioIMG[Passo] = null;
       pText[lPasso]      = null;
       pFontSize[lPasso]  = null;
       pGravouIMG[Passo]  = null;
       
       ClearScreen();
       Passo-- // Subtrai um do Passo de gravação
       CallRedrawProject();
    }
  } else {mensagem("Não há Passos de desenho gravados!!!")}
  UpdateTools();
}



//
//  CONFIRMAÇÃO O PARA CANCELAR O PROJETO GRAVADO 
//
function CancelProjectRecorded()
{
  var lPasso = 0
  if (Passo > 0)
    {
      if (confirm("Confirma Apagar Toda a Gravação? (" + Passo + " passos) ?")) 
    {
      for (lPasso = 0; lPasso <= Passo; lPasso++) 
      {
        pForma[lPasso]      = "";
        pBehavior[lPasso]   = null;
        pX[lPasso]          = null;
        pY[lPasso]          = null;
        pXant[lPasso]       = null;
        pYant[lPasso]       = null;
        pColor1[lPasso]     = null;
        pColor2[lPasso]     = null;
        pSides[Passo]       = null;
        pThickness[lPasso]  = null;
        pTransparency[lPasso] = null;
        pSpeed[lPasso]      = null;
        pRadius[lPasso]     = null;
        pRadiusY[Passo]     = null;
        pRotate[Passo]      = null;
        pFontSize[lPasso]   = null;
        pText[lPasso]       = null;
        pUsuarioIMG[lPasso] = null;
        pGravouIMG[lPasso]  = null;
      }
      Passo     = 0;     // Zera o Passo de gravação
      gravouIMG = false; // Define a imagem como não Gravada
      UpdateTools();
    }
  } else {mensagem("Não há desenho gravado!!!")}
}





//
// SALVA O PASSO USANDO A VARIÁVEL GLOBAL "PASSO" COMO ÍNDICE
//
function SaveStep(forma,tipo,string)
{
 if (Passo < PassoLimite)  
 {  
   pForma[Passo]      = forma;
   pBehavior[Passo]   = tipo;
   pX[Passo]          = x;
   pY[Passo]          = y;
   pXant[Passo]       = Xant;
   pYant[Passo]       = Yant;
   pRadius[Passo]     = Radius;
   pRadiusY[Passo]    = RadiusY;
   pRotate[Passo]     = Rotate;
   pColor1[Passo]     = color1;
   pColor2[Passo]     = color2;
   pSides[Passo]      = Sides;
   pThickness[Passo]  = largura;
   pSpeed[Passo]      = dx;
   pTransparency[Passo] = transp;
   pFontSize[Passo]   = FontSize;

   if (forma=="Emoji") {pEmoji[Passo] = string;} else {pEmoji[Passo]="";} // SE FORMA = EMOJI
   if (forma=="Texto") {pText[Passo]  = string;} else {pText[Passo]="";}  // SE FORMA = TEXTO

   pGravouIMG[Passo]  = gravouIMG;
   // SE FORMA = IMAGEM
   if ((forma=="Imagem") && (!gravouIMG))
   { pUsuarioIMG[Passo] = usuarioIMG;
     gravouIMG = true; 
   }
   Passo++ ;
  }
  else
  {
    mensagem("Você chegou ao limite de passos gravados: " + PassoLimite + " passos" );
    StGravar=false;
  }
  ShowSaveStatus();
 }







