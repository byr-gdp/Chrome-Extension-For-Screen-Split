chrome.browserAction.onClicked.addListener(function(tab) {
  const script = `document.write("<HTML><HEAD></HEAD><FRAMESET COLS=\'50%25,*\'><FRAME src='${tab.url}' /><FRAME src='${tab.url}' /></FRAMESET></HTML>")`;

  // TODO: 有的页面如 chrome://extensions 执行无效
  chrome.tabs.executeScript({
    code: script,
  });
});