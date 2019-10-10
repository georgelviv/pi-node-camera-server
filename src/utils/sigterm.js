const handleSigterm = (fn) => {
  process.on('SIGTERM', fn);
  process.on('SIGINT', fn);
};

module.exports = {
  handleSigterm
};
