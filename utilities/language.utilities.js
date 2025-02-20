const constants = require("./../constants");

const langUtility = async (language) => {
  try {
    const userLanguage = language;
    return constants[userLanguage];
  } catch (err) {
    return constants["en"];
  }
};

module.exports = langUtility;
