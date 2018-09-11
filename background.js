chrome.runtime.onMessage.addListener(message => {
  switch (message.type) {
    case "download":
      const option = message.value;

      chrome.downloads.download({
        url: option.url,
        filename: option.name,
        saveAs: (option.saveAs === undefined) ? true : option.saveAs
      }, e => console.log(e));
      break;
  }
});
