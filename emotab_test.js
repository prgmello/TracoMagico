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
//var str1 = "S✊✋✌✍⌚☔☕☃★☆☹☺☻☼☽☾✝✞✟✠✡✢✣✤✥✦✧✩✪✫✬✭✮✯✰✱✲✳✴✵✶✷✸✹✺✻✼✽✾✿❀❁❂❃❄❅❆❇❈❉❊❋۞☘☙E";
var str1 = "*1234567890abcdefghijklmnopqrstuvwxyz1234567890abcdefghijklmnopqrstuvwxyz1234567890abcdefghijklmnopqrstuvwxyz1234567890abcdefghijklmnopqrstuvwxyz@";

var QtdEMC = str1.length;
//alert(QtdEMC);
var pEMC = new Array(QtdEMC);
var element = document.getElementById("EmoTab"); // SELECIONA A DIV

for (f = 0; f < QtdEMC; f=f+1)
{
  pEMC[f] = str1.substring(f,f+1);
  //console.log(pEMC[f]);
  element.innerHTML += "<a href='#' onclick='escrevetexto("+ pEMC[f] + ");' >" + pEMC[f] + "</a>";

}

