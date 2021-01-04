// Cf. https://material-ui.com/guides/minimizing-bundle-size/#option-2
const { useBabelRc: babelRc, override } = require("customize-cra");

module.exports = override(babelRc());
