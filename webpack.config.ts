import path from "path";
import webpack from "webpack";
import HTMLWebpackPlugin from "html-webpack-plugin";

const StylexPlugin = require("@stylexjs/webpack-plugin");

const config = (_: any, argv: any): webpack.Configuration => ({
  entry: "./src/index.tsx",
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  optimization: {
    splitChunks: { chunks: 'all' },
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-typescript",
              ["@babel/preset-react", { runtime: "automatic" }],
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({ template: "./public/index.html" }),
    new StylexPlugin({
      filename: "styles.[contenthash].css",
      dev: argv.mode === "development",
      runtimeInjection: false,
      classNamePrefix: "_",
      unstable_moduleResolution: {
        type: "commonJS",
        rootDir: __dirname,
      },
    }),
  ],
});

export default config
