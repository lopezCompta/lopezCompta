// Liste d'exercices d'écritures comptables

let typeFacture = "non défini";
let typeOperation = "non défini";
let aleaOperation = "non défini"
let sensFacture = "non défini"
let aleaLibel = 0;
let aleaJour = 0;
let aleaMois = 0;

let alea = 0;
let aleaSens = 0;
let exercice = "";
let montantFacture = 0;
let repNumCpt1 = 0;
let repNumCpt2 = 0;
let repNumCpt3 = 0;
let repDeb1 = 0;
let repDeb2 = 0;
let repDeb3 = 0;
let repCred1 = 0;
let repCred2 = 0;
let repCred3 = 0;
let tva = 0;
let ttc = 0;
let score = 0;

const exerciceButton = document.getElementById("exerciceButton");
const validationButton = document.getElementById("validationButton");
const generateDesignationsButton = document.getElementById("generateDesignationsButton");
const infoButton = document.getElementById("infoButton");
const menuButton = document.getElementById("menuButton");


    // Affiche l'exercice

function createExercice(){
    
    // achat ou vente
    alea = Math.random();
    if (alea<0.5){typeFacture = "d'Achat";}
    else{typeFacture ="de Vente";}
    aleaOperation = getIntegerInRange(0,2);

    aleaSens = Math.random();
    if (aleaSens<0.5){sensFacture = "de Doit";}
    else{sensFacture ="d'Avoir";}

    if (typeFacture == "d'Achat"){
            switch (aleaOperation) {case 0: typeOperation="de Marchandises"; break;
                        case 1: typeOperation="de Matières Premières"; break;}
    }

    else if (typeFacture == "de Vente"){
            switch (aleaOperation) {case 0: typeOperation="de Marchandises"; break;
                        case 1: typeOperation="de Produits Finis"; break;}
    }

    aleaLibel = getIntegerInRange(111111,999999);

    //Montant aléatoire
    montantFacture = Math.round(getRandomInRange(100,15000));
    aleaJour = getIntegerInRange(1,30);
    aleaMois = getIntegerInRange(1,12);


    exercice = "Enregistrer une facture " + typeFacture + " " + sensFacture + " " + typeOperation + 
    " d'une valeur de " + montantFacture + ",00€, qui porte le libellé N° " + aleaLibel
    + " en date du " + aleaJour + "/" + aleaMois + "/2024";
    document.getElementById("exercise-display").textContent = exercice;
}

function reset(){
    document.getElementById("codeJournal").value = "";
    document.getElementById("repNumCpt1").value = ""
    document.getElementById("intit1").value = "";
    document.getElementById("repDeb1").value = "";
    document.getElementById("repCred1").value = "";
    document.getElementById("repNumCpt2").value = "";
    document.getElementById("intit2").value = "";
    document.getElementById("repDeb2").value = "";
    document.getElementById("repCred2").value = "";
    document.getElementById("repNumCpt3").value = "";
    document.getElementById("intit3").value = "";
    document.getElementById("repDeb3").value = "";
    document.getElementById("repCred3").value = "";
    document.getElementById("libelle").value = "";
    document.getElementById("date").value = "";
}
    
function getRandomInRange(min, max) {
    return Math.random() * (max - min) + min; // Valeur entre min (inclus) et max (exclus)
}

function getIntegerInRange(min, max) {
    return Math.floor(Math.random() * (max - min)) + min; // Valeur entre min (inclus) et max (exclus)
}

function validate() {

    const inputElement1 = document.getElementById("repNumCpt1");
    const ansNumCpt1 = inputElement1.value;
    const inputElement2 = document.getElementById("repNumCpt2");
    const ansNumCpt2 = inputElement2.value;
    const inputElement3 = document.getElementById("repNumCpt3");
    const ansNumCpt3 = inputElement3.value;

    const inputElement4 = document.getElementById("repDeb1");
    const ansDeb1 = inputElement4.value;
    const inputElement5 = document.getElementById("repDeb2");
    const ansDeb2 = inputElement5.value;
    const inputElement6 = document.getElementById("repDeb3");
    const ansDeb3 = inputElement6.value;

    const inputElement7 = document.getElementById("repCred1");
    const ansCred1 = inputElement7.value;
    const inputElement8 = document.getElementById("repCred2");
    const ansCred2 = inputElement8.value;
    const inputElement9 = document.getElementById("repCred3");
    const ansCred3 = inputElement9.value;

    const inputElement10 = document.getElementById("codeJournal");
    const ansCode = inputElement10.value;

    const inputElement11 = document.getElementById("libelle");
    const ansLibelle = inputElement11.value;

    tva = montantFacture*0.2;
    tva = parseFloat(tva.toFixed(2));

    ttc = montantFacture*1.2;
    ttc = parseFloat(ttc.toFixed(2));
    

    if (sensFacture == "de Doit" && typeOperation == "de Marchandises" 
        && typeFacture=="d'Achat" && ansNumCpt1==607 && 
        ansDeb1 == montantFacture && ansCred1 == 0 && 
        ansNumCpt2 == 44566 && ansDeb2 == tva 
        && ansCred2== 0 && ansNumCpt3==401 && ansDeb3==0 && 
        ansCred3==ttc && ansCode == "ACH" && ansLibelle == aleaLibel){
        alert("bonne réponse");
        reset();
        createExercice();
            score += 10;
            document.getElementById("scoreAffiche").textContent = score;
    }
    else if (sensFacture == "de Doit" && typeOperation == "de Marchandises" 
        && typeFacture=="de Vente" && ansNumCpt1==411 &&
        ansDeb1==ttc && ansCred1 == 0 && 
        ansNumCpt2==707 && ansDeb2==0 && ansCred2 == montantFacture &&
        ansNumCpt3==44571 && ansDeb3 == 0 && ansCred3 == tva && ansCode == "VTE"
        && ansLibelle == aleaLibel){
            alert("bonne réponse");
            reset();
            createExercice();
            score += 10;
            document.getElementById("scoreAffiche").textContent = score;
        }
    else if (sensFacture == "de Doit" && typeOperation == "de Matières Premières" &&
        typeFacture=="d'Achat" && ansNumCpt1==601 && 
        ansDeb1 == montantFacture && ansCred1 == 0 && 
        ansNumCpt2 == 44566 && ansDeb2 == tva 
        && ansCred2== 0 && ansNumCpt3==401 && ansDeb3==0 && 
        ansCred3==ttc && ansCode == "ACH" && ansLibelle == aleaLibel){
        alert("bonne réponse");
        reset();
        createExercice();
            score += 10;
            document.getElementById("scoreAffiche").textContent = score;
    }
    else if (sensFacture == "de Doit" && typeOperation == "de Produits Finis" 
        && typeFacture=="de Vente" 
        && ansNumCpt1==411 && ansDeb1==ttc && ansCred1 == 0 && 
        ansNumCpt2==701 && ansDeb2==0 && ansCred2 == montantFacture &&
        ansNumCpt3==44571 && ansDeb3 == 0 && ansCred3 == tva && ansCode == "VTE"
        && ansLibelle == aleaLibel){
            alert("bonne réponse");
            reset();
            createExercice();
            score += 10;
            document.getElementById("scoreAffiche").textContent = score;
        }
    else if (sensFacture == "d'Avoir" && typeOperation == "de Matières Premières" 
        && typeFacture=="d'Achat" && ansNumCpt1==401
        && ansDeb1==ttc && ansCred1 == 0 
        && ansNumCpt2==601 && ansDeb2==0 
        && ansCred2 == montantFacture
        && ansNumCpt3==44566 && ansDeb3 == 0 
        && ansCred3 == tva && ansCode == "ACH" && ansLibelle == aleaLibel){
            alert("bonne réponse");
            reset();
            createExercice();
            score += 10;
            document.getElementById("scoreAffiche").textContent = score;
        }
    else if (sensFacture == "d'Avoir" && typeOperation == "de Marchandises" 
        && typeFacture=="d'Achat" && ansNumCpt1==401
        && ansDeb1==ttc && ansCred1 == 0 
        && ansNumCpt2==607 && ansDeb2==0 
        && ansCred2 == montantFacture
        && ansNumCpt3==44566 && ansDeb3 == 0 
        && ansCred3 == tva && ansCode == "ACH" && ansLibelle == aleaLibel){
            alert("bonne réponse");
            reset();
            createExercice();
            score += 10;
            document.getElementById("scoreAffiche").textContent = score;
        }
    else if (sensFacture == "d'Avoir" && typeOperation == "de Produits Finis" 
        && typeFacture=="de Vente" && ansNumCpt1==701
        && ansDeb1==montantFacture && ansCred1 == 0 
        && ansNumCpt2==44571 && ansDeb2==tva
        && ansCred2 == 0 && ansNumCpt3==411 
        && ansDeb3 == 0 && ansCred3 == ttc && ansCode == "VTE"
        && ansLibelle == aleaLibel){
            alert("bonne réponse");
            reset();
            createExercice();
            score += 10;
            document.getElementById("scoreAffiche").textContent = score;
        }
    else if (sensFacture == "d'Avoir" && typeOperation == "de Marchandises" 
        && typeFacture=="de Vente" && ansNumCpt1==707
        && ansDeb1==montantFacture && ansCred1 == 0 
        && ansNumCpt2==44571 && ansDeb2==tva
        && ansCred2 == 0 && ansNumCpt3==411 
        && ansDeb3 == 0 && ansCred3 == ttc && ansCode == "VTE"
        && ansLibelle == aleaLibel){
            alert("bonne réponse");
            reset();
            createExercice();
            score += 10;
            document.getElementById("scoreAffiche").textContent = score;
        }
   
    
     
    else {alert("mauvaise réponse" + typeOperation + typeFacture + ansCode + ansLibelle);}
}


function generateIntitule(){
    const n1 = document.getElementById("repNumCpt1");
    const n2 = document.getElementById("repNumCpt2");
    const n3 = document.getElementById("repNumCpt3");
    let a = parseInt(n1.value);
    let b = parseInt(n2.value);
    let c = parseInt(n3.value);
    
   switch (a){
         case 607: document.getElementById("intit1").value="Achat de Marchandises"; break;
         case 411: document.getElementById("intit1").value="Créances Clients"; break;
         case 401: document.getElementById("intit1").value="Dettes Fournisseurs"; break;
         case 601: document.getElementById("intit1").value="Achat de Matières Premières"; break;
         case 707: document.getElementById("intit1").value="Ventes de Marchandises"; break;
         case 701: document.getElementById("intit1").value="Ventes de produits finis"; break;
         case 44566: document.getElementById("intit1").value="TVA déductible sur ABS"; break;
         case 44562: document.getElementById("intit1").value="TVA déductible sur immos"; break;
         case 44571: document.getElementById("intit1").value="TVA Collectée"; break;
   }
   switch (b){
      case 607: document.getElementById("intit2").value="Achat de Marchandises"; break;
      case 411: document.getElementById("intit2").value="Créances Clients"; break;
      case 401: document.getElementById("intit2").value="Dettes Fournisseurs"; break;
      case 601: document.getElementById("intit2").value="Achat de Matières Premières"; break;
      case 707: document.getElementById("intit2").value="Ventes de Marchandises"; break;
      case 701: document.getElementById("intit2").value="Ventes de produits finis"; break;
      case 44566: document.getElementById("intit2").value="TVA déductible sur ABS"; break;
      case 44562: document.getElementById("intit2").value="TVA déductible sur immos"; break;
      case 44571: document.getElementById("intit2").value="TVA Collectée"; break;
   }    
switch (c){
   case 607: document.getElementById("intit3").value="Achat de Marchandises"; break;
   case 411: document.getElementById("intit3").value="Créances Clients"; break;
   case 401: document.getElementById("intit3").value="Dettes Fournisseurs"; break;
   case 601: document.getElementById("intit3").value="Achat de Matières Premières"; break;
   case 707: document.getElementById("intit3").value="Ventes de Marchandises"; break;
   case 701: document.getElementById("intit3").value="Ventes de produits finis"; break;
   case 44566: document.getElementById("intit3").value="TVA déductible sur ABS"; break;
   case 44562: document.getElementById("intit3").value="TVA déductible sur immos"; break;
   case 44571: document.getElementById("intit3").value="TVA Collectée"; break;
   }     
}

function information(){
    alert(`Bienvenue dans le Facturator, cette machine va vous entrainer 
        à produire des écritures comptables de factures. 
        Les comptes acceptés par le Facturator
        sont : 401-411-601-607-701-707-44566-44571, 
        pour les libellés, vous ne devrez rentrer que le numéro de facture.
        Entrainez-vous bien !`)
}

function backToMenu(){
    window.location.href = "index.html";    
}


exerciceButton.addEventListener("click", createExercice);
validationButton.addEventListener("click", validate);
generateDesignationsButton.addEventListener("click", generateIntitule);
infoButton.addEventListener("click", information);
menuButton.addEventListener("click", backToMenu);



