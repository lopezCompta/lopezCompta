let capital = 1000;
document.getElementById("capitalAmount").innerHTML = 1000;

let actualWeek = 1;
let actualGoldValue = 75;
document.getElementById("actualGoldValue").innerHTML=actualGoldValue;
let scenario = "";
let alea = 0;
let gold = 0;

const nextWeekButton = document.getElementById("nextWeekButton");
nextWeekButton.addEventListener('click',nextWeek);
const buyGoldButton = document.getElementById("buyGoldButton");
buyGoldButton.addEventListener('click',buyGold);
const sellGoldButton = document.getElementById("sellGoldButton");
sellGoldButton.addEventListener('click',sellGold);
const buyInfosButton = document.getElementById("buyInfosButton");
buyInfosButton.addEventListener('click',buyInfos);

// TEST D'INTIALISATION
const firstWeek = 1; // Semaine de départ
let dataGraph =[];

const anneeFluctuation = {
  jan : "",
  fev : "",
  mar : "",
  avr : "",
  mai : "",
  jun : "",
  jui : "",
  aou : "",
  sep : "",
  oct : "",
  nov : "",
  dec : "",
};



//Three white soldiers  puis Doji
const tWSD = {
  x1 : 0, open1 : 1, high1 : 4, low1 : 0, close1 : 4,
  x2 : 0, open2 : 1, high2 : 4, low2 : 0, close2 : 4,
  x3 : 0, open3 : 1, high3 : 4, low3 : 0, close3 : 4,
  x4 : 0, open4 : 0, high4 : 2, low4 : 2, close4 : 0
};
//Bearish Three Lines Strike
const bTLS = {
  x1 : 0, open1 : 0, high1 : 2, low1 : 3, close1 : 2,
  x2 : 0, open2 : 0, high2 : 2, low2 : 3, close2 : 2,
  x3 : 0, open3 : 0, high3 : 2, low3 : 3, close3 : 2,
  x4 : 0, open4 : 0, high4 : 2, low4 : 8, close4 : 6
};
//Rising Three Methods
const rTM = {
  x1 : 0, open1 : 0, high1 : 0, low1 : 0, close1 : 7,
  x2 : 0, open2 : 0, high2 : 7, low2 : 0, close2 : 3,
  x3 : 0, open3 : 0, high3 : 0, low3 : 0, close3 : 3,
  x4 : 0, open4 : 0, high4 : 0, low4 : 8, close4 : 3
};
//Morning star puis Dragon Fly
const mSDF = {
  x1 : 0, open1 : 0, high1 : 2, low1 : 1, close1 : 8,
  x2 : 0, open2 : 0, high2 : 2, low2 : 3, close2 : 3,
  x3 : 0, open3 : 0, high3 : 2, low3 : 3, close3 : 3,
  x4 : 0, open4 : 0, high4 : 2, low4 : 8, close4 : 3
};
//Advanced Block puis Grave Stone
const aBGS = {
  x1 : 0, open1 : 0, high1 : 3, low1 : 1, close1 : 7,
  x2 : 0, open2 : 1, high2 : 2, low2 : 1, close2 : 2,
  x3 : 0, open3 : 0, high3 : 1, low3 : 1, close3 : 1,
  x4 : 0, open4 : 0, high4 : 0, low4 : 8, close4 : 0
};


        // CREATION DU GRAPHIQUE
    // Créer une instance de graphique
    let chart = anychart.candlestick();
    
    // Définir le titre
    chart.title("Cours du gramme d'or en €");
    // Configuration de l'axe Y
    chart.yAxis().title("Prix d'une action en €");chart.yScale().minimum(0);chart.yScale().maximum(175);

    let xScale = anychart.scales.ordinal();chart.xScale(xScale);chart.xAxis().labels().format('{%Value}'); // Affiche la valeur brute de xchart.xAxis().title("Semaine actuelle");

    chart.width('100%'); // Largeur en pourcentagechart.height('80%'); // Hauteur en pourcentage
    
    // Personnaliser l'apparence du graphique
    chart.background().fill('#1a1a1a'); // Fond du graphique 
    chart.palette(anychart.palettes.distinctColors().items(["#00FFCC", "#FF00FF", "#FFFF00", "#FF6600"]));
    
    // INSERER LES DONNEES ICI
    chart.data();

    // Spécifier le conteneur
    chart.container("container");chart.credits().enabled(false);chart.draw();

function nextWeek() { // FONCTION SEMAINE SUIVANTE

if(actualWeek==104){actualWeek=1;dataGraph=[];} // DERNIERE SEMAINE AVANT REINITIALISATION DU GRAPH

if (actualWeek%4 == 1){ // TEST JOUR DE LA SEMAINE, SI 1ERE SEMAINE ALORS NOUVEAU SCENARIO
  alea = genererNombreEntre(1,5);
  switch(alea){
    case (1): scenario = "Three white soldiers  puis Doji"; break;
    case (2): scenario = "Bearish Three Lines Strike"; break;
    case (3): scenario = "Rising Three Methods"; break;
    case (4): scenario = "Morning star puis Dragon Fly"; break;
    case (5): scenario = "Advanced Block puis Grave Stone"; break;
  }
}
if (actualGoldValue<50){ // SCENARIO OU IL FAUT REMONTER
  alea = genererNombreEntre(1,2);
  if (alea==1){scenario="Three white soldiers  puis Doji";}
  else {scenario = "Advanced Block puis Grave Stone";}
}
if(actualGoldValue>175){
  scenario = "Bearish Three Lines Strike";
}

  // TOUS LES SCENARIO POSSIBLES ENTRES DANS LE DATA GRAPH
  if (scenario == "Three white soldiers  puis Doji"){
    switch(actualWeek%4){
      case(1): dataGraph.push([actualWeek,actualGoldValue+tWSD.open1,actualGoldValue+tWSD.high1,actualGoldValue-tWSD.low1,actualGoldValue+tWSD.close1]);actualGoldValue=actualGoldValue+tWSD.close1;  break;
      case(2): dataGraph.push([actualWeek,actualGoldValue+tWSD.open2,actualGoldValue+tWSD.high2,actualGoldValue-tWSD.low2,actualGoldValue+tWSD.close2]);;actualGoldValue=actualGoldValue+tWSD.close2;  break;
      case(3): dataGraph.push([actualWeek,actualGoldValue+tWSD.open3,actualGoldValue+tWSD.high3,actualGoldValue-tWSD.low3,actualGoldValue+tWSD.close3]);;actualGoldValue=actualGoldValue+tWSD.close3;  break;
      case(0): dataGraph.push([actualWeek,actualGoldValue+tWSD.open4,actualGoldValue+tWSD.high4,actualGoldValue-tWSD.low4,actualGoldValue+tWSD.close4]);;actualGoldValue=actualGoldValue+tWSD.close4;  break;
    }
  }
  else if (scenario == "Bearish Three Lines Strike"){
    switch(actualWeek%4){
      case(1): dataGraph.push([actualWeek, actualGoldValue+tWSD.open1 ,actualGoldValue+tWSD.high1, actualGoldValue-tWSD.low1 ,actualGoldValue-tWSD.close1]);actualGoldValue=actualGoldValue-tWSD.close1;  break;
      case(2): dataGraph.push([actualWeek,actualGoldValue+tWSD.open2,actualGoldValue+tWSD.high2,actualGoldValue-tWSD.low2,actualGoldValue-tWSD.close2]);;actualGoldValue=actualGoldValue-tWSD.close2;  break;
      case(3): dataGraph.push([actualWeek,actualGoldValue+tWSD.open3,actualGoldValue+tWSD.high3,actualGoldValue-tWSD.low3,actualGoldValue-tWSD.close3]);;actualGoldValue=actualGoldValue-tWSD.close3;  break;
      case(0): dataGraph.push([actualWeek,actualGoldValue+tWSD.open4,actualGoldValue+tWSD.high4,actualGoldValue-tWSD.low4,actualGoldValue+tWSD.close4]);;actualGoldValue=actualGoldValue+tWSD.close4;  break;
    }
  }
  else if (scenario == "Rising Three Methods"){
    switch(actualWeek%4){
      case(1): dataGraph.push([actualWeek,actualGoldValue+tWSD.open1,actualGoldValue+tWSD.high1,actualGoldValue-tWSD.low1,actualGoldValue+tWSD.close1]);actualGoldValue=actualGoldValue+tWSD.close1;  break;
      case(2): dataGraph.push([actualWeek,actualGoldValue+tWSD.open2,actualGoldValue+tWSD.high2,actualGoldValue-tWSD.low2,actualGoldValue-tWSD.close2]);;actualGoldValue=actualGoldValue-tWSD.close2;  break;
      case(3): dataGraph.push([actualWeek,actualGoldValue+tWSD.open3,actualGoldValue+tWSD.high3,actualGoldValue-tWSD.low3,actualGoldValue-tWSD.close3]);;actualGoldValue=actualGoldValue-tWSD.close3;  break;
      case(0): dataGraph.push([actualWeek,actualGoldValue+tWSD.open4,actualGoldValue+tWSD.high4,actualGoldValue-tWSD.low4,actualGoldValue-tWSD.close4]);;actualGoldValue=actualGoldValue-tWSD.close4;  break;
    }
  }
  else if (scenario == "Morning star puis Dragon Fly"){
    switch(actualWeek%4){
      case(1): dataGraph.push([actualWeek,actualGoldValue+tWSD.open1,actualGoldValue+tWSD.high1,actualGoldValue-tWSD.low1,actualGoldValue-tWSD.close1]);actualGoldValue=actualGoldValue+tWSD.close1;  break;
      case(2): dataGraph.push([actualWeek,actualGoldValue+tWSD.open2,actualGoldValue+tWSD.high2,actualGoldValue-tWSD.low2,actualGoldValue+tWSD.close2]);;actualGoldValue=actualGoldValue-tWSD.close2;  break;
      case(3): dataGraph.push([actualWeek,actualGoldValue+tWSD.open3,actualGoldValue+tWSD.high3,actualGoldValue-tWSD.low3,actualGoldValue+tWSD.close3]);;actualGoldValue=actualGoldValue-tWSD.close3;  break;
      case(0): dataGraph.push([actualWeek,actualGoldValue+tWSD.open4,actualGoldValue+tWSD.high4,actualGoldValue-tWSD.low4,actualGoldValue+tWSD.close4]);;actualGoldValue=actualGoldValue-tWSD.close4;  break;
    }
  }
  else if (scenario == "Advanced Block puis Grave Stone"){
    switch(actualWeek%4){
      case(1): dataGraph.push([actualWeek,actualGoldValue+tWSD.open1,actualGoldValue+tWSD.high1,actualGoldValue-tWSD.low1,actualGoldValue-tWSD.close1]);actualGoldValue=actualGoldValue+tWSD.close1;  break;
      case(2): dataGraph.push([actualWeek,actualGoldValue+tWSD.open2,actualGoldValue+tWSD.high2,actualGoldValue-tWSD.low2,actualGoldValue+tWSD.close2]);;actualGoldValue=actualGoldValue+tWSD.close2;  break;
      case(3): dataGraph.push([actualWeek,actualGoldValue+tWSD.open3,actualGoldValue+tWSD.high3,actualGoldValue-tWSD.low3,actualGoldValue+tWSD.close3]);;actualGoldValue=actualGoldValue+tWSD.close3;  break;
      case(0): dataGraph.push([actualWeek,actualGoldValue+tWSD.open4,actualGoldValue+tWSD.high4,actualGoldValue-tWSD.low4,actualGoldValue+tWSD.close4]);;actualGoldValue=actualGoldValue-tWSD.close4;  break;
    }
  }
  // MISE DU DATAGRAPH DANS LE CHART ET PASSAGE SEMAINE SUIVANTE
  chart.data(dataGraph); chart.draw(); 
  actualWeek ++;
  document.getElementById("actualGoldValue").innerHTML = actualGoldValue+"€"
}

function genererNombreEntre(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
function choisirMotParmi(...mots) {
        if (mots.length < 2 || mots.length > 5) {
            console.error("Vous devez fournir entre 2 et 5 mots.");
            return;
        }
    
        const index = Math.floor(Math.random() * mots.length);  // Génère un index aléatoire
        return mots[index];  // Retourne le mot à cet index
}

for (a=1;a<=24;a++){
  nextWeek();
}

function buyGold(){
  if (capital>0){
    gold = capital/actualGoldValue;
    capital = 0;
    let goldRound = Math.round(gold*100)/100;
    let capitalRound = Math.round(capital*100)/100;
    document.getElementById("gold").innerHTML= goldRound+"€";
    document.getElementById("capital").innerHTML= capitalRound+"€";
  }
}
function sellGold(){
  if (gold>0){
    capital = actualGoldValue*gold;
    gold = 0;
    let goldRound = Math.round(gold*100)/100;
    let capitalRound = Math.round(capital*100)/100;
    document.getElementById("gold").innerHTML= goldRound+"€";
    document.getElementById("capital").innerHTML= capitalRound+"€";
  }  
}

function buyInfos(){
  alert("Les Traders anticipent : "+ scenario + " pour ce mois ci.")
}
