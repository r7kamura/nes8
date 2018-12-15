module.exports = {
  mode: "development",

  module: {
    rules: [
      {
        loader: "ts-loader",
        test: /\.ts$/
      }
    ]
  },

  resolve: {
    extensions: [".ts"]
  }
};
