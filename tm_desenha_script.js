/*
====================================
== TRAÇO MÁGICO EM JS             ==
== (c) Paulo Mello - Teresópolis  ==
== Data 23/10/2018                ==
== CÓDIGO DESENHA                 ==
== FUNÇÕES DE DESENHO/FOTO/TEXTO  ==
====================================
*/


//
// FAZ O TRAÇO
//
function ponto() 
{
  ctx.beginPath();
  ctx.fillStyle = cor;
  ctx.fillRect(x,y,largura,largura); 
  ctx.fill();
  ctx.closePath();
  ctx.fillStyle = cor;

  if (pGravar=="S")
  {
    addpasso("Ponto",0); 
  }
  // CALCULA LARGURA E ALTURA DO RETÂNGULO
  retL = Math.abs(x - Xant)+1;
  retA = Math.abs(y - Yant)+1;
  cursor();
}




//
// DESENHA CÍRCULOS COLORIDOS CONCÊNTRICOS
//
function concentrico(tipo)
{
  var lCores;
  var passo = largura*3;
  ctx.lineWidth=largura
  for (var f = 1; f < raio; f=f+passo)
   { 
    ctx.beginPath()
    if (tipo=="M") {lCores=cor;} 
    else {lCores = '#'+ (Math.floor(Math.random()*0xFFFFFF)).toString(16);}
    // Plota os Círculos Concêntricos
    ctx.strokeStyle = lCores;
    ctx.arc(x, y, f, 0, Math.PI*2, true);
    ctx.stroke();
   }

   if (pGravar=="S")
   {
     addpasso("Concentrico",tipo); 
   }
}


//
// TRAÇA UMA RETA USANDO OS DOIS ULTIMOS CLIQUES DO MOUSE
//
function reta()
{
  if ((Xant==x) && (Yant==y)) {mensagem("Marque um segundo ponto com o mouse");}
  else {
    ctx.beginPath()
    ctx.lineWidth=largura;
    ctx.strokeStyle = cor;
    ctx.moveTo(Xant+1,Yant+1); 
    ctx.lineTo(x,y)
    ctx.stroke();
    ctx.closePath();

    
  if (pGravar=="S")
  {
    addpasso("Reta",0); 
  }
  }

}


//
// FAZ UM RETANGULO USANDO OS DOIS ULTIMOS CLIQUES DO MOUSE
//
function retangulo(tipo)
{
  var newX = x;
  var newY = y;
  var lcor1;
  var lcor2;
  var lcor3; 

  if ((Xant==x) && (Yant==y)) {mensagem("Marque um segundo ponto com o mouse");} 
  else {
     // FAZ O RETÂNGULO INICIAR NO PONTO CORRETO
     if (newX > Xant)  {newX = Xant;}  
     if (newY > Yant)  {newY = Yant}

     ctx.beginPath();
     ctx.lineWidth=largura;
     if (tipo==1) 
     {
      ctx.fillStyle = cor;
      if (transp!==1)
      {
        lcor1 = parseInt(cor.substring(1,3), 16);
        lcor2 = parseInt(cor.substring(3,5), 16);
        lcor3 = parseInt(cor.substring(5,7), 16);
        ctx.fillStyle ='rgba('+ lcor1 +  ' , ' + lcor2+  ' , ' + lcor3+  ' , ' + transp + ' )';
      }
      ctx.fillRect(newX,newY,retL,retA); 
      ctx.fill();
      // Faz o reset o RGBA para 1
      ctx.fillStyle ='rgba('+ lcor1 +  ' , ' + lcor2+  ' , ' + lcor3+  ' , ' + 1 + ' )';


     } else if (tipo==0) 
     {
      ctx.strokeStyle = cor;
      ctx.strokeRect(newX,newY,retL,retA);
      ctx.stroke(); 
     }
    }
    ctx.closePath();

    if (pGravar=="S")
    {
      addpasso("Retangulo",tipo); 
    }
  }
  


//
// FAZ UM CÍRCULO NA POSIÇÃO ATUAL
//
function circulo(tipo)
{
  var lcor1;
  var lcor2;
  var lcor3; 
  ctx.beginPath();
  ctx.lineWidth=largura;
  if (tipo==1) 
  {
    ctx.fillStyle = cor;
    if (transp!==1)
    {
      lcor1 = parseInt(cor.substring(1,3), 16);
      lcor2 = parseInt(cor.substring(3,5), 16);
      lcor3 = parseInt(cor.substring(5,7), 16);
      ctx.fillStyle ='rgba('+ lcor1 +  ' , ' + lcor2+  ' , ' + lcor3+  ' , ' + transp + ' )';
    }
    ctx.arc(x, y, raio, 0, Math.PI*2, true);
    ctx.fill();
    // Faz o reset o RGBA para 1
    ctx.fillStyle ='rgba('+ lcor1 +  ' , ' + lcor2+  ' , ' + lcor3+  ' , ' + 1 + ' )';
  } else if (tipo==0) 
  {
   ctx.strokeStyle = cor;
   ctx.arc(x, y, raio, 0, Math.PI*2, true);
   ctx.stroke(); 
  }
  
  if (pGravar=="S")
  {
    addpasso("Circulo",tipo); 
  }
}


//
// ==========================================================================
//                 FUNÇÕES DE CARREGAMENTO DE FOTO
// ==========================================================================
//

// Imagem para teste
//var usuarioIMG = new Image();
//usuarioIMG.src = "usuario.jpg";

//
// COLA A IMAGEM NO CANVAS
//
function colaimg(tipo)
{
  var newX = x;
  var newY = y;
  // Calcula o vértice superior esquerdo do "retangulo" formado pelos 2 últimos pontos
  // FAZ A COLAGEM ACONTECER NO VÉRTICE ESQUERDO SUPERIOR DO "RETANGULO" DEFINIDO
  if (newX > Xant)  {newX = Xant;}  
  if (newY > Yant)  {newY = Yant}

  if (temIMG == 0)
  {mensagem("Não há foto para colar ou arquivo inválido.");
  return false;}   

  
  if (tipo == 0)
    { 
      if ((Xant==x) && (Yant==y)) 
      {mensagem("Marque dois pontos formando um retângulo.");
      return false;} 
      ctx.drawImage(usuarioIMG , newX , newY , retL , retA);
    }
  else
  { 
    ctxFu.globalAlpha = transp;
    ctxFu.drawImage(usuarioIMG , 0 , 0 , WIDTH , HEIGHT);
    ctxFu.globalAlpha = 1;

  }

  if (pGravar=="S")
  {
    addpasso("Imagem",tipo); 
  }
}


//
// FUNCÇÕES DE TEXTO
//

// PERMITE QUE O USUÁRIO ESCREVA O TEXTO
function escrevetexto()
{
  var vTexto = texto;
  texto = prompt("Digite o texto até 150 caracteres", texto);
  if (texto == null) {
    texto = vTexto;
  } else if (texto.length > 150)
  {
  texto = texto.substring(0,150);
  mensagem("Texto cortado para 150 caracteres!")
  }  else if (texto.length == 0)
  {   
    texto = vTexto;
  }
}

//
// COLA O TEXTO NO DESENHO
//
function colatexto()
{
  ctx.moveTo(x,y);
  ctx.font=tamtexto+"px Verdana";
  ctx.fillStyle = cor;
  ctx.fillText(texto,x,y);

  // ADICIONA O PASSO SE GRAVAR ESTIVER LIGADO
  if (pGravar=="S")
  {
    addpasso("Texto",""); 
  }
}



//
// CRIA UM FUNDO PSICODÉLICO
//
function tilt(tipo)
{
  var passo = largura;
  var lx;
  var ly;
  var lcor1, lcor2, lcor3;

if (tipo == 0)
{
  var llargura;
  var lraio;
  var ltrans;
  for (f = 60; f > 10; f=f-passo)
  { 
     ctxFu.beginPath()
     lcor1 = Math.floor(Math.random()*255);
     lcor2 = Math.floor(Math.random()*255);
     lcor3 = Math.floor(Math.random()*255);
     lx    = Math.floor(Math.random()*(WIDTH));
     ly    = Math.floor(Math.random()*(HEIGHT));
     lraio = Math.floor(Math.random()*(HEIGHT/2));
     ltrans = transp;
     llargura = Math.floor(Math.random()*dx);

     ctxFu.lineWidth=llargura;
     ctxFu.fillStyle ='rgba('+ lcor1 +  ' , ' + lcor2+  ' , ' + lcor3+  ' , ' + ltrans + ' )';
     ctxFu.arc(lx, ly, lraio, 0, Math.PI*2, true);

     ctxFu.fill();
     ctxFu.closePath();
  }
  ctxFu.strokeStyle = 0;
  ctxFu.fillStyle = 0;
}
else if (tipo==1)
{

  var llarg;
  var lalt;

  for (f = 1; f < 50; f=f+passo)
  { 
   lx    = Math.floor(Math.random()*(WIDTH/1.3));
   ly    = Math.floor(Math.random()*(HEIGHT/1.5));
   llarg = Math.floor(Math.random()*(WIDTH/20)*10);
   lalt  = Math.floor(Math.random()*(HEIGHT/20)*10);


   ctxFu.beginPath();
   ctxFu.lineWidth=largura;
   ctxFu.fillStyle = cor;
   ctxFu.fill();
   lcor1 = Math.floor(Math.random()*255);
   lcor2 = Math.floor(Math.random()*255);
   lcor3 = Math.floor(Math.random()*255);
   ctxFu.fillStyle ='rgba('+ lcor1 +  ' , ' + lcor2+  ' , ' + lcor3+  ' , ' + transp + ' )';
   ctxFu.fillRect(lx, ly, llarg, lalt);

   
 }
 ctxFu.fillStyle ='rgba('+ lcor1 +  ' , ' + lcor2+  ' , ' + lcor3+  ' , ' + 1 + ' )';
 ctxFu.closePath();

}

    // ADICIONA O PASSO SE GRAVAR ESTIVER LIGADO
    if (pGravar=="S")
    {
      addpasso("Tilt",tipo); 
    }
}


//
// FUNÇÃO FUNDO - MUDA O FUNDO DO DESENHO
//
function fundo()
{
    ctxFu.beginPath();
    ctxFu.fillStyle = cor;
    ctxFu.fillRect(0,0,WIDTH,HEIGHT); 
    ctxFu.fill();
    // ADICIONA O PASSO SE GRAVAR ESTIVER LIGADO
    if (pGravar=="S")
    {
      addpasso("Fundo",""); 
    }    
}




//
// MOSTRA AS COORDENADAS DE DESENHO (DEBUG)
//
function coordenadas() 
{
  alert("Coord: x= " + x + " y= " + y+ " Xant= " + Xant + " Yant= " + Yant);
}