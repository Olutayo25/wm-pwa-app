// src/credentials/googleSheets.js
const { google } = require('googleapis');
const credentials = require('./credentials.json'); // Path to your credentials file

// Initialize the Google Sheets API client
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

// Function to append data to a Google Sheet
export const appendDataToSheet = async (spreadsheetId, range, values) => {
  try {
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      resource: { values },
    });
    console.log('Data appended:', response.data);
  } catch (error) {
    console.error('Error appending data:', error);
  }
};

// Function to read data from a Google Sheet
export const readDataFromSheet = async (spreadsheetId, range) => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    return response.data.values;
  } catch (error) {
    console.error('Error reading data:', error);
    return [];
  }
};