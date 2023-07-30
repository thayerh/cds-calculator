// Assuming you are working with Node.js
const fs = require('fs');

// Read the JSON data from the file
fs.readFile('results.json', 'utf8', (err, jsonString) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  try {
    // Parse the JSON data into an object
    const dataObject = JSON.parse(jsonString);

    // Extract the keys from the object and store them in an array
    const keysArray = Object.keys(dataObject);

    console.log(keysArray);
  } catch (err) {
    console.error('Error parsing JSON:', err);
  }
});
