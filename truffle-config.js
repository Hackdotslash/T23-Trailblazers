const path = require("path");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      port: 7545,
      network_id: 5777,
      host: "127.0.0.1",
    },
  },
  compilers: {
    solc: {
      version: "0.7.0",
    },
  },
};
