const replacePlaceholders = (html, data) => {
  let output = html; //template body

  Object.keys(data).forEach(key => {
    const regex = new RegExp(`{{${key}}}`, 'g'); // {{name}} seggregates JS 
    output = output.replace(regex, data[key]); //{{name}}<- csvData[name]
  });

  return output;
};

module.exports = replacePlaceholders;
