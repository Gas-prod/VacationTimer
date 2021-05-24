var deferredPrompt;
var installAlertOpen = true;

const installBlock = document.querySelector(".install-alert");
const installButton = document.querySelector(".install-button");
const dismissButton = document.querySelector(".dismiss-button");

window.addEventListener('beforeinstallprompt', (e) => {
    if(installAlertOpen == true){
        // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;

    installBlock.style.display = "block";

    installButton.addEventListener('click', (e) => {
        // Show the prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {

            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the A2HS prompt');
                installAlertOpen = false;
                installBlock.style.display = "none";
            } else {
                console.log('User dismissed the A2HS prompt');
                installAlertOpen = false;
                installBlock.style.display = "none";
            }
            deferredPrompt = null;
        })
    })
    }
})

dismissButton.addEventListener("click", function () {
    installBlock.style.display = "none";
    installAlertOpen = false;
})