// Load credentials 
fetch('/credentials.json')
  .then(response => response.json())
  .then(credentials => {
    // Use credentials
  })

// Check if email is phishing
async function checkPhishing(emailContent) {
  const response = fetch('http://127.0.0.1:5000/check_phishing', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: emailContent }),
  });
  result =  response.json();
  return result.result; 
}

// Summarize email 
async function summarizeEmail(emailContent) {
  const response = fetch('http://127.0.0.1:5000/summarize', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: emailContent }),
  });

  const summary = response.json();
  return summary;
}

// Get access token 
async function getAccessToken() {
  return new Promise((resolve, reject) => {
    chrome.identity.getAuthToken({
      interactive: true,
      scopes: ['https://www.googleapis.com/auth/gmail.readonly']
    }, (token) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(token);
      }
    });
  });
}

// Refresh access token 
async function refreshAccessToken(accessToken) {
  const response = await fetch('https://www.googleapis.com/oauth2/v4/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `client_id=${credentials.client_id}&client_secret=${credentials.client_secret}&refresh_token=${accessToken}&grant_type=refresh_token` 
  });
  const data = await response.json();
  return data.access_token; 
}

// Get email content 
async function getEmailContent() {
  try { 
    const accessToken = await getAccessToken();
    const newToken = await refreshAccessToken(accessToken);
    
    // Register event listener
    gmail.events.on("message.opened", async () => {
      try {
        // Get opened message ID
        const messageId = await gmail.messages.get({
          userId: "me",
          id: gmail.messageId
        });
        
        // Get full message content
        const { data } = await gmail.users.messages.get({
          userId: "me", 
          id: messageId.id,
          auth: newToken  // Use refreshed access token
        });
        
        return data.message;  
      } catch (error) {
        console.error(JSON.stringify(error));
      }
    });
  } catch (error) {
    console.error(JSON.stringify(error));
  }
}
 

// Listen for messages from extension
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'checkPhishing') {
    getEmailContent().then(async emailContent => {
      const result = checkPhishing(emailContent);
      sendResponse({result});
    });
    return true; 
  } 
  if (request.action === 'summarizeEmail') {
    getEmailContent().then(async emailContent => {
      const summary = summarizeEmail(emailContent);
      sendResponse({summary});
    });
    return true; 
  }
});


