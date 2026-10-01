const contactForm = document.getElementById('contact-form');
const contactButton = document.getElementById('contact-submit');
const contactStatus = document.getElementById('contact-status');
const contactEmail = contactForm.dataset.contactEmail.trim();

function contactMessage(message, color = 'var(--muted)') {
  contactStatus.textContent = message;
  contactStatus.style.color = color;
}

contactForm.addEventListener('submit', event => {
  event.preventDefault();
  if (!contactEmail || !contactForm.reportValidity()) return;
  const fields = ['c-name', 'c-email', 'c-msg'].map(id => document.getElementById(id));
  if (fields.some(field => !field.value.trim())) {
    contactMessage('Please fill in all fields.', '#FCA5A5');
    return;
  }
  const subject = encodeURIComponent(`ToolsNowPro contact from ${fields[0].value.trim()}`);
  const body = encodeURIComponent(`Name: ${fields[0].value.trim()}\nEmail: ${fields[1].value.trim()}\n\n${fields[2].value.trim()}`);
  window.location.href = `mailto:${encodeURIComponent(contactEmail)}?subject=${subject}&body=${body}`;
  contactMessage('Your email app should now be open. Press Send there to deliver the message.', 'var(--success)');
});
