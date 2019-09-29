const logger = (who) => (...args) => {
  console.log(`${who}: ${args.join(' ')}`);
};

module.exports = {
  logger
};
