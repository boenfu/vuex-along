const production = process.env.NODE_ENV === "production";

module.exports = {
  publicPath: production ? "/demo/dist" : "",
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      production ? (args[0].filename = "../../index.html") : undefined;
      return args;
    });
  }
};
