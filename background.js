// Get access token  
let accessToken;

async function getAccessToken() {
  accessToken = await new Promise((resolve, reject) => {
    chrome.identity.getAuthToken({
      interactive: true,
      scopes: ['https://www.googleapis.com/auth/gmail.readonly']
    }, token => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        accessToken = token;
        resolve(token);
      }
    });
  });  
}

async function getCurrentViewedEmail() {
  //await getAccessToken();
  let message;
  await fetch(`https://www.googleapis.com/gmail/v1/users/me/messages/list?labelIds=INBOX&maxResults=1&access_token=${accessToken}`)
  .then(res => res.json())
  .then(data => {
    if (data.messages && data.messages.length > 0) {
      const messageId = data.messages[0].id;
      return fetch(`https://www.googleapis.com/gmail/v1/users/me/messages/${messageId}?access_token=${accessToken}`)
    }
  })
  .then(res => res.json())
  .then(data => {
    message = data;  
  });
  if (!message) {
    throw new Error('No emails found in the current view');
  } 
  return message; 
}


async function checkPhishing(sendResponse) {
  try {
    const message = await getCurrentViewedEmail();
    const emailContent = message.payload.parts[0].body.data;
    const response = await fetch('http://akhilo0o.pythonanywhere.com/checkPhishing', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: emailContent }),
    });
    const result = await response.json();
    sendResponse(JSON.stringify(result.result)); // Convert result to string
  } catch (err) {
    console.log(err);
    sendResponse(JSON.stringify(err)); // Convert error to string
  }
}



async function summarizeEmail(sendResponse) {
  try {
    const message = await getCurrentViewedEmail();
    const emailContent = message.payload.parts[0].body.data;
    const summaryLength = 0.3; // Change this value to the desired summary length
    const response = await fetch('http://akhilo0o.pythonanywhere.com/summarizeEmail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: emailContent, summary_length: summaryLength }),
    });
    const summary = await response.json();
    sendResponse(JSON.stringify(summary)); // Convert summary to string
  } catch (err) {
    console.log(err);
    sendResponse(JSON.stringify(err)); // Convert error to string
  } 
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'checkPhishing') {
    checkPhishing(result => {
      sendResponse(JSON.stringify(result));
    });
    return true;
  }
  if (request.action === 'summarizeEmail') {
    summarizeEmail(result => {
      sendResponse(JSON.stringify(result));
    });
    return true;
  }
});


