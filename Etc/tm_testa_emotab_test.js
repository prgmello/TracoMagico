/*
====================================
== TRAÇO MÁGICO EM JS             ==
== (c) Paulo Mello - Teresópolis  ==
== Data 23/10/2018                ==
== CÓDIGO TESTA                   ==
====================================
*/


function escrtxt(ttexto)
{
  alert(ttexto);
}




//
// CRIA OS BOTÕES PARA A FERRAMENTA EMOTICONS
//
var str1 = "►✢✣✤✥✦✧✩✪✫✬✭✮✯✰✱✲✳✴✵✶✷✸✹✺✻✼✽✾✿❀❁❂❃❄❅❆❇❈❉❊❋◯☹☺☘☙♩♪♫♬♭♯★☆✝✞✟✠✡☢☣❥❤♡♥♠♦♣☃۞☼☽☾☁✊✋✌✍⌚☔☕◄";
//var str1 = "*1234567890abcdefghijklmnopqrstuvwxyz1234567890abcdefghijklmnopqrstuvwxyz1234567890abcdefghijklmnopqrstuvwxyz1234567890abcdefghijklmnopqrstuvwxyz@";

var QtdEMC = str1.length;
//alert(QtdEMC);
var pEMC = new Array(QtdEMC);
var element = document.getElementById("EmoTab"); // SELECIONA A DIV

       
for (f = 0; f < QtdEMC; f++)
{
  pEMC[f] = str1.substring(f,f+1);
  //console.log(pEMC[f]);
  element.innerHTML += '<a href="#" class="EMC" onclick=\'escrtxt("' + pEMC[f] + '") \' >' + pEMC[f] + '</a>';

}



