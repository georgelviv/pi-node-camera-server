const logger = (who) => (what) => {
  console.log(`${who}: ${what}`);
};

module.exports = {
  logger
};
