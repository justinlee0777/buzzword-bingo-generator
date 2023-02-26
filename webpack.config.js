const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const config = {
  entry: ['./src/index.tsx'],
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
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
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
  plugins: [],
};

module.exports = (_, argv) => {
  if (argv.mode === 'development') {
    const module = { ...config.module };
    module.rules[0].use.options.configFile = './tsconfig.dev.json';

    const override = {
      entry: config.entry.concat('./index.tsx'),
      module,
      plugins: config.plugins.concat(
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, './index.html'),
          title: 'Buzzword Bingo Generator',
        })
      ),
      optimization: {
        minimize: false,
      },
      devtool: 'source-map',
    };

    return { ...config, ...override };
  } else {
    const override = {
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

    return { ...config, ...override };
  }
};
