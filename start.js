var s = document.createElement('script');
s.src = chrome.runtime.getURL('prefill.js');
s.defer = true;
s.onload = function() {
    this.remove();
};
(document.head || document.documentElement).appendChild(s);