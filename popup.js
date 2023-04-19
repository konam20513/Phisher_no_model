document.getElementById('phish-check').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'phishCheck' }, (response) => {
      document.getElementById('result').innerText = `Phishing check result: ${response.result}`;
    });
});
  
document.getElementById('summarize').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'summarize' }, (response) => {
      document.getElementById('result').innerText = `Summarization result: ${response.summary}`;
    });
});