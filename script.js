chrome.browserAction.onClicked.addListener(function (tab) {
  const script = `document.write("<HTML><HEAD></HEAD><FRAMESET COLS=\'50%25,*\'><FRAME src='${tab.url}' /><FRAME src='${tab.url}' /></FRAMESET></HTML>")`;

  // TODO: 有的页面如 chrome://extensions 执行无效
  chrome.tabs.executeScript({
    code: script,
  });
});

chrome.webRequest.onHeadersReceived.addListener(
  function (details) {
    for (var i = 0; i < details.responseHeaders.length; ++i) {
      // 移除响应头的 x-frame-options 以使页面可以展示在 frame 中。
      if (details.responseHeaders[i].name.toLowerCase() == 'x-frame-options') {
        details.responseHeaders.splice(i, 1);
      }
    }
    return {
      responseHeaders: details.responseHeaders,
    };
  }, {
    urls: ["<all_urls>"]
  }, ["blocking", "responseHeaders"]);