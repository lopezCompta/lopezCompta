// CREATION DES BOUTONS
const goVillageButton = document.getElementById("goVillage");
const goDonjonButton = document.getElementById("goDonjon");
const passButton = document.getElementById("pass");
const launchSpell1Button = document.getElementById("launchSpell1");
const launchSpell2Button = document.getElementById("launchSpell2");
const launchSpell3Button = document.getElementById("launchSpell3");
const validateButton = document.getElementById("validate");
const buyItem1Button = document.getElementById("buyItem1");
const buyItem2Button = document.getElementById("buyItem2");
const buyItem3Button = document.getElementById("buyItem3");
const buyItem4Button = document.getElementById("buyItem4");

// LISTENER DES BOUTONS
goVillageButton.addEventListener("click",goVillage);
goDonjonButton.addEventListener("click",goDonjon);
passButton.addEventListener("click", pass);
launchSpell1Button.addEventListener("click", attack1);
launchSpell2Button.addEventListener("click", attack2);
launchSpell3Button.addEventListener("click", attack3);
validateButton.addEventListener("click", validate);
buyItem1Button.addEventListener("click",buy1);
buyItem2Button.addEventListener("click",buy2);
buyItem3Button.addEventListener("click",buy3);
buyItem4Button.addEventListener("click",buy4);

// TOUS LES TEXTES NARRATIFS
const introTXT = "Vous entrez dans un donjon puant où règne l'anarchie et la terreur, saurez-vous affronter les monstres qui y règnent en maître avec votre dictionnaire ?";

// La variable qui sert à savoir où on en est par défault elle est sur init
// le programme fonctionne comme suit :
// CHAQUE BOUTON A UNE FONCTION QUI AGIT SELON eventActual
let eventActual = "init"; 
let testActual = 0; // sert à faire des tests pour faire des attaques la valeur est 
let monsterActual = "null";
let attackActual = 0;
// récupérée partout 
// peut avoir les valeurs "init" "intro fight" "fight" "monster turn intro"
// "monster turn attack" "monster dead" "combat end"

refresh();

//FONCTIONS :

/* 
Une partie : 
    goDonjon    - Choisit un monstre et affiche le monstre vous attaque 
                - attend passe
                - event est sur init par défaut

    pass init   - Phrase d'intro 
                - vous dit de vous préparer au combat et attend pass
                - event devient introFight

    pass introfight 
                - affiche le monstre et ses charactéristiques
                - affiche les attacks
                - attend une attack
                - passe sur fight - passe sur attackActual 1 2 ou 3
    attack 1 2 ou 3 
                - affiche un test
    validate 
                - affiche les réponses possibles
                - event reste sur fight
                - lance la fonction winfight() ou losefight() qui correspond à attaque réussie ou ratée
    winfight 
                - passe event sur monsterTurnIntro ou sur monsterDead
    losefight
                - passe forcémment sur monsterTurnIntro puisque le monstre ne peut pas mourrir
    pass monster turn intro
                - passe automatique à monster turn attack
    pass monster turn attack
                - revient sur Fight !!
    pass monster dead
                - passe à monster end
    pass monster end 
                - passe à goVillage
 */

function buy1(){
        document.getElementById("slot1").innerText = "Encrier de la Sagesse +5 ATK";
        document.getElementById("liste").style.display = "block";
        textPlus("atk",5);
        document.getElementById("buyItem1").disabled = true;
}
function buy2(){
        document.getElementById("slot2").innerText = "Stylus de l'Accord Parfait +15 hp";
        document.getElementById("plume").style.display = "block";
        textPlus("hp",15);textPlus("hpMax",15);
        document.getElementById("buyItem2").disabled = true;
}
function buy3(){
        document.getElementById("slot3").innerText = "Sceau de l'Accord Subjunctif +50hp";
        document.getElementById("costume").style.display = "block";
        textPlus("hp",50);textPlus("hpMax",50);
        document.getElementById("buyItem3").disabled = true;
}
function buy4(){
        document.getElementById("slot4").innerText = "Livre des Règles Immuables +15 atk";
        document.getElementById("cravate").style.display = "block";
        textPlus("atk",15);
        document.getElementById("buyItem4").disabled = true;
}

function goVillage(){
    document.getElementById("goDonjon").disabled = false;
    document.getElementById("goVillage").disabled = true;
    document.getElementById("placeActual").innerText = "Village";
    document.getElementById("donjonZone").style.display = "none";
    document.getElementById("shopZone").style.display = "grid";
    document.getElementById("hp").innerText = document.getElementById("hpMax").innerHTML;
    setText("narration","");setText("attackText","");
    setText("monster","");setText("hpMonster","");setText("separBar","");setText("hpMaxMonster","");
    document.getElementById("launchSpell1").style.display = "none";
    document.getElementById("launchSpell2").style.display = "none";
    document.getElementById("launchSpell3").style.display = "none";
    document.getElementById("test").style.display = "none";
    document.getElementById("validate").style.display = "none";
    document.getElementById("pass").style.display = "block";
    eventActual = "init";
    if(document.getElementById("slot1").innerText=="Emplacement vide"){
        if (parseInt(document.getElementById("gold").innerText)>50){
            document.getElementById("buyItem1").disabled = false;
        }
    }
    if(document.getElementById("slot2").innerText=="Emplacement vide"){
        if (parseInt(document.getElementById("gold").innerText)>25){
            document.getElementById("buyItem2").disabled = false;
        }
    }
    if(document.getElementById("slot3").innerText=="Emplacement vide"){
        if (parseInt(document.getElementById("gold").innerText)>300){
            document.getElementById("buyItem3").disabled = false;
        }
    }
    if(document.getElementById("slot4").innerText=="Emplacement vide"){
        if (parseInt(document.getElementById("gold").innerText)>100){
            document.getElementById("buyItem4").disabled = false;
        }
    }
}
function goDonjon(){
    document.getElementById("goDonjon").disabled = true;
    document.getElementById("goVillage").disabled = false;
    document.getElementById("placeActual").innerText = "Donjon";
    document.getElementById("donjonZone").style.display = "inline";
    document.getElementById("shopZone").style.display = "none";
    
    // Generation d'un monstre aléatoire selon le niveau du personnage
    let alea = 0;
    let lvlDuHero = parseInt(document.getElementById("level").innerText);
    if (lvlDuHero==1){// NIVEAU 1 banquier
        alea = 1;
    }
    else if (lvlDuHero==2){
        alea = 1;
    }
    else if (lvlDuHero==3){
        alea = getRandomInt(2,3); // NIVEAU 3
    }
    else if (lvlDuHero>3&&lvlDuHero<7){
        alea = getRandomInt(2,3); // NIVEAU 4 5 6
    }
    else if (lvlDuHero>6&&lvlDuHero<9){
        alea = getRandomInt(2,4); // NIVEAU 7 8
    }
    else if (lvlDuHero>8){
        alea = getRandomInt(3,5); // NIVEAU 9+ 
    }
    else {
        alea = 5;
    }


    if(alea == 1){monsterActual="Malédiction de la Triple Négation";}
    else if (alea == 2){monsterActual="Verbe Irrégulier Sauvage";}
    else if (alea == 3){monsterActual="Dictionnaire Obscur";}
    else if (alea == 4){monsterActual="Pléonasme Géant";}
    else if (alea == 5){monsterActual="Fantôme de la Syntaxe";}

    if (monsterActual == "Malédiction de la Triple Négation"){
            setText("narration","Une Malédiction de la Triple Négation apparaît et vous menace de dire des phrases incompréhensibles pour désorienter le héros. !")
            document.getElementById("imgMonster").src = "image/malediction.jpg";
            document.getElementById("imgMonster").style.display = "block";
        }
    else if (monsterActual == "Verbe Irrégulier Sauvage"){
            setText("narration","Un Verbe Irrégulier Sauvage apparaît et vous menace de ne suivre aucune règle et de se conjuguer n'importe comment !")
            document.getElementById("imgMonster").src = "image/verbe.jpg";
            document.getElementById("imgMonster").style.display = "block";
        }
    else if (monsterActual == "Dictionnaire Obscur"){
            setText("narration","Un Dictionnaire Obscur apparaît et vous menace d'invoquer des mots rares pour vous effrayer. !")
            document.getElementById("imgMonster").src = "image/dictionnaire.jpg";
            document.getElementById("imgMonster").style.display = "block";
        }
    else if (monsterActual == "Pléonasme Géant"){
            setText("narration","Un Pléonasme Géant apparaît et vous menace d'invoquer une entité verbeuse et redondante qui frappe deux fois à chaque attaque. !")
            document.getElementById("imgMonster").src = "image/pleonasme.jpg";
            document.getElementById("imgMonster").style.display = "block";
        }
    else if (monsterActual == "Fantôme de la Syntaxe"){
            setText("narration","Un Fantôme de la Syntaxe apparaît, Une présence invisible qui désorganise les pensées et les mouvements du héros. !!!")
            document.getElementById("imgMonster").src = "image/fantomeSyntaxique.jpg";
            document.getElementById("imgMonster").style.display = "block";
        }
}

function refresh(){
    if (parseInt(document.getElementById("gold").textContent)<50){
        document.getElementById("buyItem1").disabled = true;
    }
    else {
        document.getElementById("buyItem1").disabled = false;
    }
    if (parseInt(document.getElementById("gold").textContent)<25){
        document.getElementById("buyItem2").disabled = true;
    }
    else {
        document.getElementById("buyItem1").disabled = false;
    }
    if (parseInt(document.getElementById("gold").textContent)<300){
        document.getElementById("buyItem3").disabled = true;
    }
    else {
        document.getElementById("buyItem1").disabled = false;
    }
    if (parseInt(document.getElementById("gold").textContent)<100){
        document.getElementById("buyItem4").disabled = true;
    }
    else {
        document.getElementById("buyItem1").disabled = false;
    }
    document.getElementById("imgMonster").style.display ="none";
}

function setText(id,text){
        document.getElementById(id).innerText = text;
    }
function getText(id){
        return document.getElementById(id).innerText;
}
function textMinus(text, a){
    let i = document.getElementById(text).innerText;
        i = parseInt(i);i -= a;i.toString();
        document.getElementById(text).innerText = i;
}
function textPlus(text, a){
    let i = document.getElementById(text).innerText;
        i = parseInt(i);i += a;i.toString();
        document.getElementById(text).innerText = i;
}
function refreshBars(){
    if (parseInt(document.getElementById("hp").innerText)>0){
    let hpPercent = parseInt(document.getElementById("hp").innerText)/parseInt(document.getElementById("hpMax").innerText)*100;
    document.getElementById("hpBar").style.width = `${hpPercent}%`;
    }
    else{document.getElementById("hpBar").style.width = "1%";}
    if(parseInt(document.getElementById('hpMonster').textContent)>0){
    let hpPercent2 = parseInt(document.getElementById('hpMonster').textContent)/parseInt(document.getElementById('hpMaxMonster').textContent)*100;
    document.getElementById("hpMonsterBar").style.width = `${hpPercent2}%`;
    }
    else{document.getElementById("hpMonsterBar").style.width = "1%";}
}

function pass(){
    if(eventActual == "init"){
        eventActual = "intro fight";
        setText("narration", "Ajustez votre dictionnaire et préparez-vous au combat !");
    }
    else if(eventActual == "intro fight"){
        if(monsterActual == "Malédiction de la Triple Négation"){
            setText("monster", "Malédiction de la Triple Négation :");
            setText("hpMonster","30");
            setText("separBar"," / ");
            setText("hpMaxMonster","30");  
        }
        else if(monsterActual == "Verbe Irrégulier Sauvage"){
            setText("monster", "Verbe Irrégulier Sauvage :");
            setText("hpMonster","75");
            setText("separBar"," / ");
            setText("hpMaxMonster","75");  
        }
        else if(monsterActual == "Dictionnaire Obscur"){
            setText("monster", "Dictionnaire Obscur :");
            setText("hpMonster","140");
            setText("separBar"," / ");
            setText("hpMaxMonster","140");  
        }
        else if(monsterActual == "Pléonasme Géant"){
            setText("monster", "Pléonasme Géant :");
            setText("hpMonster","220");
            setText("separBar"," / ");
            setText("hpMaxMonster","220");  
        }
        else if(monsterActual == "Fantôme de la Syntaxe"){
            setText("monster", "Fantôme de la Syntaxe :");
            setText("hpMonster","500");
            setText("separBar"," / ");
            setText("hpMaxMonster","500");  
        }

        eventActual = "fight";
        setText("narration","");
        refreshBars();
        document.getElementById("hpMonsterBar").style.display = "block";
        document.getElementById("pass").style.display = "none";
        document.getElementById("launchSpell1").style.display = "block";
        if(document.getElementById("spell2").innerText=="Accord Fatal"){
            document.getElementById("launchSpell2").style.display = "block";}
            else{document.getElementById("launchSpell2").style.display = "none";}
        if(document.getElementById("spell3").innerText=="Pluie de Ponctuation"){
            document.getElementById("launchSpell3").style.display = "block";}
            else{document.getElementById("launchSpell3").style.display = "none";}
    }
    else if(eventActual == "monster turn intro"){
        if(monsterActual == "Malédiction de la Triple Négation"){
            setText("narration", "La Malédiction de la Triple Négation tente de contre-attaquer !");
        }
        else if(monsterActual == "Verbe Irrégulier Sauvage"){
            setText("narration", "Le Verbe Irrégulier Sauvage tente de contre-attaquer !");
        }
        else if(monsterActual == "Dictionnaire Obscur"){
            setText("narration", "Le Dictionnaire Obscur tente de contre-attaquer !");
        }
        else if(monsterActual == "Pléonasme Géant"){
            setText("narration", "Le Pléonasme Géant tente de contre-attaquer !");
        }
        else if(monsterActual == "Fantôme de la Syntaxe"){
            setText("narration", "Le Fantôme de la Syntaxe tente de contre-attaquer !!");
        }
        setText("attackText","");
        eventActual = "monster turn attack";
    }
    else if(eventActual == "monster turn attack"){
        if(monsterActual == "Malédiction de la Triple Négation"){
            setText("narration","La Malédiction de la Triple Négation vous inflige 3 points de dégats");
            textMinus("hp",3);refreshBars();  
        }
        else if(monsterActual == "Verbe Irrégulier Sauvage"){
            setText("narration","Le Verbe Irrégulier Sauvage vous inflige 15 points de dégats");
            textMinus("hp",15);refreshBars();
        }
        else if(monsterActual == "Dictionnaire Obscur"){
            setText("narration","Le Dictionnaire Obscur vous inflige 25 points de dégats");
            textMinus("hp",25);refreshBars();
        }
        else if(monsterActual == "Pléonasme Géant"){
            setText("narration","Le Pléonasme Géant vous inflige 35 points de dégats");
            textMinus("hp",35);refreshBars();
        }
        else if(monsterActual == "Fantôme de la Syntaxe"){
            setText("narration","Le Fantôme de la Syntaxe vous inflige 50 points de dégats");
            textMinus("hp",50);refreshBars();
        }
        eventActual = "fight";
        if(parseInt(document.getElementById("hp").innerHTML)<1){
            gameOver();
        }
    }
    else if (eventActual == "fight")
    {
        setText("narration","Le combat continue !");
        document.getElementById("test").value = "";
        document.getElementById("pass").style.display = "none";
        document.getElementById("launchSpell1").style.display = "block";
        if(document.getElementById("spell2").innerText=="Accord Fatal"){
        document.getElementById("launchSpell2").style.display = "block";}
        else{document.getElementById("launchSpell2").style.display = "none";}
        if(document.getElementById("spell3").innerText=="Pluie de Ponctuation"){
        document.getElementById("launchSpell3").style.display = "block";}
        else{document.getElementById("launchSpell3").style.display = "none";}
    }
    else if(eventActual == "monster dead"){
        if(monsterActual == "Malédiction de la Triple Négation"){
            setText("narration","La Malédiction de la Triple Négation a été vaincue et retourne hanter des apprentis grammairiens !");
            setText("attackText","Félicitations ! Vous avez gagné 35 d'xp et 10 pièces d'or !");
            textPlus("gold",10);
            textPlus("exp",35);
      
        }
        else if(monsterActual == "Verbe Irrégulier Sauvage"){
            setText("narration","Le Verbe Irrégulier Sauvage a été vaincu et retourne hanter des apprentis grammairiens !");
            setText("attackText","Félicitations ! Vous avez gagné 50 d'xp et 30 pièces d'or !");
            textPlus("gold",30);
            textPlus("exp",50);
        }
        else if(monsterActual == "Dictionnaire Obscur"){
            setText("narration","Le Dictionnaire Obscur a été vaincu et retourne hanter des apprentis grammairiens !");
            setText("attackText","Félicitations ! Vous avez gagné 75 d'xp et 50 pièces d'or !");
            textPlus("gold",50);
            textPlus("exp",75);
        }
        else if(monsterActual == "Pléonasme Géant"){
            setText("narration","Le Pléonasme Géant a été vaincue et retourne hanter des apprentis grammairiens !");
            setText("attackText","Félicitations ! Vous avez gagné 75 d'xp et 100 pièces d'or !");
            textPlus("gold",100);
            textPlus("exp",75);
        }
        else if(monsterActual == "Fantôme de la Syntaxe"){
            setText("narration","Le Fantôme de la Syntaxe a été vaincu , vous êtes le maître incontestable de la grammaire et personne ne peut vous battre !");
            setText("attackText","Félicitations ! Vous avez gagné 200 d'xp et 2500 pièces d'or !");
            textPlus("gold",250);           
            textPlus("exp",200);
        }

        if (up()==true){
            upLevel(); // ICI LE UP DE NIVEAU   
            alert('Vous venez de passer au niveau suivant : vos stats ont augmenté !');
        }
        setText("hp",parseInt(document.getElementById("hpMax").innerText));
        refreshBars();
        eventActual = "combat end";
    }
    else if(eventActual == "combat end"){
        setText("narration","");setText("attackText","");
        setText("monster","");setText("hpMonster","");setText("separBar","");setText("hpMaxMonster","");
        document.getElementById("hpMonsterBar").style.display = "none";
        eventActual = "init";
        document.getElementById("imgMonster").style.display = "none";
        goVillage();
    }
}
function attack1(){
    attackActual = 1;
    if (eventActual == "fight"){
        setText("narration","Vous tentez de corriger une faute d'orthographe sur votre adversaire");
        testActual = getRandomInt(1,10);
        document.getElementById("test").value = "";
        if (testActual == 1){
            setText("attackText","Quelle est la bonne orthographe de ce mot dans la phrase : 'Elle est ____ à l'école.' ? (allée/allé)");
        } // "allée/allé"
        else if(testActual == 2){
            setText("attackText","Comment écrit-on correctement ce mot : 'Les oiseaux ___ dans le ciel.' ? (volent/voles)");
        } // "volent/voles"
        else if(testActual == 3){
            setText("attackText","Complétez cette phrase avec la bonne orthographe : 'Il a ___ ses devoirs avant de sortir.' (fait/faits)");
        } // "fait/faite"
        else if(testActual == 4){
            setText("attackText","Quel est le mot correctement orthographié dans cette phrase : 'Elle a ___ le livre sur la table.' ? (mis/mit)");
        } // "mis/mi"
        else if(testActual == 5){
            setText("attackText","Quel est le mot correct : 'Les préparatifs de la fête ___ terminés.' ? (sont/son)");
        } // "préparatif/préparatifs
        else if(testActual == 6){
            setText("attackText","Quel est le bon mot à utiliser : 'Les enfants ___ dans le jardin.' ? (jouent/joue)");
        } // "jouent/joue"
        else if(testActual == 7){
            setText("attackText","Quelle est la bonne orthographe dans cette phrase : 'Elle a acheté du _____.' ? (pain/pin)");
        } // "pain/pain"
        else if(testActual == 8){
            setText("attackText","Quel mot doit-on utiliser ici : 'La voiture ___ très vite.' ? (allait/allé)");
        } // "allé/alle"
        else if(testActual == 9){
            setText("attackText","Quelle est la bonne orthographe dans cette phrase : 'Il a ___ ses clés.' ? (perdu/perdus)");
        } // "perdu/perdu"
        else if(testActual == 10){
            setText("attackText","Quel est le mot correct dans cette phrase : 'Le livre est ___ sur la table.' ? (posé/posée)");
        } // "posé/posée"
        
        document.getElementById("launchSpell1").style.display = "none";
        document.getElementById("launchSpell2").style.display = "none";
        document.getElementById("launchSpell3").style.display = "none";
        document.getElementById("test").style.display = "block";
        document.getElementById("validate").style.display = "block";
    }
}
function attack2(){
    attackActual = 2;
    if (eventActual=="fight"){
        setText("narration","Vous vous préparez à corriger les erreurs grammaticales des ennemis, leur infligeant une confusion mortelle. !");
        document.getElementById("test").value = "";
        testActual = getRandomInt(1,10);
        
        if(testActual==1){
            setText("attackText","Quelle est la bonne orthographe du mot dans la phrase suivante : 'Elle ___ ravie de sa réussite.' ? (est/et)");
        } // "est/éte" (correction : "est")
        else if(testActual==2){
            setText("attackText","Complétez la phrase avec le bon mot : 'Le président ___ d'accord avec cette décision.' ? (était/été)");
        } // "était/étaient" (correction : "était")
        else if(testActual==3){
            setText("attackText","Quel est le mot correctement orthographié dans cette phrase : 'Les oiseaux ____ chaque année.' ? (migres/migrent)");
        } // "que/qu'ils" (correction : "qu'ils")
        else if(testActual==4){
            setText("attackText","Complétez la phrase avec la bonne orthographe : 'Ils ___ aller au concert ce soir.' ? (pourraient/pouraient)");
        } // "pouvaient/pouvait" (correction : "pouvaient")
        else if(testActual==5){
            setText("attackText","Quelle est la bonne orthographe dans cette phrase : 'La question a été ___ par le professeur.' ? (résolu/résolue)");
        } // "résolu/résolue" (correction : "résolue")
        else if(testActual==6){
            setText("attackText","Quel est le bon choix ici : 'La voiture ___ garée devant la maison.' ? (été/était)");
        } // "est/était" (correction : "est")
        else if(testActual==7){
            setText("attackText","Complétez la phrase correctement : 'Le chef a demandé à ce que la réunion ___ avant midi.' ? (soit/soie)");
        } // "soit/soient" (correction : "soit")
        else if(testActual==8){
            setText("attackText","Quel mot faut-il utiliser ici : 'La maison ___ trois étages.' ? (a/as)");
        } // "a/ont" (correction : "a")
        else if(testActual==9){
            setText("attackText","Quelle est l'orthographe correcte dans cette phrase : 'L'orchestre a ___ pendant trois heures.' ? (joué/jouait)");
        } // "pendant/pendant que" (correction : "pendant")
        else if(testActual==10){
            setText("attackText","Quel est le bon mot à choisir : 'Les enfants ___ partis en vacances.' ? (sont/son)");
        } // "sont/son" (correction : "sont")
        
        document.getElementById("launchSpell1").style.display = "none";
        document.getElementById("launchSpell2").style.display = "none";
        document.getElementById("launchSpell3").style.display = "none";
        document.getElementById("test").style.display = "block";
        document.getElementById("validate").style.display = "block";
    }
}
function attack3(){
    attackActual = 3;
    if (eventActual=="fight"){
        setText("narration","Vous préparez une Pluie de Ponctuation :Une tempête de points, virgules et points-virgules s’abat sur les adversaires, infligeant des dégâts perçants !");
        document.getElementById("test").value = "";
        testActual = getRandomInt(1,10);
        
        if(testActual==1){
            setText("attackText","Quel est l'accord correct du participe passé dans la phrase suivante : 'Les documents qu'elle a ___ lire sont importants.' ? (pu/pus)");
        } // "lire" (correction : "lus")
        else if(testActual==2){
            setText("attackText","Complétez correctement cette phrase : 'Les décisions que nous avons ___ étaient cruciales.' ? (prises/prisent)");
        } // "prendre" (correction : "prises")
        else if(testActual==3){
            setText("attackText","Dans cette phrase, quel est l'accord du participe passé : 'Les photos que j'ai ___ sont magnifiques.' ? (prises/prise)");
        } // "prenez" (correction : "prises")
        else if(testActual==4){
            setText("attackText","Complétez la phrase avec le bon choix : 'Les critiques qu'ils ont ___ étaient injustes.' ? (eues/eu)");
        } // "avoir" (correction : "eues")
        else if(testActual==5){
            setText("attackText","Dans la phrase suivante, quelle est la bonne conjugaison du participe passé : 'Les livres que nous avons ___ sont en promotion.' ? (achetés/achetait)");
        } // "acheter" (correction : "achetés")
        else if(testActual==6){
            setText("attackText","Quel est l'accord correct du mot dans la phrase : 'Les animaux qu’ils ont ___ sont de race pure.' ? (élevés/élevé)");
        } // "élevé" (correction : "élevés")
        else if(testActual==7){
            setText("attackText","Complétez correctement la phrase : 'Les articles qu'elle a ___ sont en solde.' ? (achetée/achetés)");
        } // "lire" (correction : "lus")
        else if(testActual==8){
            setText("attackText","Quel est l'accord correct dans cette phrase : 'Les résultats que vous avez ___ sont impressionnants.' ? (analysé/analysés)");
        } // "analyser" (correction : "analysés")
        else if(testActual==9){
            setText("attackText","Complétez cette phrase correctement : 'Les options que nous avons ___ n’étaient pas adaptées.' ? (choisies/choisi)");
        } // "choisir" (correction : "choisies")
        else if(testActual==10){
            setText("attackText","Dans cette phrase, quelle est la bonne orthographe : 'Les leçons que j'ai ___ m’ont beaucoup appris.' ? (suivies/suivi)");
        } // "suivi" (correction : "suivies")
        
        document.getElementById("launchSpell1").style.display = "none";
        document.getElementById("launchSpell2").style.display = "none";
        document.getElementById("launchSpell3").style.display = "none";
        document.getElementById("test").style.display = "block";
        document.getElementById("validate").style.display = "block";
    }
}

function validate(){
    if (eventActual == "fight" && attackActual == 1){
        if (testActual == 1 && document.getElementById("test").value == "allée"){
            winFight();
        }
        else if (testActual == 2 && document.getElementById("test").value == "volent"){
            winFight();
        }
        else if (testActual == 3 && document.getElementById("test").value == "fait"){
            winFight();
        }
        else if (testActual == 4 && document.getElementById("test").value == "mis"){
            winFight();
        }
        else if (testActual == 5 && document.getElementById("test").value == "sont"){
            winFight();
        }
        else if (testActual == 6 && document.getElementById("test").value == "jouent"){
            winFight();
        }
        else if (testActual == 7 && document.getElementById("test").value == "pain"){
            winFight();
        }
        else if (testActual == 8 && document.getElementById("test").value == "allait"){
            winFight();
        }
        else if (testActual == 9 && document.getElementById("test").value == "perdu"){
            winFight();
        }
        else if (testActual == 10 && document.getElementById("test").value == "posé"){
            winFight();
        }
        else{
            loseFight();
        }
    }
    else if (eventActual == "fight" && attackActual == 2){
        if (testActual == 1 && document.getElementById("test").value == "est"){
            winFight();
        }
        else if (testActual == 2 && document.getElementById("test").value == "était"){
            winFight();
        }
        else if (testActual == 3 && document.getElementById("test").value == "migrent"){
            winFight();
        }
        else if (testActual == 4 && document.getElementById("test").value == "pourraient"){
            winFight();
        }
        else if (testActual == 5 && document.getElementById("test").value == "résolue"){
            winFight();
        }
        else if (testActual == 6 && document.getElementById("test").value == "était"){
            winFight();
        }
        else if (testActual == 7 && document.getElementById("test").value == "soit"){
            winFight();
        }
        else if (testActual == 8 && document.getElementById("test").value == "a"){
            winFight();
        }
        else if (testActual == 9 && document.getElementById("test").value == "joué"){
            winFight();
        }
        else if (testActual == 10 && document.getElementById("test").value == "sont"){
            winFight();
        }
        else{
            loseFight();
        }
    }
    else if (eventActual == "fight" && attackActual == 3){
        if (testActual == 1 && document.getElementById("test").value == "pu"){
            winFight();
        }
        else if (testActual == 2 && document.getElementById("test").value == "prises"){
            winFight();
        }
        else if (testActual == 3 && document.getElementById("test").value == "prises"){
            winFight();
        }
        else if (testActual == 4 && document.getElementById("test").value == "eues"){
            winFight();
        }
        else if (testActual == 5 && document.getElementById("test").value == "achetés"){
            winFight();
        }
        else if (testActual == 6 && document.getElementById("test").value == "élevés"){
            winFight();
        }
        else if (testActual == 7 && document.getElementById("test").value == "achetés"){
            winFight();
        }
        else if (testActual == 8 && document.getElementById("test").value == "analysés"){
            winFight();
        }
        else if (testActual == 9 && document.getElementById("test").value == "choisies"){
            winFight();
        }
        else if (testActual == 10 && document.getElementById("test").value == "suivies"){
            winFight();
        }
        else{
            loseFight();
        }
    }
}
function winFight(){
    setText("narration","");
        let degat = 0;
        if (attackActual == 1){
            degat = parseInt(document.getElementById("atk").innerText)
        }
        else if (attackActual == 2){
            degat = parseInt(document.getElementById("atk").innerText)*2
        }
        else if (attackActual == 3){
            degat = parseInt(document.getElementById("atk").innerText)*3
        }
        degat = degat.toString();
        setText("attackText","Vous attaquez l'adversaire et infligez " + degat +" points de dégats !");
        degat = parseInt(degat);
        textMinus("hpMonster",degat);refreshBars();
        document.getElementById("launchSpell1").style.display = "none";
        document.getElementById("launchSpell2").style.display = "none";
        document.getElementById("launchSpell3").style.display = "none";
        document.getElementById("test").style.display = "none";
        document.getElementById("validate").style.display = "none";
        document.getElementById("pass").style.display = "block";
        if (parseInt(document.getElementById("hpMonster").innerText)<1){
            eventActual ="monster dead";
            
        }
        else{
            eventActual="monster turn intro";
        }
}
function loseFight(){
    setText("narration","");
        setText("attackText","Vous ratez lamentablement et perdez 2 hp !");
        textMinus("hp",2);refreshBars();
        let hpPercent = parseInt(document.getElementById('hp').textContent)/parseInt(document.getElementById('hpMax').textContent)*100;
        document.getElementById("hpBar").style.width = `${hpPercent}%`;
        document.getElementById("launchSpell1").style.display = "none";
        document.getElementById("launchSpell2").style.display = "none";
        document.getElementById("launchSpell3").style.display = "none";
        document.getElementById("test").style.display = "none";
        document.getElementById("validate").style.display = "none";
        document.getElementById("pass").style.display = "block";
        eventActual="monster turn intro";
}
function getRandomInt(min, max) {
    min = Math.ceil(min); // Arrondir vers le haut pour inclure la borne inférieure
    max = Math.floor(max); // Arrondir vers le bas pour inclure la borne supérieure
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}
function upLevel(){

    xp = parseInt(document.getElementById("exp").innerText);
    lvl = parseInt(document.getElementById("level").innerText );

    if (xp>99 && lvl == 1){
        document.getElementById("level").innerText = "2";
        textPlus("hpMax",10);textPlus("atk",2);
        document.getElementById("expNextLevel").innerText = "200";
    }
    else if (xp>199 && lvl == 2){
        document.getElementById("level").innerText = "3";
        textPlus("hpMax",15);textPlus("atk",2);
        document.getElementById("spell2").innerText = "Accord Fatal";
        document.getElementById("expNextLevel").innerText = "300";
    }
    else if (xp>299 && lvl == 3){
        document.getElementById("level").innerText = "4";
        textPlus("hpMax",20);textPlus("atk",2);
        document.getElementById("expNextLevel").innerText = "400";
    }
    else if (xp>399 && lvl == 4){
        document.getElementById("level").innerText = "5";
        textPlus("hpMax",25);textPlus("atk",2);
        document.getElementById("expNextLevel").innerText = "500";
    }
    else if (xp>499 && lvl == 5){
        document.getElementById("level").innerText = "6";
        textPlus("hpMax",30);textPlus("atk",2);
        document.getElementById("expNextLevel").innerText = "600";
    }
    else if (xp>599 && lvl == 6){
        document.getElementById("level").innerText = "7";
        textPlus("hpMax",35);textPlus("atk",2);
        document.getElementById("spell3").innerText = "Pluie de Ponctuation";
        document.getElementById("expNextLevel").innerText = "700";
    }
    else if (xp>699 && lvl == 7){
        document.getElementById("level").innerText = "8";
        textPlus("hpMax",40);textPlus("atk",2);
        document.getElementById("expNextLevel").innerText = "800";

    }
    else if (xp>799 && lvl == 8){
        document.getElementById("level").innerText = "9";
        textPlus("hpMax",45);textPlus("atk",2);
        document.getElementById("expNextLevel").innerText = "900";
    }
    else if (xp>899 && lvl == 9){
        document.getElementById("level").innerText = "10";
        textPlus("hpMax",50);textPlus("atk",2);
        document.getElementById("expNextLevel").innerText = "1000";
    }
    else if (xp>999 && lvl == 10){
        document.getElementById("level").innerText = "MAX";
        textPlus("hpMax",55);textPlus("atk",2);
        document.getElementById("expNextLevel").innerText = "MAX";
    }
}
function up(){
    xp = parseInt(document.getElementById("exp").innerText);
    lvl = parseInt(document.getElementById("level").innerText );
    if (xp>99 && lvl == 1){
        return true;
    }
    else if (xp>199 && lvl == 2){
        return true;
    }
    else if (xp>299 && lvl == 3){
        return true;
    }
    else if (xp>399 && lvl == 4){
        return true;
    }
    else if (xp>499 && lvl == 5){
        return true;
    }
    else if (xp>599 && lvl == 6){
        return true;
    }
    else if (xp>699 && lvl == 7){
        return true;
    }
    else if (xp>799 && lvl == 8){
        return true;
    }
    else if (xp>899 && lvl == 9){
        return true;
    }
    else if (xp>999 && lvl == 10){
        return true;
    }
    else{
        return false;
    }
}
function gameOver() {
    // Cache le contenu du jeu
    const gameContainer = document.getElementById("gameContainer");
    gameContainer.style.display = "none";

    // Crée une boîte pour le message de défaite
    const loseBox = document.createElement("div");
    loseBox.style.position = "absolute";
    loseBox.style.top = "50%";
    loseBox.style.left = "50%";
    loseBox.style.transform = "translate(-50%, -50%)";
    loseBox.style.backgroundImage = "url('parchment_background.png')"; // Image de fond style parchemin
    loseBox.style.backgroundSize = "cover";
    loseBox.style.border = "5px solid #8b4513"; // Couleur brun antique
    loseBox.style.borderRadius = "15px";
    loseBox.style.padding = "30px";
    loseBox.style.textAlign = "center";
    loseBox.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.6)";
    loseBox.style.fontFamily = "'MedievalSharp', cursive"; // Police médiévale (importez depuis Google Fonts ou autre)
    loseBox.style.color = "#4c2600"; // Couleur brun foncé

    // Ajoute un message
    const message = document.createElement("p");
    message.textContent = "Hélas, vous avez échoué à rétablir l'équilibre grammatical. Vous êtes désormais la risée de la grammaire, il ne vous reste plus qu'à vous mettre aux mathématiques !";
    message.style.fontSize = "20px";
    message.style.fontWeight = "bold";
    message.style.marginBottom = "20px";
    loseBox.appendChild(message);

    // Ajoute une image
    const loseImage = document.createElement("img");
    loseImage.src = "lose.jpg"; // Assurez-vous que cette image est accessible dans votre projet
    loseImage.alt = "Défaite";
    loseImage.style.maxWidth = "500px";
    loseImage.style.maxHeight = "500px";
    loseImage.style.marginTop = "10px";
    loseBox.appendChild(loseImage);

    // Ajoute la boîte au corps du document
    document.body.appendChild(loseBox);
}
