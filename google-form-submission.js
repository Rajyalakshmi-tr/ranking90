/**
 * Google Form Submission Handler
 * This script submits form data to Google Forms and handles the response
 *
 * Setup:
 * 1. Create a Google Form with the required fields
 * 2. Get the Form ID and Field IDs
 * 3. Update the FORM_CONFIG below with your values
 */

const FORM_CONFIG = {
  // Your Google Form ID (from the URL)
  // URL format: https://docs.google.com/forms/d/e/FORM_ID/viewform
  FORM_ID: 'YOUR_FORM_ID_HERE',

  // Field IDs - These need to be extracted from your Google Form
  // To get field IDs: Inspect the Google Form HTML or use the Google Forms API
  FIELD_IDS: {
    universityName: 'entry.xxxxx',      // Replace with actual field ID
    contactEmail: 'entry.xxxxx',        // Replace with actual field ID
    country: 'entry.xxxxx',             // Replace with actual field ID
    dataCategory: 'entry.xxxxx',        // Replace with actual field ID
    description: 'entry.xxxxx'          // Replace with actual field ID
  },

  // Success message to show after submission
  SUCCESS_MESSAGE: 'Thank you! Your data has been submitted successfully.',

  // Redirect URL after successful submission (optional)
  REDIRECT_URL: null
};

/**
 * Submit form data to Google Forms
 * @param {FormData} formData - The form data to submit
 * @returns {Promise} Promise that resolves when submission is complete
 */
function submitToGoogleForm(formData) {
  return new Promise((resolve, reject) => {
    // Build the form URL
    const formUrl = `https://docs.google.com/forms/d/e/${FORM_CONFIG.FORM_ID}/formResponse`;

    // Create a new FormData object for Google Forms
    const googleFormData = new FormData();

    // Map form fields to Google Form field IDs
    googleFormData.append(FORM_CONFIG.FIELD_IDS.universityName, formData.get('universityName'));
    googleFormData.append(FORM_CONFIG.FIELD_IDS.contactEmail, formData.get('contactEmail'));
    googleFormData.append(FORM_CONFIG.FIELD_IDS.country, formData.get('country'));
    googleFormData.append(FORM_CONFIG.FIELD_IDS.dataCategory, formData.get('dataCategory'));
    googleFormData.append(FORM_CONFIG.FIELD_IDS.description, formData.get('description'));

    // Submit using fetch
    fetch(formUrl, {
      method: 'POST',
      mode: 'no-cors', // Required for Google Forms
      body: googleFormData
    })
    .then(() => {
      // Google Forms doesn't return a response in no-cors mode
      // We assume success if no network error occurred
      resolve({ success: true });
    })
    .catch(error => {
      reject(error);
    });
  });
}

/**
 * Handle form submission with Google Forms integration
 * @param {Event} event - The form submit event
 */
async function handleGoogleFormSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const submitButton = form.querySelector('button[type="submit"]');

  // Disable submit button and show loading state
  submitButton.disabled = true;
  submitButton.textContent = 'Submitting...';

  try {
    // Submit to Google Forms
    await submitToGoogleForm(formData);

    // Show success message
    alert(FORM_CONFIG.SUCCESS_MESSAGE);

    // Reset form
    form.reset();

    // Close modal if in a modal
    if (typeof closeModal === 'function') {
      closeModal('datahubModal');
    }

    // Redirect if configured
    if (FORM_CONFIG.REDIRECT_URL) {
      window.location.href = FORM_CONFIG.REDIRECT_URL;
    }

  } catch (error) {
    console.error('Submission error:', error);
    alert('Error submitting form. Please try again or contact admin@trranking.com');
  } finally {
    // Re-enable submit button
    submitButton.disabled = false;
    submitButton.textContent = 'Submit Data';
  }
}

/**
 * Alternative: Use hidden iframe for submission (more reliable)
 * @param {FormData} formData - The form data to submit
 */
function submitViaHiddenIframe(formData) {
  const formUrl = `https://docs.google.com/forms/d/e/${FORM_CONFIG.FORM_ID}/formResponse`;

  // Create hidden iframe
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  iframe.name = 'google-form-iframe';
  document.body.appendChild(iframe);

  // Create form for submission
  const form = document.createElement('form');
  form.action = formUrl;
  form.method = 'POST';
  form.target = 'google-form-iframe';

  // Add form fields
  const inputMap = {
    universityName: formData.get('universityName'),
    contactEmail: formData.get('contactEmail'),
    country: formData.get('country'),
    dataCategory: formData.get('dataCategory'),
    description: formData.get('description')
  };

  for (const [field, value] of Object.entries(inputMap)) {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = FORM_CONFIG.FIELD_IDS[field];
    input.value = value;
    form.appendChild(input);
  }

  // Submit form
  document.body.appendChild(form);
  form.submit();

  // Clean up after delay
  setTimeout(() => {
    document.body.removeChild(iframe);
    document.body.removeChild(form);
    alert(FORM_CONFIG.SUCCESS_MESSAGE);
  }, 1000);
}

/**
 * Get Google Form Field IDs
 * This function helps you extract field IDs from your Google Form
 *
 * Instructions:
 * 1. Open your Google Form in preview mode
 * 2. Right-click and "Inspect Element"
 * 3. Look for input fields with names like "entry.xxxxx"
 * 4. Copy the entry.xxxxx values for each field
 */
function getFieldIds() {
  console.log('To get field IDs:');
  console.log('1. Open your Google Form in preview mode');
  console.log('2. Right-click and inspect the form fields');
  console.log('3. Look for input elements with name="entry.xxxxx"');
  console.log('4. Copy these entry IDs and update FORM_CONFIG');
}

// Export functions for use in HTML
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    submitToGoogleForm,
    handleGoogleFormSubmit,
    submitViaHiddenIframe,
    getFieldIds
  };
}
