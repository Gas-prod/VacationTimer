const swToolbox = require("./sw-toolbox");

importScripts("sw-toolbox.js");
toolbox.precache(["index.html", "style.css"]);

toolbox.rooter.get("/*", toolbox.networkFirst, {
    networkTimroutSeconds: 5
})