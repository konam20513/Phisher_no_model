/*document.getElementById('checkPhishing').addEventListener('click', () => {
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
});*/


document.getElementById('checkPhishing').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'checkPhishing' }, (response) => {
    let result;
    try {
      result = JSON.parse(response);
    } catch (err) {
      result = { error: 'Invalid response' };
    }
    if (result.error) {
      document.getElementById('result').innerText = `Error: ${result.error}`;
    } else {
      document.getElementById('result').innerText = `Result: ${result.result}`;
    }
  });
});

document.getElementById('summarizeEmail').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'summarizeEmail' }, (response) => {
    let summary;
    try {
      summary = JSON.parse(response);
    } catch (err) {
      summary = { error: 'Invalid response' };
    }
    if (summary.error) {
      document.getElementById('result').innerText = `Error: ${summary.error}`;
    } else {
      document.getElementById('result').innerText = `Summary: ${summary.summary}`;
    }
  });
});