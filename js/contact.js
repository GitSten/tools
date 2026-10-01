const contactForm = document.getElementById('contact-form');
const contactButton = document.getElementById('contact-submit');
const contactStatus = document.getElementById('contact-status');
const contactEndpoint = contactForm.dataset.endpoint.trim();
const contactConfigured = /^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/.test(contactEndpoint);
let contactSending = false;

function contactMessage(message, color = 'var(--muted)') {
  contactStatus.textContent = message;
  contactStatus.style.color = color;
}

if (contactConfigured) {
  contactButton.disabled = false;
  contactMessage('Your name, email, and message will be sent through Formspree.');
}

contactForm.addEventListener('submit', async event => {
  event.preventDefault();
  if (!contactConfigured || contactSending || !contactForm.reportValidity()) return;
  const fields = ['c-name', 'c-email', 'c-msg'].map(id => document.getElementById(id));
  if (fields.some(field => !field.value.trim())) {
    contactMessage('Please fill in all fields.', '#FCA5A5');
    return;
  }
  contactSending = true;
  contactButton.disabled = true;
  contactButton.textContent = 'Sending…';
  fields.forEach(field => { field.readOnly = true; });
  contactMessage('Sending your message…');
  try {
    const response = await fetch(contactEndpoint, {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: fields[0].value.trim(), email: fields[1].value.trim(), message: fields[2].value.trim() }),
      signal: AbortSignal.timeout(20000)
    });
    const result = await response.json();
    if (!response.ok || result.ok !== true) throw new Error('Submission not confirmed');
    contactForm.reset();
    contactMessage('✓ Your message was accepted by our email service. Thank you for getting in touch.', 'var(--success)');
  } catch {
    contactMessage('Sending could not be confirmed. Your message is still here; please try again later.', '#FCA5A5');
  } finally {
    fields.forEach(field => { field.readOnly = false; });
    contactSending = false;
    contactButton.disabled = false;
    contactButton.textContent = 'Send Message';
  }
});
