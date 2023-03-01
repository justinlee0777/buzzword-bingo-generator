const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const config = {
  entry: './src/index.tsx',
  output: {
    filename: 'index.js',
    library: {
      type: 'commonjs-module',
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {},
        },
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              import: false,
              modules: true,
            },
          },
        ],
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  externals: ['react'],
  plugins: [new MiniCssExtractPlugin({ filename: 'index.css' })],
};

module.exports = (_, argv) => {
  let override;

  if (argv.mode === 'development') {
    const module = { ...config.module };
    module.rules[0].use.options.configFile = path.resolve(
      __dirname,
      './tsconfig.dev.json'
    );

    override = {
      mode: 'development',
      output: {
        ...config.output,
        library: {
          ...config.output.library,
          type: 'var',
        },
      },
      entry: {
        buzzwordBingo: './src/index.tsx',
        index: './index.tsx',
      },
      module,
      plugins: config.plugins.concat(
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, './index.html'),
          title: 'Buzzword Bingo Generator',
        }),
        new CopyWebpackPlugin({
          patterns: [
            {
              from: './assets',
              to: 'assets',
            },
          ],
        })
      ),
      externals: [],
      optimization: {
        minimize: false,
      },
      devtool: 'source-map',
      stats: 'verbose',
    };
  } else {
    override = {
      mode: 'production',
      plugins: config.plugins.concat(
        new CopyWebpackPlugin({
          patterns: [
            {
              from: './package.json',
              transform: (content) => {
                const json = JSON.parse(content.toString());

                // The current distribution has no dependencies.
                delete json.dependencies;
                delete json.devDependencies;

                // Why not delete the scripts at this point.
                delete json.scripts;

                return JSON.stringify(json);
              },
            },
          ],
        })
      ),
    };
  }

  const overriddenConfig = { ...config, ...override };

  return overriddenConfig;
};
