// Initialisation du score
let score = 0;
let price = 0;
let customers = 600;
let day = 1;
let month = 1;
let year = 1;
let fatigue = 10;
let employees = 0;
let cabinet = 1;
let profil = "youngblood";

// Sélection des éléments DOM
const scoreElement = document.getElementById('score');
const priceElement = document.getElementById('price');
const customersElement = document.getElementById('customers');
const dayElement = document.getElementById('day');
const monthElement = document.getElementById('month');
const yearElement = document.getElementById('year');
const fatigueElement = document.getElementById('fatigue');
const employeesElement = document.getElementById('employees');
const cabinetElement = document.getElementById('cabinet');

const increaseButton = document.getElementById('increaseButton');
const increasePriceButton = document.getElementById('increasePriceButton');
const decreasePriceButton = document.getElementById('decreasePriceButton');
const restButton = document.getElementById('restButton');
const openCabinetButton = document.getElementById('openCabinetButton');
const infoButton = document.getElementById('infoButton');
const automationButton = document.getElementById('automationButton');
const stopAutomationButton = document.getElementById('stopAutomationButton');
const menuButton = document.getElementById("menuButton");


// Fonction pour augmenter le score
function increaseScore() {
    if(fatigue > -10){
        if (customers > 0){
        score = score + price * employees + price;
        customers -= 1 + employees;
        fatigue --;
        scoreElement.textContent = score; // Met à jour l'affichage du score
        customersElement.textContent = customers;
        fatigueElement.textContent = fatigue;
        if (score > 0 && score < 10000){document.getElementById('imageProfil').src = 'image/youngblood.jpg';}
        else if (score > -10000 && score < 0){document.getElementById('imageProfil').src = 'image/pauvre.jpg';}
        else if (score > 50000 && score < 100000){document.getElementById('imageProfil').src = 'image/requin.jpg';}
        else if (score > 100000 && score < 1000000){document.getElementById('imageProfil').src = 'image/shark.jpg';}
        else if (score > 1000000 && score < 1000000000){document.getElementById('imageProfil').src = 'image/wolf.jpg';}
        document.getElementById('imageActivity').src = 'image/work.jpg';
        }
        else {alert("Vous n'avez plus de clients disponibles, revenez le mois prochain !")}
    }else{
        alert("Vous êtes victime d'un burn-out !  Les Frais médicaux s'élèvent à 100 euros.") 
        score -= 100;
        scoreElement.textContent = score;
    }
}

// Fonction pour augmenter le prix
function increasePrice() {
    if (day == 1){
    price++;
    customers = (-15*price+600)*cabinet;
    customersElement.textContent = customers;
    priceElement.textContent = price; // Met à jour l'affichage du score
    document.getElementById('imageActivity').src = 'image/price.jpg';
    }
    else{alert("Vous ne pouvez définir les prix que le premier du mois")}
}


// Fonction pour diminuer le prix
function decreasePrice() {
    if (day == 1){
    price--;
    customers = (-15*price+600)*cabinet;
    customersElement.textContent = customers;
    priceElement.textContent = price; // Met à jour l'affichage du score
    document.getElementById('imageActivity').src = 'image/price.jpg';
    }
    else{alert("Vous ne pouvez définir les prix que le premier du mois")}
}

function rest(){
    if (day < 30){
        fatigue = 10;
        day ++;
        fatigueElement.textContent = fatigue;
        dayElement.textContent = day;
    }
    else{
        fatigue = 10;
        day = 1;
        month ++;
        score -= 2000 * employees;
        customers = (-15*price+600)*cabinet;
        customersElement.textContent = customers;
        fatigueElement.textContent = fatigue;
        dayElement.textContent = day;
        monthElement.textContent = month;
        scoreElement.textContent = score;
    }
    if(month == 13){
        year ++;
        month = 1;
        monthElement.textContent = month;
        yearElement.textContent = year;
    }
    document.getElementById('imageActivity').src = 'image/rest.jpg';
}

function hire() {
    
    if (score > 1000){
    score -=1000;
    employees +=1;
    employeesElement.textContent = employees;
    scoreElement.textContent = score;
    document.getElementById('imageActivity').src = 'image/hire.jpg';
    }else {alert("Vous n'avez pas assez de fonds disponibles !")}
}

function openCabinet() {
    if (score > 10000){
        score -= 10000;
        scoreElement.textContent = score;
        cabinet += 1;
        cabinetElement.textContent = cabinet;
        document.getElementById('imageActivity').src = 'image/opening.jpg';
    } else{alert("Revenez quand vous aurez plus de fonds disponibles !")  
    }
}

function giveInfo() {
    alert("Bienvenue dans Idle-Compta, Dans ce jeu vous incarnez un Expert Comptable qui rêve de devenir riche. Pour cela vous pouvez passer des écritures comptables et embaucher de nouveaux collaborateurs pour vous aider. Très rapidement vous devrez ouvrir de nouveaux cabinets pour atteindre plus de clients. Gérez bien vos ressources et attention à bien vous reposer. Vous pouvez utiliser les raccourcis suivants : écritures P  se reposer R  et + - pour ajuster les tarifs. Embaucher un collaborateur coute 1000€ puis 2000€ par mois, ouvrir un nouveau cabinet coute 10 000€. Bon jeu !!")
}


// Ajout d'un écouteur d'événements au bouton
increaseButton.addEventListener('click', increaseScore);
increasePriceButton.addEventListener('click', increasePrice);
decreasePriceButton.addEventListener('click', decreasePrice);
restButton.addEventListener('click', rest);
hireButton.addEventListener('click', hire);
openCabinetButton.addEventListener('click', openCabinet);
infoButton.addEventListener('click', giveInfo);

document.addEventListener('keydown', (event) => {
    // Vérification si la touche est pressée (insensible à la casse)
    if (event.key.toLowerCase() === "p") {
        increaseScore();  // Appel de la fonction
    }
    if (event.key.toLowerCase() === "r") {
        rest();  // Appel de la fonction
    }
    if (event.key.toLowerCase() === "+") {
        increasePrice();  // Appel de la fonction
    }
    if (event.key.toLowerCase() === "-") {
        decreasePrice();  // Appel de la fonction
    }
});

let compteur = 0;
let intervalID = null; // Variable pour stocker l'ID de l'intervalle

// Fonction pour démarrer l'intervalle
function automationLaunch() {
    // Vérifie si l'intervalle est déjà en cours
    if (intervalID === null) {
        intervalID = setInterval(() => {
            if (fatigue > 0 && document.getElementById("customers").textContent>50){increaseScore();}
            else {rest();}
            document.getElementById('imageActivity').src = 'image/workOffice.jpg';
            
        }, 500);
        console.log("Compteur démarré.");
    }
}

// Fonction pour arrêter l'intervalle
function automationStop() {
    if (intervalID !== null) {
        clearInterval(intervalID);
        intervalID = null; // Réinitialise l'ID de l'intervalle pour pouvoir le redémarrer
    }
}

function backToMenu(){
    window.location.href = "jeux.html";    
}

// Ajoute les écouteurs d'événements aux boutons
automationButton.addEventListener("click", automationLaunch);
stopAutomationButton.addEventListener("click", automationStop);
menuButton.addEventListener("click", backToMenu);
