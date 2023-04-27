document.getElementById('checkPhishing').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'checkPhishing' }, (response) => {
    document.getElementById('result').innerText = `Phishing check result: ${response}`; 
  });
});

document.getElementById('summarizeEmail').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'summarizeEmail' }, (response) => {
    document.getElementById('result').innerText = `Summarization result: ${response}`; 
  }); 
});


