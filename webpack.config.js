const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const ENVIRONMENT = process.env.NODE_ENV || "development";
const IS_PRODUCTION = ENVIRONMENT === "production";

module.exports = {
  entry: {
    bundle: ["./src/index.js"],
  },
  resolve: {
    extensions: [".js", ".svelte"],
  },
  output: {
    path: __dirname + "/public",
    publicPath: "/",
    filename: "[name].js",
    chunkFilename: "[name].[id].js",
  },
  devServer: {
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.svelte$/,
        exclude: /node_modules/,
        use: {
          loader: "svelte-loader",
          options: {
            emitCss: true,
            hotReload: true,
            preprocess: require("svelte-preprocess")(),
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          /**
           * MiniCssExtractPlugin doesn't support HMR.
           * For developing, use 'style-loader' instead.
           * */
          IS_PRODUCTION ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
        ],
      },
    ],
  },
  mode: ENVIRONMENT,
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
  devtool: IS_PRODUCTION ? false : "source-map",
};
