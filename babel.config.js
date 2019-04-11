module.exports = {
  presets: ["@babel/typescript"],
  plugins: [
    ["@babel/plugin-proposal-class-properties", { loose: false }],
    "@babel/plugin-transform-classes",
    "@babel/plugin-transform-parameters",
    "@babel/plugin-transform-arrow-functions",
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-transform-block-scoping"
  ]
};
