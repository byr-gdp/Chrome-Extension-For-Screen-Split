chrome.browserAction.onClicked.addListener(function (tab) {
  const script = `document.write("<HTML><HEAD></HEAD><FRAMESET COLS=\'50%25,*\'><FRAME src='${tab.url}' /><FRAME src='${tab.url}' /></FRAMESET></HTML>")`;

  // Note: 有的页面如 chrome://extensions 执行无效
  chrome.tabs.executeScript({
    code: script,
  });
});

chrome.webRequest.onHeadersReceived.addListener(
  function (details) {
    // 移除 csp、x-frame-options 以显示 frame，但在 GitHub 和 StackOverflow 等站点，会判断 top 是否等于 Window，从而 alert 并刷新页面。
    details.responseHeaders = details.responseHeaders.filter((item) => {
      return item.name !== 'Content-Security-Policy' && item.name !== 'X-Frame-Options';
    });

    return {
      responseHeaders: details.responseHeaders,
    };
  }, {
    urls: ["<all_urls>"]
  }, ["blocking", "responseHeaders"]);