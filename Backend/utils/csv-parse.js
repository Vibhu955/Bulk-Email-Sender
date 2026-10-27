const fs = require('fs');
const csv = require('csv-parser');
const csvSchema = require('../mails/middleware/csv-validation-schema');

const parseCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const validData = [];
    const errors = [];
    let rowNumber = 1;

    fs.createReadStream(filePath)
      .pipe(csv()) //channels the data stream
      .on('data', (row) => {
        // Ignores empty rows
        if (!row.name && !row.email && !row.phone_number) {
          return;
        }

        const { error, value } = csvSchema.validate(row);

        if (error) {
          errors.push(rowNumber);
        } else {
          validData.push(value);
        }

        rowNumber++;
      })
      .on('end', () => {
        resolve({ validData, errors });
      })
      .on('error', (err) => {
        reject(err); //if connection fails
      });
  });
};

module.exports = parseCSV;
