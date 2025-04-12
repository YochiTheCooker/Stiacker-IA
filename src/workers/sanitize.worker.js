
import DOMPurify from 'dompurify';

self.onmessage = (event) => {
  const dirtyHtml = event.data;
  if (typeof dirtyHtml !== 'string') {
    // Handle cases where the message might not be what we expect
    console.error('Worker received non-string data:', dirtyHtml);
    // Optionally send back an error or a default safe value
    self.postMessage(''); 
    return;
  }
  try {
    const cleanHtml = DOMPurify.sanitize(dirtyHtml);
    self.postMessage(cleanHtml);
  } catch (error) {
    console.error('Error sanitizing HTML in worker:', error);
    // Send back a safe, generic error message or empty string
    self.postMessage('Error processing content.'); 
  }
};
