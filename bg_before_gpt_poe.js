chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'phishCheck' || request.action === 'summarize') {
      getEmailContent().then(async (emailContent) => {
        if (request.action === 'phishCheck') {
          const result = await checkPhishing(emailContent);
          return { action: 'phishCheckResult', result: result };
        } else if (request.action === 'summarize') {
          const summary = await summarizeEmail(emailContent);
          return { action: 'summarizeResult', summary: summary };
        }
      }).then(response => sendResponse(response));
  
      return true; // Indicate the response will be sent asynchronously.
    }
  });