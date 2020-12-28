importScripts("/VacationTimer/sw-toolbox.js");
toolbox.precache([
    "/VacationTimer/index.html", 
    "/VacationTimer/style.css", 
    "/VacationTimer/img/arrow_icon.svg", 
    "/VacationTimer/img/location_icon.svg", 
    "/VacationTimer/img/location_icon2.svg", 
    "/VacationTimer/icon/192x192.png", 
    "/VacationTimer/icon/512x512.png"
])

toolbox.router.get("/*", toolbox.networkFirst, {
    networkTimeoutSeconds: 5
})