const validText = text => {
  return typeof text === 'string' && text.trim().length > 0;
};

module.exports = validText;
