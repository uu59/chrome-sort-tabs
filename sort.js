function sortTabs(prop){
  prop = prop || "url";
  chrome.tabs.query({currentWindow: true}, function(tabs){
    tabs.sort(function(a,b){
      return a[prop] == b[prop] ? 0 : (a[prop] < b[prop] ? -1 : 1);
    });
    tabs.forEach(function(tab){
      chrome.tabs.move(tab.id, {index: -1});
    });
  });
}

chrome.browserAction.onClicked.addListener(function(tab){
  var prop = prompt('Sort tabs with (url / title):', "url");
  if(!prop || !tab[prop]) {
    return ;
  }
  sortTabs(prop);
});
