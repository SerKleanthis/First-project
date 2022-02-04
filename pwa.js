'use strict';

// Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').catch(function (error) {
      // registration failed
      console.log('Registration failed with ' + error);
  });
}

// PWA 
var defferedPrompt;
const addButton = document.getElementById('A2HS');
// addButton.style.display = 'none';

window.addEventListener('beforeinstallprompt', function(e) {
  e.preventDefault();
  defferedPrompt = e;
  addButton.style.visibility = 'visible';
  addButton.addEventListener('click', function() {
  
    defferedPrompt.prompt();

    defferedPrompt.userChoice.then(function(choiceResult) {
      if (choiceResult.outcome === 'accepted') {
        addButton.style.visibility = 'hidden';
        defferedPrompt = null;
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      // defferedPrompt = null;
    });
  });
});

window.addEventListener('appinstalled', function () {
  addButton.style.visibility = 'hidden';
  defferedPrompt = null;
  console.log('PWA was installed');
});

var myApp = {};

  