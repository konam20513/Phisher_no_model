function getEmailContent() {
    const emailElements = Array.from(document.querySelectorAll('div[role="listitem"]'));
      
    if (emailElements.length === 0) {
      emailElements.push(document.body);  // Fallback to entire body text
    }
      
    const emailContent = emailElements.map(el => el.innerText).join('\n');
    return emailContent || '';  // Return empty string if falsy 
}


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'extractEmailContent') {
      const emailContent = getEmailContent();
      sendResponse(emailContent);
    } else if (request.action === 'phishCheckResult') {
      // Handle the phishing check result.
      console.log('Phishing check result:', request.result);
    } else if (request.action === 'summarizeResult') {
      // Handle the summarization result.
      console.log('Summarization result:', request.summary);
    }
});