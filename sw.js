importScripts("https://gas-prod.github.io/VacationTimer/sw-toolbox.js");
toolbox.precache([
    "https://gas-prod.github.io/VacationTimer/index.html", 
    "https://gas-prod.github.io/VacationTimer/style.css", 
    "https://gas-prod.github.io/VacationTimer/img/arrow_icon.svg", 
    "https://gas-prod.github.io/VacationTimer/img/location_icon.svg", 
    "https://gas-prod.github.io/VacationTimer/img/location_icon2.svg", 
    "https://gas-prod.github.io/VacationTimer/icon/192x192.png", 
    "https://gas-prod.github.io/VacationTimer/icon/512x512.png"
]);

/*toolbox.router.get("/*", toolbox.networkFirst, {
    networkTimeoutSeconds: 5
})*/