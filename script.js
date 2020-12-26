var depUrl;
var request = new XMLHttpRequest();
var depFind;
var depCode;
var depName = "...";
var acaUrl;
var acaFind;
var acaName = "...";
var zone = "...";
var vacUrl;
var vacFind;
var vacDate;
var selectedVac = "Prochaines vacances";
var date = new Date();
var schoolYear;
var vacArray = [];
var vacLeftTime;
var daysLeft;
var hoursLeft;
var minutesLeft;
var secondsLeft;
var keyboardOpen = false;
var dateMode = "timer";

const locateBlockShadow = document.querySelector(".shadow");
const searchInput = document.querySelector(".search-input");
const suggestionsPanel = document.querySelector(".suggestions");
const endLocation = document.querySelector(".end-location");
const vacSelect = document.querySelector(".vacation-select");
const timer = document.querySelector(".timer");
const timerBox = document.querySelector(".timer-box");
const locateBlock = document.querySelector(".locate-block");
const text = document.querySelector(".text");
const depText = document.querySelector("#dep-name");
const acaText = document.querySelector("#aca-name");
const zoneText = document.querySelector("#zone");

const departements = [
    {name: "Ain (01)"},
    {name: "Aisne (02)"},
    {name: "Allier (03)"},
    {name: "Alpes-de-Haute-Provence (04)"},
    {name: "Hautes-Alpes (05)"},
    {name: "Alpes-Maritimes (06)"},
    {name: "Ardèches (07)"},
    {name: "Ardennes (08)"},
    {name: "Ariège (09)"},
    {name: "Aube (10)"},
    {name: "Aude (11)"},
    {name: "Aveyron (12)"},
    {name: "Bouches-du-Rhône (13)"},
    {name: "Calvados (14)"},
    {name: "Cantal (15)"},
    {name: "Charente (16)"},
    {name: "Charente-Maritime (17)"},
    {name: "Cher (18)"},
    {name: "Corrèze (19)"},
    {name: "Côte-d'Or (21)"},
    {name: "Côtes d'Armor (22)"},
    {name: "Creuse (23)"},
    {name: "Dordogne (24)"},
    {name: "Doubs (25)"},
    {name: "Drôme (26)"},
    {name: "Eure (27)"},
    {name: "Eure-et-Loir (28)"},
    {name: "Finistère (29)"},
    {name: "Gard (30)"},
    {name: "Haute-Garonne (31)"},
    {name: "Gers (32)"},
    {name: "Gironde (33)"},
    {name: "Hérault (34)"},
    {name: "Ille-et-Vilaine (35)"},
    {name: "Indre (36)"},
    {name: "Indre-et-Loire (37)"},
    {name: "Isère (38)"},
    {name: "Jura (39)"},
    {name: "Landes (40)"},
    {name: "Loir-et-Cher (41)"},
    {name: "Loire (42)"},
    {name: "Haute-Loire (43)"},
    {name: "Loire-Atlantique (44)"},
    {name: "Loiret (45)"},
    {name: "Lot (46)"},
    {name: "Lot-et-Garonne (47)"},
    {name: "Lozère (48)"},
    {name: "Maine-et-Loire (49)"},
    {name: "Manche (50)"},
    {name: "Marne (51)"},
    {name: "Haute-Marne (52)"},
    {name: "Mayenne (53)"},
    {name: "Meurthe-et-Moselle (54)"},
    {name: "Meuse (55)"},
    {name: "Morbihan (56)"},
    {name: "Moselle (57)"},
    {name: "Nièvre (58)"},
    {name: "Nord (59)"},
    {name: "Oise (60)"},
    {name: "Orne (61)"},
    {name: "Pas-de-Calais (62)"},
    {name: "Puy-de-Dôme (63)"},
    {name: "Pyrénées-Atlantiques (64)"},
    {name: "Hautes-Pyrénées (65)"},
    {name: "Pyrénées-Orientales (66)"},
    {name: "Bas-Rhin (67)"},
    {name: "Haut-Rhin (68)"},
    {name: "Rhône (69)"},
    {name: "Haute-Saône (70)"},
    {name: "Saône-et-Loire (71)"},
    {name: "Sarthe (72)"},
    {name: "Savoie (73)"},
    {name: "Haute-Savoie (74)"},
    {name: "Paris (75)"},
    {name: "Seine-Maritime (76)"},
    {name: "Seine-et-Marne (77)"},
    {name: "Yvelines (78)"},
    {name: "Deux-Sèvres (79)"},
    {name: "Somme (80)"},
    {name: "Tarn (81)"},
    {name: "Tarn-et-Garonne (82)"},
    {name: "Var (83)"},
    {name: "Vaucluse (84)"},
    {name: "Vendée (85)"},
    {name: "Vienne (86)"},
    {name: "Haute-Vienne (87)"},
    {name: "Vosges (88)"},
    {name: "Yonne (89)"},
    {name: "Territoire de Belfort (90)"},
    {name: "Essonne (91)"},
    {name: "Hauts-de-Seine (92)"},
    {name: "Seine-St-Denis (93)"},
    {name: "Val-de-Marne (94)"},
    {name: "Val-D'Oise (95)"},
    {name: "Guadeloupe (971)"},
    {name: "Martinique (972)"},
    {name: "Guyane (973)"},
    {name: "La Réunion (974)"},
    {name: "Mayotte (976)"}
];

//envoie de requete
function RequestSend(url){
    request.open("GET", url);
    request.responseType = "json";
    request.send();
}

//renseignement ou modification du département
function Locate(){
    //localisation
    function success(position) {
        console.log("geolocation success");
    
        var latitude  = position.coords.latitude;
        var longitude = position.coords.longitude;
    
        console.log("latitude : " + latitude);
        console.log("longitude : " + longitude);
    
        depUrl = "https://api-adresse.data.gouv.fr/reverse/?lon=" + longitude +"&lat=" + latitude;

        RequestSend(depUrl);
    }
      
    function error() {
        console.log("geolocation error")
    }
      
    if (!navigator.geolocation) {
        console.log("geolocation not supported")
    } else {
        console.log("locating...")
        navigator.geolocation.getCurrentPosition(success, error);
    }
    
    request.onload = function() {
        depFind = request.response;
        console.log(depFind);
    
        FindDep();
    }
    //recuperation du departement correspondant a la position
    function FindDep(){
        depCode = depFind["features"][0]["properties"]["postcode"].substring(0, 2);
        depName = depFind["features"][0]["properties"]["context"].split(", ")[1];
        console.log("code département : " + depCode);
        console.log("nom département : " + depName);
        searchInput.value = depName + " (" + depCode + ")"; // Papa : que se passe t il s'il ne trouve pas le département. Il faut par exemple mettre un département par défaut
    }

    locateBlockShadow.style.display = "block";

    //fonctionnement de la liste des départements

    //quand on modifie le texte
    searchInput.addEventListener("keyup", function() {
        var input = searchInput.value;
        suggestionsPanel.innerHTML = "";
        
        var suggestions = departements.filter(function(departement) {
            return departement.name.startsWith(input);
        });

        suggestions.forEach(function(suggested) {
            const div = document.createElement("div");
            div.onclick = "EndLocation()";
            div.innerHTML = suggested.name;
            suggestionsPanel.appendChild(div);

            //quand on selectionne un departement
            div.addEventListener("click", function(){
                depName = suggested.name.substring(0, suggested.name.length -5);
                depCode = suggested.name.substring(suggested.name.length -1, suggested.name.length -3);
                searchInput.value = suggested.name;
                console.log(depName);
                console.log(depCode);

                EndLocation();
            });
        });

        if (input === "") {
            suggestionsPanel.innerHTML = "";  
        }
    })
    //quand on clique sur l'input
    searchInput.addEventListener("click", function() {
        var input = searchInput.value;
        suggestionsPanel.innerHTML = "";
        
        var suggestions = departements.filter(function(departement) {
            return departement.name.startsWith(input);
        });

        suggestions.forEach(function(suggested) {
            const div = document.createElement("div");
            div.onclick = "EndLocation()";
            div.innerHTML = suggested.name;
            suggestionsPanel.appendChild(div);

            //quand on selectionne un departement
            div.addEventListener("click", function(){
                depName = suggested.name.substring(0, suggested.name.length -5);
                depCode = suggested.name.substring(suggested.name.length -1, suggested.name.length -3);
                searchInput.value = suggested.name;
                console.log(depName);
                console.log(depCode);

                EndLocation();
            });
        });

        if (input === "") {
            suggestionsPanel.innerHTML = "";  
        }
    })
}

//quand on clique sur terminer
function EndLocation(){
    if(depCode == null){
        alert("Veuillez renseigner votre département");
    }
    else{
        locateBlockShadow.style.display = "none";

        //creation de l'url du referenciel geographique
        acaUrl = "https://data.enseignementsup-recherche.gouv.fr/api/records/1.0/search/?dataset=fr-esr-referentiel-geographique&q=&rows=1&facet=aca_nom&facet=dep_code&refine.dep_code=" + depCode;
        RequestSend(acaUrl);
        //recuperation de l'academie
        request.onload = function() {
            acaFind = request.response;
            console.log(acaFind);

            acaName = acaFind["records"][0]["fields"]["aca_nom"];
            console.log(acaName);

            VacationFind();
        }
    }
    
}

function FindSchoolYear() {
    var year = date.getFullYear();
    var lastYear = date.getFullYear() - 1;
    var nextYear = date.getFullYear() + 1;

    if(date.getMonth() < 8){
        schoolYear = lastYear + "-" + year;
    }
    else{
        schoolYear = year + "-" + nextYear;
    }

    console.log("année scolaire : " + schoolYear);
}

//quand on clique sur la liste des vacances
function vacChange(){
    selectedVac = vacSelect.options[vacSelect.selectedIndex].text;
    console.log(selectedVac);

    if(selectedVac == "Prochaines vacances"){
        vacUrl = "https://data.education.gouv.fr/api/records/1.0/search/?dataset=fr-en-calendrier-scolaire&q=&facet=start_date&facet=location&facet=annee_scolaire&refine.annee_scolaire=" + schoolYear + "&refine.location=" + acaName + "&exclude.population=Enseignants";
        RequestSend(vacUrl);

        request.onload = function(){
            vacFind = request.response;
            console.log(vacFind);
            vacArray = [];

            for (var i = 0; i < vacFind["records"].length; i++){
                vacArray.push(new Date(vacFind["records"][i]["fields"]["start_date"]));
            }
            console.log(vacArray);

            vacArray = [...vacArray].sort(function(a, b) {
                return a - b;
            });
            console.log(vacArray);

            vacDate = vacArray.find(element => element > date);
            console.log(vacDate);

            zone = vacFind["records"][0]["fields"]["zones"];
            console.log(zone);
        }
    }
    else{
        vacUrl = "https://data.education.gouv.fr/api/records/1.0/search/?dataset=fr-en-calendrier-scolaire&q=&rows=15&facet=start_date&facet=location&facet=annee_scolaire&facet=population&facet=description&facet=end_date&refine.annee_scolaire=" + schoolYear + "&refine.location=" + acaName + "&refine.description=" + selectedVac + "&exclude.population=Enseignants";
        RequestSend(vacUrl);
        
        request.onload = function(){
            vacFind = request.response;
            console.log(vacFind);

            vacDate = new Date(vacFind["records"][0]["fields"]["start_date"]);
            console.log(vacDate);

            zone = vacFind["records"][0]["fields"]["zones"];
            console.log(zone);
        }
    }
}
function VacationFind() {
    if(selectedVac == "Prochaines vacances"){ // Papa : mets en facteur, avant le "if" tout ce que tu peux. vacUrm est la même dans le "if" et dans le "else"
        vacUrl = "https://data.education.gouv.fr/api/records/1.0/search/?dataset=fr-en-calendrier-scolaire&q=&facet=start_date&facet=location&facet=annee_scolaire&refine.annee_scolaire=" + schoolYear + "&refine.location=" + acaName + "&exclude.population=Enseignants";
        RequestSend(vacUrl);

        request.onload = function(){
            vacFind = request.response;
            console.log(vacFind);
            vacArray = [];

            for (var i = 0; i < vacFind["records"].length; i++){
                vacArray.push(new Date(vacFind["records"][i]["fields"]["start_date"]));
            }
            console.log(vacArray);

            vacArray = [...vacArray].sort(function(a, b) {
                return a - b;
            });
            console.log(vacArray);

            vacDate = vacArray.find(element => element > date);
            console.log(vacDate); // Papa : à sortir du "if"

            zone = vacFind["records"][0]["fields"]["zones"];
            console.log(zone);
        }
    }
    else{
        vacUrl = "https://data.education.gouv.fr/api/records/1.0/search/?dataset=fr-en-calendrier-scolaire&q=&rows=15&facet=start_date&facet=location&facet=annee_scolaire&facet=population&facet=description&facet=end_date&refine.annee_scolaire=" + schoolYear + "&refine.location=" + acaName + "&refine.description=" + selectedVac + "&exclude.population=Enseignants" ;
        RequestSend(vacUrl);
        
        request.onload = function(){
            vacFind = request.response;
            console.log(vacFind);

            vacDate = new Date(vacFind["records"][0]["fields"]["start_date"]);
            console.log(vacDate);

            zone = vacFind["records"][0]["fields"]["zones"];
            console.log(zone);
        }
    }
}

setInterval(printTime, 1000);

function DateDiff(date1, date2){
    var tmp = date2 - date1;

    tmp = Math.floor(tmp / 1000);
    secondsLeft = tmp % 60;

    tmp = Math.floor((tmp - secondsLeft) / 60);
    minutesLeft = tmp % 60;

    tmp = Math.floor((tmp - minutesLeft) / 60);
    hoursLeft = tmp % 24;

    tmp = Math.floor((tmp - hoursLeft) / 24);
    daysLeft = tmp;

    if(isNaN(secondsLeft)){
        secondsLeft = "00";
    }
    if(isNaN(minutesLeft)){
        minutesLeft = "00";
    }
    if(isNaN(hoursLeft)){
        hoursLeft = "00";
    }
    if(isNaN(daysLeft)){
        daysLeft = "00";
    }
}

function printTime(){
    date = new Date;
    DateDiff(date, vacDate);

    if(Math.sign(vacDate - date) < 1){
        dateMode = "date";

        if(selectedVac == "Pont de l'Ascension"){
            text.innerHTML = "Le " + selectedVac + " est passé depuis le :"
        }else{
            text.innerHTML = "Les " + selectedVac + " sont passées depuis le :"
        }
    }else{
        if(dateMode == "date"){
            if(selectedVac == "Pont de l'Ascension"){
                text.innerHTML = "Le " + selectedVac + " est le :"
            }else{
                text.innerHTML = "Les " + selectedVac + " sont le :"
            }
        }else{
            if(selectedVac == "Pont de l'Ascension"){
                text.innerHTML = "Le " + selectedVac + " est dans :"
            }else{
                text.innerHTML = "Les " + selectedVac + " sont dans :"
            }
        }
    }

    if(dateMode == "timer"){
        if(daysLeft == 1){
            timer.innerHTML = daysLeft + " jour - " + hoursLeft + " h - " + minutesLeft + " min";
        }
        else{
            timer.innerHTML = daysLeft + " jours - " + hoursLeft + " h - " + minutesLeft + " min";
        }
    }
    else{
        var frenchDate = vacDate.toLocaleString('fr-FR',{
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
        timer.innerHTML = frenchDate.charAt(0).toUpperCase() + frenchDate.substr(1)
    }
    if(depText != undefined && acaText != undefined && zoneText != undefined){
        depText.innerHTML = "Département : " + depName;
        acaText.innerHTML = "Académie : " + acaName;
        zoneText.innerHTML = "Zone : " + zone;
    }
}

window.onresize = function(){
    if(keyboardOpen == false){
        keyboardOpen = true;
        locateBlock.classList.add("locate-block1");
    }
    else{
        keyboardOpen = false;
        locateBlock.classList.remove("locate-block1");
    }
}

function ChangeDateMode(){
    if(dateMode == "timer"){
        dateMode = "date";
        console.log(dateMode);
    }
    else if(dateMode == "date" && Math.sign(vacDate - date) == 1){
        dateMode = "timer";
        console.log(dateMode);
    }
}