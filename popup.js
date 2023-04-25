document.getElementById('checkPhishing').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'checkPhishing' }, (response) => {
    if (response && response.error) {
      document.getElementById('result').innerText = `Error: ${response.error}`;
    } else {
      document.getElementById('result').innerText = `Phishing check result: ${response}`;
    }
  });
});

document.getElementById('summarizeEmail').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'summarizeEmail' }, (response) => {
    if (response && response.error) {
      document.getElementById('result').innerText = `Error: ${response.error}`;
    } else {
      document.getElementById('result').innerText = `Summarization result: ${response}`;
    }
  }); 
});