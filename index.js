chrome.runtime.onInstalled.addListener(() => {
  
  console.log('onUpdated');
  
  var bkg = chrome.extension.getBackgroundPage();
  bkg.console.log('onInstalled');

});


extensionApi.tabs.onUpdated.addListener(function (tabId, info, tab) {
  console.log('onUpdated');
  var bkg = chrome.extension.getBackgroundPage();
  bkg.console.log('onUpdated');
});

extensionApi.tabs.onActivated.addListener(function (activeInfo) {
  console.log('onActivated');
  var bkg = chrome.extension.getBackgroundPage();
  bkg.console.log('onActivated');
});