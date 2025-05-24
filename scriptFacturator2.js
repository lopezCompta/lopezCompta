
// Le Bouton generer génère une facture via generateFacture
const exerciceButton = document.getElementById("exerciceButton");
exerciceButton.addEventListener("click", generateFacture)

const validateButton = document.getElementById("validateButton");
validateButton.addEventListener("click", validate)

const backToMenuButton = document.getElementById("backToMenuButton");
backToMenuButton.addEventListener("click", backToMenu);



function generateFacture(){
    
    document.querySelector('#exercise-display').innerHTML = " ";

    // 1- choisir le type de facture de façon aléatoire 
    if(document.getElementById("caseAvoir").checked){
    document.getElementById("sensFacture").innerHTML = Math.random() < 0.5 ? "d'achat" : "de vente";
    document.getElementById("typeFacture").innerHTML = Math.random() < 0.5 ? "de Doit" : "d'Avoir";
    }
    else{
        document.getElementById("typeFacture").innerHTML="de Doit";
        document.getElementById("sensFacture").innerHTML = Math.random() < 0.5 ? "d'achat" : "de vente";
    }
    // 2- Générer une date aléatoire 
    document.getElementById("dayFacture").innerHTML = Math.floor(Math.random() * 30) + 1;
    document.getElementById("monthFacture").innerHTML = Math.floor(Math.random() * 12) + 1;

    // 3- Générer un libellé aléatoire
    document.getElementById("libelleFacture").innerHTML = Math.floor(Math.random() * (999999 - 111111 + 1)) + 111111;

    // 4- générer les montants aléatoire
    document.getElementById("qt1").innerHTML = Math.floor(Math.random() * 30) + 1;
    document.getElementById("qt2").innerHTML = Math.floor(Math.random() * 30) + 1;
    document.getElementById("qt3").innerHTML = Math.floor(Math.random() * 30) + 1;

    document.getElementById("pu1").innerHTML = Math.floor(Math.random() * 500) + 1;
    document.getElementById("pu2").innerHTML = Math.floor(Math.random() * 200) + 1;
    document.getElementById("pu3").innerHTML = Math.floor(Math.random() * 1000) + 1;

    document.getElementById("mt1").innerHTML = parseInt(document.getElementById("qt1").innerHTML) * parseInt(document.getElementById("pu1").innerHTML)
    document.getElementById("mt2").innerHTML = parseInt(document.getElementById("qt2").innerHTML) * parseInt(document.getElementById("pu2").innerHTML)
    document.getElementById("mt3").innerHTML = parseInt(document.getElementById("qt3").innerHTML) * parseInt(document.getElementById("pu3").innerHTML)

    document.getElementById("montantTotal").innerHTML = parseInt(document.getElementById("mt1").innerHTML)+parseInt(document.getElementById("mt2").innerHTML)+parseInt(document.getElementById("mt3").innerHTML)

    // 5- générer les réductions
    document.getElementById("rabais").innerHTML = Math.floor(Math.random() * 3);
    document.getElementById("mtRabais").innerHTML = document.getElementById("montantTotal").innerHTML*document.getElementById("rabais").innerHTML/100;
    
    document.getElementById("remise").innerHTML = Math.floor(Math.random() * 3);
    document.getElementById("mtRemise").innerHTML = arrondi((document.getElementById("montantTotal").innerHTML-document.getElementById("mtRabais").innerHTML)*document.getElementById("remise").innerHTML/100);

    document.getElementById("netCom").innerHTML = document.getElementById("montantTotal").innerHTML - document.getElementById("mtRabais").innerHTML - document.getElementById("mtRemise").innerHTML;
    document.getElementById("netCom").innerHTML = arrondi(document.getElementById("netCom").innerHTML);

    if (document.getElementById("caseEscompte").checked){
        document.getElementById("escompte").innerHTML = Math.floor(Math.random() * 3);
        document.getElementById("mtEscompte").innerHTML = document.getElementById("netCom").innerHTML*document.getElementById("escompte").innerHTML/100
        document.getElementById("mtEscompte").innerHTML = arrondi(document.getElementById("mtEscompte").innerHTML);
        }
    else{document.getElementById("escompte").innerHTML=0;document.getElementById("mtEscompte").innerHTML=0;}


    document.getElementById("netFi").innerHTML = document.getElementById("netCom").innerHTML - document.getElementById("mtEscompte").innerHTML;
    document.getElementById("netFi").innerHTML = arrondi(document.getElementById("netFi").innerHTML);
    
    document.getElementById("tauxTVA").innerHTML = genererTauxTVA();
    
    document.getElementById("montantTVA").innerHTML = document.getElementById("netFi").innerHTML * document.getElementById("tauxTVA").innerHTML /100
    document.getElementById("montantTVA").innerHTML = arrondi(document.getElementById("montantTVA").innerHTML);

    document.getElementById("netAPayer").innerHTML = arrondi(document.getElementById("netFi").innerHTML) + arrondi(document.getElementById("montantTVA").innerHTML);
    document.getElementById("netAPayer").innerHTML = arrondi(document.getElementById("netAPayer").innerHTML);
}


function arrondi(nombre) {
    return Math.round(nombre * 100) / 100;
}

function genererTauxTVA() {
    const taux = [20, 10, 5.5];
    const indexAleatoire = Math.floor(Math.random() * taux.length);
    return taux[indexAleatoire];
}

function validate(){

    // Nous allons tester tous les cas ici 
    // D'abord je crée des variables pour la lisibilité
    let sensFacture = document.getElementById("sensFacture").innerHTML;
    let typeFacture = document.getElementById("typeFacture").innerHTML;
    let dayFacture = document.getElementById("dayFacture").innerHTML;
    let monthFacture = document.getElementById("monthFacture").innerHTML;
    let libelleFacture = document.getElementById("libelleFacture").innerHTML;
    let netCom = parseFloat(document.getElementById("netCom").innerHTML);
    let mtEscompte = document.getElementById("mtEscompte").innerHTML;
    let netFi = document.getElementById("netFi").innerHTML;
    let montantTVA = document.getElementById("montantTVA").innerHTML;
    let netAPayer = document.getElementById("netAPayer").innerHTML;

    let aDate = document.getElementById("aDate").value;
    let aLibelle = document.getElementById("aLibelle").value;
    let a = null; let b = null; let c = null; let d = null;

    if (document.querySelector('#a13').value===''){document.querySelector('#a13').value=0;}
    if (document.querySelector('#a14').value===''){document.querySelector('#a14').value=0;}
    if (document.querySelector('#a23').value===''){document.querySelector('#a23').value=0;}
    if (document.querySelector('#a24').value===''){document.querySelector('#a24').value=0;}
    if (document.querySelector('#a33').value===''){document.querySelector('#a33').value=0;}
    if (document.querySelector('#a34').value===''){document.querySelector('#a34').value=0;}
    if (document.querySelector('#a43').value===''){document.querySelector('#a43').value=0;}
    if (document.querySelector('#a44').value===''){document.querySelector('#a44').value=0;}

    // On passe aux test :

    if(mtEscompte==0){
        if(typeFacture=="de Doit"){
            if(sensFacture=="d'achat"){
                
                // la seule ligne qui change
                a = line("607",netCom,0); b = line("44566",montantTVA,0); c = line("401",0,netAPayer);
                if(a == true && b == true && c == true){
                    alert("bonne réponse !"); generateFacture(); reset();} 
                    else{alert("Vous avez fait faux, vérifiez votre écriture !");}
            }
            else if(sensFacture=="de vente"){
                a = line("411",netAPayer,0); b = line("707",0,netCom); c = line("44571",0,montantTVA);
                if(a == true && b == true && c == true){
                    alert("bonne réponse !"); generateFacture(); reset();}
                    else{alert("Vous avez fait faux, vérifiez votre écriture !");}
            }
        }
        else if(typeFacture=="d'Avoir"){
            if(sensFacture=="d'achat"){
                
                a = line("607",0,netCom); b = line("44566",0,montantTVA); c = line("401",netAPayer,0);
                if(a == true && b == true && c == true){
                    alert("bonne réponse !"); generateFacture(); reset();}
                    else{alert("Vous avez fait faux, vérifiez votre écriture !");}
            }
            else if(sensFacture=="de vente"){
                a = line("411",0,netAPayer); b = line("707",netCom,0); c = line("44571",montantTVA,0);
                if(a == true && b == true && c == true){
                    alert("bonne réponse !"); generateFacture(); reset();}
                    else{alert("Vous avez fait faux, vérifiez votre écriture !");}
            }
        }
    }
    else if(mtEscompte!=0){
        if(typeFacture=="de Doit"){
            if(sensFacture=="d'achat"){
                
                // la seule ligne qui change
                a = line("607",netCom,0); b = line("44566",montantTVA,0); 
                c = line("401",0,netAPayer); d = line("765",0,mtEscompte);

                if(a == true && b == true && c == true && d == true){
                    alert("bonne réponse !"); generateFacture(); reset();}
                    else{alert("Vous avez fait faux, vérifiez votre écriture !");}
            }
            else if(sensFacture=="de vente"){
                a = line("411",netAPayer,0); b = line("707",0,netCom); 
                c = line("44571",0,montantTVA); d = line("665",mtEscompte,0);

                if(a == true && b == true && c == true && d == true){
                    alert("bonne réponse !"); generateFacture(); reset();}
                    else{alert("Vous avez fait faux, vérifiez votre écriture !");}
            }
        }
        else if(typeFacture=="d'Avoir"){
            if(sensFacture=="d'achat"){
                
                a = line("607",0,netCom); b = line("44566",0,montantTVA); 
                c = line("401",netAPayer,0); d = line("765",mtEscompte,0);
                if(a == true && b == true && c == true && d == true){
                    alert("bonne réponse !"); generateFacture(); reset();}
                    else{alert("Vous avez fait faux, vérifiez votre écriture !");}
            }
            else if(sensFacture=="de vente"){
                a = line("411",0,netAPayer); b = line("707",netCom,0); 
                c = line("44571",montantTVA,0); d = line("665",0,mtEscompte);
                if(a == true && b == true && c == true && d == true){
                    alert("bonne réponse !"); generateFacture(); reset();}
                    else{alert("Vous avez fait faux, vérifiez votre écriture !");}
            }
        }
    }
    else{alert("Vous avez fait faux, vérifiez votre écriture !");}


console.log(a,b,c,d,sensFacture,typeFacture, mtEscompte);

}



function reset(){
document.getElementById("a11").value=" ";
document.getElementById("a12").value=" ";
document.getElementById("a13").value=0;
document.getElementById("a14").value=0;
document.getElementById("a21").value=" ";
document.getElementById("a22").value=" ";
document.getElementById("a23").value=0;
document.getElementById("a24").value=0;
document.getElementById("a31").value=" ";
document.getElementById("a32").value=" ";
document.getElementById("a33").value=0;
document.getElementById("a34").value=0;
document.getElementById("a41").value=" ";
document.getElementById("a42").value=" ";
document.getElementById("a43").value=0;
document.getElementById("a44").value=0;
document.getElementById("aLibelle").value=" ";
}

function line(i,j,k){

    let a11 = document.getElementById("a11").value;
    let a13 = document.getElementById("a13").value;
    let a14 = document.getElementById("a14").value;
    let a21 = document.getElementById("a21").value;
    let a23 = document.getElementById("a23").value;
    let a24 = document.getElementById("a24").value;
    let a31 = document.getElementById("a31").value;
    let a33 = document.getElementById("a33").value;
    let a34 = document.getElementById("a34").value;
    let a41 = document.getElementById("a41").value;
    let a43 = document.getElementById("a43").value;
    let a44 = document.getElementById("a44").value;
    a11 = parseFloat(a11);
    a21= parseFloat(a21);
    a31 = parseFloat(a31);
    a41 = parseFloat(a41);
    a13 = a13.replace(",", "."); a13 = parseFloat(a13);
    a14 = a14.replace(",", "."); a14 = parseFloat(a14);
    a23 = a23.replace(",", "."); a23 = parseFloat(a23);
    a24 = a24.replace(",", "."); a24 = parseFloat(a24);
    a33 = a33.replace(",", "."); a33 = parseFloat(a33);
    a34 = a34.replace(",", "."); a34 = parseFloat(a34);
    a43 = a43.replace(",", "."); a43 = parseFloat(a43);
    a44 = a44.replace(",", "."); a44 = parseFloat(a44);
    i = parseFloat(i);
    j = parseFloat(j);
    k = parseFloat(k);



    if(a11==i&&a13==j&&a14==k){return true;}
    else if(a21==i&&a23==j&&a24==k){return true;}
    else if(a31==i&&a33==j&&a34==k){return true;}
    else if(a41==i&&a43==j&&a44==k){return true;}
    else{return false;}

}

function updateInputValue(sourceId, targetId) {
    // Récupération des valeurs des inputs
    const sourceInput = document.getElementById(sourceId);
    const targetInput = document.getElementById(targetId);

    // Vérification de la valeur de l'input source et mise à jour de l'input cible
    switch (sourceInput.value) {
        case "607":
            targetInput.value = "Achats de Marchandises";
            break;
        case "707":
            targetInput.value = "Ventes de marchandises";
            break;
        case "401":
            targetInput.value = "Dettes Fournisseurs";
            break;
        case "411":
            targetInput.value = "Créances Clients";
            break;
        case "44566":
            targetInput.value = "TVA déductible";
            break;
        case "44571":
            targetInput.value = "TVA collectée";
            break;
        case "665":
            targetInput.value = "Escomptes accordés";
            break;
        case "765":
            targetInput.value = "Escomptes obtenus";
            break;
        default:
            targetInput.value = ""; // Vider l'input si aucune correspondance n'est trouvée
            break;
    }
}

// Attacher l'événement onchange pour chaque paire d'inputs
document.getElementById("a11").addEventListener("input", () => updateInputValue("a11", "a12"));
document.getElementById("a21").addEventListener("input", () => updateInputValue("a21", "a22"));
document.getElementById("a31").addEventListener("input", () => updateInputValue("a31", "a32"));
document.getElementById("a41").addEventListener("input", () => updateInputValue("a41", "a42"));


function backToMenu(){
    window.location.href = "jeux.html";    
}

