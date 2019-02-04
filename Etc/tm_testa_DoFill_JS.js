function DoFill() // Prenchimento linear
{
  // SEPARANDO A VARIÁVEL COR EM RGB
  var lRed = parseInt(cor.substring(1,3), 16);
  var lGreen = parseInt(cor.substring(3,5), 16);
  var lBlue = parseInt(cor.substring(5,7), 16);
  var lAlpha = 255;
  //console.log("lRed:" + lRed + "  lGreen:" + lGreen + "  lBlue:" + lBlue + "  lAlpha:" + lAlpha);
  
  var MyStartStamp = ctx.getImageData(x, y, 1, 1);
  var MyStamp      = ctx.getImageData(x, y, 1, 1);
  MyStamp.data[0]=lRed;
  MyStamp.data[1]=lGreen;
  MyStamp.data[2]=lBlue;
  MyStamp.data[3]=lAlpha;



  // FILL 
  var lNextPoint = ctx.getImageData(x, y, 1, 1);
  var StFillX;
  var StFillY;
  var lNewX;
  var lNewY;

  //
  // COMEÇA O PREENCHIMENTO +X/+Y
  //
  console.log("Preenchimento 1")
  StFillX = true;
  StFillY = true;
  lNewX = x;
  lNewY = y;
  while (StFillX)
  {
    lNewY = y;
    while (StFillY)
    {
      ctx.putImageData(MyStamp, lNewX, lNewY);

      lNewY++ ;
      
      lNextPoint = ctx.getImageData(lNewX, lNewY, 1, 1);
      if ((lNextPoint.data[0] == MyStartStamp.data[0]) && 
          (lNextPoint.data[1] == MyStartStamp.data[1]) &&
          (lNextPoint.data[2] == MyStartStamp.data[2]) && 
          (lNextPoint.data[3] == MyStartStamp.data[3]))
      {StFillY = true;} else {StFillY = false;}
      // SEGURANÇA ANTI-LOOPING
      if (lNewX > WIDTH) {break;}
      if (lNewX < 0) {break;}
      if (lNewY > HEIGHT) {break;}
      if (lNewY < 0) {break;}
     
    }
    
    lNewY = y;
    StFillY = true;
    
    lNewX++ ;
    
    lNextPoint = ctx.getImageData(lNewX, lNewY, 1, 1);
    if ((lNextPoint.data[0] == MyStartStamp.data[0]) && 
        (lNextPoint.data[1] == MyStartStamp.data[1]) &&
        (lNextPoint.data[2] == MyStartStamp.data[2]) && 
        (lNextPoint.data[3] == MyStartStamp.data[3]))
    {StFillX = true;} else {StFillX = false;}
    // SEGURANÇA ANTI-LOOPING
    if (lNewX > WIDTH) {break;}
    if (lNewX < 0) {break;}
    if (lNewY > HEIGHT) {break;}
    if (lNewY < 0) {break;}

    // console.log(lNewX + " -  lNewY=" + lNewY);
  }

}