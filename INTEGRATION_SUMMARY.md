# Google Forms & Sheets Integration Summary

## Overview
This solution automatically emails CSV files to `admin@trranking.com` whenever users submit university data through your website.

## Files Created

1. **google-apps-script.js** - Google Apps Script that runs in Google Sheets
   - Automatically triggers on form submissions
   - Converts data to CSV format
   - Emails CSV attachment to admin@trranking.com

2. **GOOGLE_FORMS_SETUP.md** - Complete setup guide
   - Step-by-step instructions
   - Troubleshooting tips
   - Security notes

3. **google-form-embed-example.html** - Example of embedding Google Form directly
   - Simple iframe embed option
   - Clean and professional look

4. **google-form-submission.js** - JavaScript for custom form submission
   - Submits your HTML form to Google Forms
   - Handles success/error states
   - Alternative to iframe embed

## Three Implementation Options

### Option 1: Embed Google Form Directly (Easiest)
**Pros:**
- Easiest to set up
- Google handles form validation
- Mobile-friendly by default
- No JavaScript configuration needed

**Cons:**
- Less styling control
- Google branding visible

**Steps:**
1. Follow setup in `GOOGLE_FORMS_SETUP.md`
2. Copy your Form ID
3. Replace `YOUR_FORM_ID` in `google-form-embed-example.html`
4. Use this file or embed the iframe in your index.html

### Option 2: Custom HTML Form + Google Forms Backend (Recommended)
**Pros:**
- Full styling control
- Seamless integration with your design
- Better user experience

**Cons:**
- Requires extracting field IDs from Google Form
- More JavaScript configuration

**Steps:**
1. Follow setup in `GOOGLE_FORMS_SETUP.md`
2. Extract field IDs from your Google Form (instructions in the file)
3. Update `FORM_CONFIG` in `google-form-submission.js`
4. Update your index.html form to use `handleGoogleFormSubmit`

### Option 3: Keep Current Form + Add Manual Export
**Pros:**
- No changes to current form
- Keep existing mailto functionality

**Cons:**
- CSV not automatic
- Manual intervention required

**Steps:**
1. Follow setup in `GOOGLE_FORMS_SETUP.md`
2. Manually enter data into Google Form or Sheet
3. Run `exportAllToCSV()` in Apps Script when needed

## Quick Start (Recommended Path)

### For Beginners - Use Option 1:
1. Create Google Form (5 minutes)
2. Link to Google Sheet (1 minute)
3. Add Apps Script (2 minutes)
4. Setup trigger (1 minute)
5. Test (1 minute)
6. Replace Form ID in example HTML (1 minute)
7. Done!

**Total time: ~12 minutes**

### For Developers - Use Option 2:
1. Create Google Form (5 minutes)
2. Link to Google Sheet (1 minute)
3. Add Apps Script (2 minutes)
4. Setup trigger (1 minute)
5. Extract field IDs (5 minutes)
6. Update JavaScript config (2 minutes)
7. Integrate with your form (5 minutes)
8. Test (2 minutes)

**Total time: ~23 minutes**

## What Happens After Setup

1. User submits form on your website
2. Data goes to Google Forms → Google Sheets
3. Google Apps Script automatically triggers
4. Script converts data to CSV
5. Email sent to admin@trranking.com with CSV attachment
6. User sees success message

## Email Format

**Subject:** New University Data Submission - TR Rankings

**Body:**
```
A new university data submission has been received. Please find the CSV file attached.

Submission Details:
----------------
University Name: [University Name]
Contact Email: [Email]
Country: [Country]
Data Category: [Category]
Description: [Description]
Timestamp: [Date/Time]
```

**Attachment:** university_data_submission.csv

## CSV Format

The CSV file includes:
- Timestamp (ISO format)
- University Name
- Contact Email
- Country
- Data Category
- Description

Can be opened in Excel, Google Sheets, or any spreadsheet application.

## Testing

After setup, test by:
1. Submitting a test entry through your form
2. Check email at admin@trranking.com
3. Verify CSV attachment
4. Open CSV in Excel to verify format

## Maintenance

- Monitor Google Sheet for data integrity
- Check Apps Script execution log periodically
- Run `exportAllToCSV()` for complete exports
- Backup Google Sheet regularly

## Support

If you need help:
1. Check `GOOGLE_FORMS_SETUP.md` troubleshooting section
2. Review Apps Script execution log
3. Test with `testEmail()` function
4. Verify trigger is active

## Next Steps

Choose your implementation option and follow the corresponding instructions in `GOOGLE_FORMS_SETUP.md`.
