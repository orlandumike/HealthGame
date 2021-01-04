// Enables top level tree-shaking, to do imports like:
// import { Button, TextField } from '@material-ui/core';
// instead of:
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
// 
// Cf. https://material-ui.com/guides/minimizing-bundle-size/#option-2

const plugins = [
  [
    "babel-plugin-import",
    {
      libraryName: "@material-ui/core",
      // Use "'libraryDirectory': ''," if your bundler does not support ES modules
      libraryDirectory: "esm",
      camel2DashComponentName: false,
    },
    "core",
  ],
  [
    "babel-plugin-import",
    {
      libraryName: "@material-ui/icons",
      // Use "'libraryDirectory': ''," if your bundler does not support ES modules
      libraryDirectory: "esm",
      camel2DashComponentName: false,
    },
    "icons",
  ],
];

module.exports = { plugins };
