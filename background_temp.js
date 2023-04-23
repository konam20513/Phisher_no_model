async function checkPhishing(emailContent) {
    // const response = await fetch('http://127.0.0.1:5000/check_phishing', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email: emailContent }),
    // });
  
    // const result = await response.json();
    console.log('checkPhishing() called');
    return JSON.stringify({
      "result": "phishing"
    })
  }
  
  async function summarizeEmail(emailContent) {
    // const response = await fetch('http://127.0.0.1:5000/summarize', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email: emailContent }),
    // });
  
    // const summary = await response.json();
    // return summary;
    console.log('summarizeEmail() called');
    return JSON.stringify({
      "result": "summarize"
    })
  }
  
  async function getAccessToken() {
    return new Promise((resolve, reject) => {
      chrome.identity.getAuthToken({ interactive: true }, (token) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(token);
        }
      });
    });
  }
  
  async function getEmailContent() {
    // const accessToken = await getAccessToken();
    // const response = await fetch('https://www.googleapis.com/gmail/v1/users/me/messages?q=in:inbox', {
    //   headers: {
    //     Authorization: `Bearer ${accessToken}`,
    //   },
    // });
    // const data = await response.json();
    // const emailId = data.messages[0].id;
  
    // const emailResponse = await fetch(`https://www.googleapis.com/gmail/v1/users/me/messages/${emailId}`, {
    //   headers: {
    //     Authorization: `Bearer ${accessToken}`,
    //   },
    // });
    // const emailData = await emailResponse.json();
    // const emailContent = emailData.snippet;
  
    // return emailContent;
    console.log('getEmailContent() called');
    return "qwertyuiopasdfghjklzxcvbnm";
  }
  
  
  /*chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'phishCheck' || request.action === 'summarize') {
      getEmailContent().then(async (emailContent) => {
        if (request.action === 'phishCheck') {
          const result = await checkPhishing(emailContent);
          sendResponse({ action: 'phishCheckResult', result: result });
        } else if (request.action === 'summarize') {
          const summary = await summarizeEmail(emailContent);
          sendResponse({ action: 'summarizeResult', summary: summary });
        }
      });
      return true; // Indicate the response will be sent asynchronously.
    }
  });*/
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'checkPhishing') {
      getEmailContent().then(async (emailContent) => {
        const result = await checkPhishing(emailContent);
        sendResponse({ result: result });
      });
      return true;
    } else if (request.action === 'summarizeEmail') {
      getEmailContent().then(async (emailContent) => {
        const summary = await summarizeEmail(emailContent);
        sendResponse({ summary: summary });
      });
      return true;
    }
  });