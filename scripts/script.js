// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;
const home = { name: 'home' };
const settings = { name: 'settings' };

// Make sure you register your service worker here too
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  let counter = 1;
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        document.querySelector('main').appendChild(newPost);

        // Entries
        let count = counter;
        newPost.addEventListener('click', () => {
          let entries = { name: 'entries', entry: newPost.entry, entryNum: count }
          history.pushState(entries, '', '#entry' + count);
          setState(entries);
        });
        counter++;
      });
    });
});

// Home Page
document.querySelector('header h1').addEventListener('click', () => {
  history.pushState(home, '', location.origin);
  setState(home);
});

// Settings 
document.querySelector('header img').addEventListener('click', () => {
  history.pushState(settings, '', '#settings');
  setState(settings);
});

window.onpopstate = function(event) {
  setState(event.state);
}