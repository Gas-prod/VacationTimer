window.addEventListener('beforeinstallprompt', (e) => {
    var triggerEvent = e;
    this.showPromptToInstall = true;

    triggerEvent.prompt();

    //user response
    triggerEvent.userChoice.then((response) => {
        if (response.outcome === 'accepted') {
            console.log('A2HS accepted');
        } 
        else{
            console.log('A2HS refused');
        }
    })
})
triggerEvent = null;