const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, '../logs/app.log');

const logInfo = (message, metadata) => {
    const timestamp = new Date().toISOString();
    const logMessage = `[INFO] ${timestamp} - ${message}\n${metadata ? JSON.stringify(metadata, null, 2) : ''}\n`;
    fs.appendFileSync(logFilePath, logMessage);
    console.log(logMessage);
};

const logError = (message, error) => {
    const timestamp = new Date().toISOString();
    const logMessage = `[ERROR] ${timestamp} - ${message}\n${error ? JSON.stringify(error, null, 2) : ''}\n`;
    fs.appendFileSync(logFilePath, logMessage);
    console.error(logMessage);
};

module.exports = { logInfo, logError };