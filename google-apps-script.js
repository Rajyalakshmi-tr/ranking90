/**
 * Google Apps Script for Auto-Emailing CSV from Google Form Submissions
 *
 * Setup Instructions:
 * 1. Open your Google Sheet linked to the Google Form
 * 2. Go to Extensions > Apps Script
 * 3. Copy this entire code into the script editor
 * 4. Save the script
 * 5. Run setupTrigger() once to create the automatic trigger
 * 6. Authorize the script when prompted
 */

// Configuration
const CONFIG = {
  RECIPIENT_EMAIL: 'admin@trranking.com',
  EMAIL_SUBJECT: 'New University Data Submission - TR Rankings',
  EMAIL_BODY: 'A new university data submission has been received. Please find the CSV file attached.'
};

/**
 * Set up the automatic trigger for form submissions
 * Run this function once to initialize the trigger
 */
function setupTrigger() {
  // Remove existing triggers if any
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => {
    if (trigger.getHandlerFunction() === 'onFormSubmit') {
      ScriptApp.deleteTrigger(trigger);
    }
  });

  // Create new trigger for form submissions
  ScriptApp.newTrigger('onFormSubmit')
    .forSpreadsheet(SpreadsheetApp.getActiveSpreadsheet())
    .onFormSubmit()
    .create();

  Logger.log('Trigger setup complete. The script will now run automatically on form submissions.');
}

/**
 * Main function that runs when a form is submitted
 * @param {Object} e - The form submission event object
 */
function onFormSubmit(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const lastRow = sheet.getLastRow();

    // Get the latest submission data
    const data = sheet.getRange(lastRow, 1, 1, sheet.getLastColumn()).getValues()[0];

    // Create CSV content
    const csvContent = convertToCSV(sheet, lastRow);

    // Send email with CSV attachment
    sendEmailWithCSV(csvContent, data);

    Logger.log('Email sent successfully for submission at row ' + lastRow);
  } catch (error) {
    Logger.log('Error in onFormSubmit: ' + error.toString());
    // Send error notification
    MailApp.sendEmail({
      to: CONFIG.RECIPIENT_EMAIL,
      subject: 'ERROR: Google Form Submission Failed',
      body: 'An error occurred while processing a form submission:\n\n' + error.toString()
    });
  }
}

/**
 * Convert the latest row to CSV format
 * @param {Sheet} sheet - The spreadsheet sheet
 * @param {number} lastRow - The row number of the latest submission
 * @returns {string} CSV content
 */
function convertToCSV(sheet, lastRow) {
  // Get headers (row 1)
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

  // Get the latest submission data
  const data = sheet.getRange(lastRow, 1, 1, sheet.getLastColumn()).getValues()[0];

  // Add timestamp
  const timestamp = new Date().toISOString();

  // Combine headers and data
  const csvRows = [];

  // Add header row
  csvRows.push(['Timestamp', ...headers].join(','));

  // Add data row (convert any arrays or objects to strings)
  const rowData = [timestamp, ...data].map(value => {
    // Handle special CSV characters
    const stringValue = String(value || '');
    if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
      return '"' + stringValue.replace(/"/g, '""') + '"';
    }
    return stringValue;
  });
  csvRows.push(rowData.join(','));

  return csvRows.join('\n');
}

/**
 * Send email with CSV attachment
 * @param {string} csvContent - The CSV content as a string
 * @param {Array} data - The submission data for the email body
 */
function sendEmailWithCSV(csvContent, data) {
  // Create CSV blob
  const csvBlob = Utilities.newBlob(csvContent, 'text/csv', 'university_data_submission.csv');

  // Create email body with submission details
  const emailBody = CONFIG.EMAIL_BODY + '\n\n' +
    'Submission Details:\n' +
    '----------------\n' +
    'University Name: ' + (data[0] || 'N/A') + '\n' +
    'Contact Email: ' + (data[1] || 'N/A') + '\n' +
    'Country: ' + (data[2] || 'N/A') + '\n' +
    'Data Category: ' + (data[3] || 'N/A') + '\n' +
    'Description: ' + (data[4] || 'N/A') + '\n' +
    'Timestamp: ' + new Date().toLocaleString();

  // Send email
  MailApp.sendEmail({
    to: CONFIG.RECIPIENT_EMAIL,
    subject: CONFIG.EMAIL_SUBJECT,
    body: emailBody,
    attachments: [csvBlob]
  });
}

/**
 * Test function - manually trigger to test the email functionality
 * This will send the last submission as a test email
 */
function testEmail() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const lastRow = sheet.getLastRow();

  if (lastRow < 2) {
    Logger.log('No submissions to test with.');
    return;
  }

  const data = sheet.getRange(lastRow, 1, 1, sheet.getLastColumn()).getValues()[0];
  const csvContent = convertToCSV(sheet, lastRow);
  sendEmailWithCSV(csvContent, data);

  Logger.log('Test email sent.');
}

/**
 * Manual CSV export - exports all submissions to CSV and emails it
 * Can be run manually to get a complete export
 */
function exportAllToCSV() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const lastRow = sheet.getLastRow();

  if (lastRow < 2) {
    Logger.log('No submissions to export.');
    return;
  }

  // Get all data including headers
  const data = sheet.getRange(1, 1, lastRow, sheet.getLastColumn()).getValues();

  // Convert to CSV
  const csvRows = data.map(row => {
    return row.map(value => {
      const stringValue = String(value || '');
      if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
        return '"' + stringValue.replace(/"/g, '""') + '"';
      }
      return stringValue;
    }).join(',');
  });

  const csvContent = csvRows.join('\n');

  // Create CSV blob
  const csvBlob = Utilities.newBlob(csvContent, 'text/csv', 'all_submissions_' + new Date().toISOString().split('T')[0] + '.csv');

  // Send email
  MailApp.sendEmail({
    to: CONFIG.RECIPIENT_EMAIL,
    subject: 'Complete Export - All University Data Submissions',
    body: 'Attached is a complete export of all university data submissions from the Google Form.',
    attachments: [csvBlob]
  });

  Logger.log('Complete export email sent.');
}
