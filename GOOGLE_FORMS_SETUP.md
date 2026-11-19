# Google Forms & Sheets Integration Setup Guide

This guide will help you set up automatic CSV email delivery to admin@trranking.com when users submit university data.

## Prerequisites
- Google Account
- Access to Google Forms and Google Sheets

## Step-by-Step Setup

### Step 1: Create Google Form

1. Go to [forms.google.com](https://forms.google.com)
2. Click "+ Blank" to create a new form
3. Title it: "University Data Submission - TR Rankings"
4. Add the following questions:

   **Question 1: University Name**
   - Type: Short answer
   - Required: Yes
   - Question title: "University Name"

   **Question 2: Contact Email**
   - Type: Short answer
   - Required: Yes
   - Question title: "Contact Email"
   - Validation: Text > Email address

   **Question 3: Country**
   - Type: Short answer
   - Required: Yes
   - Question title: "Country"

   **Question 4: Data Category**
   - Type: Dropdown
   - Required: No
   - Question title: "Data Category"
   - Options:
     - Research Output
     - Teaching Quality
     - Citations
     - International Outlook
     - Industry Income
     - Other

   **Question 5: Description / Additional Information**
   - Type: Paragraph
   - Required: No
   - Question title: "Description / Additional Information"

5. Click "Send" at the top right
6. Click the "< >" icon (HTML embed)
7. Copy the form URL - you'll need this later

### Step 2: Link to Google Sheets

1. In your Google Form, click the "Responses" tab
2. Click the green spreadsheet icon (Create spreadsheet)
3. Name it: "University Data Submissions"
4. Click "Create"

### Step 3: Add Google Apps Script

1. Open the newly created Google Sheet
2. In the top menu, click: **Extensions > Apps Script**
3. Delete any existing code in the editor
4. Copy the entire content from `google-apps-script.js` file
5. Paste it into the Apps Script editor
6. Click the floppy disk icon to save (name it: "Auto Email CSV")
7. **IMPORTANT**: Update the email address in line 7 if needed:
   ```javascript
   const CONFIG = {
     RECIPIENT_EMAIL: 'admin@trranking.com',  // Change if needed
     EMAIL_SUBJECT: 'New University Data Submission - TR Rankings',
     EMAIL_BODY: 'A new university data submission has been received. Please find the CSV file attached.'
   };
   ```

### Step 4: Initialize the Trigger

1. In the Apps Script editor, select `setupTrigger` from the function dropdown (top left)
2. Click the "Run" button
3. You'll be asked to authorize the script - click "Review Permissions"
4. Choose your Google account
5. Click "Advanced" > "Go to [Project Name] (unsafe)"
6. Click "Allow"
7. You should see "Trigger setup complete" in the execution log

### Step 5: Test the Setup

1. In the Apps Script editor, select `testEmail` from the function dropdown
2. Click "Run" button
3. Check your email (admin@trranking.com) for the test email with CSV attachment
4. If successful, you should receive an email with a CSV file

### Step 6: Update Your Website Form

After completing the above steps, you'll need to update your `index.html` to submit to your Google Form.

**Get your Form ID:**
- Your Google Form URL looks like: `https://docs.google.com/forms/d/e/1FAIpQLSxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/viewform`
- The Form ID is the part between `/d/e/` and `/viewform`
- Example: `1FAIpQLSxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

**Then update the form in index.html:**
- Replace the current form submission with a direct Google Form submission
- Or embed the Google Form directly using an iframe

## Features of the Script

- **Automatic CSV Email**: Every form submission triggers an email with CSV attachment
- **Timestamp Included**: Each CSV includes submission timestamp
- **Error Handling**: If something fails, you'll get an error notification email
- **Manual Export**: Run `exportAllToCSV()` to export all submissions at once
- **Test Function**: Run `testEmail()` to test without a new submission

## Troubleshooting

**No email received:**
- Check your spam folder
- Verify the email address in CONFIG is correct
- Check the Apps Script execution log for errors

**Trigger not working:**
- Make sure you ran `setupTrigger()` successfully
- Check if the trigger exists: Extensions > Apps Script > Triggers (left sidebar)

**Authorization issues:**
- Make sure you clicked "Allow" when prompted
- Re-run the setup if you denied permissions

**CSV format issues:**
- The script handles special characters automatically
- Check the data in Google Sheets for any formatting issues

## Alternative: Embed Google Form Directly

Instead of using your custom HTML form, you can embed the Google Form directly:

```html
<iframe
  src="https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true"
  width="100%"
  height="800"
  frameborder="0"
  marginheight="0"
  marginwidth="0">
  Loading...
</iframe>
```

Replace `YOUR_FORM_ID` with your actual Google Form ID.

## Security Notes

- The Google Form and Sheet should be shared with appropriate permissions
- Only give edit access to trusted users
- Consider adding response validation in the Google Form
- The Apps Script runs under your Google account permissions

## Maintenance

- Periodically check the Google Sheet for data integrity
- Monitor the Apps Script execution log for errors
- Consider adding data validation rules in the Google Sheet
- Backup the Google Sheet regularly

## Support

If you encounter issues:
1. Check the Apps Script execution log
2. Verify the trigger is active
3. Test with the `testEmail()` function
4. Review Google's Apps Script documentation
