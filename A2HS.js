var deferredPrompt;
var installAlertOpen = true;

const installShadow = document.querySelector(".install-shadow");
const installButton = document.querySelector(".install-button");
const dismissButton = document.querySelector(".dismiss-button");

if (installAlertOpen == true) {
    window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault();
        // Stash the event so it can be triggered later.
        deferredPrompt = e;

        installShadow.style.display = "block";

        installButton.addEventListener('click', (e) => {
            installShadow.style.display = "none";
            // Show the prompt
            deferredPrompt.prompt();
            // Wait for the user to respond to the prompt
            deferredPrompt.userChoice.then((choiceResult) => {

                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the A2HS prompt');
                    installAlertOpen = false
                } else {
                    console.log('User dismissed the A2HS prompt');
                    installAlertOpen = false
                }
                deferredPrompt = null;
            })
        })
    })
}

dismissButton.addEventListener("click", function () {
    installShadow.style.display = "block";
    installAlertOpen = false;
})