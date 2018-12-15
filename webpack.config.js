module.exports = {
  mode: "development",

  entry: "./src/ts/index.ts",

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
