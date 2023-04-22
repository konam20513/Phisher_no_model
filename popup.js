chrome.runtime.onInstalled.addListener(() => {
  document.getElementById('checkPhishing').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'checkPhishing' }, (response) => {
      document.getElementById('result').innerText = `Phishing check result: ${response.result}`;
    });
  });
});


chrome.runtime.onInstalled.addListener(() => {
  document.getElementById('summarizeEmail').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'summarizeEmail' }, (response) => {
      //document.getElementById('result').innerText = `Summarization result: ${response.result}`;
      console.log(response);
    });
  });
});